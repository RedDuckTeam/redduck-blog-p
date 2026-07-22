import { and, count, desc, eq, inArray, or, type SQL, sql } from "drizzle-orm";

import { getDb } from "@/db/client";
import {
  type Post,
  posts,
  postTags,
  postViews,
  type Tag,
  tags,
} from "@/db/schema";
import { applySentinel, cumulativeLimit } from "@/lib/pagination";

export type PostWithTags = Post & { tags: Tag[] };

export interface ListPostsParams {
  tagSlug?: string;
  q?: string;
  page: number;
}

export interface ListPostsResult {
  posts: PostWithTags[];
  hasMore: boolean;
}

export interface TagWithCount {
  name: string;
  slug: string;
  count: number;
}

function escapeLike(value: string): string {
  return value.replace(/[\\%_]/g, (char) => `\\${char}`);
}

export async function listPosts({
  tagSlug,
  q,
  page,
}: ListPostsParams): Promise<ListPostsResult> {
  const db = getDb();

  const conds: SQL[] = [eq(posts.status, "published")];

  const search = q?.trim();
  if (search) {
    const pattern = `%${escapeLike(search)}%`;
    conds.push(
      or(
        sql`${posts.title} like ${pattern} escape '\\'`,
        sql`${posts.excerpt} like ${pattern} escape '\\'`,
      )!,
    );
  }

  if (tagSlug) {
    conds.push(
      inArray(
        posts.id,
        db
          .select({ postId: postTags.postId })
          .from(postTags)
          .innerJoin(tags, eq(postTags.tagId, tags.id))
          .where(eq(tags.slug, tagSlug)),
      ),
    );
  }

  const rows = await db.query.posts.findMany({
    where: and(...conds),
    orderBy: desc(posts.publishedAt),
    limit: cumulativeLimit(page),
    with: { postTags: { with: { tag: true } } },
  });

  const mapped: PostWithTags[] = rows.map(({ postTags: links, ...post }) => ({
    ...post,
    tags: links.map((link) => link.tag),
  }));

  const { items, hasMore } = applySentinel(mapped, page);
  return { posts: items, hasMore };
}

export async function getPostBySlug(slug: string): Promise<PostWithTags | null> {
  const db = getDb();
  const post = await db.query.posts.findFirst({
    where: and(eq(posts.slug, slug), eq(posts.status, "published")),
    with: { postTags: { with: { tag: true } } },
  });
  if (!post) return null;
  const { postTags: links, ...rest } = post;
  return { ...rest, tags: links.map((link) => link.tag) };
}

export async function listTags(): Promise<TagWithCount[]> {
  const db = getDb();
  return db
    .select({
      name: tags.name,
      slug: tags.slug,
      count: count(posts.id),
    })
    .from(tags)
    .innerJoin(postTags, eq(postTags.tagId, tags.id))
    .innerJoin(
      posts,
      and(eq(posts.id, postTags.postId), eq(posts.status, "published")),
    )
    .groupBy(tags.id)
    .orderBy(desc(count(posts.id)));
}

export async function getViews(postId: number): Promise<number> {
  const db = getDb();
  const row = (
    await db
      .select({ count: postViews.count })
      .from(postViews)
      .where(eq(postViews.postId, postId))
      .limit(1)
  )[0];
  return row?.count ?? 0;
}

export async function incrementViews(postId: number): Promise<void> {
  const db = getDb();
  await db
    .insert(postViews)
    .values({ postId, count: 1 })
    .onConflictDoUpdate({
      target: postViews.postId,
      set: { count: sql`${postViews.count} + 1` },
    });
}

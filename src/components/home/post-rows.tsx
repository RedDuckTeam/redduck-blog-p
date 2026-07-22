import { PAGE_SIZE, STRIP_SIZE } from "@/lib/site";
import type { PostWithTags } from "@/server/posts";

import { PostCard, type PostCardVariant } from "./post-card";

export interface PostRow {
  variant: PostCardVariant;
  posts: PostWithTags[];
}

const CYCLE: { variant: PostCardVariant; size: number }[] = [
  { variant: "wide", size: 3 },
  { variant: "strip", size: STRIP_SIZE },
  { variant: "grid", size: 4 },
  { variant: "grid", size: 4 },
];

if (CYCLE.reduce((n, s) => n + s.size, 0) !== PAGE_SIZE) {
  throw new Error("home layout cycle must sum to PAGE_SIZE");
}

export function chunkPostsIntoRows(posts: PostWithTags[]): PostRow[] {
  const rows: PostRow[] = [];
  let index = 0;
  let segment = 0;

  while (index < posts.length) {
    const { variant, size } = CYCLE[segment % CYCLE.length];
    rows.push({ variant, posts: posts.slice(index, index + size) });
    index += size;
    segment += 1;
  }

  return rows;
}

const ROW_GAP = "gap-5 2xl:gap-[20px]";

function Row({ variant, posts }: PostRow) {
  if (variant === "wide") {
    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 ${ROW_GAP}`}
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} variant="wide" />
        ))}
      </div>
    );
  }

  if (variant === "strip") {
    return (
      <div className={`flex overflow-x-auto pb-2 ${ROW_GAP}`}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            variant="strip"
            className="w-[300px] shrink-0 sm:w-[380px] 2xl:w-[420px]"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 ${ROW_GAP}`}
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} variant="grid" />
      ))}
    </div>
  );
}

export function PostRows({ posts }: { posts: PostWithTags[] }) {
  const rows = chunkPostsIntoRows(posts);

  return (
    <div className="flex flex-col gap-8 px-4 py-8 md:px-10 md:py-[60px] 2xl:gap-[60px]">
      {rows.map((row, i) => (
        <Row key={i} variant={row.variant} posts={row.posts} />
      ))}
    </div>
  );
}

export default PostRows;

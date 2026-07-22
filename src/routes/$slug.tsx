import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { ArticleHero } from "@/components/article/article-hero";
import { OurCases } from "@/components/article/our-cases";
import { Toc, type TocItem } from "@/components/article/toc";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/jsonld";
import { canonical, seo } from "@/lib/seo";
import { LANDING_URL, SITE_URL } from "@/lib/site";
import type { PostWithTags } from "@/server/posts";

type ArticleMeta = Omit<PostWithTags, "content">;

interface ArticleData {
  post: ArticleMeta;
  views: number;
  readingMinutes: number;
  toc: TocItem[];
  html: string;
}

const loadArticle = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }): Promise<ArticleData | null> => {
    const { getPostBySlug, getViews, incrementViews } = await import(
      "@/server/posts"
    );
    const post = await getPostBySlug(slug);
    if (!post) return null;

    const views = await getViews(post.id);

    const { renderPostContent } = await import("@/lib/mdx/cache");
    const { readingTimeMinutes } = await import("@/lib/reading-time");
    const { renderToStaticMarkup } = await import("react-dom/server");

    const { node, toc } = renderPostContent({
      slug: post.slug,
      updatedAt: post.updatedAt,
      content: post.content,
    });
    const html = renderToStaticMarkup(node);
    const readingMinutes = readingTimeMinutes(post.content);

    const { waitUntil } = await import("cloudflare:workers");
    waitUntil(incrementViews(post.id));

    const { content: _content, ...meta } = post;
    return { post: meta, views, readingMinutes, toc, html };
  });

function absoluteUrl(pathOrUrl: string): string {
  return /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;
}

export const Route = createFileRoute("/$slug")({
  loader: async ({ params }) => {
    const data = await loadArticle({ data: params.slug });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    const title = post.metaTitle ?? post.title;
    const description = post.metaDescription ?? post.excerpt ?? undefined;
    const rawImage = post.ogImage ?? post.coverImage;
    const image = rawImage ? absoluteUrl(rawImage) : undefined;

    const base = seo({ title, description, image }).filter(
      (tag) =>
        !(
          ("name" in tag && tag.name === "og:type") ||
          ("property" in tag && tag.property === "og:type")
        ),
    );

    return {
      meta: [
        ...base,
        { property: "og:type", content: "article" },
        ...(post.publishedAt
          ? [
              {
                property: "article:published_time",
                content: post.publishedAt.toISOString(),
              },
            ]
          : []),
        {
          property: "article:modified_time",
          content: post.updatedAt.toISOString(),
        },
      ],
      links: [canonical(`/${post.slug}`)],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { post, views, readingMinutes, toc, html } = Route.useLoaderData();
  const url = `${SITE_URL}/${post.slug}`;
  const published = (post.publishedAt ?? post.createdAt).toISOString();
  const modified = post.updatedAt.toISOString();
  const description = post.metaDescription ?? post.excerpt ?? post.title;
  const rawImage = post.ogImage ?? post.coverImage;
  const image = rawImage ? absoluteUrl(rawImage) : undefined;

  return (
    <>
      <ArticleJsonLd
        headline={post.title}
        description={description}
        datePublished={published}
        dateModified={modified}
        authorName={post.author}
        image={image}
        url={url}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: LANDING_URL },
          { name: "Blog", url: SITE_URL },
          { name: post.title, url },
        ]}
      />

      <ArticleHero
        post={post}
        views={views}
        readingMinutes={readingMinutes}
        url={url}
      />

      <section className="bg-black text-white">
        <div className="mx-auto max-w-[1920px] px-5 py-10 md:px-[60px] md:py-[60px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
            <Toc toc={toc} className="lg:order-2 lg:w-[480px] lg:shrink-0" />
            <div
              className="article-content min-w-0 lg:order-1 lg:flex-1"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </section>

      <OurCases />
    </>
  );
}

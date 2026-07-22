import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { FilterBar } from "@/components/home/filter-bar";
import { Hero } from "@/components/home/hero";
import { LoadMore } from "@/components/home/load-more";
import { PostRows } from "@/components/home/post-rows";
import { canonical, seo } from "@/lib/seo";

interface HomeSearch {
  tag?: string;
  q?: string;
  page?: number;
}

const HOME_TITLE = "Blog — News, Insights and Press Release | RedDuck";
const HOME_DESCRIPTION =
  "News, insights and press releases from RedDuck — a Web3, DeFi and blockchain development studio.";

const loadHomeFeed = createServerFn({ method: "GET" })
  .validator((deps: { tag?: string; q?: string; page: number }) => deps)
  .handler(async ({ data }) => {
    const { listPosts, listTags } = await import("@/server/posts");
    const [feed, tags] = await Promise.all([
      listPosts({ tagSlug: data.tag, q: data.q, page: data.page }),
      listTags(),
    ]);
    return { ...feed, tags };
  });

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): HomeSearch => {
    const rawPage = Number(search.page);
    const page =
      Number.isFinite(rawPage) && rawPage > 1 ? Math.floor(rawPage) : undefined;
    return {
      tag:
        typeof search.tag === "string" && search.tag ? search.tag : undefined,
      q: typeof search.q === "string" && search.q ? search.q : undefined,
      page,
    };
  },
  loaderDeps: ({ search }) => ({
    tag: search.tag,
    q: search.q,
    page: search.page ?? 1,
  }),
  loader: async ({ deps }) => loadHomeFeed({ data: deps }),
  head: () => ({
    meta: seo({ title: HOME_TITLE, description: HOME_DESCRIPTION }),
    links: [canonical("/")],
  }),
  component: HomePage,
});

function HomePage() {
  const { posts, hasMore, tags } = Route.useLoaderData();
  const { tag, q, page } = Route.useSearch();
  const isFiltering = Boolean(tag || q);

  return (
    <main className="mx-auto max-w-[1920px]">
      <Hero />

      <div className="px-4 md:px-[60px]">
        <div className="py-6 md:py-10">
          <FilterBar tags={tags} activeTag={tag} query={q} />
        </div>

        <div className="border-x border-dark-gray">
          {posts.length > 0 ? (
            <>
              <PostRows posts={posts} />
              <LoadMore page={page ?? 1} hasMore={hasMore} />
            </>
          ) : (
            <EmptyState filtering={isFiltering} />
          )}
        </div>
      </div>
    </main>
  );
}

function EmptyState({ filtering }: { filtering: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-20 text-center md:py-[120px]">
      <p className="font-mono text-2xl uppercase text-black md:text-3xl">
        Nothing found<span className="blink-cursor text-red">_</span>
      </p>
      <p className="max-w-md font-body text-base text-concrete md:text-lg">
        {filtering
          ? "No posts match your filters yet. Try another topic or clear the search."
          : "There are no published posts here yet. Check back soon."}
      </p>
    </div>
  );
}

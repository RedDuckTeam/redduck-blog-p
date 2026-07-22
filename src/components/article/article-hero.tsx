import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";

import { ShareButtons } from "@/components/article/share-buttons";
import type { PostWithTags } from "@/server/posts";
import { LANDING_URL } from "@/lib/site";

interface ArticleHeroProps {
  post: Omit<PostWithTags, "content">;
  views: number;
  readingMinutes: number;
  url: string;
}

// timeZone UTC: otherwise server (UTC) and client format the date to different days — hydration mismatch.
const DATE_FMT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const DAY_MS = 24 * 60 * 60 * 1000;

function Dot() {
  return <span className="size-[10px] shrink-0 bg-dark-gray" aria-hidden />;
}

function MetaPlate({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-11 items-center gap-2 border border-concrete px-4 font-body text-sm text-gray md:text-[18px]">
      {children}
    </div>
  );
}

export function ArticleHero({
  post,
  views,
  readingMinutes,
  url,
}: ArticleHeroProps) {
  const posted = post.publishedAt ?? post.createdAt;
  const showUpdated =
    post.publishedAt != null &&
    post.updatedAt.getTime() - post.publishedAt.getTime() > DAY_MS;

  return (
    <header className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px]">
        <div className="flex flex-col gap-4 border-b border-concrete px-5 py-6 md:flex-row md:items-center md:justify-between md:px-[60px] md:py-[38px]">
          <nav
            aria-label="Breadcrumb"
            className="flex min-w-0 items-center gap-4 font-body text-sm text-gray md:text-[18px]"
          >
            <a href={LANDING_URL} className="shrink-0 hover:text-red">
              Home
            </a>
            <Dot />
            <Link to="/" className="shrink-0 hover:text-red">
              Blog
            </Link>
            <Dot />
            <span className="truncate text-dark-gray">{post.title}</span>
          </nav>
          <ShareButtons url={url} title={post.title} className="shrink-0" />
        </div>

        <h1 className="px-5 py-10 font-mono text-4xl leading-[1.05] font-medium uppercase sm:text-5xl md:px-[60px] md:py-[60px] xl:text-6xl 2xl:text-[80px]">
          {post.title}
          <span className="text-red blink-cursor">_</span>
        </h1>

        <div className="flex items-center gap-6 border-y border-concrete px-5 py-8 md:px-[60px] md:py-10">
          <img
            src="/images/avatar-duck.svg"
            alt=""
            width={120}
            height={120}
            className="size-16 shrink-0 md:size-[120px]"
          />
          <div className="min-w-0">
            <p className="font-body text-sm text-dark-gray md:text-[18px]">
              Written by
            </p>
            <p className="font-body text-xl font-medium text-white md:text-[32px]">
              {post.author}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-[60px] md:py-10">
          <div className="flex flex-wrap items-center gap-3">
            <MetaPlate>Posted: {DATE_FMT.format(posted)}</MetaPlate>
            {showUpdated && (
              <MetaPlate>UPD: {DATE_FMT.format(post.updatedAt)}</MetaPlate>
            )}
            <MetaPlate>{readingMinutes} min reading</MetaPlate>
            <MetaPlate>
              <Eye className="size-5 shrink-0" aria-hidden />
              <span aria-label={`${views.toLocaleString("en-US")} views`}>
                {views.toLocaleString("en-US")}
              </span>
            </MetaPlate>
          </div>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              {post.tags.map((tag) => (
                <Link
                  key={tag.slug}
                  to="/"
                  search={{ tag: tag.slug }}
                  className="flex h-[42px] items-center border border-concrete px-4 font-body text-sm text-gray transition-colors hover:border-red hover:text-red md:text-[18px]"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default ArticleHero;

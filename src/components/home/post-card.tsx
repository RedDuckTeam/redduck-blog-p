import { Link } from "@tanstack/react-router";

import { DuckMark } from "@/components/layout/icons";
import { cn } from "@/lib/utils";
import type { PostWithTags } from "@/server/posts";

export type PostCardVariant = "wide" | "grid" | "strip";

// timeZone UTC: otherwise server (UTC) and client format the date to different days — hydration mismatch.
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function formatPostDate(value: Date | number | null): string {
  if (value == null) return "";
  return dateFormatter.format(value).replace(", ", ",");
}

const COVER_ASPECT: Record<PostCardVariant, string> = {
  wide: "aspect-[560/450]",
  grid: "aspect-[435/450]",
  strip: "aspect-[420/450]",
};

const BADGE =
  "flex items-center justify-center border border-concrete px-6 py-2.5 font-body text-base leading-5 text-black";

interface PostCardProps {
  post: PostWithTags;
  variant?: PostCardVariant;
  className?: string;
}

export function PostCard({ post, variant = "grid", className }: PostCardProps) {
  const date = formatPostDate(post.publishedAt ?? post.createdAt);
  const tags = post.tags.slice(0, 2);

  return (
    <Link
      to="/$slug"
      params={{ slug: post.slug }}
      className={cn("group flex h-full flex-col", className)}
    >
      <div
        className={cn(
          "relative w-full shrink-0 overflow-hidden bg-dark-gray",
          COVER_ASPECT[variant],
        )}
      >
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="bg-concrete flex size-full items-center justify-center">
            <DuckMark className="text-dark-gray w-1/4" />
          </div>
        )}
      </div>

      <div className="border-dark-gray bg-gray flex flex-1 flex-col gap-5 border p-5">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <span key={tag.slug} className={BADGE}>
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <h3
          className={cn(
            "text-black transition-colors group-hover:text-red",
            variant === "wide"
              ? "line-clamp-2 font-mono text-2xl leading-[30px]"
              : "line-clamp-2 font-body text-xl leading-[1.4]",
          )}
        >
          {post.title}
        </h3>

        {date && (
          <span className={cn(BADGE, "mt-auto w-fit self-start")}>{date}</span>
        )}
      </div>
    </Link>
  );
}

export default PostCard;

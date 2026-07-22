import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import type { TagWithCount } from "@/server/posts";

const PILL_BASE =
  "flex items-center border border-dark-gray px-6 py-3 font-body text-base transition-colors md:text-lg";
const PILL_ACTIVE = "bg-black text-white";
const PILL_IDLE = "bg-gray text-black hover:bg-white";

interface FilterBarProps {
  tags: TagWithCount[];
  activeTag?: string;
  query?: string;
}

export function FilterBar({ tags, activeTag, query }: FilterBarProps) {
  const navigate = useNavigate();
  const [value, setValue] = useState(query ?? "");

  useEffect(() => {
    setValue(query ?? "");
  }, [query]);

  function submitSearch(next: string) {
    const trimmed = next.trim();
    void navigate({
      to: "/",
      search: (prev) => ({ ...prev, q: trimmed || undefined, page: undefined }),
    });
  }

  return (
    <div className="flex flex-col gap-4 border border-dark-gray bg-gray p-5 lg:flex-row lg:items-stretch lg:justify-between">
      <div className="flex flex-wrap gap-2.5">
        <Link
          to="/"
          search={(prev) => ({ ...prev, tag: undefined, page: undefined })}
          className={cn(PILL_BASE, activeTag ? PILL_IDLE : PILL_ACTIVE)}
        >
          All
        </Link>
        {tags.map((tag) => {
          const isActive = tag.slug === activeTag;
          return (
            <Link
              key={tag.slug}
              to="/"
              search={(prev) => ({
                ...prev,
                tag: isActive ? undefined : tag.slug,
                page: undefined,
              })}
              className={cn(PILL_BASE, isActive ? PILL_ACTIVE : PILL_IDLE)}
            >
              {tag.name}
            </Link>
          );
        })}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitSearch(value);
        }}
        className="flex items-center gap-4 border border-dark-gray bg-gray p-4 lg:w-[420px] xl:w-[550px]"
      >
        <button
          type="submit"
          aria-label="Search"
          className="shrink-0 text-concrete hover:text-black"
        >
          <Search className="size-6" />
        </button>
        <input
          type="search"
          name="q"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
          className="min-w-0 flex-1 bg-transparent font-body text-base text-black placeholder:text-concrete focus:outline-none md:text-lg [&::-webkit-search-cancel-button]:hidden"
        />
        {value && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setValue("");
              submitSearch("");
            }}
            className="shrink-0 text-concrete hover:text-black"
          >
            <X className="size-5" />
          </button>
        )}
      </form>
    </div>
  );
}

export default FilterBar;

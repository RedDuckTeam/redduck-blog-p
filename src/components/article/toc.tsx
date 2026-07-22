import { useEffect, useState } from "react";

import { ArrowDown } from "lucide-react";

import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3;
}

interface TocProps {
  toc: TocItem[];
  className?: string;
}

function useScrollSpy(toc: TocItem[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(toc[0]?.id ?? null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || toc.length === 0) return;

    const elements = toc
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el != null);
    if (elements.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const firstVisible = toc.find((item) => visible.has(item.id));
        if (firstVisible) setActiveId(firstVisible.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  return activeId;
}

function handleClick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  event.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

function TocList({
  toc,
  activeId,
}: {
  toc: TocItem[];
  activeId: string | null;
}) {
  return (
    <ul>
      {toc.map((item) => {
        const active = item.id === activeId;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(event) => handleClick(event, item.id)}
              aria-current={active ? "location" : undefined}
              className={cn(
                "flex items-center gap-4 border-t border-concrete p-5 font-body text-[16px] leading-[1.4] transition-colors md:text-[20px]",
                item.depth === 3 && "pl-11 md:pl-14",
                active
                  ? "font-medium text-white"
                  : "text-concrete hover:text-gray",
              )}
            >
              <ArrowDown
                className={cn(
                  "size-6 shrink-0",
                  active ? "text-red" : "text-concrete",
                )}
                aria-hidden
              />
              <span className="min-w-0">{item.text}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function Toc({ toc, className }: TocProps) {
  const activeId = useScrollSpy(toc);
  if (toc.length === 0) return null;

  return (
    <div className={className}>
      <details className="border border-concrete bg-black text-white lg:hidden">
        <summary className="cursor-pointer list-none px-5 py-5 font-mono text-[20px] marker:hidden">
          Table of contents
        </summary>
        <TocList toc={toc} activeId={activeId} />
      </details>

      <nav
        aria-label="Table of contents"
        className="hidden border border-concrete bg-black text-white lg:sticky lg:top-0 lg:block lg:max-h-screen lg:overflow-y-auto"
      >
        <div className="border-b border-concrete px-5 py-8 font-mono text-[28px]">
          Table of contents
        </div>
        <TocList toc={toc} activeId={activeId} />
      </nav>
    </div>
  );
}

export default Toc;

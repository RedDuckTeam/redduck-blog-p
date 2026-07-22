import type { ReactNode } from "react";

import type { TocItem } from "@/lib/mdx/parse";
import { renderMarkdown } from "@/lib/mdx/render";

export interface RenderablePost {
  slug: string;
  updatedAt: Date;
  content: string;
}

export interface RenderedContent {
  node: ReactNode;
  toc: TocItem[];
}

interface CacheEntry {
  ts: number;
  result: RenderedContent;
}

const CACHE_CAP = 50;

const cache = new Map<string, CacheEntry>();

export function renderPostContent(post: RenderablePost): RenderedContent {
  const ts = post.updatedAt.getTime();
  const cached = cache.get(post.slug);
  if (cached && cached.ts === ts) {
    cache.delete(post.slug);
    cache.set(post.slug, cached);
    return cached.result;
  }

  const rendered = renderMarkdown(post.content);
  const entry: CacheEntry = {
    ts,
    result: { node: rendered.node, toc: rendered.toc },
  };

  cache.delete(post.slug);
  cache.set(post.slug, entry);

  while (cache.size > CACHE_CAP) {
    const oldest = cache.keys().next().value;
    if (oldest === undefined) break;
    cache.delete(oldest);
  }

  return entry.result;
}

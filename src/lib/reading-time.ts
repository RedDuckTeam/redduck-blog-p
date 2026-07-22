import { toString } from "mdast-util-to-string";

import { parseMarkdown } from "@/lib/mdx/parse";

const WORDS_PER_MINUTE = 200;

export function readingTimeMinutes(content: string): number {
  const { tree } = parseMarkdown(content);
  const text = toString(tree);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

import { fromMarkdown } from "mdast-util-from-markdown";
import { gfmFromMarkdown } from "mdast-util-gfm";
import { mdxJsxFromMarkdown } from "mdast-util-mdx-jsx";
import { toString } from "mdast-util-to-string";
import { gfm } from "micromark-extension-gfm";
import { mdxJsx } from "micromark-extension-mdx-jsx";

import type { Heading, Nodes, Root } from "@/lib/mdx/mdast-types";

export interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3;
}

export interface ParseResult {
  tree: Root;
  toc: TocItem[];
  fallback: boolean;
}

// MDX semantics: otherwise markdown indented inside JSX children parses as a `code` node (applied to both parse paths).
const DISABLE_INDENTED_CODE = { disable: { null: ["codeIndented"] } };

export function parseMarkdown(content: string): ParseResult {
  let tree: Root;
  let fallback = false;

  try {
    tree = fromMarkdown(content, {
      extensions: [gfm(), mdxJsx(), DISABLE_INDENTED_CODE],
      mdastExtensions: [gfmFromMarkdown(), mdxJsxFromMarkdown()],
    });
  } catch (error) {
    fallback = true;
    console.warn(
      "[mdx] JSX parse failed, falling back to plain markdown:",
      error,
    );
    tree = fromMarkdown(content, {
      extensions: [gfm(), DISABLE_INDENTED_CODE],
      mdastExtensions: [gfmFromMarkdown()],
    });
  }

  const toc = buildToc(tree);
  return { tree, toc, fallback };
}

function buildToc(tree: Root): TocItem[] {
  const toc: TocItem[] = [];
  const seen = new Map<string, number>();

  walkHeadings(tree, (heading) => {
    if (heading.depth !== 2 && heading.depth !== 3) return;
    const text = toString(heading);
    const id = uniqueSlug(text, seen);
    const data = (heading.data ??= {}) as { id?: string };
    data.id = id;
    toc.push({ id, text, depth: heading.depth });
  });

  return toc;
}

function walkHeadings(node: Nodes, visit: (heading: Heading) => void): void {
  if (node.type === "heading") {
    visit(node);
    return;
  }
  if ("children" in node) {
    for (const child of node.children) walkHeadings(child, visit);
  }
}

function slugify(text: string): string {
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "section";
}

function uniqueSlug(text: string, seen: Map<string, number>): string {
  const base = slugify(text);
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count}`;
}

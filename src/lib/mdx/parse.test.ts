import { describe, expect, it } from "vitest";

import { parseMarkdown } from "@/lib/mdx/parse";

describe("parseMarkdown", () => {
  it("parses GFM and builds a TOC from h2/h3 with slug ids", () => {
    const { tree, toc, fallback } = parseMarkdown(
      "# Title\n\n## Getting Started\n\ntext\n\n### Fine Details\n",
    );
    expect(fallback).toBe(false);
    expect(tree.type).toBe("root");
    expect(toc).toEqual([
      { id: "getting-started", text: "Getting Started", depth: 2 },
      { id: "fine-details", text: "Fine Details", depth: 3 },
    ]);
  });

  it("includes only h2/h3 in the TOC (h1 and h4 excluded)", () => {
    const { toc } = parseMarkdown("# H1\n\n## H2\n\n#### H4\n");
    expect(toc.map((item) => item.text)).toEqual(["H2"]);
  });

  it("de-duplicates repeated heading ids and keeps tree and TOC in sync", () => {
    const { tree, toc } = parseMarkdown("## Setup\n\n## Setup\n\n### Setup\n");
    expect(toc.map((item) => item.id)).toEqual(["setup", "setup-1", "setup-2"]);
    const headingIds = tree.children
      .filter((node) => node.type === "heading")
      .map((node) =>
        node.type === "heading"
          ? (node.data as { id?: string } | undefined)?.id
          : undefined,
      );
    expect(headingIds).toEqual(["setup", "setup-1", "setup-2"]);
  });

  it("assigns a fallback slug for headings that slugify to empty", () => {
    const { toc } = parseMarkdown("## ??? \n\n## ???\n");
    expect(toc.map((item) => item.id)).toEqual(["section", "section-1"]);
  });

  it("parses a GFM table", () => {
    const { tree } = parseMarkdown("| a | b |\n| - | - |\n| 1 | 2 |\n");
    expect(tree.children.some((node) => node.type === "table")).toBe(true);
  });

  it("keeps valid JSX as mdast nodes without a fallback", () => {
    const { fallback, tree } = parseMarkdown(
      '<Callout type="info">\n\nHi\n\n</Callout>\n',
    );
    expect(fallback).toBe(false);
    expect(
      tree.children.some((node) => node.type === "mdxJsxFlowElement"),
    ).toBe(true);
  });

  it("falls back to plain markdown when JSX is malformed (never throws)", () => {
    const { fallback, tree } = parseMarkdown(
      "Hello <Callout type=>broken\n\nAfter",
    );
    expect(fallback).toBe(true);
    expect(tree.type).toBe("root");
    expect(tree.children.length).toBeGreaterThan(0);
  });

  it("parses indented content inside contract components as markdown, not indented code", () => {
    const { tree } = parseMarkdown(
      "<Pros>\n  * Fast setup\n  * Great DX\n</Pros>\n",
    );
    const pros = tree.children.find(
      (node) => node.type === "mdxJsxFlowElement" && node.name === "Pros",
    );
    const inner =
      pros?.type === "mdxJsxFlowElement" ? pros.children[0] : undefined;
    expect(inner?.type).toBe("list");
  });
});

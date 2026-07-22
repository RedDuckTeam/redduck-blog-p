import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { renderMarkdown } from "@/lib/mdx/render";

function html(content: string): string {
  const { node } = renderMarkdown(content);
  return renderToString(<div>{node}</div>);
}

const FULL_DOC = [
  "# Article Title",
  "",
  "## Overview",
  "",
  "Para with **bold**, *italic*, ~~strike~~, `inline`, [ext](https://example.com) and [int](/about).",
  "",
  "## Overview",
  "",
  "### Details",
  "",
  "> A wise quote",
  "",
  "- one",
  "- two",
  "",
  "| A | B |",
  "| :- | -: |",
  "| 1 | 2 |",
  "",
  "```js",
  "const a = 1;",
  "```",
  "",
  "```wat",
  "unknown lang block",
  "```",
  "",
  '![alt text](/media/pic.png "A caption")',
  "",
  '<Callout type="warning">',
  "",
  "Careful now!",
  "",
  "</Callout>",
  "",
  '<Embed url="https://youtube.com/embed/xyz" title="Vid" />',
  "",
  "<Unknown>",
  "",
  "kept child",
  "",
  "</Unknown>",
  "",
].join("\n");

describe("renderMarkdown — full document smoke", () => {
  const out = html(FULL_DOC);

  it("does not throw and reports no fallback for valid content", () => {
    expect(renderMarkdown(FULL_DOC).fallback).toBe(false);
  });

  it("renders headings with de-duplicated anchor ids", () => {
    expect(out).toContain('id="overview"');
    expect(out).toContain('id="overview-1"');
    expect(out).toContain('id="details"');
  });

  it("renders a GFM table with per-column alignment", () => {
    expect(out).toContain("<table");
    expect(out).toContain("text-align:right");
    expect(out).toContain("text-align:left");
  });

  it("highlights known languages and leaves unknown languages plain", () => {
    expect(out).toContain("language-javascript");
    expect(out).toContain("language-none");
    expect(out).toContain("unknown lang block");
  });

  it("opens external links in a new tab but not internal links", () => {
    expect(out).toMatch(/<a[^>]+href="https:\/\/example\.com"[^>]+target="_blank"[^>]+rel="noopener noreferrer"/);
    expect(out).toMatch(/<a[^>]+href="\/about"/);
    expect(out).not.toMatch(/<a[^>]+href="\/about"[^>]+target="_blank"/);
  });

  it("renders blockquote, list and image with caption", () => {
    expect(out).toContain("<blockquote");
    expect(out).toContain("<li");
    expect(out).toContain('src="/media/pic.png"');
    expect(out).toContain("A caption");
  });

  it("renders known contract components (Callout, Embed)", () => {
    expect(out).toContain("border-[#d99a1c]");
    expect(out).toContain("Careful now!");
    expect(out).toContain("<iframe");
    expect(out).toContain('src="https://youtube.com/embed/xyz"');
  });

  it("renders an unknown component's children in a div (graceful fallback)", () => {
    expect(out).toContain("kept child");
  });
});

describe("renderMarkdown — Callout variants", () => {
  it("applies a distinct accent per type", () => {
    for (const [type, accent] of [
      ["info", "#2f6fed"],
      ["warning", "#d99a1c"],
      ["success", "border-green"],
      ["danger", "border-red"],
    ] as const) {
      const out = html(`<Callout type="${type}">\n\nbody\n\n</Callout>\n`);
      expect(out).toContain(accent);
    }
  });

  it("defaults unknown callout types to info styling", () => {
    const out = html('<Callout type="mystery">\n\nbody\n\n</Callout>\n');
    expect(out).toContain("#2f6fed");
  });
});

describe("renderMarkdown — contract triple (children model)", () => {
  it("renders ProsCons > Pros/Cons markdown lists as lists, not code blocks", () => {
    const doc = [
      "<ProsCons>",
      "  <Pros>",
      "    * Fast setup",
      "    * Great DX",
      "  </Pros>",
      "",
      "  <Cons>",
      "    * Steeper learning curve",
      "  </Cons>",
      "</ProsCons>",
      "",
    ].join("\n");
    const out = html(doc);
    expect(out).toContain("Pros");
    expect(out).toContain("Cons");
    expect(out).toContain("<li");
    expect(out).toContain("Fast setup");
    expect(out).toContain("Steeper learning curve");
    expect(out).not.toContain("Fast setup\n");
    expect(out).not.toContain("language-none");
  });

  it("renders Cta with a linked button from string props", () => {
    const out = html(
      '<Cta title="Have an idea?" buttonText="START DISCUSSION" buttonUrl="https://redduck.io/#getInTouch" />\n',
    );
    expect(out).toContain("Have an idea?");
    expect(out).toContain("START DISCUSSION");
    expect(out).toContain('href="https://redduck.io/#getInTouch"');
    expect(out).toContain('target="_blank"');
  });

  it("renders FeatureCards > FeatureCard with title from prop and body from children", () => {
    const doc = [
      "<FeatureCards>",
      '  <FeatureCard title="Fast">',
      "    Blazing fast rendering",
      "  </FeatureCard>",
      "",
      '  <FeatureCard title="Simple">',
      "    Easy to use",
      "  </FeatureCard>",
      "</FeatureCards>",
      "",
    ].join("\n");
    const out = html(doc);
    expect(out).toContain("Fast");
    expect(out).toContain("Blazing fast rendering");
    expect(out).toContain("Simple");
    expect(out).toContain("Easy to use");
  });
});

describe("renderMarkdown — fallback path", () => {
  it("still renders content when JSX is malformed", () => {
    const result = renderMarkdown("Intro text <Callout type=>oops\n\nMore text");
    expect(result.fallback).toBe(true);
    const out = renderToString(<div>{result.node}</div>);
    expect(out).toContain("More text");
  });
});

describe("renderMarkdown — URL scheme safety", () => {
  it("drops a javascript: link href but keeps the link text", () => {
    const out = html("[click me](javascript:alert)");
    expect(out).toContain("click me");
    expect(out).not.toContain("javascript:");
    expect(out).not.toMatch(/href="javascript/i);
  });

  it("keeps http(s), mailto, tel and relative/anchor link hrefs", () => {
    expect(html("[x](https://ok.com)")).toContain('href="https://ok.com"');
    expect(html("[x](/about)")).toContain('href="/about"');
    expect(html("[x](#section)")).toContain('href="#section"');
    expect(html("[x](mailto:a@b.com)")).toContain('href="mailto:a@b.com"');
    expect(html("[x](tel:+123)")).toContain('href="tel:+123"');
  });

  it("drops the Cta button when buttonUrl uses an unsafe scheme", () => {
    const out = html('<Cta title="Hi" buttonText="Go" buttonUrl="javascript:alert(1)" />\n');
    expect(out).toContain("Hi");
    expect(out).not.toContain("javascript:");
    expect(out).not.toContain("Go");
  });

  it("keeps the Cta button for a safe buttonUrl", () => {
    const out = html('<Cta title="Hi" buttonText="Go" buttonUrl="https://redduck.io" />\n');
    expect(out).toContain('href="https://redduck.io"');
    expect(out).toContain("Go");
  });

  it("sandboxes Embed iframes and blocks non-http(s) embeds", () => {
    const ok = html('<Embed url="https://youtube.com/embed/x" title="V" />\n');
    expect(ok).toContain("<iframe");
    expect(ok).toContain('sandbox="allow-scripts allow-same-origin allow-presentation"');

    const bad = html('<Embed url="javascript:alert(1)" title="V" />\n');
    expect(bad).not.toContain("<iframe");
    expect(bad).not.toContain("javascript:");
  });
});

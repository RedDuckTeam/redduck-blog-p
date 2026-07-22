import { describe, expect, it } from "vitest";
import { renderPostContent } from "@/lib/mdx/cache";

describe("renderPostContent", () => {
  it("returns the same rendered object for the same slug + updatedAt (cache hit)", () => {
    const updatedAt = new Date("2026-01-01T00:00:00Z");
    const first = renderPostContent({ slug: "hit", updatedAt, content: "# One" });
    const second = renderPostContent({ slug: "hit", updatedAt, content: "# Two" });
    expect(second).toBe(first);
  });

  it("recomputes when updatedAt changes (self-invalidation)", () => {
    const first = renderPostContent({
      slug: "rev",
      updatedAt: new Date("2026-01-01T00:00:00Z"),
      content: "# One",
    });
    const second = renderPostContent({
      slug: "rev",
      updatedAt: new Date("2026-02-02T00:00:00Z"),
      content: "# Two",
    });
    expect(second).not.toBe(first);
  });

  it("always returns a toc array and a node", () => {
    const result = renderPostContent({
      slug: "shape",
      updatedAt: new Date(),
      content: "## Heading\n\nbody",
    });
    expect(result.node).toBeDefined();
    expect(Array.isArray(result.toc)).toBe(true);
    expect(result.toc).toEqual([{ id: "heading", text: "Heading", depth: 2 }]);
  });

  it("evicts the least-recently-used entry beyond the cap of 50", () => {
    const updatedAt = new Date("2026-03-03T00:00:00Z");
    const first = renderPostContent({ slug: "lru-0", updatedAt, content: "x" });
    for (let i = 1; i <= 50; i++) {
      renderPostContent({ slug: `lru-${i}`, updatedAt, content: "x" });
    }
    const refetched = renderPostContent({ slug: "lru-0", updatedAt, content: "x" });
    expect(refetched).not.toBe(first);
  });
});

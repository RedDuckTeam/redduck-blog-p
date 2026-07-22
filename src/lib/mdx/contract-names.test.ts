import { describe, expect, it } from "vitest";
import { CONTRACT_COMPONENT_NAMES } from "@/lib/mdx/contract-names";
import { MDX_COMPONENT_NAMES } from "@/lib/mdx/render";

describe("MDX contract registry completeness", () => {
  it("implements a renderer for every contract component name (registry ⊇ fixture)", () => {
    const missing = CONTRACT_COMPONENT_NAMES.filter(
      (name) => !MDX_COMPONENT_NAMES.includes(name),
    );
    expect(missing).toEqual([]);
  });
});

import { describe, expect, it } from "vitest";

import { readingTimeMinutes } from "@/lib/reading-time";

const words = (count: number): string =>
  Array.from({ length: count }, () => "word").join(" ");

describe("readingTimeMinutes", () => {
  it("estimates ~200 words per minute (rounded)", () => {
    expect(readingTimeMinutes(words(200))).toBe(1);
    expect(readingTimeMinutes(words(400))).toBe(2);
    expect(readingTimeMinutes(words(500))).toBe(3);
  });

  it("never returns less than 1 minute", () => {
    expect(readingTimeMinutes("")).toBe(1);
    expect(readingTimeMinutes("one two three")).toBe(1);
  });

  it("counts words from the text projection, ignoring markdown syntax", () => {
    expect(readingTimeMinutes("## A heading\n\n**bold** text here")).toBe(1);
  });
});

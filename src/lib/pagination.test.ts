import { describe, expect, it } from "vitest";

import { applySentinel, cumulativeLimit } from "./pagination";

const seq = (n: number) => Array.from({ length: n }, (_, i) => i);

describe("cumulativeLimit", () => {
  it("pulls page*size + 1 (sentinel) rows from offset 0", () => {
    expect(cumulativeLimit(1, 15)).toBe(16);
    expect(cumulativeLimit(2, 15)).toBe(31);
    expect(cumulativeLimit(3, 15)).toBe(46);
  });

  it("defaults to PAGE_SIZE = 15", () => {
    expect(cumulativeLimit(1)).toBe(16);
  });
});

describe("applySentinel", () => {
  it("page 1: sentinel present → hasMore, surplus trimmed", () => {
    const { items, hasMore } = applySentinel(seq(16), 1, 15);
    expect(hasMore).toBe(true);
    expect(items).toHaveLength(15);
  });

  it("page 1: exactly full page → no next page", () => {
    const { items, hasMore } = applySentinel(seq(15), 1, 15);
    expect(hasMore).toBe(false);
    expect(items).toHaveLength(15);
  });

  it("page 1: under-full → no next page, all returned", () => {
    const { items, hasMore } = applySentinel(seq(10), 1, 15);
    expect(hasMore).toBe(false);
    expect(items).toHaveLength(10);
  });

  it("page 2: sentinel present → hasMore, trimmed to 30", () => {
    const { items, hasMore } = applySentinel(seq(31), 2, 15);
    expect(hasMore).toBe(true);
    expect(items).toHaveLength(30);
  });

  it("page 2: exactly 30 (exact multiple) → no next page", () => {
    const { items, hasMore } = applySentinel(seq(30), 2, 15);
    expect(hasMore).toBe(false);
    expect(items).toHaveLength(30);
  });

  it("preserves order and identity of trimmed items", () => {
    const { items } = applySentinel(seq(16), 1, 15);
    expect(items[0]).toBe(0);
    expect(items[14]).toBe(14);
  });
});

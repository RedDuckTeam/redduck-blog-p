import { describe, expect, it } from "vitest";

import type { PostWithTags } from "@/server/posts";
import { chunkPostsIntoRows } from "./post-rows";

function makePosts(count: number): PostWithTags[] {
  return Array.from(
    { length: count },
    (_, i) => ({ id: i + 1, tags: [] }) as unknown as PostWithTags,
  );
}

function shape(posts: PostWithTags[]): [string, number][] {
  return chunkPostsIntoRows(posts).map((row) => [row.variant, row.posts.length]);
}

describe("chunkPostsIntoRows", () => {
  it("returns no rows for an empty feed (N=0)", () => {
    expect(chunkPostsIntoRows(makePosts(0))).toEqual([]);
  });

  it("fills a single wide row (N=3)", () => {
    expect(shape(makePosts(3))).toEqual([["wide", 3]]);
  });

  it("starts a partial strip after the wide row (N=5)", () => {
    expect(shape(makePosts(5))).toEqual([
      ["wide", 3],
      ["strip", 2],
    ]);
  });

  it("fills wide then a full strip (N=7)", () => {
    expect(shape(makePosts(7))).toEqual([
      ["wide", 3],
      ["strip", 4],
    ]);
  });

  it("completes exactly one cycle (N=15 = PAGE_SIZE)", () => {
    expect(shape(makePosts(15))).toEqual([
      ["wide", 3],
      ["strip", 4],
      ["grid", 4],
      ["grid", 4],
    ]);
  });

  it("wraps into a new cycle after a full one (N=16)", () => {
    expect(shape(makePosts(16))).toEqual([
      ["wide", 3],
      ["strip", 4],
      ["grid", 4],
      ["grid", 4],
      ["wide", 1],
    ]);
  });

  it("produces two full cycles for an exact multiple (N=30)", () => {
    expect(shape(makePosts(30))).toEqual([
      ["wide", 3],
      ["strip", 4],
      ["grid", 4],
      ["grid", 4],
      ["wide", 3],
      ["strip", 4],
      ["grid", 4],
      ["grid", 4],
    ]);
  });

  it("preserves every post exactly once, in order", () => {
    const posts = makePosts(30);
    const flattened = chunkPostsIntoRows(posts).flatMap((row) => row.posts);
    expect(flattened).toEqual(posts);
  });
});

import { PAGE_SIZE } from "@/lib/site";

export function cumulativeLimit(
  page: number,
  pageSize: number = PAGE_SIZE,
): number {
  return page * pageSize + 1;
}

export function applySentinel<T>(
  rows: T[],
  page: number,
  pageSize: number = PAGE_SIZE,
): { items: T[]; hasMore: boolean } {
  const cap = page * pageSize;
  const hasMore = rows.length > cap;
  return { items: hasMore ? rows.slice(0, cap) : rows, hasMore };
}

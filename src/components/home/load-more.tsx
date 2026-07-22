import { Link } from "@tanstack/react-router";

export function LoadMore({
  page,
  hasMore,
}: {
  page: number;
  hasMore: boolean;
}) {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center px-4 pb-10 md:pb-[60px]">
      <Link
        to="/"
        search={(prev) => ({ ...prev, page: page + 1 })}
        resetScroll={false}
        className="border-concrete hover:bg-red border bg-black px-12 py-4 font-mono text-base text-white uppercase transition-colors hover:text-black md:text-lg"
      >
        Load more
      </Link>
    </div>
  );
}

export default LoadMore;

import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-5 py-20 text-center font-mono">
      <p className="text-6xl font-bold uppercase md:text-8xl">
        404<span className="blink-cursor text-red">_</span>
      </p>
      <p className="text-lg text-concrete md:text-xl">
        The page you are looking for could not be found.
      </p>
      <Link
        to="/"
        className="border border-concrete px-6 py-3 text-sm font-medium uppercase transition-colors hover:bg-black hover:text-white"
      >
        Back to blog
      </Link>
    </main>
  );
}

export default NotFound;

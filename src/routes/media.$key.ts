import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/media/$key")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { serveMedia } = await import("@/server/media");
        return serveMedia(params.key);
      },
    },
  },
});

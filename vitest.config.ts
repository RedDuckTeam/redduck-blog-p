import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Unit-only: no @cloudflare/vitest-pool-workers here — this repo keeps no drizzle migrations journal to read.
export default defineConfig({
  test: {
    passWithNoTests: true,
    projects: [
      {
        plugins: [viteReact()],
        resolve: { tsconfigPaths: true },
        test: {
          name: "unit",
          environment: "jsdom",
          include: ["src/**/*.test.{ts,tsx}"],
          setupFiles: ["./test/setup.unit.ts"],
        },
      },
    ],
  },
});

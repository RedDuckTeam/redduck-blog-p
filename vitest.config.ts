import {
  cloudflareTest,
  readD1Migrations,
} from "@cloudflare/vitest-pool-workers";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const migrations = await readD1Migrations("./migrations");

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
      {
        plugins: [
          cloudflareTest({
            miniflare: {
              compatibilityDate: "2026-07-10",
              compatibilityFlags: ["nodejs_compat"],
              d1Databases: ["DB_BLOG"],
              r2Buckets: ["BLOG_R2"],
              bindings: { TEST_MIGRATIONS: migrations },
            },
          }),
        ],
        resolve: { tsconfigPaths: true },
        test: {
          name: "integration",
          include: ["test/integration/**/*.test.ts"],
        },
      },
    ],
  },
});

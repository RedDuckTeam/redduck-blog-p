import { defineConfig } from "drizzle-kit";

// Do NOT run `drizzle-kit generate` / `wrangler d1 migrations apply` here — schema
// changes are applied as plain SQL in db/manual/ instead.
export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  out: "./migrations",
});

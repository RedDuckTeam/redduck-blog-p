import { desc, eq } from "drizzle-orm";

import { getDb } from "@/db/client";
import { posts } from "@/db/schema";
import { SITE_URL } from "@/lib/site";

interface SitemapUrl {
  loc: string;
  lastmod?: string;
}

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderUrl({ loc, lastmod }: SitemapUrl): string {
  const safeLoc = xmlEscape(loc);
  return lastmod
    ? `  <url><loc>${safeLoc}</loc><lastmod>${lastmod}</lastmod></url>`
    : `  <url><loc>${safeLoc}</loc></url>`;
}

export async function buildSitemap(): Promise<string> {
  const db = getDb();
  const rows = await db
    .select({ slug: posts.slug, updatedAt: posts.updatedAt })
    .from(posts)
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.updatedAt));

  const urls: SitemapUrl[] = [
    { loc: `${SITE_URL}/`, lastmod: rows[0]?.updatedAt.toISOString() },
    ...rows.map((row) => ({
      loc: `${SITE_URL}/${row.slug}`,
      lastmod: row.updatedAt.toISOString(),
    })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(renderUrl).join("\n")}
</urlset>
`;
}

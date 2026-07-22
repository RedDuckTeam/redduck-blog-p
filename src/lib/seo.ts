import { SITE_URL } from "@/lib/site";

export const canonical = (path: string) => ({
  rel: "canonical" as const,
  href: `${SITE_URL}${path}`,
});

export const seo = ({
  title,
  description,
  keywords,
  image,
  robots,
}: {
  title: string;
  description?: string;
  image?: string;
  keywords?: string;
  robots?: string;
}) => {
  const tags = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    ...(image
      ? [
          { name: "twitter:image", content: image },
          { name: "twitter:image:src", content: image },
          { name: "twitter:card", content: "summary_large_image" },
          { property: "og:image", content: image },
        ]
      : []),
    ...(robots ? [{ name: "robots", content: robots }] : []),
  ];

  return tags.filter((tag) => !("content" in tag) || tag.content !== undefined);
};

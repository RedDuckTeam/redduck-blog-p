import { LANDING_URL } from "@/lib/site";

function jsonLdHtml(data: unknown): { __html: string } {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

interface ArticleJsonLdProps {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  image?: string;
  url: string;
}

export function ArticleJsonLd({
  headline,
  description,
  datePublished,
  dateModified,
  authorName,
  image,
  url,
}: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    ...(image ? { image } : {}),
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "RedDuck",
      url: LANDING_URL,
      logo: {
        "@type": "ImageObject",
        url: `${LANDING_URL}/svg/header/logo.svg`,
      },
    },
    datePublished,
    dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={jsonLdHtml(data)}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={jsonLdHtml(data)}
    />
  );
}

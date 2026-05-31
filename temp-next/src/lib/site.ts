import type { Metadata } from "next";

const seoKeywords = [
  "beach handball lacanau",
  "lacanau beach handball 2025",
  "lacanau beach handball xperience",
  "handball lacanau",
  "tournoi beach handball lacanau",
];

export const siteConfig = {
  name: "Lacanau Ocehand",
  description:
    "Site officiel de Lacanau Ocehand, club de handball et beach handball à Lacanau.",
  url: "https://lacanau-ocehand.fr",
  keywords: seoKeywords,
  xperienceLabel: "Lacanau Beach Handball Xperience",
  xperienceUrl: "https://site-lbhx.vercel.app",
};

export function buildMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const canonical = `${siteConfig.url}${path}`;

  return {
    title: fullTitle,
    description,
    keywords: siteConfig.keywords,
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      url: canonical,
      siteName: siteConfig.name,
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

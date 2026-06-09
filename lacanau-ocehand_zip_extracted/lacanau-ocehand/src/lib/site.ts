import type { Metadata } from "next";

/* Mots-clés SEO — priorité au handball à Lacanau */
const seoKeywords = [
  "Lacanau handball",
  "handball Lacanau",
  "club de handball Lacanau",
  "Lacanau Océhand",
  "beach handball Lacanau",
  "handball Médoc",
  "s'inscrire handball Lacanau",
];

export const siteConfig = {
  name: "Lacanau Océhand",
  shortName: "Océhand",
  description:
    "Lacanau Océhand, le club de handball à Lacanau. Handball en salle et beach handball, du baby hand aux seniors. Vainqueur de la Coupe de France 2024.",
  url: "https://lacanau-ocehand.fr",
  keywords: seoKeywords,
  locality: "Lacanau",
  region: "Gironde",
  email: "contact@lacanau-ocehand.fr",
  instagram: "https://www.instagram.com/lacanauocehand/",
  facebook: "https://www.facebook.com/lacanau.OceHand/",
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
    title: { absolute: fullTitle },
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

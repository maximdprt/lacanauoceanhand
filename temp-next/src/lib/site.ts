import type { Metadata } from "next";

/* ============================================================
   MOTS-CLÉS SEO — référencement local + thématique sport
   ============================================================ */
export const seoKeywords = [
  // Local — ville
  "Lacanau handball",
  "handball Lacanau",
  "club de handball Lacanau",
  "Lacanau Océhand",
  "association sportive Lacanau",
  "sport collectif Lacanau",
  "club sportif Lacanau",
  // Local — département / région
  "handball Gironde",
  "handball Nouvelle-Aquitaine",
  "handball Médoc",
  "club handball Médoc",
  "handball Gironde loisirs",
  // Pratiques
  "beach handball Lacanau",
  "école de handball Lacanau",
  "baby handball Lacanau",
  "handball jeunes Lacanau",
  "handball loisirs Lacanau",
  "handball seniors Lacanau",
  // Inscriptions
  "s'inscrire handball Lacanau",
  "inscription handball Lacanau",
  "licence handball Lacanau",
  // Palmares
  "champions de France handball 2024",
  "coupe de france handball departementale",
];

/* ============================================================
   CONFIGURATION DU SITE
   ============================================================ */
export const siteConfig = {
  name: "Lacanau Océhand",
  shortName: "Océhand",
  description:
    "Club de handball à Lacanau, champion de France 2024. Du baby hand aux seniors, en salle et en beach handball. Rejoignez Lacanau Océhand en Gironde.",
  url: "https://lacanau-ocehand.fr",
  keywords: seoKeywords,
  locale: "fr_FR",
  locality: "Lacanau",
  postalCode: "33680",
  region: "Gironde",
  country: "FR",
  email: "contact@lacanau-ocehand.fr",
  phone: "",
  address: "Salle de la Cousteyre, Lacanau, Gironde",
  instagram: "https://www.instagram.com/lacanauocehand/",
  facebook: "https://www.facebook.com/lacanau.OceHand/",
  xperienceUrl: "https://site-lbhx.vercel.app",
  xperienceLabel: "Lacanau Beach Handball Xperience",
  // Image OG par défaut (photo champions de Bercy, 1200×630 idéal)
  ogImage: "/media/club/hero-coupe-bercy.jpg",
};

/* ============================================================
   HELPER buildMetadata
   Génère les métadonnées Next.js complètes pour chaque page :
   title, description, canonical, OG, Twitter, robots.
   ============================================================ */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  keywords,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  /** Chemin absolu vers l'image OG (/media/...). Par défaut : photo des champions. */
  image?: string;
  /** Mots-clés supplémentaires spécifiques à la page. */
  keywords?: string[];
  /** Passer à true pour noindex (pages orphelines, etc.). */
  noIndex?: boolean;
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const canonical = `${siteConfig.url}${path}`;
  const ogImage = `${siteConfig.url}${image ?? siteConfig.ogImage}`;
  const allKeywords = [...seoKeywords, ...(keywords ?? [])];

  return {
    title: { absolute: fullTitle },
    description,
    keywords: allKeywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} — ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      site: "@lacanauocehand",
      creator: "@lacanauocehand",
    },
  };
}

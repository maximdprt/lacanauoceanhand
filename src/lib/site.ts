import type { Metadata } from "next";

/* ============================================================
   CONFIGURATION DU SITE
   NB : pas de meta keywords — ignorée par Google depuis 2009,
   elle ne fait que révéler la stratégie SEO aux concurrents.
   ============================================================ */
export const siteConfig = {
  name: "Lacanau Océhand",
  shortName: "Océhand",
  description:
    "Club de handball à Lacanau, champion de France 2024. Du baby hand aux seniors, en salle et en beach handball. Rejoignez Lacanau Océhand en Gironde.",
  url: "https://lacanau-ocehand.fr",
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
  // Image OG par défaut : recadrage dédié 1200×630 (< 200 Ko),
  // généré depuis la photo des champions de Bercy.
  ogImage: "/media/og-image.jpg",
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
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  /** Chemin absolu vers l'image OG (/media/...). Par défaut : recadrage 1200×630. */
  image?: string;
  /** Passer à true pour noindex (pages orphelines, etc.). */
  noIndex?: boolean;
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const canonical = `${siteConfig.url}${path}`;
  const ogImage = `${siteConfig.url}${image ?? siteConfig.ogImage}`;

  return {
    title: { absolute: fullTitle },
    description,
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

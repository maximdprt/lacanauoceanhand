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
  // Domaine canonique : surchargeable via NEXT_PUBLIC_SITE_URL sur Vercel
  // (sans slash final). Sert aux canonical, sitemap, OG et JSON-LD.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://lacanauocehand.fr").replace(/\/+$/, ""),
  locale: "fr_FR",
  locality: "Lacanau",
  postalCode: "33680",
  region: "Gironde",
  country: "FR",
  email: "6033152@na.ffhandball.net",
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

/**
 * Rend une adresse absolue, qu'on lui donne un chemin interne (`/media/...`)
 * ou une adresse déjà complète — cas d'une photo importée depuis /admin, qui
 * vit dans le stockage de fichiers du site. Préfixer une adresse complète
 * fabriquerait une URL cassée dans les balises de partage et le JSON-LD.
 */
export const urlAbsolue = (chemin: string): string =>
  /^https?:\/\//i.test(chemin) ? chemin : `${siteConfig.url}${chemin}`;

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
  /** Image de partage : chemin interne (/media/...) ou adresse complète.
      Par défaut, le recadrage 1200×630 livré avec le site. */
  image?: string;
  /** Passer à true pour noindex (pages orphelines, etc.). */
  noIndex?: boolean;
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const canonical = `${siteConfig.url}${path}`;
  const ogImage = urlAbsolue(image ?? siteConfig.ogImage);

  /* Les dimensions ne sont déclarées que pour l'image livrée avec le site :
     c'est la seule dont on connaisse le format (1200×630). Annoncer ces
     valeurs pour une image choisie par le club la ferait recadrer de travers
     par les réseaux ; sans elles, ils lisent le fichier et s'adaptent. */
  const dimensionsConnues = (image ?? siteConfig.ogImage) === siteConfig.ogImage;

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
          ...(dimensionsConnues ? { width: 1200, height: 630 } : {}),
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

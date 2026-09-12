import type { Metadata } from "next";
import { Archivo } from "next/font/google";

import { MotionProvider } from "@/components/layout/motion-provider";
import { getSiteContent } from "@/lib/content";
import { siteConfig, urlAbsolue } from "@/lib/site";

import "./globals.css";

/* ============================================================
   POLICE UNIQUE DU SITE : Archivo (display + corps)
   Police variable : un seul fichier woff2 couvre les graisses
   400 à 900 (6 fichiers préchargés sinon → LCP dégradé).
   ============================================================ */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  preload: true,
});

/* ============================================================
   MÉTADONNÉES GLOBALES (racine)
   Chaque page surcharge title/description/canonical via
   buildMetadata (src/lib/site.ts).

   Une fonction, et non une constante : l'image de partage est choisie par le
   club dans /admin → Photos du site, et une constante de module serait figée
   à la compilation. Ces valeurs ne servent qu'aux routes sans métadonnées
   propres — le reste du site passe par `metadonneesPage`.
   ============================================================ */
export async function generateMetadata(): Promise<Metadata> {
  const { images } = await getSiteContent();
  const imagePartage = urlAbsolue(images.partage);

  return {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: "Lacanau Océhand · Club de handball à Lacanau",
    template: "%s | Lacanau Océhand",
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // Canonical racine (site 100 % francophone : pas de hreflang)
  alternates: {
    canonical: "/",
  },

  // Favicons / icons (Next.js App Router)
  icons: {
    icon: [
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: [{ url: "/icons/favicon.svg" }],
  },

  // PWA manifest
  manifest: "/site.webmanifest",

  // Open Graph global
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Lacanau Océhand · Club de handball à Lacanau",
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url,
    images: [
      {
        url: imagePartage,
        alt: "Lacanau Océhand · Champions de France 2024",
      },
    ],
  },

  // Twitter / X Cards
  twitter: {
    card: "summary_large_image",
    title: "Lacanau Océhand · Club de handball à Lacanau",
    description: siteConfig.description,
    images: [imagePartage],
    site: "@lacanauocehand",
    creator: "@lacanauocehand",
  },

  // Google Search Console — n'émettre la balise que si la valeur existe
  ...(process.env.NEXT_PUBLIC_GSC_VERIFY
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFY } }
    : {}),

  // App info
  applicationName: siteConfig.name,
  category: "sports",
  };
}

/* ============================================================
   LAYOUT RACINE
   Volontairement minimal : la balise <html>, la police et le fond.
   L'en-tête, le pied de page, la bannière cookies et les données
   structurées vivent dans (site)/layout.tsx, pour que l'espace
   d'administration — hors de ce groupe — n'en hérite pas.
   ============================================================ */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={archivo.variable}>
      <body className="min-h-screen bg-paper text-ink antialiased">
        {/* Lien d'évitement (WCAG 2.4.1) */}
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Aller au contenu
        </a>

        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

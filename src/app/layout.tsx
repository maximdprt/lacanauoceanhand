import type { Metadata } from "next";
import { Archivo } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageTransition } from "@/components/layout/page-transition";
import { MotionProvider } from "@/components/layout/motion-provider";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { AnalyticsScripts } from "@/components/layout/analytics-scripts";
import { JsonLd } from "@/components/common/json-ld";
import { facebookUrl, instagramUrl, beachXperienceUrl } from "@/data/site";
import { siteConfig } from "@/lib/site";

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
   ============================================================ */
export const metadata: Metadata = {
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
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: "Lacanau Océhand · Champions de France 2024",
      },
    ],
  },

  // Twitter / X Cards
  twitter: {
    card: "summary_large_image",
    title: "Lacanau Océhand · Club de handball à Lacanau",
    description: siteConfig.description,
    images: [`${siteConfig.url}${siteConfig.ogImage}`],
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

/* ============================================================
   DONNÉES STRUCTURÉES SCHEMA.ORG
   SportsClub (sous-type LocalBusiness le plus spécifique —
   requis par Google pour le traitement « local business »)
   + SportsOrganization pour la propriété sport.
   ============================================================ */
const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["SportsClub", "SportsOrganization"],
      "@id": `${siteConfig.url}/#organization`,
      name: "Lacanau Océhand",
      alternateName: ["Lacanau Océhand Handball", "Club de handball de Lacanau", "Océhand"],
      description: siteConfig.description,
      sport: ["Handball", "Beach Handball"],
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/brand/logo-color.png`,
        width: 400,
        height: 400,
      },
      image: `${siteConfig.url}${siteConfig.ogImage}`,
      foundingDate: "2017-06-04",
      email: siteConfig.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "19 Avenue Albert François",
        addressLocality: "Lacanau",
        postalCode: "33680",
        addressRegion: "Gironde",
        addressCountry: "FR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 45.0227,
        longitude: -1.0785,
      },
      areaServed: [
        { "@type": "City", name: "Lacanau" },
        { "@type": "AdministrativeArea", name: "Gironde" },
        { "@type": "AdministrativeArea", name: "Nouvelle-Aquitaine" },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Tuesday", "Thursday"],
          opens: "18:00",
          closes: "21:00",
          description: "Entraînements adultes",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "09:00",
          closes: "13:00",
          description: "École de handball et jeunes",
        },
      ],
      sameAs: [instagramUrl, facebookUrl, beachXperienceUrl],
      memberOf: {
        "@type": "SportsOrganization",
        name: "Fédération Française de Handball",
        url: "https://www.ff-handball.org",
      },
    },
    {
      // Sitelinks searchbox (SearchAction) retiré par Google fin 2024 :
      // le nœud WebSite ne sert plus qu'au « site name » dans les SERP.
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      alternateName: "Océhand",
      description: siteConfig.description,
      publisher: { "@id": `${siteConfig.url}/#organization` },
      inLanguage: "fr-FR",
    },
  ],
};

/* ============================================================
   ROOT LAYOUT
   ============================================================ */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={archivo.variable}>
      <head>
        {/* Données structurées globales */}
        <JsonLd data={schemaGraph} />
      </head>
      <body className="min-h-screen bg-paper text-ink antialiased">
        {/* Lien d'évitement (WCAG 2.4.1) */}
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Aller au contenu
        </a>

        <MotionProvider>
          <SiteHeader />
          <PageTransition>{children}</PageTransition>
          <SiteFooter />
          <CookieConsent />
        </MotionProvider>

        {/* Mesure d'audience — chargée uniquement après consentement (CNIL) */}
        <AnalyticsScripts />
      </body>
    </html>
  );
}

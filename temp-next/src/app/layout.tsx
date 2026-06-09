import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import Script from "next/script";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageTransition } from "@/components/layout/page-transition";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { facebookUrl, instagramUrl, beachXperienceUrl } from "@/data/site";
import { siteConfig, seoKeywords } from "@/lib/site";

import "./globals.css";

/* ============================================================
   POLICE UNIQUE DU SITE : Archivo (display + corps)
   ============================================================ */
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

/* ============================================================
   MÉTADONNÉES GLOBALES (racine)
   Chaque page peut surcharger title et description.
   ============================================================ */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: "Lacanau Océhand — Club de handball à Lacanau",
    template: "%s | Lacanau Océhand",
  },
  description: siteConfig.description,
  keywords: seoKeywords,
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

  // Canonical racine
  alternates: {
    canonical: "/",
    languages: { "fr-FR": "/" },
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
    title: "Lacanau Océhand — Club de handball à Lacanau",
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url,
    images: [
      {
        url: `${siteConfig.url}/media/club/hero-coupe-bercy.jpg`,
        width: 1200,
        height: 630,
        alt: "Lacanau Océhand — Champions de France 2024",
      },
    ],
  },

  // Twitter / X Cards
  twitter: {
    card: "summary_large_image",
    title: "Lacanau Océhand — Club de handball à Lacanau",
    description: siteConfig.description,
    images: [`${siteConfig.url}/media/club/hero-coupe-bercy.jpg`],
    site: "@lacanauocehand",
    creator: "@lacanauocehand",
  },

  // Google Search Console — remplacer par la valeur réelle
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFY ?? "",
  },

  // App info
  applicationName: siteConfig.name,
  category: "sports",
};

/* ============================================================
   DONNÉES STRUCTURÉES SCHEMA.ORG
   SportsOrganization + LocalBusiness fusionnés (@graph)
   ============================================================ */
const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["SportsOrganization", "LocalBusiness"],
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
      image: `${siteConfig.url}/media/club/hero-coupe-bercy.jpg`,
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
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { "@id": `${siteConfig.url}/#organization` },
      inLanguage: "fr-FR",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteConfig.url}/equipes?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

/* ============================================================
   ROOT LAYOUT
   ============================================================ */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // IDs analytics (env vars — à renseigner en production)
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="fr" className={archivo.variable}>
      <head>
        {/* Préconnexions pour les ressources critiques */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Données structurées globales */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />

        {/* Google Tag Manager — tête de page */}
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
      </head>
      <body className="min-h-screen bg-paper text-ink antialiased">
        {/* GTM noscript fallback */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        <SiteHeader />
        <PageTransition>{children}</PageTransition>
        <SiteFooter />
        <CookieConsent />

        {/* Google Analytics 4 — afterInteractive pour ne pas bloquer le LCP */}
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${gaMeasurementId}',{page_path:window.location.pathname});`}
            </Script>
          </>
        )}

        {/* Microsoft Clarity — lazyOnload pour performance maximale */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="clarity-init" strategy="lazyOnload">
            {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");`}
          </Script>
        )}
      </body>
    </html>
  );
}

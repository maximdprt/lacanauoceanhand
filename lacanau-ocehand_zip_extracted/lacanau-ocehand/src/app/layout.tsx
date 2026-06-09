import type { Metadata } from "next";
import { Archivo, Hanken_Grotesk } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageTransition } from "@/components/layout/page-transition";
import { facebookUrl, instagramUrl } from "@/data/site";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const displayFont = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const bodyFont = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Lacanau Océhand — Club de handball à Lacanau",
    template: "%s | Lacanau Océhand",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Lacanau Océhand — Club de handball à Lacanau",
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Lacanau Océhand — Club de handball à Lacanau",
    description: siteConfig.description,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: "Lacanau Océhand",
  alternateName: "Club de handball de Lacanau",
  sport: ["Handball", "Beach Handball"],
  url: siteConfig.url,
  logo: `${siteConfig.url}/placeholders/logo-main.png`,
  foundingDate: "2017-06-04",
  location: {
    "@type": "Place",
    name: "Salle de la Cousteyre",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lacanau",
      addressRegion: "Gironde",
      addressCountry: "FR",
    },
  },
  sameAs: [instagramUrl, facebookUrl],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen bg-paper text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <SiteHeader />
        <PageTransition>{children}</PageTransition>
        <SiteFooter />
      </body>
    </html>
  );
}

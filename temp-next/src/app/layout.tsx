import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageTransition } from "@/components/layout/page-transition";
import { facebookUrl, instagramUrl } from "@/data/site";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const displayFont = Bebas_Neue({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  weight: "400",
});

const bodyFont = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Lacanau Ocehand | Site Officiel",
    template: "%s | Lacanau Ocehand",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Lacanau Ocehand | Site Officiel",
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Lacanau Ocehand | Site Officiel",
    description: siteConfig.description,
  },
};

const sportsOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: "Lacanau Ocehand",
  sport: ["Handball", "Beach Handball"],
  url: siteConfig.url,
  logo: `${siteConfig.url}/placeholders/logo-main.png`,
  location: {
    "@type": "Place",
    name: "Lacanau",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lacanau",
      addressCountry: "FR",
    },
  },
  sameAs: [instagramUrl, facebookUrl],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsOrganizationSchema) }}
        />
        <SiteHeader />
        <PageTransition>
          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:py-14">{children}</main>
        </PageTransition>
        <SiteFooter />
      </body>
    </html>
  );
}

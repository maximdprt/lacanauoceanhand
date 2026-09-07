import { AnalyticsScripts } from "@/components/layout/analytics-scripts";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { PageTransition } from "@/components/layout/page-transition";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/common/json-ld";
import { getSiteContent } from "@/lib/content";
import { siteConfig } from "@/lib/site";

/* ============================================================
   COQUILLE DU SITE PUBLIC
   En-tête, pied de page, bandeau cookies et données structurées.
   L'espace d'administration vit hors de ce groupe de routes : il
   n'hérite donc ni de la navigation du club, ni des scripts de mesure.

   Les coordonnées et les liens viennent de `getSiteContent()` : le club
   peut les changer depuis /admin sans passer par le code.
   ============================================================ */

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { links } = await getSiteContent();

  /* ----------------------------------------------------------
     DONNÉES STRUCTURÉES SCHEMA.ORG
     SportsClub (sous-type LocalBusiness le plus spécifique —
     requis par Google pour le traitement « local business »)
     + SportsOrganization pour la propriété sport.
     ---------------------------------------------------------- */
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
        founder: { "@type": "Person", name: "Thierry Mayeur" },
        slogan: "Le club de handball à Lacanau, champion de France 2024",
        award: [
          "Champion de France de handball 2024 — Coupe de France départementale (finale 30-29 à l'Accor Arena de Bercy)",
          "Champion de France 2026 de beach handball",
        ],
        knowsAbout: [
          "Handball",
          "Beach handball",
          "École de handball",
          "École d'arbitrage",
        ],
        email: links.clubEmail,
        ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: links.clubEmail,
          availableLanguage: ["French"],
        },
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
        sameAs: [links.instagram, links.facebook, links.beachXperience],
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

  return (
    <>
      <JsonLd data={schemaGraph} />
      <SiteHeader beachXperienceUrl={links.beachXperience} />
      <PageTransition>{children}</PageTransition>
      <SiteFooter links={links} />
      <CookieConsent />

      {/* Mesure d'audience — chargée uniquement après consentement (CNIL) */}
      <AnalyticsScripts />
    </>
  );
}

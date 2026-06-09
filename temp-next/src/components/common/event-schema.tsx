import { siteConfig } from "@/lib/site";

interface EventSchemaItem {
  id: string;
  title: string;
  date: string;
  month: string;
  location: string;
  type: string;
}

/**
 * Émet un bloc JSON-LD Schema.org Event pour chaque événement du club.
 * À placer en server component sur les pages evenements / saison.
 */
export function EventSchema({ events }: { events: EventSchemaItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": events.map((ev) => ({
      "@type": "Event",
      name: ev.title,
      description: `${ev.type} — ${ev.title} à ${ev.location}. Lacanau Océhand, club de handball à Lacanau (Gironde).`,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      startDate: `2025-${monthToNumber(ev.month)}-01`,
      location: {
        "@type": "Place",
        name: ev.location,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lacanau",
          postalCode: "33680",
          addressRegion: "Gironde",
          addressCountry: "FR",
        },
      },
      organizer: {
        "@type": "SportsOrganization",
        "@id": `${siteConfig.url}/#organization`,
        name: "Lacanau Océhand",
        url: siteConfig.url,
      },
      url: `${siteConfig.url}/evenements`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function monthToNumber(month: string): string {
  const map: Record<string, string> = {
    "Jan.": "01", "Fév.": "02", "Mars": "03", "Avr.": "04",
    "Mai": "05", "Juin": "06", "Juil.": "07", "Août": "08",
    "Sept.": "09", "Oct.": "10", "Nov.": "11", "Déc.": "12",
  };
  return map[month] ?? "06";
}

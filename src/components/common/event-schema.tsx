import { JsonLd } from "@/components/common/json-ld";
import { siteConfig } from "@/lib/site";

interface EventSchemaItem {
  id: string;
  title: string;
  month: string;
  location: string;
  type: string;
}

/**
 * Émet un bloc JSON-LD Schema.org Event pour chaque événement du club.
 * À placer en server component sur les pages evenements / saison.
 */
export function EventSchema({ events }: { events: EventSchemaItem[] }) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const schema = {
    "@context": "https://schema.org",
    "@graph": events.map((ev) => {
      // Prochaine occurrence : si le mois est déjà passé cette année, viser l'an prochain.
      const month = monthToNumber(ev.month);
      const year = Number(month) < currentMonth ? currentYear + 1 : currentYear;
      return {
      "@type": "Event",
      name: ev.title,
      description: `${ev.type} · ${ev.title} à ${ev.location}. Lacanau Océhand, club de handball à Lacanau (Gironde).`,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      startDate: `${year}-${month}-01`,
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
      };
    }),
  };

  return <JsonLd data={schema} />;
}

function monthToNumber(month: string): string {
  const key = month.toLowerCase().replace(/\./g, "");
  const map: Record<string, string> = {
    jan: "01", janvier: "01",
    fev: "02", fév: "02", fevrier: "02", février: "02",
    mar: "03", mars: "03",
    avr: "04", avril: "04",
    mai: "05",
    jun: "06", juin: "06",
    jul: "07", juil: "07", juillet: "07",
    aou: "08", aoû: "08", aout: "08", août: "08",
    sep: "09", sept: "09", septembre: "09",
    oct: "10", octobre: "10",
    nov: "11", novembre: "11",
    dec: "12", déc: "12", decembre: "12", décembre: "12",
  };
  return map[key] ?? "06";
}

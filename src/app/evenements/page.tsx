import { buildMetadata } from "@/lib/site";
import { PageHero } from "@/components/sections/page-hero";
import { NewsGrid } from "@/components/sections/news-grid";
import { EventSchema } from "@/components/common/event-schema";
import { clubEvents, newsItems } from "@/data/site";

export const metadata = buildMetadata({
  title: "Actualités & Événements",
  description:
    "Toute l'actualité du club de handball de Lacanau : résultats, titres, tournois et moments forts de la saison à Lacanau Océhand en Gironde.",
  path: "/evenements",
});

export default function NewsPage() {
  return (
    <>
      <EventSchema events={clubEvents} />
      <PageHero
        eyebrow="Actualités"
        title="Les actualités du club"
        description="Résultats, titres et moments forts : suivez la vie du handball à Lacanau."
      />

      <section className="container-x py-16 md:py-24">
        <NewsGrid items={newsItems} />
      </section>
    </>
  );
}

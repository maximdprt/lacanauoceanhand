import { buildMetadata } from "@/lib/site";
import { PageHero } from "@/components/sections/page-hero";
import { NewsGrid } from "@/components/sections/news-grid";
import { newsItems } from "@/data/site";

export const metadata = buildMetadata({
  title: "Actualités",
  description:
    "Toute l'actualité du club de handball de Lacanau : résultats, titres, évènements et temps forts de la saison à Lacanau Océhand.",
  path: "/evenements",
});

export default function NewsPage() {
  return (
    <>
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

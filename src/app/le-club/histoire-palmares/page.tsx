import type { Metadata } from "next";

import { SectionTitle } from "@/components/common/section-title";
import { Timeline } from "@/components/sections/timeline";
import { timelineEvents } from "@/data/site";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Histoire & Palmarès",
  description:
    "De la création du club en 2017 aux finales nationales : timeline interactive de l'histoire et du palmarès de Lacanau Océhand, champion de France 2024.",
  path: "/le-club/histoire-palmares",
});

export default function HistoirePalmaresPage() {
  return (
    <div className="container-x space-y-10 py-16 md:space-y-12 md:py-24">
      <SectionTitle
        as="h1"
        eyebrow="Le Club"
        title="Histoire & Palmarès"
        description="Du premier ballon lancé en 2017 jusqu'aux finales nationales, revivez les grandes étapes qui ont façonné l'histoire et le palmarès de Lacanau Océhand."
      />
      <Timeline events={timelineEvents} />
    </div>
  );
}

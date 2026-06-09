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
  keywords: ["histoire handball Lacanau", "palmarès handball Lacanau", "fondation club handball Lacanau"],
});

export default function HistoirePalmaresPage() {
  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Le Club"
        title="Histoire et Palmares"
        description="Du lancement du handball lacanau jusqu'aux finales nationales."
      />
      <Timeline events={timelineEvents} />
    </div>
  );
}

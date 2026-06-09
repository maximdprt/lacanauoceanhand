import type { Metadata } from "next";

import { SectionTitle } from "@/components/common/section-title";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Les Salles",
  description:
    "Salles d'entraînement et terrains de match de Lacanau Océhand : Salle de la Cousteyre et Cosec à Lacanau (Gironde). Adresses et accès.",
  path: "/le-club/salles",
  keywords: ["salle handball Lacanau", "gymnase Lacanau handball", "Cousteyre Lacanau handball"],
});

export default function SallesPage() {
  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Le Club"
        title="Les Salles"
        description="Infrastructures indoor et zones sable, avec integration Google Maps."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-white/15">
          <iframe
            title="19 Av Albert Francois Lacanau"
            src="https://www.google.com/maps?q=19+Av+Albert+Francois,+33680+Lacanau&output=embed"
            className="h-[320px] w-full"
            loading="lazy"
          />
        </div>
        <div className="overflow-hidden rounded-xl border border-white/15">
          <iframe
            title="1 allee du college Lacanau"
            src="https://www.google.com/maps?q=1+allee+du+college,+33680+Lacanau&output=embed"
            className="h-[320px] w-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

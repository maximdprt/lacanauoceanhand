import type { Metadata } from "next";

import { SectionTitle } from "@/components/common/section-title";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Les Salles",
  description:
    "Salles d'entraînement et terrains de match de Lacanau Océhand : Salle de la Cousteyre et Cosec à Lacanau (Gironde). Adresses et accès.",
  path: "/le-club/salles",
});

export default function SallesPage() {
  return (
    <div className="container-x space-y-10 py-16 md:space-y-12 md:py-24">
      <SectionTitle
        as="h1"
        eyebrow="Le Club"
        title="Les Salles"
        description="Salles couvertes et terrains de sable à Lacanau : retrouvez nos lieux d'entraînement et de match, avec leurs adresses et itinéraires d'accès."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-line">
          <iframe
            title="19 Av Albert Francois Lacanau"
            src="https://www.google.com/maps?q=19+Av+Albert+Francois,+33680+Lacanau&output=embed"
            className="h-[320px] w-full"
            loading="lazy"
          />
        </div>
        <div className="overflow-hidden rounded-xl border border-line">
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

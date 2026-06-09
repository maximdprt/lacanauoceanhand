import type { Metadata } from "next";

import { SectionTitle } from "@/components/common/section-title";
import { StaffGrid } from "@/components/sections/staff-grid";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Le Staff",
  description:
    "Encadrement sportif, médical et direction de Lacanau Océhand. Découvrez les bénévoles, entraîneurs et dirigeants du club de handball de Lacanau.",
  path: "/le-club/staff",
  keywords: ["staff handball Lacanau", "entraîneurs handball Lacanau", "bénévoles handball Gironde"],
});

export default function StaffPage() {
  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Le Club"
        title="Le Staff"
        description="Grille filtrable des profils qui pilotent le projet sportif du club."
      />
      <StaffGrid />
    </div>
  );
}

import type { Metadata } from "next";

import { SectionTitle } from "@/components/common/section-title";
import { StaffGrid } from "@/components/sections/staff-grid";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Le Staff",
  description:
    "Encadrement sportif, médical et direction de Lacanau Océhand. Découvrez les bénévoles, entraîneurs et dirigeants du club de handball de Lacanau.",
  path: "/le-club/staff",
});

export default function StaffPage() {
  return (
    <div className="container-x space-y-10 py-16 md:space-y-12 md:py-24">
      <SectionTitle
        as="h1"
        eyebrow="Le Club"
        title="Le Staff"
        description="Entraîneurs, dirigeants et bénévoles : rencontrez les femmes et les hommes qui font vivre le club et portent son projet sportif au quotidien."
      />
      <StaffGrid />
    </div>
  );
}

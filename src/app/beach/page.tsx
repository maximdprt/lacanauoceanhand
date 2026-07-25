import type { Metadata } from "next";

import { buildMetadata } from "@/lib/site";
import { PageHero } from "@/components/sections/page-hero";
import { BeachSection } from "@/components/sections/beach-section";

export const metadata: Metadata = buildMetadata({
  title: "Beach handball",
  description:
    "Le beach handball à Lacanau et le tournoi Lacanau Beach Handball Xperience : le hand sur le sable du Pôle de l'Ardilouse, à deux pas de l'océan Atlantique.",
  path: "/beach",
});

export default function BeachPage() {
  return (
    <>
      <PageHero
        image="/media/beach/amsterdam.jpg"
        eyebrow="Beach"
        title="Le beach handball à Lacanau"
        description="Le hand sur le sable, à deux pas de l'océan. Et chaque été, le rendez-vous du club : le Lacanau Beach Handball Xperience."
      />
      <BeachSection />
    </>
  );
}

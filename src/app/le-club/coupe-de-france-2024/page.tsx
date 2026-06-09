import type { Metadata } from "next";

import { SectionTitle } from "@/components/common/section-title";
import { GalleryLightbox } from "@/components/sections/gallery-lightbox";
import { galleryItems } from "@/data/site";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Coupe de France 2024",
  description:
    "L'épopée de Lacanau Océhand à Bercy : retour sur la campagne historique qui a couronné le club champion de France 2024. Photos et galerie.",
  path: "/le-club/coupe-de-france-2024",
  keywords: ["coupe de france handball 2024", "champion de france handball Lacanau", "Bercy handball 2024"],
});

export default function CoupePage() {
  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Le Club"
        title="Coupe de France 2024"
        description="Recit du parcours vers Bercy, des quarts a la finale historique."
      />
      <div className="rounded-xl border border-white/15 bg-card/50 p-6 text-white/75">
        Lacanau Ocehand a ecrit son histoire avec une campagne intense, rythmee par des
        retours spectaculaires et une finale maitrisée. Cette page est prete a recevoir les
        contenus editoriaux et medias definitifs.
      </div>
      <GalleryLightbox items={galleryItems} />
    </div>
  );
}

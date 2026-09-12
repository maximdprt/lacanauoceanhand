import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, TriangleAlert } from "lucide-react";

import { SectionEditor } from "@/components/admin/section-editor";
import { clesDeSection, sectionParSlug } from "@/lib/admin-sections";
import { getSiteContentFrais } from "@/lib/content";
import { storageStatus } from "@/lib/content-store";

/* Rendu à chaque visite, jamais pré-généré au build.
   L'état du stockage et le contenu enregistré changent entre deux
   déploiements : une page figée au build afficherait « enregistrement
   indisponible » alors que tout fonctionne, ou l'inverse. L'espace admin
   est derrière un code et ne concerne que quelques personnes — il n'a
   rien à gagner à être statique, et tout à perdre en justesse. */
export const dynamic = "force-dynamic";

/* ============================================================
   ÉCRAN D'UNE RUBRIQUE
   Une seule page pour les onze rubriques : le plan décrit dans
   `admin-sections.ts` fournit le titre, l'aide et les champs.
   ============================================================ */

type Params = { section: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { section: slug } = await params;
  const section = sectionParSlug(slug);
  return {
    title: { absolute: `${section?.label ?? "Rubrique"} · Administration` },
    robots: { index: false, follow: false },
  };
}

export default async function RubriquePage({ params }: { params: Promise<Params> }) {
  const { section: slug } = await params;
  const section = sectionParSlug(slug);
  if (!section) notFound();

  const contenu = await getSiteContentFrais();
  const stockage = storageStatus();

  // Seules les clés de la rubrique traversent : l'écran ne charge pas
  // l'ensemble du contenu du site dans le navigateur.
  const valeursInitiales = Object.fromEntries(
    clesDeSection(section).map((cle) => [cle, contenu[cle]]),
  );

  return (
    <div>
      <Link
        href="/admin"
        className="-my-1 inline-flex items-center gap-2 py-1 text-sm font-semibold text-ink-soft transition hover:text-ocean"
      >
        <ArrowLeft size={15} aria-hidden="true" />
        Vue d&apos;ensemble
      </Link>

      <header className="mt-5">
        <h1 className="headline text-[clamp(1.7rem,4.5vw,2.3rem)] text-ink">
          {section.label}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
          {section.summary}
        </p>

        {/* Où ces informations apparaissent réellement sur le site */}
        <ul className="mt-5 flex flex-wrap items-center gap-2">
          <li className="text-sm text-ink-soft">Visible sur&nbsp;:</li>
          {section.preview.map((page) => (
            <li key={page.href}>
              <a
                href={page.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-semibold text-ink transition hover:border-ocean hover:text-ocean"
              >
                {page.label}
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </header>

      {!stockage.writable && (
        <p className="mt-7 flex items-start gap-3 rounded-(--radius) border border-gold/40 bg-gold-tint px-5 py-4 text-base leading-relaxed text-ink">
          <TriangleAlert size={19} className="mt-0.5 shrink-0 text-gold-ink" aria-hidden="true" />
          <span>
            <strong className="font-semibold">Enregistrement indisponible.</strong>{" "}
            {stockage.hint}
          </span>
        </p>
      )}

      <div className="mt-8">
        <SectionEditor
          slug={section.slug}
          valeursInitiales={valeursInitiales}
          enregistrementPossible={stockage.writable}
        />
      </div>
    </div>
  );
}

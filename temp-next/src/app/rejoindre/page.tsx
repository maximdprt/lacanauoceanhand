import type { Metadata } from "next";
import Link from "next/link";
import { UserPlus, Building2, Handshake } from "lucide-react";

import { Reveal } from "@/components/common/reveal";
import { SectionTitle } from "@/components/common/section-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { buildMetadata } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Rejoindre le club",
  description:
    "Inscription licenciés, bénévolat et partenariats pour rejoindre Lacanau Ocehand.",
  path: "/rejoindre",
});

const categorySelectClassName = cn(
  "h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 transition",
  "focus:border-ocean/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocean/20",
);

const checkboxClassName =
  "mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-ocean focus:ring-ocean/30";

export default function RejoindrePage() {
  return (
    <div className="space-y-14">
      <SectionTitle
        eyebrow="Engagement"
        title="Rejoindre le club"
        description="Que vous souhaitiez jouer, contribuer en coulisses ou soutenir le club, trois formulaires sont disponibles ci-dessous."
      />

      <Reveal>
        <p className="text-center text-sm text-slate-600">
          <Link
            href="/documents/guide-licencie.pdf"
            className="font-medium text-ocean underline-offset-4 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Télécharger le guide du licencié (PDF)
          </Link>
        </p>

        <div className="mt-8 grid gap-6 xl:grid-cols-3">
          {/* Licencié / joueur */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-6 py-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ocean/10 text-ocean">
                <UserPlus size={16} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Inscription</p>
                <h2 className="font-display text-xl uppercase tracking-wide text-slate-900">Formulaire joueur</h2>
              </div>
            </div>
            <div className="space-y-4 p-6">
              <p className="rounded-xl border border-ocean/15 bg-ocean/5 px-3 py-2 text-xs leading-relaxed text-slate-700">
                Les licenciés de la saison précédente recevront directement un e-mail de la fédération.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder="Nom" aria-label="Nom" name="joueur-nom" autoComplete="family-name" />
                <Input placeholder="Prénom" aria-label="Prénom" name="joueur-prenom" autoComplete="given-name" />
              </div>
              <Input placeholder="E-mail" type="email" aria-label="E-mail" name="joueur-email" autoComplete="email" />
              <Input placeholder="Téléphone" type="tel" aria-label="Téléphone" name="joueur-tel" autoComplete="tel" />
              <div>
                <label htmlFor="joueur-naissance" className="mb-1.5 block text-xs font-medium text-slate-600">
                  Date de naissance
                </label>
                <Input
                  id="joueur-naissance"
                  type="date"
                  aria-label="Date de naissance"
                  name="joueur-naissance"
                />
              </div>
              <div>
                <label htmlFor="joueur-categorie" className="mb-1.5 block text-xs font-medium text-slate-600">
                  Catégorie souhaitée
                </label>
                <select
                  id="joueur-categorie"
                  name="joueur-categorie"
                  className={categorySelectClassName}
                  aria-label="Catégorie souhaitée"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choisir une catégorie
                  </option>
                  <option value="u9">U9</option>
                  <option value="u11">U11</option>
                  <option value="u13">U13</option>
                  <option value="u15">U15</option>
                  <option value="u18">U18</option>
                  <option value="senior">Senior</option>
                  <option value="loisirs">Loisirs</option>
                </select>
              </div>
              <Textarea
                placeholder="Informations complémentaires (expérience, disponibilités…)"
                aria-label="Informations complémentaires"
                className="min-h-[100px]"
                name="joueur-infos"
              />
              <Button className="w-full">Envoyer la demande</Button>
            </div>
          </div>

          {/* Bénévole */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-6 py-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ocean/10 text-ocean">
                <Handshake size={16} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Bénévolat</p>
                <h2 className="font-display text-xl uppercase tracking-wide text-slate-900">Formulaire bénévole</h2>
              </div>
            </div>
            <div className="space-y-4 p-6">
              <Input placeholder="Nom et prénom" aria-label="Nom et prénom" name="benevole-nom" />
              <Input placeholder="E-mail" type="email" aria-label="E-mail" name="benevole-email" autoComplete="email" />
              <Input placeholder="Téléphone" type="tel" aria-label="Téléphone" name="benevole-tel" autoComplete="tel" />
              <fieldset className="space-y-3 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                <legend className="text-xs font-semibold text-slate-700">Domaines d&apos;intérêt</legend>
                <label className="flex items-start gap-2 text-sm text-slate-700">
                  <input type="checkbox" name="benevole-table-marque" className={checkboxClassName} />
                  Table de marque
                </label>
                <label className="flex items-start gap-2 text-sm text-slate-700">
                  <input type="checkbox" name="benevole-restauration" className={checkboxClassName} />
                  Restauration
                </label>
                <label className="flex items-start gap-2 text-sm text-slate-700">
                  <input type="checkbox" name="benevole-communication" className={checkboxClassName} />
                  Communication
                </label>
                <label className="flex items-start gap-2 text-sm text-slate-700">
                  <input type="checkbox" name="benevole-pas-preference" className={checkboxClassName} />
                  Pas de préférence
                </label>
              </fieldset>
              <Textarea
                placeholder="Message ou disponibilités…"
                aria-label="Message bénévole"
                className="min-h-[80px]"
                name="benevole-message"
              />
              <Button variant="secondary" className="w-full">
                Proposer son aide
              </Button>
            </div>
          </div>

          {/* Partenaire */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-6 py-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ocean/10 text-ocean">
                <Building2 size={16} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Partenariat</p>
                <h2 className="font-display text-xl uppercase tracking-wide text-slate-900">Formulaire partenaires</h2>
              </div>
            </div>
            <div className="space-y-4 p-6">
              <Input placeholder="Nom de l&apos;entreprise" aria-label="Entreprise" name="partenaire-societe" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder="Nom du contact" aria-label="Nom du contact" name="partenaire-contact" />
                <Input placeholder="Téléphone" type="tel" aria-label="Téléphone partenaire" name="partenaire-tel" />
              </div>
              <Input
                placeholder="E-mail professionnel"
                type="email"
                aria-label="E-mail professionnel"
                name="partenaire-email"
              />
              <Textarea
                placeholder="Décrivez votre projet de partenariat…"
                aria-label="Objectif du partenariat"
                className="min-h-[100px]"
                name="partenaire-message"
              />
              <Button variant="secondary" className="w-full">
                Proposer un partenariat
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

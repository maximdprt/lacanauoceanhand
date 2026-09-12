"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import {
  Check,
  ChevronDown,
  ChevronsDownUp,
  ChevronsUpDown,
  CircleAlert,
  LoaderCircle,
  Plus,
  RotateCcw,
  Save,
  Trash2,
} from "lucide-react";

import { enregistrerRubrique, reinitialiserRubrique } from "@/app/admin/actions";
import { FieldInput } from "@/components/admin/fields";
import { sectionParSlug, type Bloc, type EtatPastille, type Section } from "@/lib/admin-sections";
import { cn } from "@/lib/utils";

/* ============================================================
   L'ÉDITEUR D'UNE RUBRIQUE
   Un seul composant pour les onze écrans : il lit le plan décrit dans
   `admin-sections.ts` et construit le formulaire correspondant.

   Le plan n'est pas transmis en props — il contient des fonctions, que
   React ne sait pas envoyer du serveur au navigateur. Le composant le
   retrouve lui-même à partir du seul identifiant de la rubrique.
   ============================================================ */

type Valeurs = Record<string, unknown>;

/** Une ligne de liste et son identité, stable même si tous ses champs changent. */
type Ligne = { cle: number; donnees: Record<string, unknown> };

let compteurCles = 0;
const nouvelleCle = () => (compteurCles += 1);

const enLignes = (valeur: unknown, toForm?: (i: Record<string, unknown>) => Record<string, unknown>): Ligne[] =>
  (Array.isArray(valeur) ? valeur : []).map((donnees) => ({
    cle: nouvelleCle(),
    donnees: toForm ? toForm(donnees as Record<string, unknown>) : { ...(donnees as object) },
  }));

/**
 * Repasse de l'état du formulaire aux données envoyées au serveur : les clés
 * internes des lignes disparaissent. C'est aussi ce qui sert à savoir s'il
 * reste des modifications en attente — comparer l'état brut marquerait comme
 * « modifiée » une rubrique simplement rouverte, à cause de ces clés.
 */
function versDonnees(valeurs: Valeurs, section: Section): Valeurs {
  const sortie: Valeurs = {};
  for (const bloc of section.blocks) {
    if (bloc.kind === "list") {
      sortie[bloc.key] = ((valeurs[bloc.key] as Ligne[]) ?? []).map((l) => l.donnees);
    } else if (bloc.kind === "strings") {
      sortie[bloc.key] = ((valeurs[bloc.key] as Ligne[]) ?? []).map((l) =>
        String(l.donnees.valeur ?? ""),
      );
    } else {
      sortie[bloc.key] = valeurs[bloc.key];
    }
  }
  return sortie;
}

/* ============================================================ */

export function SectionEditor({
  slug,
  valeursInitiales,
  enregistrementPossible,
}: {
  slug: string;
  valeursInitiales: Valeurs;
  enregistrementPossible: boolean;
}) {
  const section = sectionParSlug(slug);

  /* --- État du formulaire ------------------------------------
     Les listes sont stockées avec une clé interne, pour que React
     ne mélange pas deux lignes quand on en supprime une au milieu. */
  const construireEtat = useCallback((): Valeurs => {
    const etat: Valeurs = {};
    for (const bloc of section?.blocks ?? []) {
      const valeur = valeursInitiales[bloc.key];
      if (bloc.kind === "list") {
        etat[bloc.key] = enLignes(valeur, bloc.toForm);
      } else if (bloc.kind === "strings") {
        etat[bloc.key] = (Array.isArray(valeur) ? (valeur as string[]) : []).map((texte) => ({
          cle: nouvelleCle(),
          donnees: { valeur: texte },
        }));
      } else if (bloc.kind === "record") {
        etat[bloc.key] = { ...((valeur as object) ?? {}) };
      } else {
        etat[bloc.key] = typeof valeur === "string" ? valeur : "";
      }
    }
    return etat;
  }, [section, valeursInitiales]);

  const [valeurs, setValeurs] = useState<Valeurs>(construireEtat);
  const [reference, setReference] = useState(() =>
    section ? JSON.stringify(versDonnees(construireEtat(), section)) : "",
  );
  const [depliees, setDepliees] = useState<Set<number>>(new Set());
  const [retour, setRetour] = useState<{ type: "ok" | "erreur"; message: string } | null>(null);
  const [confirmationRaz, setConfirmationRaz] = useState(false);
  const [enCours, demarrer] = useTransition();

  const donnees = useMemo(
    () => (section ? versDonnees(valeurs, section) : {}),
    [valeurs, section],
  );
  const modifie = useMemo(() => JSON.stringify(donnees) !== reference, [donnees, reference]);

  /* Le club ferme parfois l'onglet en pensant avoir enregistré : le
     navigateur demande confirmation tant que des saisies sont en attente. */
  useEffect(() => {
    if (!modifie) return;
    const prevenir = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", prevenir);
    return () => window.removeEventListener("beforeunload", prevenir);
  }, [modifie]);

  if (!section) return null;

  /* --- Manipulation des listes ------------------------------- */
  const lignesDe = (cle: string): Ligne[] => (valeurs[cle] as Ligne[]) ?? [];

  const majLignes = (cle: string, suite: (lignes: Ligne[]) => Ligne[]) => {
    setRetour(null);
    setValeurs((v) => ({ ...v, [cle]: suite((v[cle] as Ligne[]) ?? []) }));
  };

  const ajouter = (cle: string, gabarit: Record<string, unknown>) => {
    const ligne: Ligne = { cle: nouvelleCle(), donnees: structuredClone(gabarit) };
    majLignes(cle, (lignes) => [...lignes, ligne]);
    // Une ligne vide se remplit tout de suite : autant l'ouvrir.
    setDepliees((d) => new Set(d).add(ligne.cle));
  };

  const supprimer = (cle: string, cleLigne: number) =>
    majLignes(cle, (lignes) => lignes.filter((l) => l.cle !== cleLigne));

  const deplacer = (cle: string, index: number, sens: -1 | 1) =>
    majLignes(cle, (lignes) => {
      const cible = index + sens;
      if (cible < 0 || cible >= lignes.length) return lignes;
      const copie = [...lignes];
      [copie[index], copie[cible]] = [copie[cible], copie[index]];
      return copie;
    });

  const majChamp = (cle: string, cleLigne: number, champ: string, valeur: unknown) =>
    majLignes(cle, (lignes) =>
      lignes.map((l) =>
        l.cle === cleLigne ? { ...l, donnees: { ...l.donnees, [champ]: valeur } } : l,
      ),
    );

  const basculer = (cleLigne: number) =>
    setDepliees((d) => {
      const suite = new Set(d);
      if (suite.has(cleLigne)) suite.delete(cleLigne);
      else suite.add(cleLigne);
      return suite;
    });

  const toutBasculer = (cle: string) => {
    const lignes = lignesDe(cle);
    const toutOuvert = lignes.every((l) => depliees.has(l.cle));
    setDepliees((d) => {
      const suite = new Set(d);
      for (const l of lignes) {
        if (toutOuvert) suite.delete(l.cle);
        else suite.add(l.cle);
      }
      return suite;
    });
  };

  /* --- Enregistrement ---------------------------------------- */
  const enregistrer = () => {
    setRetour(null);
    demarrer(async () => {
      const resultat = await enregistrerRubrique(slug, donnees);
      if (resultat.statut === "ok") {
        setReference(JSON.stringify(donnees));
        setRetour({ type: "ok", message: "Modifications enregistrées. Le site se met à jour." });
      } else {
        setRetour({ type: "erreur", message: resultat.message ?? "L'enregistrement a échoué." });
      }
    });
  };

  const reinitialiser = () => {
    setRetour(null);
    setConfirmationRaz(false);
    demarrer(async () => {
      const resultat = await reinitialiserRubrique(slug);
      if (resultat.statut === "ok") {
        // Le formulaire tient encore les anciennes valeurs en mémoire :
        // le plus simple et le plus lisible est de recharger l'écran.
        window.location.reload();
      } else {
        setRetour({ type: "erreur", message: resultat.message ?? "La réinitialisation a échoué." });
      }
    });
  };

  /* --- Rendu d'un bloc --------------------------------------- */
  const rendreBloc = (bloc: Bloc) => {
    switch (bloc.kind) {
      case "single":
        return (
          <div className="grid grid-cols-12 gap-x-4 gap-y-5">
            <FieldInput
              field={bloc.field}
              value={valeurs[bloc.key]}
              onChange={(v) => {
                setRetour(null);
                setValeurs((etat) => ({ ...etat, [bloc.key]: v }));
              }}
            />
          </div>
        );

      case "record": {
        const objet = (valeurs[bloc.key] as Record<string, unknown>) ?? {};
        return (
          <div className="grid grid-cols-12 gap-x-4 gap-y-5">
            {bloc.fields.map((champ) => (
              <FieldInput
                key={champ.key}
                field={champ}
                value={objet[champ.key]}
                onChange={(v) => {
                  setRetour(null);
                  setValeurs((etat) => ({
                    ...etat,
                    [bloc.key]: { ...((etat[bloc.key] as object) ?? {}), [champ.key]: v },
                  }));
                }}
              />
            ))}
          </div>
        );
      }

      case "strings": {
        const lignes = lignesDe(bloc.key);
        return (
          <div>
            <ul className="space-y-2.5">
              {lignes.map((ligne, index) => (
                <li key={ligne.cle} className="flex items-start gap-2">
                  <span className="section-index mt-2.5 w-5 shrink-0 text-right text-sm text-ink-soft tabular-nums">
                    {index + 1}
                  </span>
                  <textarea
                    value={String(ligne.donnees.valeur ?? "")}
                    rows={1}
                    placeholder={bloc.placeholder}
                    onChange={(e) => majChamp(bloc.key, ligne.cle, "valeur", e.target.value)}
                    aria-label={`${bloc.itemLabel} ${index + 1}`}
                    className="min-h-11 w-full resize-y rounded-(--radius-sm) border border-line bg-white px-3.5 py-2.5 text-base leading-relaxed text-ink placeholder:text-ink-soft/70 transition focus:border-ocean focus:outline-none focus:ring-2 focus:ring-ocean/15"
                  />
                  <BoutonsLigne
                    index={index}
                    total={lignes.length}
                    onMonter={() => deplacer(bloc.key, index, -1)}
                    onDescendre={() => deplacer(bloc.key, index, 1)}
                    onSupprimer={() => supprimer(bloc.key, ligne.cle)}
                    label={bloc.itemLabel}
                    feminin={bloc.itemFeminin}
                  />
                </li>
              ))}
            </ul>
            <BoutonAjouter
              label={bloc.itemLabel}
              feminin={bloc.itemFeminin}
              onClick={() => ajouter(bloc.key, { valeur: "" })}
            />
          </div>
        );
      }

      case "list": {
        const lignes = lignesDe(bloc.key);
        const toutOuvert = lignes.length > 0 && lignes.every((l) => depliees.has(l.cle));

        return (
          <div>
            {lignes.length > 1 && (
              <button
                type="button"
                onClick={() => toutBasculer(bloc.key)}
                className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean transition hover:text-ocean-deep"
              >
                {toutOuvert ? (
                  <ChevronsDownUp size={15} aria-hidden="true" />
                ) : (
                  <ChevronsUpDown size={15} aria-hidden="true" />
                )}
                {toutOuvert ? "Tout replier" : "Tout déplier"}
              </button>
            )}

            <ul className="space-y-2.5">
              {lignes.map((ligne, index) => {
                const ouvert = depliees.has(ligne.cle);
                const resume = bloc.titleKeys
                  .map((cle) => ligne.donnees[cle])
                  .filter((v) => v !== undefined && v !== null && v !== "")
                  .join(" · ");
                const etat = bloc.itemStatus?.(
                  lignes.map((l) => l.donnees),
                  index,
                );

                return (
                  <li
                    key={ligne.cle}
                    className={cn(
                      "overflow-hidden rounded-(--radius-sm) border bg-white transition",
                      ouvert ? "border-ocean/40 shadow-(--shadow-sm)" : "border-line",
                    )}
                  >
                    <div className="flex items-center gap-1 pr-1.5">
                      <button
                        type="button"
                        onClick={() => basculer(ligne.cle)}
                        aria-expanded={ouvert}
                        className="flex min-w-0 flex-1 items-center gap-3 px-3.5 py-3 text-left"
                      >
                        <ChevronDown
                          size={16}
                          aria-hidden="true"
                          className={cn(
                            "shrink-0 text-ink-soft transition-transform",
                            ouvert && "rotate-180",
                          )}
                        />
                        <span className="section-index w-5 shrink-0 text-sm text-ink-soft tabular-nums">
                          {index + 1}
                        </span>
                        <span
                          className={cn(
                            "truncate text-[0.95rem] font-semibold",
                            resume ? "text-ink" : "text-ink-soft italic",
                          )}
                        >
                          {resume || `${bloc.itemLabel} sans titre`}
                        </span>
                        {etat && <Pastille label={etat.label} tone={etat.tone} />}
                      </button>
                      <BoutonsLigne
                        index={index}
                        total={lignes.length}
                        onMonter={() => deplacer(bloc.key, index, -1)}
                        onDescendre={() => deplacer(bloc.key, index, 1)}
                        onSupprimer={() => supprimer(bloc.key, ligne.cle)}
                        label={bloc.itemLabel}
                        feminin={bloc.itemFeminin}
                      />
                    </div>

                    {ouvert && (
                      <div className="grid grid-cols-12 gap-x-4 gap-y-4 border-t border-line bg-mist/50 p-4">
                        {bloc.fields.map((champ) => (
                          <FieldInput
                            key={champ.key}
                            field={champ}
                            value={ligne.donnees[champ.key]}
                            onChange={(v) => majChamp(bloc.key, ligne.cle, champ.key, v)}
                            compact
                          />
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <BoutonAjouter
              label={bloc.itemLabel}
              feminin={bloc.itemFeminin}
              onClick={() => ajouter(bloc.key, bloc.blank)}
            />
          </div>
        );
      }
    }
  };

  return (
    <div className="pb-28">
      <div className="space-y-8">
        {section.blocks.map((bloc) => (
          <section
            key={String(bloc.key) + bloc.title}
            className="rounded-(--radius) border border-line bg-white p-5 md:p-6"
          >
            <h2 className="font-display text-lg uppercase tracking-tight text-ink">
              {bloc.title}
            </h2>
            {bloc.help && (
              <p className="mt-1.5 max-w-3xl text-base leading-relaxed text-ink-soft">
                {bloc.help}
              </p>
            )}
            <div className="mt-5">{rendreBloc(bloc)}</div>
          </section>
        ))}
      </div>

      {/* Réinitialisation — volontairement à l'écart des champs. */}
      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-(--radius) border border-line bg-mist px-5 py-4">
        <p className="flex-1 text-sm leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">Revenir en arrière&nbsp;?</span> Cette
          rubrique peut retrouver le contenu livré avec le site.
        </p>
        {confirmationRaz ? (
          <span className="flex items-center gap-2">
            <button
              type="button"
              onClick={reinitialiser}
              disabled={enCours}
              className="btn-press rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700 disabled:opacity-60"
            >
              Confirmer
            </button>
            <button
              type="button"
              onClick={() => setConfirmationRaz(false)}
              className="rounded-full px-3 py-2 text-sm font-semibold text-ink-soft transition hover:text-ink"
            >
              Annuler
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmationRaz(true)}
            disabled={!enregistrementPossible}
            className="btn-press inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink disabled:opacity-50"
          >
            <RotateCcw size={15} aria-hidden="true" />
            Réinitialiser
          </button>
        )}
      </div>

      <BarreEnregistrement
        modifie={modifie}
        enCours={enCours}
        possible={enregistrementPossible}
        retour={retour}
        onEnregistrer={enregistrer}
      />
    </div>
  );
}

/* ============================================================
   PETITS COMPOSANTS
   ============================================================ */

function BoutonsLigne({
  index,
  total,
  onMonter,
  onDescendre,
  onSupprimer,
  label,
  feminin,
}: {
  index: number;
  total: number;
  onMonter: () => void;
  onDescendre: () => void;
  onSupprimer: () => void;
  label: string;
  feminin?: boolean;
}) {
  const ce = feminin ? "cette" : "ce";
  const bouton =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-soft transition hover:bg-mist hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <span className="flex shrink-0 items-center">
      <button
        type="button"
        onClick={onMonter}
        disabled={index === 0}
        className={bouton}
        aria-label={`Déplacer ${ce} ${label} vers le haut`}
      >
        <ChevronDown size={16} className="rotate-180" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onDescendre}
        disabled={index === total - 1}
        className={bouton}
        aria-label={`Déplacer ${ce} ${label} vers le bas`}
      >
        <ChevronDown size={16} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onSupprimer}
        className={cn(bouton, "hover:bg-red-50 hover:text-red-600")}
        aria-label={`Supprimer ${ce} ${label}`}
      >
        <Trash2 size={15} aria-hidden="true" />
      </button>
    </span>
  );
}

/** L'état d'une ligne sur le site public — « Affichée », « En attente »… */
function Pastille({ label, tone }: { label: string; tone: EtatPastille }) {
  const couleurs: Record<EtatPastille, string> = {
    ok: "bg-c-jeunes/15 text-c-jeunes-ink",
    attente: "bg-mist text-ink-soft",
    fin: "bg-gold-tint text-gold-ink",
  };
  return (
    <span
      className={cn(
        "hidden shrink-0 rounded-full px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wider sm:inline",
        couleurs[tone],
      )}
    >
      {label}
    </span>
  );
}

function BoutonAjouter({
  label,
  feminin,
  onClick,
}: {
  label: string;
  feminin?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn-press mt-3 inline-flex items-center gap-2 rounded-full border border-dashed border-line-strong px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-ocean hover:bg-ocean-tint hover:text-ocean"
    >
      <Plus size={16} aria-hidden="true" />
      Ajouter {feminin ? "une" : "un"} {label}
    </button>
  );
}

/** Barre collée en bas de l'écran : le bouton d'enregistrement suit le défilement. */
function BarreEnregistrement({
  modifie,
  enCours,
  possible,
  retour,
  onEnregistrer,
}: {
  modifie: boolean;
  enCours: boolean;
  possible: boolean;
  retour: { type: "ok" | "erreur"; message: string } | null;
  onEnregistrer: () => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur-md lg:left-[16.5rem]">
      <div className="mx-auto flex w-full max-w-[62rem] flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3.5 md:px-8">
        {/* `aria-live` : le résultat de l'enregistrement est annoncé aux
            lecteurs d'écran, qui ne voient pas le bandeau changer. */}
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "min-w-0 flex-1 text-sm leading-snug",
            retour?.type === "erreur" ? "font-medium text-red-600" : "text-ink-soft",
          )}
        >
          {retour ? (
            <span className="flex items-start gap-2">
              {retour.type === "ok" ? (
                <Check size={16} className="mt-0.5 shrink-0 text-c-jeunes-ink" aria-hidden="true" />
              ) : (
                <CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              )}
              {retour.message}
            </span>
          ) : modifie ? (
            "Modifications non enregistrées."
          ) : (
            "Tout est à jour."
          )}
        </p>

        <button
          type="button"
          onClick={onEnregistrer}
          disabled={!modifie || enCours || !possible}
          className="btn-press inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-ink px-6 text-sm font-bold text-white transition hover:bg-ocean disabled:opacity-40 disabled:hover:bg-ink"
        >
          {enCours ? (
            <>
              <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
              Enregistrement…
            </>
          ) : (
            <>
              <Save size={16} aria-hidden="true" />
              Enregistrer
            </>
          )}
        </button>
      </div>
    </div>
  );
}

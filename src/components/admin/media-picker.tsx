"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import {
  Check,
  ImageOff,
  ImagePlus,
  LoaderCircle,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import {
  listerMediatheque,
  supprimerImage,
  televerserImage,
} from "@/app/admin/actions";
import { LIMITE_ENVOI, enMo, preparerPhoto } from "@/lib/photos";
import type { Media } from "@/types";
import { cn } from "@/lib/utils";

/* ============================================================
   CHOISIR UNE PHOTO

   Le club n'a pas à connaître de « chemin de fichier ». Il voit ses
   photos, il en importe une depuis son téléphone ou son ordinateur, il
   clique dessus. Le champ technique reste accessible en dessous, replié :
   il sert aux corrections, pas à l'usage courant.

   La médiathèque n'est chargée qu'à l'ouverture de la fenêtre — elle
   interroge le stockage du site, inutile de le faire pour les quarante
   champs photo d'un écran.
   ============================================================ */

/* Les vignettes sont affichées avec <img> et non next/image : ce sont des
   adresses saisies à la main, parfois fausses le temps d'une frappe, et
   next/image refuserait la source au lieu d'afficher un cadre vide. Cet
   écran n'est vu que par quelques personnes : l'optimisation n'y a aucun
   intérêt, la tolérance aux erreurs en a beaucoup. */

export function Vignette({
  src,
  className,
  taille = 44,
}: {
  src: string;
  className?: string;
  taille?: number;
}) {
  /* On retient l'adresse qui a échoué, pas un simple booléen : changer de
     photo suffit alors à réafficher un aperçu, sans effet de remise à zéro. */
  const [echec, setEchec] = useState("");

  if (!src || echec === src) {
    return (
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-(--radius-sm) border border-dashed border-line-strong bg-mist text-ink-soft",
          className,
        )}
        style={{ width: taille, height: taille }}
      >
        <ImageOff size={Math.round(taille * 0.4)} aria-hidden="true" />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "block shrink-0 overflow-hidden rounded-(--radius-sm) border border-line bg-mist",
        className,
      )}
      style={{ width: taille, height: taille }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        loading="lazy"
        onError={() => setEchec(src)}
        className="h-full w-full object-cover"
      />
    </span>
  );
}

/* ============================================================ */

export function MediaPicker({
  valeur,
  onChange,
  onFermer,
  dossier,
  autoriserVide,
}: {
  valeur: string;
  onChange: (url: string) => void;
  onFermer: () => void;
  /** Dossier mis en avant à l'ouverture (« /media/teams/ »). */
  dossier?: string;
  /** Autorise « aucune photo » — vrai pour les portraits du bureau. */
  autoriserVide?: boolean;
}) {
  const [medias, setMedias] = useState<Media[] | null>(null);
  const [recherche, setRecherche] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [enCours, demarrer] = useTransition();
  const champFichier = useRef<HTMLInputElement>(null);
  const fenetre = useRef<HTMLDivElement>(null);

  const charger = useCallback(() => {
    demarrer(async () => {
      try {
        setMedias(await listerMediatheque());
      } catch {
        setMedias([]);
        setMessage("La médiathèque n'a pas pu être chargée.");
      }
    });
  }, []);

  useEffect(charger, [charger]);

  /* Échap referme — c'est le réflexe attendu de toute fenêtre modale. */
  useEffect(() => {
    const surTouche = (e: KeyboardEvent) => {
      if (e.key === "Escape") onFermer();
    };
    document.addEventListener("keydown", surTouche);
    fenetre.current?.focus();
    return () => document.removeEventListener("keydown", surTouche);
  }, [onFermer]);

  const importer = (fichiers: FileList | null) => {
    const choisi = fichiers?.[0];
    if (!choisi) return;
    setMessage(null);

    demarrer(async () => {
      // Redimensionnée et réencodée avant l'envoi : une photo de téléphone
      // passe ainsi sous la limite d'envoi, et allège aussi le site.
      const fichier = await preparerPhoto(choisi);

      if (fichier.size > LIMITE_ENVOI) {
        setMessage(
          `Cette photo pèse ${enMo(fichier.size)} Mo, c'est trop lourd pour l'envoi. Réduisez-la avant de réessayer.`,
        );
        return;
      }

      const donnees = new FormData();
      donnees.set("fichier", fichier);

      /* Une coupure réseau pendant l'envoi rejette la promesse au lieu de
         rendre un résultat : sans ce filet, le club verrait la fenêtre rester
         ouverte sans la moindre explication. */
      let resultat;
      try {
        resultat = await televerserImage(donnees);
      } catch {
        setMessage("L'envoi n'a pas abouti. Vérifiez votre connexion et réessayez.");
        return;
      }

      if (!resultat.ok) {
        setMessage(resultat.message);
        return;
      }
      // La photo tout juste importée est choisie d'office : c'est
      // évidemment pour cela qu'on vient de l'envoyer.
      onChange(resultat.url);
      onFermer();
    });
  };

  const supprimer = (media: Media) => {
    setMessage(null);
    demarrer(async () => {
      let resultat;
      try {
        resultat = await supprimerImage(media.url);
      } catch {
        setMessage("La suppression n'a pas abouti. Vérifiez votre connexion et réessayez.");
        return;
      }
      if (!resultat.ok) {
        setMessage(resultat.message);
        return;
      }
      setMedias((liste) => (liste ?? []).filter((m) => m.url !== media.url));
      if (media.url === valeur) onChange("");
    });
  };

  const terme = recherche.trim().toLowerCase();
  const filtrees = (medias ?? []).filter(
    (m) => !terme || m.nom.toLowerCase().includes(terme) || m.url.toLowerCase().includes(terme),
  );

  /* Sans recherche, le dossier du champ passe devant : la photo d'une
     équipe se choisit parmi les photos d'équipe, pas parmi 80 vignettes. */
  const classees = terme
    ? filtrees
    : [
        ...filtrees.filter((m) => dossier && m.url.startsWith(dossier)),
        ...filtrees.filter((m) => !dossier || !m.url.startsWith(dossier)),
      ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onFermer();
      }}
    >
      <div
        ref={fenetre}
        role="dialog"
        aria-modal="true"
        aria-label="Choisir une photo"
        tabIndex={-1}
        className="flex max-h-[88svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-(--radius-lg) bg-white shadow-(--shadow-lg) focus:outline-none sm:rounded-(--radius-lg)"
      >
        {/* --- En-tête --- */}
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <h2 className="flex-1 font-display text-lg uppercase tracking-tight text-ink">
            Choisir une photo
          </h2>
          <button
            type="button"
            onClick={onFermer}
            aria-label="Fermer"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition hover:bg-mist hover:text-ink"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* --- Actions --- */}
        <div className="flex flex-wrap items-center gap-3 border-b border-line bg-mist/60 px-5 py-3.5">
          <button
            type="button"
            onClick={() => champFichier.current?.click()}
            disabled={enCours}
            className="btn-press inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-ink px-4 text-sm font-bold text-white transition hover:bg-ocean disabled:opacity-50"
          >
            {enCours ? (
              <LoaderCircle size={15} className="animate-spin" aria-hidden="true" />
            ) : (
              <Upload size={15} aria-hidden="true" />
            )}
            Importer une photo
          </button>
          <input
            ref={champFichier}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
            className="hidden"
            onChange={(e) => {
              importer(e.target.files);
              // Réinitialisé pour que réimporter le même fichier
              // redéclenche bien l'événement.
              e.target.value = "";
            }}
          />

          <div className="relative min-w-[10rem] flex-1">
            <Search
              size={15}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft"
            />
            <input
              type="search"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Rechercher une photo…"
              aria-label="Rechercher une photo"
              className="h-10 w-full rounded-full border border-line bg-white pl-9 pr-3.5 text-base text-ink placeholder:text-ink-soft/70 focus:border-ocean focus:outline-none focus:ring-2 focus:ring-ocean/15"
            />
          </div>

          {autoriserVide && (
            <button
              type="button"
              onClick={() => {
                onChange("");
                onFermer();
              }}
              className="shrink-0 rounded-full px-3 py-2 text-sm font-semibold text-ink-soft transition hover:text-ink"
            >
              Aucune photo
            </button>
          )}
        </div>

        {message && (
          <p role="alert" className="border-b border-line bg-gold-tint px-5 py-3 text-sm font-medium text-ink">
            {message}
          </p>
        )}

        {/* --- Médiathèque --- */}
        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          {medias === null ? (
            <p className="py-10 text-center text-base text-ink-soft">
              <LoaderCircle size={20} className="mx-auto animate-spin" aria-hidden="true" />
            </p>
          ) : classees.length === 0 ? (
            <p className="py-10 text-center text-base text-ink-soft">
              Aucune photo ne correspond. Importez-en une avec le bouton ci-dessus.
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {classees.map((media) => {
                const choisie = media.url === valeur;
                return (
                  <li key={media.url} className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        onChange(media.url);
                        onFermer();
                      }}
                      className={cn(
                        "group block w-full overflow-hidden rounded-(--radius-sm) border bg-white text-left transition",
                        choisie
                          ? "border-ocean ring-2 ring-ocean/25"
                          : "border-line hover:border-ocean",
                      )}
                    >
                      <span className="relative block aspect-4/3 overflow-hidden bg-mist">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={media.url}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {choisie && (
                          <span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-ocean text-white">
                            <Check size={14} aria-hidden="true" />
                          </span>
                        )}
                      </span>
                      <span className="block truncate px-2.5 py-2 text-xs font-semibold text-ink">
                        {media.nom}
                      </span>
                    </button>

                    {media.importee && (
                      <button
                        type="button"
                        onClick={() => supprimer(media)}
                        disabled={enCours}
                        aria-label={`Supprimer définitivement la photo ${media.nom}`}
                        title="Supprimer définitivement cette photo"
                        className="absolute left-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-ink-soft shadow-(--shadow-sm) transition hover:bg-red-600 hover:text-white disabled:opacity-40"
                      >
                        <Trash2 size={13} aria-hidden="true" />
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <p className="border-t border-line px-5 py-3 text-xs leading-snug text-ink-soft">
          Les photos importées sont ajoutées à cette médiathèque et réutilisables
          partout sur le site. Seules celles que vous avez importées peuvent être
          supprimées&nbsp;; celles livrées avec le site restent disponibles.
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   LE CHAMP LUI-MÊME
   Vignette + bouton, et la fenêtre ci-dessus à la demande.
   ============================================================ */

export function ChampPhoto({
  valeur,
  onChange,
  dossier,
  autoriserVide,
  compact,
  ariaLabelledBy,
}: {
  valeur: string;
  onChange: (url: string) => void;
  dossier?: string;
  autoriserVide?: boolean;
  compact?: boolean;
  ariaLabelledBy?: string;
}) {
  const [ouvert, setOuvert] = useState(false);
  const nom = valeur ? decodeURIComponent(valeur.split("/").pop() ?? valeur) : "";

  return (
    <>
      <div className="flex items-center gap-3">
        <Vignette src={valeur} taille={compact ? 44 : 52} />

        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={() => setOuvert(true)}
            aria-labelledby={ariaLabelledBy}
            className="btn-press inline-flex h-10 items-center gap-2 rounded-full border border-line-strong bg-white px-4 text-sm font-semibold text-ink transition hover:border-ocean hover:text-ocean"
          >
            <ImagePlus size={15} aria-hidden="true" />
            {valeur ? "Changer la photo" : "Choisir une photo"}
          </button>
          <p className="mt-1.5 truncate text-xs text-ink-soft" title={valeur}>
            {nom || "Aucune photo"}
          </p>
        </div>
      </div>

      {ouvert && (
        <MediaPicker
          valeur={valeur}
          onChange={onChange}
          onFermer={() => setOuvert(false)}
          dossier={dossier}
          autoriserVide={autoriserVide}
        />
      )}
    </>
  );
}

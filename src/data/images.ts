/**
 * LES PHOTOS FIXES DU SITE
 *
 * Les photos d'équipe, de bénévoles, de salles et les logos de partenaires
 * vivent dans les listes correspondantes (`teams`, `bureau`, `salles`,
 * `partners`) : elles se modifient avec la ligne à laquelle elles appartiennent.
 *
 * Restent les photos « en dur » dans les pages : la grande photo d'accueil,
 * les bandeaux d'en-tête, la galerie beach, la frise de l'histoire… Elles
 * n'appartiennent à aucune liste, et étaient donc les seules à ne pas pouvoir
 * être changées sans toucher au code.
 *
 * Ce fichier leur donne à chacune un nom, un libellé en français et une
 * valeur d'origine. Il sert trois choses d'un coup :
 *   • les valeurs par défaut du contenu (`content-schema`) ;
 *   • l'écran « Photos du site » de l'espace d'administration
 *     (`admin-sections`), construit automatiquement à partir des groupes ;
 *   • la validation de ce qui revient du formulaire.
 *
 * AJOUTER UNE PHOTO MODIFIABLE = ajouter une ligne ici, puis lire
 * `contenu.images.<clé>` à l'endroit où elle s'affiche.
 */

/** Les écrans de l'admin, dans l'ordre d'affichage. */
export const imageGroupes = [
  {
    id: "accueil",
    titre: "Page d'accueil",
    aide: "Les deux grandes photos du haut se succèdent en fondu. Format paysage conseillé, au moins 1600 px de large.",
  },
  {
    id: "entetes",
    titre: "Bandeaux en haut des pages",
    aide: "La photo affichée derrière le titre de chaque page. Le texte est écrit en blanc par-dessus : préférez des photos qui ne sont pas trop claires.",
  },
  {
    id: "club",
    titre: "Page « Le club »",
    aide: "La photo de la présentation et les cinq étapes de la frise historique.",
  },
  {
    id: "beach",
    titre: "Page « Beach handball »",
    aide: "La grande photo de la section beach et les quatre vignettes du tournoi.",
  },
  {
    id: "coupe",
    titre: "Page « Coupe de France 2024 »",
    aide: "Les quatre photos de la galerie, ouvrables en grand au clic.",
  },
  {
    id: "identite",
    titre: "Logo du club",
    aide: "Le logo en couleur s'affiche sur fond clair (en-tête, pied de page), le logo blanc sur fond sombre. Un PNG à fond transparent donne le meilleur résultat.",
  },
  {
    id: "partage",
    titre: "Partage sur les réseaux",
    aide: "L'image qui accompagne le lien du site quand on le partage sur Facebook, Instagram, WhatsApp ou par SMS. Format paysage large, idéalement 1200 × 630 px : les réseaux recadrent au centre.",
  },
] as const;

export type ImageGroupeId = (typeof imageGroupes)[number]["id"];

type SlotImage = {
  key: string;
  label: string;
  hint?: string;
  groupe: ImageGroupeId;
  defaut: string;
  /** Dossier de suggestions proposé en priorité dans le sélecteur. */
  dossier?: string;
};

export const imageSlots = [
  /* --- Accueil --------------------------------------------- */
  {
    key: "accueilHero1",
    label: "Grande photo d'accueil",
    hint: "La première image que voit un visiteur. C'est elle qui donne le ton du site.",
    groupe: "accueil",
    defaut: "/media/club/hero-beach-trophee.jpg",
    dossier: "/media/club/",
  },
  {
    key: "accueilHero2",
    label: "Seconde photo d'accueil",
    hint: "Elle apparaît en fondu par-dessus la première, au bout de quelques secondes.",
    groupe: "accueil",
    defaut: "/media/club/hero-coupe-bercy.jpg",
    dossier: "/media/club/",
  },
  {
    key: "accueilSalle",
    label: "Carte « Handball en salle »",
    groupe: "accueil",
    defaut: "/media/action/jump-3.jpg",
    dossier: "/media/action/",
  },
  {
    key: "accueilBeach",
    label: "Carte « Beach handball »",
    groupe: "accueil",
    defaut: "/media/beach/amsterdam.jpg",
    dossier: "/media/beach/",
  },

  /* --- Bandeaux d'en-tête ---------------------------------- */
  {
    key: "enteteEquipes",
    label: "Page « Nos équipes »",
    groupe: "entetes",
    defaut: "/media/action/duel-1.jpg",
    dossier: "/media/action/",
  },
  {
    key: "enteteRejoindre",
    label: "Page « Rejoindre »",
    groupe: "entetes",
    defaut: "/media/action/run-1.jpg",
    dossier: "/media/action/",
  },
  {
    key: "enteteClub",
    label: "Page « Le club »",
    groupe: "entetes",
    defaut: "/media/club/vestiaire-celebration.jpg",
    dossier: "/media/club/",
  },
  {
    key: "enteteBeach",
    label: "Page « Beach handball »",
    groupe: "entetes",
    defaut: "/media/beach/amsterdam.jpg",
    dossier: "/media/beach/",
  },
  {
    key: "enteteContact",
    label: "Page « Contact »",
    groupe: "entetes",
    defaut: "/media/club/salle-cousteyre.jpg",
    dossier: "/media/club/",
  },

  /* --- Le club --------------------------------------------- */
  {
    key: "clubPresentation",
    label: "Photo de présentation",
    hint: "À côté du texte « Un club familial », en haut de la page.",
    groupe: "club",
    defaut: "/media/club/club-famille.jpg",
    dossier: "/media/club/",
  },
  {
    key: "histoire2017",
    label: "Frise · 2017 — Naissance du club",
    groupe: "club",
    defaut: "/media/club/histoire-club.jpg",
    dossier: "/media/club/",
  },
  {
    key: "histoire2022",
    label: "Frise · 2022 — Premier titre majeur",
    groupe: "club",
    defaut: "/media/teams/seniors-groupe.jpg",
    dossier: "/media/teams/",
  },
  {
    key: "histoire2023",
    label: "Frise · 2023 — Top 8 national",
    groupe: "club",
    defaut: "/media/action/duel-1.jpg",
    dossier: "/media/action/",
  },
  {
    key: "histoire2024",
    label: "Frise · 2024 — Champions de France à Bercy",
    groupe: "club",
    defaut: "/media/club/champions-2024.jpg",
    dossier: "/media/club/",
  },
  {
    key: "histoire2026",
    label: "Frise · 2026 — Champions de beach handball",
    groupe: "club",
    defaut: "/media/club/hero-beach-trophee.jpg",
    dossier: "/media/club/",
  },

  /* --- Beach ----------------------------------------------- */
  {
    key: "beachPrincipale",
    label: "Grande photo de la section beach",
    groupe: "beach",
    defaut: "/media/beach/stage-sable.jpg",
    dossier: "/media/beach/",
  },
  {
    key: "beachGalerie1",
    label: "Vignette 1 du tournoi",
    groupe: "beach",
    defaut: "/media/beach/londres.jpg",
    dossier: "/media/beach/",
  },
  {
    key: "beachGalerie2",
    label: "Vignette 2 du tournoi",
    groupe: "beach",
    defaut: "/media/beach/amsterdam.jpg",
    dossier: "/media/beach/",
  },
  {
    key: "beachGalerie3",
    label: "Vignette 3 du tournoi",
    groupe: "beach",
    defaut: "/media/beach/alpes.jpg",
    dossier: "/media/beach/",
  },
  {
    key: "beachGalerie4",
    label: "Vignette 4 du tournoi",
    groupe: "beach",
    defaut: "/media/beach/stage-sable.jpg",
    dossier: "/media/beach/",
  },

  /* --- Coupe de France 2024 -------------------------------- */
  {
    key: "galerie1",
    label: "Galerie · photo 1",
    groupe: "coupe",
    defaut: "/media/action/jump-1.jpg",
    dossier: "/media/action/",
  },
  {
    key: "galerie2",
    label: "Galerie · photo 2",
    groupe: "coupe",
    defaut: "/media/action/jump-2.jpg",
    dossier: "/media/action/",
  },
  {
    key: "galerie3",
    label: "Galerie · photo 3",
    groupe: "coupe",
    defaut: "/media/action/run-1.jpg",
    dossier: "/media/action/",
  },
  {
    key: "galerie4",
    label: "Galerie · photo 4",
    groupe: "coupe",
    defaut: "/media/club/nathand-fluo.jpg",
    dossier: "/media/club/",
  },

  /* --- Identité -------------------------------------------- */
  {
    key: "logoCouleur",
    label: "Logo en couleur",
    hint: "En-tête et pied de page du site.",
    groupe: "identite",
    defaut: "/brand/logo-color.png",
    dossier: "/brand/",
  },
  {
    key: "logoBlanc",
    label: "Logo blanc",
    hint: "Sur les fonds sombres, et sur l'écran de connexion de cet espace.",
    groupe: "identite",
    defaut: "/brand/logo-white.png",
    dossier: "/brand/",
  },

  /* --- Partage ---------------------------------------------- */
  {
    key: "partage",
    label: "Image de partage",
    hint: "Visible uniquement hors du site, dans l'aperçu du lien. Les réseaux la gardent parfois en cache quelques jours après un changement.",
    groupe: "partage",
    defaut: "/media/og-image.jpg",
    dossier: "/media/",
  },
] as const satisfies readonly SlotImage[];

export type ImageKey = (typeof imageSlots)[number]["key"];

/** Toutes les photos fixes du site : une clé, un chemin. */
export type SiteImages = Record<ImageKey, string>;

/** Les photos livrées avec le site. */
export const defaultImages: SiteImages = Object.fromEntries(
  imageSlots.map((slot) => [slot.key, slot.defaut]),
) as SiteImages;

/* `as const` conserve les clés littérales (c'est lui qui donne son type à
   `ImageKey`) mais fait disparaître `hint` et `dossier` des lignes qui n'en
   ont pas. Cette vue les rétablit sous une forme uniforme, utilisable par
   l'espace d'administration sans test au cas par cas. */
export type SlotImageNormalise = {
  key: ImageKey;
  label: string;
  hint?: string;
  dossier?: string;
};

export const imageSlotsDuGroupe = (groupe: ImageGroupeId): SlotImageNormalise[] =>
  imageSlots
    .filter((slot) => slot.groupe === groupe)
    .map((slot) => ({
      key: slot.key,
      label: slot.label,
      hint: "hint" in slot ? slot.hint : undefined,
      dossier: "dossier" in slot ? slot.dossier : undefined,
    }));

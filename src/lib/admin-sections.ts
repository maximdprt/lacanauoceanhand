import { imageGroupes, imageSlotsDuGroupe } from "@/data/images";
import { mediaFiles } from "@/data/media-index";
import {
  accentColors,
  defaultSiteContent,
  licenceKinds,
  teamGroupIds,
  trainingKindIds,
  type ContentKey,
} from "@/lib/content-schema";
import { trainingDays } from "@/data/site";
import { etatEvenement } from "@/lib/evenements";
import type { ClubHighlight } from "@/types";

/**
 * LE PLAN DE L'ESPACE D'ADMINISTRATION
 *
 * Chaque écran est décrit ici, pas codé à la main : un écran = une rubrique,
 * une rubrique = des blocs, un bloc = des champs. Les formulaires sont ensuite
 * construits automatiquement à partir de cette description (cf.
 * `src/components/admin/section-editor.tsx`).
 *
 * Ajouter un champ modifiable = ajouter une ligne ici. Rien d'autre à écrire :
 * ni formulaire, ni action serveur, ni validation spécifique.
 *
 * Ce fichier est lu côté serveur (menu, titres de pages) ET côté navigateur
 * (rendu des formulaires) : il ne doit contenir que des données et des
 * fonctions pures.
 */

/* ============================================================
   CHAMPS
   ============================================================ */
export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "tags"
  | "datetime"
  | "image"
  | "document"
  | "url"
  | "email";

export type Field = {
  key: string;
  label: string;
  type: FieldType;
  /** Texte grisé dans le champ, à titre d'exemple. */
  placeholder?: string;
  /** Explication affichée sous le champ. */
  hint?: string;
  /** Valeurs possibles pour un champ `select`. */
  options?: readonly { value: string; label: string }[];
  /** Suggestions pour un champ `document` (liste déroulante non contraignante). */
  suggestions?: readonly string[];
  /** Dossier mis en avant à l'ouverture du sélecteur de photo. */
  folder?: string;
  /** Un champ `image` où « aucune photo » est un choix valable. */
  optionnel?: boolean;
  /** Unité affichée à droite du champ (« € »). */
  suffix?: string;
  /** Largeur dans la grille du formulaire, sur 12 colonnes. */
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

/* ============================================================
   BLOCS
   ============================================================ */
/** Couleur d'une pastille d'état : vert « en ligne », gris « en attente »,
    ambre « terminé ». */
export type EtatPastille = "ok" | "attente" | "fin";

type BlocCommun = {
  title: string;
  help?: string;
};

export type Bloc = BlocCommun &
  (
    | {
        /** Une liste de lignes : tarifs, créneaux, équipes… */
        kind: "list";
        key: ContentKey;
        /** Nom d'une ligne au singulier (« tarif », « créneau »). */
        itemLabel: string;
        /** Vrai si ce nom est féminin : « ajouter UNE annonce », « supprimer
            CETTE équipe ». Les boutons sont fabriqués à partir du libellé,
            l'accord ne peut donc pas être écrit à la main. */
        itemFeminin?: boolean;
        /** Champs qui résument la ligne quand elle est repliée. */
        titleKeys: string[];
        fields: Field[];
        /** Valeurs d'une ligne fraîchement ajoutée. */
        blank: Record<string, unknown>;
        /**
         * Convertit une ligne enregistrée en ligne de formulaire, quand les
         * deux formes diffèrent. Le formulaire préfère des champs à plat
         * (`ctaLabel`, `ctaHref`) là où le site stocke un objet (`cta`).
         * La conversion inverse est faite à l'enregistrement par
         * `parseSiteContent`, qui accepte les deux formes.
         */
        toForm?: (item: Record<string, unknown>) => Record<string, unknown>;
        /**
         * Ce que devient cette ligne sur le site public, affiché en pastille
         * à côté de son titre. Reçoit la liste entière : « affichée » dépend
         * souvent de ce qui précède, pas seulement de la ligne elle-même.
         * Recalculé à chaque frappe, donc sans effet de bord ni horloge figée.
         */
        itemStatus?: (
          lignes: Record<string, unknown>[],
          index: number,
        ) => { label: string; tone: EtatPastille } | null;
      }
    | {
        /** Un objet unique : le responsable jeunes, les liens du club… */
        kind: "record";
        key: ContentKey;
        fields: Field[];
      }
    | {
        /** Une liste de phrases simples, sans sous-champs. */
        kind: "strings";
        key: ContentKey;
        itemLabel: string;
        itemFeminin?: boolean;
        placeholder?: string;
      }
    | {
        /** Une valeur unique : la saison, le mot sur la livraison… */
        kind: "single";
        key: ContentKey;
        field: Field;
      }
  );

/* ============================================================
   RUBRIQUES
   ============================================================ */
export type Section = {
  slug: string;
  label: string;
  /** Nom de l'icône Lucide, résolue dans le menu. */
  icon:
    | "euro"
    | "clock"
    | "calendar"
    | "users"
    | "whistle"
    | "shield"
    | "shop"
    | "help"
    | "handshake"
    | "map"
    | "image"
    | "link";
  summary: string;
  /** Pages publiques où la rubrique se voit — affiché comme raccourci. */
  preview: { label: string; href: string }[];
  blocks: Bloc[];
};

/* --- Options réutilisées ------------------------------------ */
const optionsJours = trainingDays.map((jour) => ({ value: jour, label: jour }));

const optionsTypeCreneau = [
  { value: "jeunes", label: "Équipes jeunes" },
  { value: "seniors", label: "Seniors" },
  { value: "loisirs", label: "Loisirs" },
  { value: "gardien", label: "École de gardiens" },
] satisfies readonly { value: (typeof trainingKindIds)[number]; label: string }[];

const optionsGroupeEquipe = [
  { value: "seniors", label: "Seniors" },
  { value: "jeunes", label: "Équipes jeunes" },
  { value: "beach", label: "Beach handball" },
  { value: "gardien", label: "École de gardien" },
  { value: "arbitrage", label: "École d'arbitrage" },
] satisfies readonly { value: (typeof teamGroupIds)[number]; label: string }[];

const optionsTypeLicence = [
  { value: "salle", label: "Handball en salle" },
  { value: "beach", label: "Beach handball" },
] satisfies readonly { value: (typeof licenceKinds)[number]; label: string }[];

const optionsCouleur = [
  { value: "var(--c-senior)", label: "Bleu · Seniors" },
  { value: "var(--c-jeunes)", label: "Vert · Jeunes" },
  { value: "var(--c-jeunes-ink)", label: "Vert foncé · Jeunes" },
  { value: "var(--c-beach)", label: "Orange · Beach" },
  { value: "var(--c-beach-ink)", label: "Orange foncé · Beach" },
  { value: "var(--c-gardien)", label: "Violet · Gardiens" },
  { value: "var(--c-arbitrage)", label: "Jaune · Arbitrage" },
  { value: "var(--c-arbitrage-ink)", label: "Jaune foncé · Arbitrage" },
] satisfies readonly { value: (typeof accentColors)[number]; label: string }[];

/* ============================================================
   LE PLAN, RUBRIQUE PAR RUBRIQUE
   ============================================================ */
export const adminSections: Section[] = [
  /* ---------------------------------------------------------- */
  {
    slug: "tarifs",
    label: "Tarifs & licences",
    icon: "euro",
    summary: "Le prix de la licence, les aides, et les catégories d'âge.",
    preview: [
      { label: "Page Rejoindre", href: "/rejoindre#tarifs" },
      { label: "Accueil", href: "/#rejoindre" },
    ],
    blocks: [
      {
        kind: "single",
        key: "licenceSeason",
        title: "Saison en cours",
        help: "Affichée au-dessus du tableau des tarifs et sur le guide du licencié.",
        field: {
          key: "licenceSeason",
          label: "Saison",
          type: "text",
          placeholder: "2025-2026",
          span: 4,
        },
      },
      {
        kind: "list",
        key: "licenceFees",
        title: "Prix des licences",
        help: "Une ligne par catégorie. L'ordre du tableau est celui d'ici.",
        itemLabel: "tarif",
        titleKeys: ["category", "price"],
        fields: [
          { key: "category", label: "Catégorie", type: "text", placeholder: "−13 ans", span: 5 },
          {
            key: "birthYears",
            label: "Années de naissance",
            type: "text",
            placeholder: "2015 – 2014",
            hint: "Laisser vide pour les Seniors, Loisirs et le Beach.",
            span: 4,
          },
          { key: "price", label: "Cotisation", type: "number", suffix: "€", span: 3 },
          { key: "kind", label: "Type", type: "select", options: optionsTypeLicence, span: 6 },
        ],
        blank: { category: "", birthYears: "", price: 0, kind: "salle" },
      },
      {
        kind: "list",
        key: "licenceNotes",
        title: "Conditions et aides",
        help: "Les encarts affichés sous le tableau (forfait famille, Pass'Sport…).",
        itemLabel: "condition",
        itemFeminin: true,
        titleKeys: ["title"],
        fields: [
          { key: "title", label: "Titre", type: "text", placeholder: "Forfait famille", span: 12 },
          {
            key: "detail",
            label: "Détail",
            type: "textarea",
            placeholder: "Remise de 15 € par inscription supplémentaire…",
            span: 12,
          },
        ],
        blank: { title: "", detail: "" },
      },
      {
        kind: "strings",
        key: "pricingPerks",
        title: "Arguments « Pourquoi nous rejoindre »",
        help: "La liste à coches de la page d'accueil. Une phrase par ligne.",
        itemLabel: "argument",
        placeholder: "Équipement (maillot, short, chaussettes) inclus dans la licence",
      },
      {
        kind: "list",
        key: "ageCategories",
        title: "Catégories d'âge",
        help: "Le tableau des âges de la page d'accueil, sous « Rejoindre le club ».",
        itemLabel: "catégorie",
        itemFeminin: true,
        titleKeys: ["label", "age"],
        fields: [
          { key: "label", label: "Nom", type: "text", placeholder: "U13", span: 4 },
          { key: "age", label: "Âge affiché", type: "text", placeholder: "−13 ans", span: 4 },
          { key: "accent", label: "Couleur", type: "select", options: optionsCouleur, span: 4 },
          { key: "note", label: "Précision", type: "text", placeholder: "Nés en 2015 et 2014", span: 12 },
        ],
        blank: { label: "", age: "", note: "", accent: "var(--c-jeunes)" },
      },
    ],
  },

  /* ---------------------------------------------------------- */
  {
    slug: "creneaux",
    label: "Créneaux d'entraînement",
    icon: "clock",
    summary: "Le planning de la semaine, groupe par groupe et salle par salle.",
    preview: [{ label: "Page Équipes", href: "/equipes#creneaux" }],
    blocks: [
      {
        kind: "list",
        key: "trainingSlots",
        title: "Le planning de la semaine",
        help: "Un créneau par ligne. Le site les regroupe automatiquement par jour, dans l'ordre saisi ici.",
        itemLabel: "créneau",
        titleKeys: ["day", "time", "group"],
        fields: [
          { key: "day", label: "Jour", type: "select", options: optionsJours, span: 4 },
          {
            key: "time",
            label: "Horaire",
            type: "text",
            placeholder: "17h15",
            hint: "Une heure de début, ou une plage : « 17h00 → 18h00 ».",
            span: 4,
          },
          { key: "kind", label: "Famille", type: "select", options: optionsTypeCreneau, span: 4 },
          { key: "group", label: "Groupe", type: "text", placeholder: "U13 mixte", span: 4 },
          { key: "venue", label: "Salle", type: "text", placeholder: "Cousteyre", span: 4 },
          {
            key: "city",
            label: "Commune",
            type: "text",
            placeholder: "Lacanau",
            hint: "Hors Lacanau, la commune s'affiche sur une pastille dorée.",
            span: 4,
          },
        ],
        blank: { day: "Lundi", time: "", group: "", kind: "jeunes", venue: "", city: "Lacanau" },
      },
    ],
  },

  /* ---------------------------------------------------------- */
  {
    slug: "evenements",
    label: "Actualités & événements",
    icon: "calendar",
    summary: "L'annonce mise en avant sur l'accueil et sur la page Rejoindre.",
    preview: [
      { label: "Accueil", href: "/" },
      { label: "Page Rejoindre", href: "/rejoindre" },
    ],
    blocks: [
      {
        kind: "list",
        key: "events",
        title: "Vos annonces",
        help: "Le site affiche la première annonce de la liste qui est encore d'actualité — la pastille verte indique laquelle. Les dates sont facultatives : sans date, l'annonce reste affichée jusqu'à ce que vous la retiriez ; avec une date de fin, le site la retire tout seul le lendemain.",
        itemLabel: "annonce",
        itemFeminin: true,
        titleKeys: ["title", "dateLabel"],
        fields: [
          { key: "title", label: "Titre", type: "text", placeholder: "Forum des associations", span: 12 },
          {
            key: "startDate",
            label: "Début (facultatif)",
            type: "datetime",
            hint: "Alimente la pastille de date du bandeau. À laisser vide pour une actualité sans date.",
            span: 6,
          },
          {
            key: "endDate",
            label: "Fin (facultatif)",
            type: "datetime",
            hint: "Le site retire l'annonce tout seul une fois cette date passée. Vide = affichée jusqu'à ce que vous la retiriez.",
            span: 6,
          },
          {
            key: "dateLabel",
            label: "Date affichée",
            type: "text",
            placeholder: "Samedi 5 septembre",
            hint: "Texte libre, affiché tel quel. Vide = pas de ligne de date sur le bandeau.",
            span: 6,
          },
          { key: "timeLabel", label: "Horaire affiché", type: "text", placeholder: "10h → 15h", span: 6 },
          { key: "venue", label: "Lieu", type: "text", placeholder: "Salle des fêtes & Cosec", span: 6 },
          { key: "city", label: "Commune", type: "text", placeholder: "Lacanau", span: 6 },
          {
            key: "description",
            label: "Description",
            type: "textarea",
            placeholder: "Venez découvrir le club, échanger avec nos bénévoles…",
            span: 12,
          },
          {
            key: "ctaLabel",
            label: "Bouton — texte",
            type: "text",
            placeholder: "Préparer mon inscription",
            hint: "Laisser les deux champs vides pour un bandeau sans bouton.",
            span: 6,
          },
          { key: "ctaHref", label: "Bouton — lien", type: "url", placeholder: "/rejoindre", span: 6 },
        ],
        blank: {
          title: "",
          startDate: "",
          endDate: "",
          dateLabel: "",
          timeLabel: "",
          venue: "",
          city: "Lacanau",
          description: "",
          ctaLabel: "",
          ctaHref: "",
        },
        toForm: (item) => {
          const cta = item.cta as { label?: string; href?: string } | undefined;
          return { ...item, ctaLabel: cta?.label ?? "", ctaHref: cta?.href ?? "" };
        },
        /* La question que le club se pose devant ce formulaire est
           « laquelle part en ligne ? ». La réponse est calculée par la même
           fonction que le site, pour qu'elles ne puissent pas diverger. */
        itemStatus: (lignes, index) => {
          if (!String(lignes[index]?.title ?? "").trim()) return null;
          switch (etatEvenement(lignes as unknown as ClubHighlight[], index)) {
            case "affiche":
              return { label: "Affichée sur le site", tone: "ok" };
            case "en-attente":
              return { label: "En attente", tone: "attente" };
            default:
              return { label: "Terminée · masquée", tone: "fin" };
          }
        },
      },
    ],
  },

  /* ---------------------------------------------------------- */
  {
    slug: "equipes",
    label: "Équipes",
    icon: "users",
    summary: "Les fiches d'équipe : entraîneur, âges, créneaux résumés et photo.",
    preview: [{ label: "Page Équipes", href: "/equipes" }],
    blocks: [
      {
        kind: "list",
        key: "teams",
        title: "Les équipes du club",
        help: "Chaque équipe a sa page (/equipes/…). Modifier son nom ne change pas son adresse : l'identifiant reste celui d'origine, ce qui évite de casser les liens déjà partagés.",
        itemLabel: "équipe",
        itemFeminin: true,
        titleKeys: ["name", "age"],
        fields: [
          { key: "name", label: "Nom", type: "text", placeholder: "U13 filles", span: 8 },
          { key: "group", label: "Rubrique", type: "select", options: optionsGroupeEquipe, span: 4 },
          { key: "age", label: "Âges", type: "text", placeholder: "11 à 13 ans", span: 6 },
          { key: "coach", label: "Entraîneur(s)", type: "text", placeholder: "Christophe Suire & Paul Mourioux", span: 6 },
          {
            key: "schedule",
            label: "Créneaux affichés sur la fiche",
            type: "tags",
            placeholder: "Mardi 17h15 · Cousteyre",
            hint: "Un créneau par ligne. C'est le résumé de la carte, le planning détaillé se règle dans « Créneaux d'entraînement ».",
            span: 12,
          },
          { key: "description", label: "Présentation", type: "textarea", span: 12 },
          {
            key: "image",
            label: "Photo de l'équipe",
            type: "image",
            folder: "/media/teams/",
            span: 8,
          },
          {
            key: "slug",
            label: "Adresse de la page",
            type: "text",
            placeholder: "u13-filles",
            hint: "À ne changer qu'en connaissance de cause : l'ancienne adresse deviendra une page introuvable.",
            span: 4,
          },
        ],
        blank: {
          name: "",
          slug: "",
          group: "jeunes",
          age: "",
          schedule: [],
          coach: "",
          description: "",
          image: "/media/teams/seniors.jpg",
        },
      },
    ],
  },

  /* ---------------------------------------------------------- */
  {
    slug: "encadrement",
    label: "Encadrement",
    icon: "whistle",
    summary: "Qui entraîne quelle catégorie, et le contact de la filière jeunes.",
    preview: [{ label: "Page Équipes", href: "/equipes#encadrement" }],
    blocks: [
      {
        kind: "list",
        key: "coachAssignments",
        title: "Entraîneurs par catégorie",
        itemLabel: "catégorie",
        itemFeminin: true,
        titleKeys: ["category"],
        fields: [
          { key: "category", label: "Catégorie", type: "text", placeholder: "U13 filles", span: 4 },
          {
            key: "coaches",
            label: "Entraîneurs",
            type: "tags",
            placeholder: "Christophe",
            hint: "Un prénom par ligne.",
            span: 4,
          },
          { key: "coordinator", label: "Coordinateur", type: "text", placeholder: "Paul", span: 4 },
        ],
        blank: { category: "", coaches: [], coordinator: "" },
      },
      {
        kind: "record",
        key: "youthLead",
        title: "Responsable de la filière jeunes",
        help: "L'encart « Une question sur une catégorie ? » à droite du tableau.",
        fields: [
          { key: "name", label: "Nom", type: "text", span: 6 },
          { key: "role", label: "Fonction", type: "text", span: 6 },
          {
            key: "phone",
            label: "Téléphone",
            type: "text",
            placeholder: "06 26 01 73 61",
            hint: "Le lien cliquable est calculé automatiquement à partir de ce numéro.",
            span: 6,
          },
          {
            key: "image",
            label: "Photo",
            type: "image",
            folder: "/media/staff/",
            span: 6,
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------- */
  {
    slug: "staff",
    label: "Bureau & staff",
    icon: "shield",
    summary: "Les bénévoles présentés sur la page « Le club ».",
    preview: [{ label: "Page Le club", href: "/le-club#staff" }],
    blocks: [
      {
        kind: "list",
        key: "bureau",
        title: "Le bureau",
        help: "Sans photo, les initiales s'affichent dans une pastille — c'est prévu, rien ne casse.",
        itemLabel: "membre",
        titleKeys: ["name", "role"],
        fields: [
          { key: "name", label: "Nom", type: "text", span: 5 },
          { key: "role", label: "Fonction", type: "text", placeholder: "Trésorier", span: 4 },
          { key: "pole", label: "Pôle", type: "text", placeholder: "Bureau", span: 3 },
          {
            key: "image",
            label: "Photo",
            type: "image",
            folder: "/media/staff/",
            optionnel: true,
            span: 12,
          },
        ],
        blank: { name: "", role: "", pole: "Bureau", image: "" },
      },
      {
        kind: "list",
        key: "staffMembers",
        title: "Encadrement technique & pôles",
        help: "Les pôles saisis ici deviennent les filtres affichés au-dessus de la grille.",
        itemLabel: "membre",
        titleKeys: ["name", "role"],
        fields: [
          { key: "name", label: "Nom", type: "text", span: 5 },
          { key: "role", label: "Fonction", type: "text", placeholder: "Entraîneur seniors", span: 4 },
          { key: "pole", label: "Pôle", type: "text", placeholder: "Technique", span: 3 },
          {
            key: "image",
            label: "Photo",
            type: "image",
            folder: "/media/staff/",
            optionnel: true,
            span: 12,
          },
        ],
        blank: { name: "", role: "", pole: "Technique", image: "" },
      },
    ],
  },

  /* ---------------------------------------------------------- */
  {
    slug: "boutique",
    label: "Boutique",
    icon: "shop",
    summary: "Le catalogue et les prix affichés avant de partir sur HelloAsso.",
    preview: [{ label: "Page Beach", href: "/beach#boutique" }],
    blocks: [
      {
        kind: "list",
        key: "shopItems",
        title: "Articles",
        help: "Les prix affichés ici doivent suivre ceux de la boutique HelloAsso.",
        itemLabel: "article",
        titleKeys: ["name", "price"],
        fields: [
          { key: "name", label: "Article", type: "text", placeholder: "Sweat à capuche", span: 6 },
          { key: "note", label: "Précision", type: "text", placeholder: "Bleu · Vert · Bordeaux", span: 4 },
          { key: "price", label: "Prix", type: "number", suffix: "€", span: 2 },
        ],
        blank: { name: "", price: 0, note: "" },
      },
      {
        kind: "single",
        key: "shopShipping",
        title: "Mention sur la livraison",
        field: {
          key: "shopShipping",
          label: "Texte affiché en bas du catalogue",
          type: "textarea",
          span: 12,
        },
      },
    ],
  },

  /* ---------------------------------------------------------- */
  {
    slug: "faq",
    label: "Questions fréquentes",
    icon: "help",
    summary: "L'accordéon de l'accueil — également lu par Google et les IA.",
    preview: [{ label: "Accueil", href: "/" }],
    blocks: [
      {
        kind: "list",
        key: "faqItems",
        title: "Questions & réponses",
        help: "Des réponses courtes et concrètes, avec le mot « Lacanau » quand c'est naturel : ce bloc alimente aussi les résultats de recherche.",
        itemLabel: "question",
        itemFeminin: true,
        titleKeys: ["question"],
        fields: [
          { key: "question", label: "Question", type: "text", span: 12 },
          { key: "answer", label: "Réponse", type: "textarea", span: 12 },
        ],
        blank: { question: "", answer: "" },
      },
    ],
  },

  /* ---------------------------------------------------------- */
  {
    slug: "partenaires",
    label: "Partenaires",
    icon: "handshake",
    summary: "Le bandeau défilant des logos, en bas de l'accueil.",
    preview: [{ label: "Accueil", href: "/" }],
    blocks: [
      {
        kind: "list",
        key: "partners",
        title: "Les partenaires du club",
        help: "Le logo doit d'abord être déposé dans le dossier public/partners du projet ; il apparaît ensuite dans la liste de suggestions.",
        itemLabel: "partenaire",
        titleKeys: ["name"],
        fields: [
          { key: "name", label: "Nom", type: "text", span: 6 },
          {
            key: "website",
            label: "Site web",
            type: "url",
            placeholder: "https://…",
            hint: "Laisser « # » pour un partenaire sans site.",
            span: 6,
          },
          {
            key: "logo",
            label: "Logo du partenaire",
            type: "image",
            folder: "/partners/",
            span: 12,
          },
        ],
        blank: { name: "", website: "#", logo: "" },
      },
    ],
  },

  /* ---------------------------------------------------------- */
  {
    slug: "salles",
    label: "Salles & lieux",
    icon: "map",
    summary: "Les gymnases et le pôle beach présentés sur la page « Le club ».",
    preview: [{ label: "Page Le club", href: "/le-club#lieux" }],
    blocks: [
      {
        kind: "list",
        key: "salles",
        title: "Où l'on joue",
        itemLabel: "lieu",
        titleKeys: ["name"],
        fields: [
          { key: "name", label: "Nom", type: "text", placeholder: "Salle de la Cousteyre", span: 6 },
          { key: "address", label: "Commune", type: "text", placeholder: "Lacanau", span: 6 },
          {
            key: "usage",
            label: "Usage",
            type: "text",
            placeholder: "Salle omnisports, entraînements & matchs à domicile",
            span: 12,
          },
          {
            key: "image",
            label: "Photo du lieu",
            type: "image",
            folder: "/media/club/",
            optionnel: true,
            span: 12,
          },
        ],
        blank: { name: "", usage: "", address: "Lacanau", image: "" },
      },
    ],
  },

  /* ---------------------------------------------------------- */
  {
    slug: "photos",
    label: "Photos du site",
    icon: "image",
    summary: "Les grandes photos des pages : accueil, bandeaux, galeries et logo.",
    preview: [
      { label: "Accueil", href: "/" },
      { label: "Page Le club", href: "/le-club" },
      { label: "Page Beach", href: "/beach" },
    ],
    /* Les photos qui appartiennent à une liste (équipe, bénévole, salle,
       partenaire) se changent dans leur propre rubrique, au plus près de la
       ligne concernée. Restent ici celles qui n'appartiennent à personne :
       les grandes images des pages. Les blocs sont construits à partir de
       `src/data/images.ts` — ajouter une photo modifiable = y ajouter une
       ligne, cet écran suit tout seul. */
    blocks: imageGroupes.map((groupe) => ({
      kind: "record" as const,
      key: "images" as const,
      title: groupe.titre,
      help: groupe.aide,
      fields: imageSlotsDuGroupe(groupe.id).map((slot) => ({
        key: slot.key,
        label: slot.label,
        hint: slot.hint,
        type: "image" as const,
        folder: slot.dossier,
        span: 6 as const,
      })),
    })),
  },

  /* ---------------------------------------------------------- */
  {
    slug: "liens",
    label: "Contact & liens",
    icon: "link",
    summary: "L'adresse e-mail du club, les réseaux sociaux et les pages HelloAsso.",
    preview: [
      { label: "Page Contact", href: "/contact" },
      { label: "Page Le club", href: "/le-club#soutenir" },
    ],
    blocks: [
      {
        kind: "record",
        key: "links",
        title: "Coordonnées et liens sortants",
        help: "L'adresse e-mail sert à la fois d'affichage public et de destinataire des formulaires du site.",
        fields: [
          {
            key: "clubEmail",
            label: "E-mail du club",
            type: "email",
            hint: "Attention : c'est aussi la boîte qui reçoit les demandes d'inscription.",
            span: 12,
          },
          { key: "instagram", label: "Instagram", type: "url", span: 6 },
          { key: "facebook", label: "Facebook", type: "url", span: 6 },
          { key: "beachXperience", label: "Site Beach Xperience", type: "url", span: 6 },
          {
            key: "guideLicencie",
            label: "Guide du licencié (PDF)",
            type: "document",
            suggestions: mediaFiles.filter((f) => f.endsWith(".pdf")),
            span: 6,
          },
          { key: "helloAssoProfile", label: "HelloAsso · page du club", type: "url", span: 6 },
          { key: "helloAssoBoutique", label: "HelloAsso · boutique", type: "url", span: 6 },
          { key: "helloAssoDon", label: "HelloAsso · dons", type: "url", span: 6 },
          { key: "helloAssoMecenat", label: "HelloAsso · mécénat", type: "url", span: 6 },
          { key: "helloAssoTournoi", label: "HelloAsso · tournoi partenaires", type: "url", span: 6 },
        ],
      },
    ],
  },
];

/* ============================================================
   OUTILS
   ============================================================ */

export function sectionParSlug(slug: string): Section | undefined {
  return adminSections.find((s) => s.slug === slug);
}

/** Les clés de contenu qu'une rubrique a le droit de modifier.
    Dédupliquées : plusieurs blocs peuvent présenter des morceaux d'une même
    clé — l'écran « Photos du site » découpe `images` en six groupes. */
export function clesDeSection(section: Section): ContentKey[] {
  return [...new Set(section.blocks.map((bloc) => bloc.key))];
}

/** Combien d'entrées compte une rubrique — affiché sur le tableau de bord. */
export function compterEntrees(
  section: Section,
  contenu: Record<string, unknown>,
): number {
  return clesDeSection(section).reduce((total, cle) => {
    const valeur = contenu[cle];
    if (Array.isArray(valeur)) return total + valeur.length;
    // Un objet (les liens du club, les photos du site) compte pour le nombre
    // de champs qu'il contient : « 26 entrées » parle plus que « 1 ».
    if (valeur && typeof valeur === "object") return total + Object.keys(valeur).length;
    return total + 1;
  }, 0);
}

/** Vrai si la rubrique diffère de ce que contient le code. */
export function estModifiee(
  section: Section,
  modifications: Partial<Record<ContentKey, unknown>>,
): boolean {
  return clesDeSection(section).some((cle) => modifications[cle] !== undefined);
}

/** Les valeurs par défaut d'une rubrique, pour le bouton « Réinitialiser ». */
export function valeursParDefaut(section: Section): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const cle of clesDeSection(section)) {
    out[cle] = defaultSiteContent[cle];
  }
  return out;
}

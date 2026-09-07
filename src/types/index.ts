export type NavItem = {
  label: string;
  href: string;
};

export type ClubStat = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
};

export type MatchItem = {
  id: string;
  date: string;
  competition: string;
  opponent: string;
  location: string;
  isHome: boolean;
  score?: string;
};

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  cover: string;
  slug: string;
  /** Lien "Lire la suite" — affiché uniquement si une page existe. */
  href?: string;
};

export type Partner = {
  id: string;
  name: string;
  website: string;
  logo: string;
};

export type TeamCategory =
  | "seniors"
  | "jeunes"
  | "beach"
  | "gardien"
  | "arbitrage";

export type Team = {
  slug: string;
  name: string;
  group: TeamCategory;
  age: string;
  schedule: string[];
  coach: string;
  description: string;
  image: string;
};

export type TimelineEvent = {
  year: string;
  title: string;
  description: string;
  /** Image marquante illustrant l'étape (facultatif). */
  image?: string;
};

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  pole: string;
  image?: string;
};

export type Salle = {
  name: string;
  usage: string;
  address: string;
  image?: string;
};

export type PricingRow = {
  category: string;
  fee: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Palmares = {
  season: string;
  lines: string[];
};

export type ClubEvent = {
  id: string;
  month: string;
  title: string;
  type: "Match" | "Tournoi" | "Manifestation" | "Stage";
  location: string;
  highlight?: boolean;
};

export type AgeCategory = {
  label: string;
  age: string;
  note: string;
  accent: string;
};

/* ============================================================
   GUIDE DU LICENCIÉ — tarifs, créneaux et encadrement
   Source : « Guide du licencié » officiel du club (PDF).
   ============================================================ */

/** Une ligne du tableau « Prix des licences ». */
export type LicenceFee = {
  /** Libellé de la catégorie tel que publié par le club. */
  category: string;
  /** Années de naissance concernées (absent pour Seniors / Loisirs / Beach). */
  birthYears?: string;
  /** Cotisation annuelle en euros. */
  price: number;
  /** Sépare le handball en salle du beach handball (tarifs réduits). */
  kind: "salle" | "beach";
};

/** Famille de pratique — sert à colorer les créneaux. */
export type TrainingKind = "jeunes" | "seniors" | "loisirs" | "gardien";

/** Un créneau d'entraînement hebdomadaire. */
export type TrainingSlot = {
  day: "Lundi" | "Mardi" | "Mercredi" | "Jeudi" | "Vendredi" | "Samedi";
  /** Heure de début, ou plage horaire quand le club en publie une. */
  time: string;
  /** Groupe concerné (U13 mixte, Seniors…). */
  group: string;
  kind: TrainingKind;
  /** Salle / installation. */
  venue: string;
  /** Commune de la salle — plusieurs groupes s'entraînent hors de Lacanau. */
  city: string;
};

/** Une ligne du tableau « Entraîneurs » du guide. */
export type CoachAssignment = {
  category: string;
  coaches: string[];
  /** Coordinateur de la filière (colonne « Coordinateur » du guide). */
  coordinator?: string;
};

/** Un rendez-vous ponctuel mis en avant sur le site (forum, tournoi…). */
export type ClubHighlight = {
  /** Identifiant stable — sert de clé de liste dans l'espace admin. */
  id: string;
  title: string;
  /** Date ISO — sert au schema.org Event et au masquage automatique. */
  startDate: string;
  endDate: string;
  dateLabel: string;
  timeLabel: string;
  venue: string;
  city: string;
  description: string;
  cta?: { label: string; href: string };
};

/** Un article de la boutique en ligne HelloAsso. */
export type ShopItem = {
  name: string;
  price: number;
  note?: string;
};

/** Contact direct publié dans le guide du licencié. */
export type YouthLead = {
  name: string;
  role: string;
  /** Numéro affiché, mis en forme à la française (06 26 01 73 61). */
  phone: string;
  /** Même numéro au format international, pour le lien `tel:`. */
  phoneHref: string;
  image: string;
};

/** Les liens sortants du club — réseaux, billetterie, documents. */
export type SiteLinks = {
  clubEmail: string;
  instagram: string;
  facebook: string;
  beachXperience: string;
  guideLicencie: string;
  helloAssoProfile: string;
  helloAssoBoutique: string;
  helloAssoDon: string;
  helloAssoMecenat: string;
  helloAssoTournoi: string;
};

/** Une ligne du bloc « conditions et aides » sous le tableau des tarifs. */
export type LicenceNote = {
  title: string;
  detail: string;
};

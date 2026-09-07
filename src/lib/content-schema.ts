/**
 * SCHÉMA DU CONTENU MODIFIABLE — la seule définition de « ce que le club
 * peut changer sans toucher au code ».
 *
 * Trois rôles, et un seul fichier pour éviter qu'ils divergent :
 *   1. le TYPE `SiteContent`, utilisé par le site comme par l'admin ;
 *   2. les VALEURS PAR DÉFAUT, reprises telles quelles de `src/data/site.ts`
 *      — c'est ce que le site affiche tant que rien n'a été modifié, et ce
 *      vers quoi le bouton « Réinitialiser » ramène ;
 *   3. la VALIDATION (`parseSiteContent`), qui nettoie tout ce qui arrive du
 *      navigateur avant enregistrement.
 *
 * Ce module doit rester utilisable des deux côtés (serveur ET navigateur) :
 * pas d'accès disque, pas de variable d'environnement, aucun import serveur.
 */
import {
  ageCategories as defaultAgeCategories,
  bureau as defaultBureau,
  clubEvents as defaultEvents,
  coachAssignments as defaultCoachAssignments,
  faqItems as defaultFaqItems,
  licenceFees as defaultLicenceFees,
  licenceNotes as defaultLicenceNotes,
  licenceSeason as defaultLicenceSeason,
  partners as defaultPartners,
  pricingPerks as defaultPricingPerks,
  salles as defaultSalles,
  shopItems as defaultShopItems,
  shopShipping as defaultShopShipping,
  siteLinks as defaultLinks,
  staffMembers as defaultStaffMembers,
  teams as defaultTeams,
  trainingDays,
  trainingSlots as defaultTrainingSlots,
  youthLead as defaultYouthLead,
} from "@/data/site";
import type {
  AgeCategory,
  ClubHighlight,
  CoachAssignment,
  FaqItem,
  LicenceFee,
  LicenceNote,
  Partner,
  Salle,
  ShopItem,
  SiteLinks,
  StaffMember,
  Team,
  TrainingSlot,
  YouthLead,
} from "@/types";

/* ============================================================
   LE CONTENU MODIFIABLE
   Les noms de clés reprennent exactement ceux de `src/data/site.ts` :
   une modification dans l'admin se lit sans traduction mentale.
   ============================================================ */
export type SiteContent = {
  licenceSeason: string;
  licenceFees: LicenceFee[];
  licenceNotes: LicenceNote[];
  pricingPerks: string[];
  ageCategories: AgeCategory[];
  trainingSlots: TrainingSlot[];
  events: ClubHighlight[];
  teams: Team[];
  coachAssignments: CoachAssignment[];
  youthLead: YouthLead;
  bureau: StaffMember[];
  staffMembers: StaffMember[];
  shopItems: ShopItem[];
  shopShipping: string;
  faqItems: FaqItem[];
  partners: Partner[];
  salles: Salle[];
  links: SiteLinks;
};

export type ContentKey = keyof SiteContent;

/** L'état du site tant que personne n'a rien modifié. */
export const defaultSiteContent: SiteContent = {
  licenceSeason: defaultLicenceSeason,
  licenceFees: defaultLicenceFees,
  licenceNotes: defaultLicenceNotes,
  pricingPerks: defaultPricingPerks,
  ageCategories: defaultAgeCategories,
  trainingSlots: defaultTrainingSlots,
  events: defaultEvents,
  teams: defaultTeams,
  coachAssignments: defaultCoachAssignments,
  youthLead: defaultYouthLead,
  bureau: defaultBureau,
  staffMembers: defaultStaffMembers,
  shopItems: defaultShopItems,
  shopShipping: defaultShopShipping,
  faqItems: defaultFaqItems,
  partners: defaultPartners,
  salles: defaultSalles,
  links: defaultLinks,
};

/** Toutes les clés du contenu, dans l'ordre du type. */
export const contentKeys = Object.keys(defaultSiteContent) as ContentKey[];

/* ============================================================
   FUSION
   Le fichier enregistré ne contient QUE ce qui a été modifié. Une clé
   absente retombe sur sa valeur par défaut : ajouter une rubrique au code
   ne casse donc jamais un contenu déjà enregistré, et « réinitialiser »
   revient simplement à retirer la clé.
   ============================================================ */
export function mergeContent(overrides: Partial<SiteContent> | null | undefined): SiteContent {
  if (!overrides) return defaultSiteContent;
  const merged = { ...defaultSiteContent };
  for (const key of contentKeys) {
    const value = overrides[key];
    if (value !== undefined) {
      // Le cast est sûr : `parseSiteContent` a déjà validé le type de chaque clé.
      (merged as Record<string, unknown>)[key] = value;
    }
  }
  return merged;
}

/* ============================================================
   VALIDATION
   Tout ce qui arrive du navigateur passe par ici. Le principe est le
   même partout : on borne les longueurs, on refuse ce qui n'est pas du
   bon type, et on laisse tomber silencieusement les lignes vides plutôt
   que d'échouer sur une ligne oubliée dans le formulaire.
   ============================================================ */

const MAX_TEXTE = 400;
const MAX_TEXTE_LONG = 2000;
const MAX_LIGNES = 200;

const str = (v: unknown, max = MAX_TEXTE): string =>
  typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";

/** Comme `str`, mais conserve les retours à la ligne (descriptions, réponses). */
const text = (v: unknown, max = MAX_TEXTE_LONG): string =>
  typeof v === "string"
    ? v.replace(/[^\S\n]+/g, " ").replace(/\n{3,}/g, "\n\n").trim().slice(0, max)
    : "";

const num = (v: unknown, { min = 0, max = 100000 } = {}): number => {
  const n = typeof v === "number" ? v : Number.parseFloat(String(v ?? "").replace(",", "."));
  if (!Number.isFinite(n)) return 0;
  return Math.min(max, Math.max(min, Math.round(n * 100) / 100));
};

const oneOf = <T extends string>(v: unknown, allowed: readonly T[], fallback: T): T =>
  allowed.includes(v as T) ? (v as T) : fallback;

/** Une chaîne facultative : absente du résultat si vide, plutôt que `""`. */
const optional = (v: unknown, max = MAX_TEXTE): string | undefined => {
  const s = str(v, max);
  return s === "" ? undefined : s;
};

/** Applique `fn` à chaque entrée d'un tableau et retire les lignes vides.
    L'index est transmis : il sert d'identifiant de secours quand la ligne
    vient d'être ajoutée dans l'admin et n'en a pas encore. */
function list<T>(
  v: unknown,
  fn: (item: Record<string, unknown>, index: number) => T | null,
): T[] {
  if (!Array.isArray(v)) return [];
  const out: T[] = [];
  v.slice(0, MAX_LIGNES).forEach((raw, index) => {
    if (typeof raw !== "object" || raw === null) return;
    const parsed = fn(raw as Record<string, unknown>, index);
    if (parsed !== null) out.push(parsed);
  });
  return out;
}

/** Liste de chaînes simples (avantages de la licence, entraîneurs d'une catégorie). */
function strings(v: unknown, max = MAX_TEXTE): string[] {
  if (Array.isArray(v)) {
    return v.map((s) => str(s, max)).filter(Boolean).slice(0, MAX_LIGNES);
  }
  // Le formulaire envoie parfois une saisie libre séparée par des virgules.
  if (typeof v === "string") {
    return v.split(/[,;\n]/).map((s) => str(s, max)).filter(Boolean).slice(0, MAX_LIGNES);
  }
  return [];
}

/** Un chemin d'image interne (`/media/...`) — jamais une URL externe. */
const imagePath = (v: unknown): string => {
  const s = str(v, 300);
  return /^\/[\w\-./]*$/.test(s) ? s : "";
};

/**
 * Une URL affichée sur le site. Seuls http(s), les liens internes et
 * `mailto:`/`tel:` sont acceptés : un `javascript:` collé par erreur dans
 * un champ ne doit jamais finir dans un `href`.
 */
const url = (v: unknown): string => {
  const s = str(v, 500);
  if (s === "" || s === "#") return s;
  if (/^(https?:\/\/|\/|mailto:|tel:)/i.test(s)) return s;
  return "";
};

const email = (v: unknown): string => {
  const s = str(v, 200).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) ? s : "";
};

/** Date ISO (`2026-09-05T10:00:00+02:00`) ou saisie `datetime-local`. */
const isoDate = (v: unknown): string => {
  const s = str(v, 40);
  if (s === "") return "";
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? "" : s;
};

/** Identifiant de liste : conservé s'il est propre, sinon régénéré. */
const slug = (v: unknown, fallback: string): string => {
  const s = str(v, 80)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s || fallback;
};

/* --- Valeurs contraintes ------------------------------------ */
export const licenceKinds = ["salle", "beach"] as const;
export const trainingKindIds = ["jeunes", "seniors", "loisirs", "gardien"] as const;
export const teamGroupIds = ["seniors", "jeunes", "beach", "gardien", "arbitrage"] as const;
export const accentColors = [
  "var(--c-senior)",
  "var(--c-jeunes)",
  "var(--c-jeunes-ink)",
  "var(--c-beach)",
  "var(--c-beach-ink)",
  "var(--c-gardien)",
  "var(--c-arbitrage)",
  "var(--c-arbitrage-ink)",
] as const;

/* --- Validateur par clé ------------------------------------- */
const parsers: { [K in ContentKey]: (v: unknown) => SiteContent[K] } = {
  licenceSeason: (v) => str(v, 20) || defaultSiteContent.licenceSeason,

  licenceFees: (v) =>
    list<LicenceFee>(v, (o) => {
      const category = str(o.category, 80);
      if (!category) return null;
      return {
        category,
        birthYears: optional(o.birthYears, 60),
        price: num(o.price, { min: 0, max: 5000 }),
        kind: oneOf(o.kind, licenceKinds, "salle"),
      };
    }),

  licenceNotes: (v) =>
    list<LicenceNote>(v, (o) => {
      const title = str(o.title, 120);
      if (!title) return null;
      return { title, detail: text(o.detail, 600) };
    }),

  pricingPerks: (v) => strings(v, 200),

  ageCategories: (v) =>
    list<AgeCategory>(v, (o) => {
      const label = str(o.label, 60);
      if (!label) return null;
      return {
        label,
        age: str(o.age, 40),
        note: str(o.note, 120),
        accent: oneOf(o.accent, accentColors, "var(--c-senior)"),
      };
    }),

  trainingSlots: (v) =>
    list<TrainingSlot>(v, (o) => {
      const group = str(o.group, 80);
      if (!group) return null;
      return {
        day: oneOf(o.day, trainingDays, "Lundi"),
        time: str(o.time, 40),
        group,
        kind: oneOf(o.kind, trainingKindIds, "jeunes"),
        venue: str(o.venue, 60),
        city: str(o.city, 60),
      };
    }),

  events: (v) =>
    list<ClubHighlight>(v, (o, index) => {
      const title = str(o.title, 120);
      if (!title) return null;
      const ctaLabel = str(o.ctaLabel ?? (o.cta as Record<string, unknown>)?.label, 60);
      const ctaHref = url(o.ctaHref ?? (o.cta as Record<string, unknown>)?.href);
      return {
        id: slug(o.id, `evenement-${index + 1}`),
        title,
        startDate: isoDate(o.startDate),
        endDate: isoDate(o.endDate) || isoDate(o.startDate),
        dateLabel: str(o.dateLabel, 80),
        timeLabel: str(o.timeLabel, 60),
        venue: str(o.venue, 120),
        city: str(o.city, 80),
        description: text(o.description, 800),
        ...(ctaLabel && ctaHref ? { cta: { label: ctaLabel, href: ctaHref } } : {}),
      };
    }),

  teams: (v) =>
    list<Team>(v, (o, index) => {
      const name = str(o.name, 80);
      if (!name) return null;
      return {
        slug: slug(o.slug, slug(name, `equipe-${index + 1}`)),
        name,
        group: oneOf(o.group, teamGroupIds, "jeunes"),
        age: str(o.age, 80),
        schedule: strings(o.schedule, 120),
        coach: str(o.coach, 120),
        description: text(o.description, 800),
        image: imagePath(o.image) || "/media/teams/seniors.jpg",
      };
    }),

  coachAssignments: (v) =>
    list<CoachAssignment>(v, (o) => {
      const category = str(o.category, 80);
      if (!category) return null;
      return {
        category,
        coaches: strings(o.coaches, 60),
        coordinator: optional(o.coordinator, 60),
      };
    }),

  youthLead: (v) => {
    const o = (typeof v === "object" && v !== null ? v : {}) as Record<string, unknown>;
    const d = defaultSiteContent.youthLead;
    const phone = str(o.phone, 30);
    return {
      name: str(o.name, 80) || d.name,
      role: str(o.role, 120) || d.role,
      phone: phone || d.phone,
      // Le lien cliquable est déduit du numéro affiché : une seule saisie
      // pour le club, et jamais de décalage entre les deux.
      phoneHref: toPhoneHref(str(o.phoneHref, 30) || phone) || d.phoneHref,
      image: imagePath(o.image) || d.image,
    };
  },

  bureau: (v) => parseStaff(v, "b"),
  staffMembers: (v) => parseStaff(v, "s"),

  shopItems: (v) =>
    list<ShopItem>(v, (o) => {
      const name = str(o.name, 80);
      if (!name) return null;
      return {
        name,
        price: num(o.price, { min: 0, max: 5000 }),
        note: optional(o.note, 120),
      };
    }),

  shopShipping: (v) => text(v, 400),

  faqItems: (v) =>
    list<FaqItem>(v, (o) => {
      const question = str(o.question, 200);
      if (!question) return null;
      return { question, answer: text(o.answer, 1200) };
    }),

  partners: (v) =>
    list<Partner>(v, (o, index) => {
      const name = str(o.name, 80);
      if (!name) return null;
      return {
        id: slug(o.id, `partenaire-${index + 1}`),
        name,
        website: url(o.website) || "#",
        logo: imagePath(o.logo) || "/partners/vitalparc.png",
      };
    }),

  salles: (v) =>
    list<Salle>(v, (o) => {
      const name = str(o.name, 80);
      if (!name) return null;
      const image = imagePath(o.image);
      return {
        name,
        usage: str(o.usage, 200),
        address: str(o.address, 120),
        ...(image ? { image } : {}),
      };
    }),

  links: (v) => {
    const o = (typeof v === "object" && v !== null ? v : {}) as Record<string, unknown>;
    const d = defaultSiteContent.links;
    return {
      clubEmail: email(o.clubEmail) || d.clubEmail,
      instagram: url(o.instagram) || d.instagram,
      facebook: url(o.facebook) || d.facebook,
      beachXperience: url(o.beachXperience) || d.beachXperience,
      guideLicencie: url(o.guideLicencie) || d.guideLicencie,
      helloAssoProfile: url(o.helloAssoProfile) || d.helloAssoProfile,
      helloAssoBoutique: url(o.helloAssoBoutique) || d.helloAssoBoutique,
      helloAssoDon: url(o.helloAssoDon) || d.helloAssoDon,
      helloAssoMecenat: url(o.helloAssoMecenat) || d.helloAssoMecenat,
      helloAssoTournoi: url(o.helloAssoTournoi) || d.helloAssoTournoi,
    };
  },
};

/** `06 26 01 73 61` → `+33626017361`, pour le lien `tel:`. */
function toPhoneHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("0")) return `+33${digits.slice(1)}`;
  return digits;
}

function parseStaff(v: unknown, prefix: string): StaffMember[] {
  return list<StaffMember>(v, (o, index) => {
    const name = str(o.name, 80);
    if (!name) return null;
    const image = imagePath(o.image);
    return {
      id: slug(o.id, `${prefix}${index + 1}`),
      name,
      role: str(o.role, 120),
      pole: str(o.pole, 60) || "Bureau",
      ...(image ? { image } : {}),
    };
  });
}

/**
 * Nettoie un contenu partiel venu du navigateur.
 * Les clés inconnues sont ignorées ; une clé connue mais vide (liste vide,
 * texte vide) est également ignorée, pour qu'un formulaire à moitié envoyé
 * n'efface jamais une rubrique du site.
 */
export function parseSiteContent(input: unknown): Partial<SiteContent> {
  if (typeof input !== "object" || input === null) return {};
  const raw = input as Record<string, unknown>;
  const out: Partial<SiteContent> = {};

  for (const key of contentKeys) {
    if (!(key in raw)) continue;
    const parsed = parsers[key](raw[key]);
    if (Array.isArray(parsed) && parsed.length === 0) continue;
    if (typeof parsed === "string" && parsed === "") continue;
    (out as Record<string, unknown>)[key] = parsed;
  }

  return out;
}

import type {
  AgeCategory,
  ClubHighlight,
  CoachAssignment,
  FaqItem,
  LicenceFee,
  NavItem,
  Partner,
  Salle,
  ShopItem,
  StaffMember,
  Team,
  TimelineEvent,
  TrainingSlot,
} from "@/types";

/* ============================================================
   CONTACT & RÉSEAUX
   ============================================================ */
export const instagramUrl = "https://www.instagram.com/lacanauocehand/";
export const facebookUrl = "https://www.facebook.com/lacanau.OceHand/";
/** Adresse générique du club (boîte fédérale) : destinataire de tous les
    formulaires du site et seule adresse affichée publiquement. */
export const clubEmail = "6033152@na.ffhandball.net";
/** Les demandes d'inscription d'équipe arrivent dans la même boîte. */
export const teamSignupEmail = clubEmail;
export const beachXperienceUrl = "https://site-lbhx.vercel.app";

/* ============================================================
   NAVIGATION — 5 onglets essentiels d'un club de handball.
   « Contact » et « Beach Xperience » restent des boutons du
   header (cf. site-header) ; le pied de page reprend ces liens.
   ============================================================ */
export const navItems: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Nos équipes", href: "/equipes" },
  { label: "Beach", href: "/beach" },
  { label: "Le club", href: "/le-club" },
  { label: "Rejoindre", href: "/rejoindre" },
];

/* ============================================================
   ÉQUIPES — structurées par sous-menu (cf. maquette client)
   Seniors · Équipes jeunes · Beach Handball · École de gardien · École d'arbitrage
   ============================================================ */
export const teams: Team[] = [
  // --- SENIORS ---
  {
    slug: "seniors-masculins",
    name: "Seniors masculins",
    group: "seniors",
    age: "+16 ans",
    schedule: ["Mardi 20h15 · Cousteyre", "Vendredi 19h15 · Cosec"],
    coach: "Nils Bastien",
    description:
      "Notre groupe fanion, vainqueur de la Coupe de France 2024 et triple champion de Gironde. Intensité, vitesse et esprit de famille.",
    image: "/media/teams/seniors.jpg",
  },
  {
    slug: "seniors-loisirs",
    name: "Équipe loisirs",
    group: "seniors",
    age: "Adultes",
    schedule: ["Mercredi 20h15 · Cosec"],
    coach: "Hubert Gaget",
    description:
      "Le handball pour le plaisir, sans pression de classement. Une séance conviviale ouverte à tous les adultes, débutants bienvenus.",
    image: "/media/teams/loisirs.jpg",
  },

  // --- ÉQUIPES JEUNES ---
  {
    slug: "ecole-de-hand",
    name: "Baby & École de hand",
    group: "jeunes",
    age: "5 à 9 ans · Samedi matin",
    schedule: ["Samedi 11h00 · Cousteyre"],
    coach: "Virginie & Raphaël",
    description:
      "Découverte du jeu par des ateliers ludiques. Un cadre rassurant et joyeux pour les plus petits.",
    image: "/media/teams/ecole-de-hand.jpg",
  },
  {
    slug: "u11-mixtes",
    name: "U11 mixtes",
    group: "jeunes",
    age: "9 à 11 ans · Mercredi",
    schedule: ["Mercredi 17h45 · Cosec"],
    coach: "Bruno & Néné",
    description:
      "Apprentissage des règles de base et premiers tournois, à son propre rythme et en s'amusant.",
    image: "/media/teams/u11.jpg",
  },
  {
    slug: "u13-filles",
    name: "U13 filles",
    group: "jeunes",
    age: "11 à 13 ans",
    schedule: ["Mardi 17h15 · Cousteyre", "Vendredi 17h15 · Cousteyre"],
    coach: "Christophe Suire & Paul Mourioux",
    description:
      "Premières compétitions départementales pour les filles, dans la bonne humeur et l'esprit d'équipe. Entraînements en groupe mixte U13.",
    image: "/media/teams/u13-filles.jpg",
  },
  {
    slug: "u13-garcons",
    name: "U13 garçons",
    group: "jeunes",
    age: "11 à 13 ans",
    schedule: ["Mardi 17h15 · Cousteyre", "Vendredi 17h15 · Cousteyre"],
    coach: "Alex D. & Steve",
    description:
      "Développement technique et tactique pour les garçons, vers plus d'autonomie sur le terrain. Entraînements en groupe mixte U13.",
    image: "/media/teams/u13-garcons.jpg",
  },
  {
    slug: "u15-filles",
    name: "U15 filles",
    group: "jeunes",
    age: "13 à 15 ans",
    schedule: ["Lundi 18h45 · Lège-Cap-Ferret", "Jeudi 18h45 · Lège-Cap-Ferret"],
    coach: "Clement & Joan",
    description:
      "Compétitions régionales et progression collective pour les filles du club, en entente à Lège-Cap-Ferret.",
    image: "/media/teams/u15-filles.jpg",
  },
  {
    slug: "u15-garcons",
    name: "U15 garçons",
    group: "jeunes",
    age: "13 à 15 ans",
    schedule: ["Mardi 18h45 · Cousteyre", "Vendredi 18h45 · Cousteyre"],
    coach: "Paul Mourioux & Alexis G.",
    description:
      "Intensité et cohésion pour les garçons, à un âge clé de la formation.",
    image: "/media/teams/u15-garcons.jpg",
  },
  {
    slug: "u18",
    name: "U18",
    group: "jeunes",
    age: "15 à 18 ans · 3 groupes",
    schedule: [
      "Garçons · Mercredi 18h30 · Lège-Cap-Ferret",
      "Garçons · Vendredi 19h15 · Cosec",
      "Filles D/R · Mercredi 19h00 · Cosec",
      "Filles D/R · Vendredi 19h30 · Saint-Médard",
      "Filles Nationale · Mercredi 18h00 · Saint-Médard",
      "Filles Nationale · Vendredi 19h00 · Lège-Cap-Ferret",
    ],
    coach: "Léo, Cedrick, Hugo & Joan",
    description:
      "Performance et cohésion à l'approche du niveau senior. Trois groupes en entente : garçons, filles Départemental/Régional et filles Nationale, entre Lacanau, Lège-Cap-Ferret et Saint-Médard.",
    image: "/media/teams/u18.jpg",
  },

  // --- BEACH ---
  {
    slug: "beach-handball",
    name: "Beach handball",
    group: "beach",
    age: "Dès U13 · Mai à Août",
    schedule: ["Format 4 + 1 joueurs", "Saison de mai à août"],
    coach: "Paul Mourioux & Léo",
    description:
      "Le handball dans sa version estivale et festive, joué sur le sable à deux pas de l'océan. Créativité, vitesse et gestes spectaculaires.",
    image: "/media/teams/beach.jpg",
  },

  // --- ÉCOLE DE GARDIEN ---
  {
    slug: "ecole-de-gardien",
    name: "École de gardien",
    group: "gardien",
    age: "Tous niveaux",
    schedule: ["Mercredi 17h00 → 18h00 · Cosec"],
    coach: "Bruno & Alexis G.",
    description:
      "Un encadrement spécifique pour progresser dans les cages : placement, réflexes et lecture du jeu.",
    image: "/media/teams/ecole-gardien.jpg",
  },

  // --- ÉCOLE D'ARBITRAGE ---
  {
    slug: "ecole-arbitrage",
    name: "École d'arbitrage",
    group: "arbitrage",
    age: "Dès 13 ans",
    schedule: ["Formation continue"],
    coach: "Céline Dirson & Samantha",
    description:
      "Apprendre à arbitrer, comprendre les règles et accompagner les rencontres du club avec confiance.",
    image: "/media/teams/ecole-arbitrage.jpg",
  },
];

/* `color` = aplat décoratif (filet de carte). `ink` = même teinte, mais
   lisible : c'est elle qu'on utilise dès qu'il y a du texte blanc dessus
   ou une icône porteuse de sens. */
export const teamGroups: {
  id: Team["group"];
  label: string;
  color: string;
  ink: string;
}[] = [
  { id: "seniors", label: "Seniors", color: "var(--c-senior)", ink: "var(--c-senior)" },
  { id: "jeunes", label: "Équipes jeunes", color: "var(--c-jeunes)", ink: "var(--c-jeunes-ink)" },
  { id: "beach", label: "Beach handball", color: "var(--c-beach)", ink: "var(--c-beach-ink)" },
  { id: "gardien", label: "École de gardien", color: "var(--c-gardien)", ink: "var(--c-gardien)" },
  { id: "arbitrage", label: "École d'arbitrage", color: "var(--c-arbitrage)", ink: "var(--c-arbitrage-ink)" },
];

/* ============================================================
   HISTOIRE (réelle)
   ============================================================ */
export const timelineEvents: TimelineEvent[] = [
  {
    year: "2017",
    title: "Naissance du club",
    description:
      "Le 4 juin 2017, Thierry Mayeur fonde Lacanau Océhand en famille pour offrir aux Canaulais un club de handball.",
    image: "/media/club/histoire-club.jpg",
  },
  {
    year: "2022",
    title: "Premier titre majeur",
    description:
      "Les seniors deviennent champions de Gironde, point de départ d'une domination départementale.",
    image: "/media/teams/seniors-groupe.jpg",
  },
  {
    year: "2023",
    title: "Top 8 national",
    description:
      "Quart de finaliste de la Coupe de France : le club termine dans les 8 meilleurs sur 1 000 équipes engagées.",
    image: "/media/action/duel-1.jpg",
  },
  {
    year: "2024",
    title: "Champions de France à Bercy",
    description:
      "Sacre en Coupe de France départementale face à Ste Gemmes sur Loire (30-29), à l'Accor Arena.",
    image: "/media/club/champions-2024.jpg",
  },
  {
    year: "2026",
    title: "Champions de France de beach handball",
    description:
      "Deux ans après Bercy, le club décroche un second titre national, cette fois sur le sable : champion de France de beach handball.",
    image: "/media/club/hero-beach-trophee.jpg",
  },
];

/* ============================================================
   SALLES (réelles)
   ============================================================ */
export const salles: Salle[] = [
  {
    name: "Salle de la Cousteyre",
    usage: "Salle omnisports, entraînements & matchs à domicile",
    address: "Lacanau",
    image: "/media/club/salle-cousteyre.jpg",
  },
  {
    name: "Le Cosec",
    usage: "Créneaux d'entraînement complémentaires",
    address: "Lacanau",
    image: "/media/club/gymnase-cousteyre.jpg",
  },
  {
    name: "Pôle de l'Ardilouse",
    usage: "Beach handball, terrains sur sable",
    address: "Lacanau-Océan",
    image: "/media/club/pole-ardilouse.jpg",
  },
];

/* ============================================================
   STAFF (réel)
   ============================================================ */
export const bureau: StaffMember[] = [
  {
    id: "b1",
    name: "Thierry Mayeur",
    role: "Président",
    pole: "Bureau",
    image: "/media/staff/thierry-mayeur.jpg",
  },
  {
    id: "b2",
    name: "Christophe Suire",
    role: "Vice-président",
    pole: "Bureau",
    image: "/media/staff/christophe-suire.jpg",
  },
  {
    id: "b3",
    name: "Cédrick Naffrichoux",
    role: "Trésorier",
    pole: "Bureau",
  },
  {
    id: "b4",
    name: "Anne-Laure Bondy",
    role: "Trésorière adjointe",
    pole: "Bureau",
    image: "/media/staff/anne-laure-bondy.jpg",
  },
  {
    id: "b5",
    name: "Johan Lococo",
    role: "Secrétaire",
    pole: "Bureau",
    image: "/media/staff/johan-lococo.jpg",
  },
  {
    id: "b6",
    name: "Hubert Gaget",
    role: "Membre",
    pole: "Bureau",
    image: "/media/staff/hubert-gaget.jpg",
  },
  {
    id: "b7",
    name: "Carinne Laborde",
    role: "Membre",
    pole: "Bureau",
    image: "/media/staff/carine-laborde.jpg",
  },
  {
    id: "b8",
    name: "Steve Lozano",
    role: "Membre",
    pole: "Bureau",
    image: "/media/staff/steeve-lozano.jpg",
  },
];

export const staffMembers: StaffMember[] = [
  { id: "s1", name: "Paul Mourioux", role: "Responsable équipes jeunes", pole: "Technique", image: "/media/staff/paul-mourioux.jpg" },
  { id: "s2", name: "Hubert Gaget", role: "Entraîneur", pole: "Technique", image: "/media/staff/hubert-gaget.jpg" },
  { id: "s3", name: "Nils Bastien", role: "Entraîneur seniors", pole: "Technique" },
  { id: "s4", name: "Hubert Gaget", role: "Entraîneur loisirs", pole: "Loisirs", image: "/media/staff/hubert-gaget.jpg" },
  { id: "s5", name: "Guillaume Taudin", role: "Responsable communication", pole: "Communication", image: "/media/staff/guillaume-taudin.jpg" },
  { id: "s6", name: "Céline Dirson", role: "École d'arbitrage", pole: "Arbitrage", image: "/media/staff/celine-ecole-arbitrage.jpg" },
];

/* ============================================================
   LICENCE — avantages inclus. Montants et conditions issus du
   guide du licencié (cf. licenceFees / licenceNotes plus bas).
   ============================================================ */
export const pricingPerks: string[] = [
  "Licence de 140 € à 200 € selon la catégorie, 100 € en beach handball",
  "Règlement possible en plusieurs mensualités",
  "Forfait famille : −15 € par licence supplémentaire d'une même famille",
  "Pass'Sport accepté",
  "Équipement (maillot, short, chaussettes) inclus dans la licence",
  "Hand + beach : seule la licence la plus chère est due",
];

export const playerCategories = [
  "U9",
  "U11",
  "U13",
  "U15",
  "U18",
  "Senior",
  "Loisirs",
];

export const volunteerRoles = [
  "Table de marque",
  "Restauration",
  "Communication",
  "Pas de préférence",
];

/* ============================================================
   FAQ — SEO (FAQPage schema). Réponses courtes, mot-clé Lacanau.
   ============================================================ */
export const faqItems: FaqItem[] = [
  {
    question: "Où jouer au handball à Lacanau ?",
    answer:
      "Lacanau Océhand accueille tous les niveaux, du baby hand aux seniors, en salle et en beach handball. Les entraînements ont lieu à la salle de la Cousteyre, au Cosec ou à l'Ardilouse pour le Beach Handball.",
  },
  {
    question: "Comment s'inscrire au club de handball de Lacanau ?",
    answer:
      "Remplissez le formulaire joueur de la page « Rejoindre ». Les licenciés de la saison précédente reçoivent directement un email de la fédération.",
  },
  {
    question: "À partir de quel âge peut-on commencer ?",
    answer:
      "Dès 5 ans avec le baby handball et l'école de hand, dans un cadre ludique, sécurisé et encadré par des bénévoles formés.",
  },
  {
    question: "Le club propose-t-il du beach handball ?",
    answer:
      "Oui. Notre section beach handball est ouverte dès l'U13 et aux adultes, sur le sable du Pôle de l'Ardilouse de mai à août.",
  },
  {
    question: "Où se déroulent les entraînements ?",
    answer:
      "À la salle omnisports de la Cousteyre, au Cosec, et au Pôle de l'Ardilouse pour la pratique du beach handball.",
  },
  {
    question: "Quel est le palmarès du club ?",
    answer:
      "Lacanau Océhand est vainqueur de la Coupe de France départementale 2024 et triple champion de Gironde (2022, 2023, 2024) et champion de France 2026 de Beach handball.",
  },
  {
    question: "Combien coûte une licence de handball à Lacanau ?",
    answer:
      "De 140 € (Mini Hand) à 200 € (seniors) pour le handball en salle, 100 € en beach handball pour les moins de 16 ans et 100 € au-delà. Le règlement peut être échelonné sur plusieurs mensualités.",
  },
  {
    question: "Quels sont les horaires d'entraînement ?",
    answer:
      "Les créneaux vont du lundi au samedi, à la salle de la Cousteyre et au Cosec de Lacanau, ainsi qu'à Lège-Cap-Ferret et Saint-Médard pour certains groupes U15 et U18. Le détail figure sur la page « Nos équipes ».",
  },
  {
    question: "Existe-t-il des aides pour payer la licence ?",
    answer:
      "Oui : le Pass'Sport est accepté, une remise de 15 € s'applique à chaque licence supplémentaire d'une même famille, et un joueur inscrit en hand et en beach ne paie que la licence la plus chère.",
  },
  {
    question: "Où rencontrer le club avant de s'inscrire ?",
    answer:
      "Au Forum des associations de Lacanau, le samedi 5 septembre de 10h à 15h, à la salle des fêtes et au Cosec. Les bénévoles du club y répondent à toutes les questions.",
  },
];

/* ============================================================
   PARTENAIRES
   ============================================================ */
export const partners: Partner[] = [
  { id: "p1", name: "VitalParc Hôtel & Spa", website: "https://www.vitalparc.com/", logo: "/partners/vitalparc.png" },
  { id: "p2", name: "Briconautes Lacanau", website: "https://magasin.leclub-bricolage.fr/38-briconautes-lacanau", logo: "/partners/briconautes.png" },
  { id: "p3", name: "Médoc Atlantique", website: "https://www.medoc-atlantique.com/", logo: "/partners/medoc-atlantique.png" },
  { id: "p4", name: "Efficity, Julie & David", website: "#", logo: "/partners/efficity.png" },
  { id: "p5", name: "209 Agency", website: "https://www.209-agency.com/", logo: "/partners/209-agency.png" },
  { id: "p6", name: "Désirs2Rêves", website: "https://desirs2reves.com/", logo: "/partners/desirs2reves.jpg" },
  { id: "p7", name: "HandShoot", website: "#", logo: "/partners/handshoot.png" },
  { id: "p8", name: "Ville de Lacanau", website: "https://www.lacanau.fr/", logo: "/partners/ville-de-lacanau.png" },
];

/* ============================================================
   FÉDÉRATION
   ============================================================ */
export const federationLogos = [
  { name: "Fédération Française de Handball", logo: "/federation/ffhb.png" },
  { name: "Ligue Nouvelle-Aquitaine de Handball", logo: "/federation/ligue-nouvelle-aquitaine.png" },
  { name: "Comité de Gironde de Handball", logo: "/federation/comite-gironde-handball.png" },
];

/* ============================================================
   GALERIE — photos d'action uniques (page Coupe de France 2024)
   ============================================================ */
export const galleryItems = [
  { src: "/media/action/jump-1.jpg", alt: "Joueuse à la lutte au tir en suspension" },
  { src: "/media/action/jump-2.jpg", alt: "Jeune joueur en suspension à Lacanau" },
  { src: "/media/action/run-1.jpg", alt: "Jeune joueur en contre-attaque" },
  { src: "/media/club/nathand-fluo.jpg", alt: "Soirée NatHand Fluo au gymnase" },
];

/* ============================================================
   CATÉGORIES D'ÂGE (recrutement)
   ============================================================ */
export const ageCategories: AgeCategory[] = [
  { label: "Mini Hand", age: "−9 ans", note: "Nés de 2021 à 2018", accent: "var(--c-jeunes)" },
  { label: "U11", age: "−11 ans", note: "Nés en 2017 et 2016", accent: "var(--c-jeunes-ink)" },
  { label: "U13", age: "−13 ans", note: "Nés en 2015 et 2014", accent: "var(--c-jeunes)" },
  { label: "U15", age: "−15 ans", note: "Nés en 2013 et 2012", accent: "var(--c-jeunes-ink)" },
  { label: "U18", age: "−18 ans", note: "Nés de 2011 à 2009", accent: "var(--c-jeunes)" },
  { label: "Seniors", age: "+16 ans", note: "Compétition & loisirs", accent: "var(--c-senior)" },
  { label: "Beach handball", age: "Dès U13", note: "Mai → Août", accent: "var(--c-beach)" },
];

/* ============================================================
   GUIDE DU LICENCIÉ — document officiel du club (PDF)
   public/documents/guide-licencie.pdf
   Toutes les données ci-dessous en sont la transcription
   fidèle : tarifs, créneaux et encadrement par catégorie.
   ============================================================ */
export const licenceSeason = "2025-2026";
export const guideLicencieUrl = "/documents/guide-licencie.pdf";

/* --- Prix des licences ------------------------------------ */
export const licenceFees: LicenceFee[] = [
  { category: "Mini Hand", birthYears: "2021 → 2018", price: 140, kind: "salle" },
  { category: "−11 ans", birthYears: "2017 – 2016", price: 160, kind: "salle" },
  { category: "−13 ans", birthYears: "2015 – 2014", price: 180, kind: "salle" },
  { category: "−15 ans", birthYears: "2013 – 2012", price: 180, kind: "salle" },
  { category: "−18 ans", birthYears: "2011 – 2010 – 2009", price: 180, kind: "salle" },
  { category: "Seniors (+16 ans)", price: 200, kind: "salle" },
  { category: "Loisirs", price: 180, kind: "salle" },
  { category: "Beach handball", price: 100, kind: "beach" },
];

/** Conditions et aides applicables à la cotisation.
    NB : le règlement en plusieurs mensualités est mis en avant
    séparément dans le composant LicenceFees, pas répété ici. */
export const licenceNotes: { title: string; detail: string }[] = [
  {
    title: "Forfait famille",
    detail:
      "Remise de 15 € par inscription supplémentaire au sein d'une même famille.",
  },
  {
    title: "Pass'Sport",
    detail:
      "Le club accepte le Pass'Sport, l'allocation de rentrée sportive de l'État.",
  },
  {
    title: "Hand + beach : une seule licence payante",
    detail:
      "Si un même joueur souscrit plusieurs licences (hand et beach) dans le club, il ne s'acquitte que de la licence la plus chère.",
  },
  {
    title: "Équipement inclus",
    detail: "Maillot, short et chaussettes sont fournis avec la licence.",
  },
  {
    title: "Renouvellement",
    detail:
      "Les licenciés de la saison précédente renouvellent leur licence via le lien reçu par email de la fédération.",
  },
];

/* --- Créneaux d'entraînement hebdomadaires ------------------ */
export const trainingSlots: TrainingSlot[] = [
  // LUNDI
  { day: "Lundi", time: "18h45", group: "U15 filles", kind: "jeunes", venue: "Gymnase", city: "Lège-Cap-Ferret" },

  // MARDI — Cousteyre, Lacanau
  { day: "Mardi", time: "17h15", group: "U13 mixte", kind: "jeunes", venue: "Cousteyre", city: "Lacanau" },
  { day: "Mardi", time: "18h45", group: "U15 garçons", kind: "jeunes", venue: "Cousteyre", city: "Lacanau" },
  { day: "Mardi", time: "20h15", group: "Seniors masculins", kind: "seniors", venue: "Cousteyre", city: "Lacanau" },

  // MERCREDI — Cosec (Lacanau) + ententes
  { day: "Mercredi", time: "17h00 → 18h00", group: "École de gardiens", kind: "gardien", venue: "Cosec", city: "Lacanau" },
  { day: "Mercredi", time: "17h45", group: "U11 mixte", kind: "jeunes", venue: "Cosec", city: "Lacanau" },
  { day: "Mercredi", time: "18h00", group: "U18 filles · Nationale", kind: "jeunes", venue: "Gymnase", city: "Saint-Médard" },
  { day: "Mercredi", time: "18h30", group: "U18 garçons", kind: "jeunes", venue: "Gymnase", city: "Lège-Cap-Ferret" },
  { day: "Mercredi", time: "19h00", group: "U18 filles · D/R", kind: "jeunes", venue: "Cosec", city: "Lacanau" },
  { day: "Mercredi", time: "20h15", group: "Loisirs", kind: "loisirs", venue: "Cosec", city: "Lacanau" },

  // JEUDI
  { day: "Jeudi", time: "18h45", group: "U15 filles", kind: "jeunes", venue: "Gymnase", city: "Lège-Cap-Ferret" },

  // VENDREDI — Cousteyre puis Cosec + ententes
  { day: "Vendredi", time: "17h15", group: "U13 mixte", kind: "jeunes", venue: "Cousteyre", city: "Lacanau" },
  { day: "Vendredi", time: "18h45", group: "U15 garçons", kind: "jeunes", venue: "Cousteyre", city: "Lacanau" },
  { day: "Vendredi", time: "19h00", group: "U18 filles · Nationale", kind: "jeunes", venue: "Gymnase", city: "Lège-Cap-Ferret" },
  { day: "Vendredi", time: "19h15", group: "Seniors", kind: "seniors", venue: "Cosec", city: "Lacanau" },
  { day: "Vendredi", time: "19h15", group: "U18 garçons", kind: "jeunes", venue: "Cosec", city: "Lacanau" },
  { day: "Vendredi", time: "19h30", group: "U18 filles · D/R (Sud Médoc)", kind: "jeunes", venue: "Gymnase", city: "Saint-Médard" },

  // SAMEDI
  { day: "Samedi", time: "11h00", group: "U9 mixte", kind: "jeunes", venue: "Cousteyre", city: "Lacanau" },
];

/** Ordre d'affichage de la semaine. */
export const trainingDays = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
] as const;

/** Légende de couleurs des créneaux (reprend les accents du site). */
export const trainingKinds: {
  id: TrainingSlot["kind"];
  label: string;
  color: string;
}[] = [
  { id: "jeunes", label: "Équipes jeunes", color: "var(--c-jeunes-ink)" },
  { id: "seniors", label: "Seniors", color: "var(--c-senior)" },
  { id: "loisirs", label: "Loisirs", color: "var(--c-arbitrage-ink)" },
  { id: "gardien", label: "École de gardiens", color: "var(--c-gardien)" },
];

/* --- Encadrement par catégorie ------------------------------ */
export const coachAssignments: CoachAssignment[] = [
  { category: "U9 / U7 mixte", coaches: ["Virginie", "Raphaël"], coordinator: "Paul" },
  { category: "U11 mixte", coaches: ["Bruno", "Néné"], coordinator: "Paul" },
  { category: "U13 filles", coaches: ["Christophe", "Paul"], coordinator: "Paul" },
  { category: "U13 garçons", coaches: ["Alex D.", "Steve"], coordinator: "Paul" },
  { category: "U15 filles", coaches: ["Clement", "Joan"], coordinator: "Paul" },
  { category: "U15 garçons", coaches: ["Paul", "Alexis G."], coordinator: "Paul" },
  { category: "U18 garçons", coaches: ["Léo", "Cedrick"], coordinator: "Paul" },
  { category: "U18 filles", coaches: ["Hugo", "Joan"], coordinator: "Paul" },
  { category: "Loisirs", coaches: ["Hubert"] },
  { category: "Seniors garçons", coaches: ["Nils"] },
  { category: "École de gardiens", coaches: ["Bruno", "Alexis G."] },
  { category: "École de beach handball", coaches: ["Paul", "Léo"] },
  { category: "AS Collège", coaches: ["Paul", "Léo"] },
  { category: "Arbitrage", coaches: ["Céline", "Samantha"] },
];

/** Référent de la filière jeunes — contact direct publié dans le guide. */
export const youthLead = {
  name: "Paul Mourioux",
  role: "Responsable de la filière jeunes",
  phone: "06 26 01 73 61",
  /** Format international, sans espaces, pour le lien cliquable. */
  phoneHref: "+33626017361",
  image: "/media/staff/paul-mourioux.jpg",
};

/* ============================================================
   HELLOASSO — billetterie, boutique et dons en ligne du club
   https://www.helloasso.com/associations/lacanau-ocehand
   ============================================================ */
export const helloAsso = {
  profile: "https://www.helloasso.com/associations/lacanau-ocehand",
  boutique:
    "https://www.helloasso.com/associations/lacanau-ocehand/boutiques/beach-hand",
  don: "https://www.helloasso.com/associations/lacanau-ocehand/formulaires/1",
  mecenat:
    "https://www.helloasso.com/associations/lacanau-ocehand/formulaires/2",
  tournoiPartenaires:
    "https://www.helloasso.com/associations/lacanau-ocehand/evenements/tournoi-partenaires-lbhx-2026",
};

/** Articles de la boutique « Beach Hand » (HelloAsso). */
export const shopItems: ShopItem[] = [
  { name: "Teddy", price: 45, note: "Bordeaux" },
  { name: "Sweat à capuche", price: 40, note: "Bleu · Vert · Bordeaux" },
  { name: "Maillot de beach handball", price: 35, note: "Blanc · Noir" },
  { name: "Sweat à capuche enfant", price: 30, note: "Bleu clair" },
  { name: "T-shirt", price: 20, note: "Homme · Femme · Enfant" },
  { name: "Casquette", price: 20, note: "Bleue · Grise" },
  { name: "Bob", price: 20, note: "Bleu · Sable" },
  { name: "Gourde", price: 20, note: "Taille unique" },
];

/** Options de livraison proposées dans la boutique. */
export const shopShipping =
  "Livraison en option : 5,25 € pour un maillot, 9,90 € au-delà de cinq maillots.";

/* ============================================================
   RENDEZ-VOUS À VENIR
   Le bandeau d'accueil disparaît automatiquement après endDate.
   ============================================================ */
export const forumAssociations: ClubHighlight = {
  title: "Forum des associations",
  startDate: "2026-09-05T10:00:00+02:00",
  endDate: "2026-09-05T15:00:00+02:00",
  dateLabel: "Samedi 5 septembre",
  timeLabel: "10h → 15h",
  venue: "Salle des fêtes & Cosec",
  city: "Lacanau",
  description:
    "Le club de handball & beach handball sera présent au Forum des associations. Venez découvrir le club, échanger avec nos bénévoles et pourquoi pas vous laisser tenter !",
  cta: { label: "Préparer mon inscription", href: "/rejoindre" },
};

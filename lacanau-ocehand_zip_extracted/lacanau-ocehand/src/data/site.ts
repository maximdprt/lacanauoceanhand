import type {
  ClubStat,
  FaqItem,
  MatchItem,
  NavItem,
  NewsItem,
  Palmares,
  Partner,
  PricingRow,
  Salle,
  StaffMember,
  Team,
  TimelineEvent,
} from "@/types";

/* ============================================================
   CONTACT & RÉSEAUX
   ============================================================ */
export const instagramUrl = "https://www.instagram.com/lacanauocehand/";
export const facebookUrl = "https://www.facebook.com/lacanau.OceHand/";
export const clubEmail = "contact@lacanau-ocehand.fr";

/* ============================================================
   NAVIGATION
   ============================================================ */
export const navItems: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Le club", href: "/le-club" },
  { label: "Nos équipes", href: "/equipes" },
  { label: "La saison", href: "/saison" },
  { label: "Actualités", href: "/evenements" },
  { label: "Rejoindre", href: "/rejoindre" },
  { label: "Contact", href: "/contact" },
];

/* ============================================================
   CHIFFRES CLÉS (réels)
   ============================================================ */
export const clubStats: ClubStat[] = [
  { label: "Coupe de France", value: 1, suffix: "" },
  { label: "Licenciés", value: 150, suffix: "+" },
  { label: "Équipes", value: 9 },
  { label: "Titres de Gironde", value: 3, suffix: "×" },
];

/* ============================================================
   MATCH CENTER
   ⚠️ À mettre à jour avec le calendrier réel de la saison.
   « latestResults » ci-dessous reprend le parcours réel
   de la Coupe de France 2024 (exacts).
   ============================================================ */
export const upcomingMatches: MatchItem[] = [
  {
    id: "u1",
    date: "Samedi · 19h30",
    competition: "Championnat départemental",
    opponent: "À programmer",
    location: "Salle de la Cousteyre",
    isHome: true,
  },
  {
    id: "u2",
    date: "Samedi · 18h00",
    competition: "Championnat départemental",
    opponent: "À programmer",
    location: "Extérieur",
    isHome: false,
  },
  {
    id: "u3",
    date: "Dimanche · 16h00",
    competition: "Coupe",
    opponent: "À programmer",
    location: "Salle de la Cousteyre",
    isHome: true,
  },
];

export const latestResults: MatchItem[] = [
  {
    id: "r1",
    date: "20 avril 2024 · Bercy",
    competition: "Finale Coupe de France",
    opponent: "Ste Gemmes sur Loire",
    location: "Accor Arena, Paris",
    isHome: true,
    score: "30 - 29",
  },
  {
    id: "r2",
    date: "Mars 2024 · 1/8",
    competition: "Coupe de France",
    opponent: "HBC Lourdais",
    location: "Bergerac",
    isHome: true,
    score: "28 - 17",
  },
  {
    id: "r3",
    date: "Mars 2024 · 1/16",
    competition: "Coupe de France",
    opponent: "SC Gourdon Handball",
    location: "Bergerac",
    isHome: true,
    score: "26 - 15",
  },
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
    schedule: ["Lundi 20h00", "Mercredi 20h00"],
    coach: "Thierry Mayeur",
    description:
      "Notre groupe fanion, vainqueur de la Coupe de France 2024 et triple champion de Gironde. Intensité, vitesse et esprit de famille.",
    image: "/media/teams/seniors-groupe.jpg",
  },
  {
    slug: "seniors-loisirs",
    name: "Équipe loisirs",
    group: "seniors",
    age: "Adultes",
    schedule: ["Vendredi 20h30"],
    coach: "Hubert Gaget",
    description:
      "Le handball pour le plaisir, sans pression de classement. Une séance conviviale ouverte à tous les adultes, débutants bienvenus.",
    image: "/media/teams/senior-masculine.jpg",
  },

  // --- ÉQUIPES JEUNES ---
  {
    slug: "baby-handball",
    name: "Baby handball",
    group: "jeunes",
    age: "5 – 7 ans · Samedi matin",
    schedule: ["Samedi 09h00"],
    coach: "Encadrement dédié",
    description:
      "Découverte du jeu par des ateliers ludiques. Un cadre rassurant et joyeux pour les plus petits.",
    image: "/media/teams/ecole-de-hand.jpg",
  },
  {
    slug: "u9-u11",
    name: "U9 – U11",
    group: "jeunes",
    age: "7 – 11 ans · Mercredi + samedi",
    schedule: ["Mercredi 16h30", "Samedi 10h00"],
    coach: "Steeve Martin-Pavailler",
    description:
      "Apprentissage des règles de base et premiers tournois, à son propre rythme et en s'amusant.",
    image: "/media/teams/u11-mixte.jpg",
  },
  {
    slug: "u13-u15",
    name: "U13 – U15",
    group: "jeunes",
    age: "11 – 15 ans · Mardi + vendredi",
    schedule: ["Mardi 18h00", "Vendredi 18h30"],
    coach: "Christophe Suire",
    description:
      "Compétitions régionales et développement tactique, vers plus d'autonomie sur le terrain.",
    image: "/media/teams/u15-masculine.jpg",
  },
  {
    slug: "u18",
    name: "U18",
    group: "jeunes",
    age: "15 – 18 ans · Lundi + jeudi",
    schedule: ["Lundi 19h00", "Jeudi 19h00"],
    coach: "Yann Bidon",
    description:
      "Performance et cohésion à l'approche du niveau senior, dans la continuité de la formation du club.",
    image: "/media/teams/u18-masculine.jpg",
  },

  // --- BEACH ---
  {
    slug: "beach-handball",
    name: "Beach handball",
    group: "beach",
    age: "Dès U13 · Mai – Août",
    schedule: ["Format 4 + 1 joueurs"],
    coach: "Bénévoles dédiés",
    description:
      "Le handball dans sa version estivale et festive, joué sur le sable à deux pas de l'océan. Créativité, vitesse et gestes spectaculaires.",
    image: "/media/teams/beach-team.jpg",
  },

  // --- ÉCOLE DE GARDIEN ---
  {
    slug: "ecole-de-gardien",
    name: "École de gardien",
    group: "gardien",
    age: "Tous niveaux",
    schedule: ["Selon catégories"],
    coach: "Staff gardiens",
    description:
      "Un encadrement spécifique pour progresser dans les cages : placement, réflexes et lecture du jeu.",
    image: "/media/teams/ecole-gardiens.jpg",
  },

  // --- ÉCOLE D'ARBITRAGE ---
  {
    slug: "ecole-arbitrage",
    name: "École d'arbitrage",
    group: "arbitrage",
    age: "Dès 13 ans",
    schedule: ["Formation continue"],
    coach: "Céline",
    description:
      "Apprendre à arbitrer, comprendre les règles et accompagner les rencontres du club avec confiance.",
    image: "/media/teams/ecole-arbitrage.jpg",
  },
];

export const teamGroups: { id: Team["group"]; label: string; color: string }[] = [
  { id: "seniors", label: "Seniors", color: "var(--c-senior)" },
  { id: "jeunes", label: "Équipes jeunes", color: "var(--c-jeunes)" },
  { id: "beach", label: "Beach handball", color: "var(--c-beach)" },
  { id: "gardien", label: "École de gardien", color: "var(--c-gardien)" },
  { id: "arbitrage", label: "École d'arbitrage", color: "var(--c-arbitrage)" },
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
  },
  {
    year: "2022",
    title: "Premier titre majeur",
    description:
      "Les seniors deviennent champions de Gironde, point de départ d'une domination départementale.",
  },
  {
    year: "2023",
    title: "Top 8 national",
    description:
      "Quart de finaliste de la Coupe de France : le club termine dans les 8 meilleurs sur 1 000 équipes engagées.",
  },
  {
    year: "2024",
    title: "Champions de France à Bercy",
    description:
      "Sacre en Coupe de France départementale face à Ste Gemmes sur Loire (30-29), à l'Accor Arena.",
  },
];

export const palmares: Palmares[] = [
  {
    season: "2023 – 2024",
    lines: [
      "Vainqueurs de la Coupe de France départementale (30-29 vs Ste Gemmes sur Loire)",
      "Champions de Gironde — Seniors garçons (22V · 0N · 0D)",
    ],
  },
  {
    season: "2022 – 2023",
    lines: [
      "Champions de Gironde — Seniors garçons (27V · 0N · 0D)",
      "1/4 de finaliste Coupe de France (top 8 / 1 000 équipes)",
    ],
  },
  {
    season: "2021 – 2022",
    lines: ["Champions de Gironde — Promotion (15V · 3N · 1D)"],
  },
];

/* ============================================================
   SALLES (réelles)
   ============================================================ */
export const salles: Salle[] = [
  {
    name: "Salle de la Cousteyre",
    usage: "Salle omnisports — entraînements & matchs à domicile",
    address: "Lacanau",
    image: "/media/club/gymnase-cousteyre.jpg",
  },
  {
    name: "Le Cosec",
    usage: "Créneaux d'entraînement complémentaires",
    address: "Lacanau",
  },
  {
    name: "Pôle de l'Ardilouse",
    usage: "Beach handball — terrains sur sable",
    address: "Lacanau-Océan",
  },
];

/* ============================================================
   STAFF (réel)
   ============================================================ */
export const bureau: StaffMember[] = [
  {
    id: "b1",
    name: "Thierry Mayeur",
    role: "Président & entraîneur +16",
    pole: "Bureau",
  },
  {
    id: "b2",
    name: "Sébastien Laborde",
    role: "Vice-président",
    pole: "Bureau",
  },
  {
    id: "b3",
    name: "Julie Boutet",
    role: "Secrétaire",
    pole: "Bureau",
    image: "/media/staff/julie-boutet.jpg",
  },
  {
    id: "b4",
    name: "Anne-Laure Picard Bondy",
    role: "Trésorière",
    pole: "Bureau",
    image: "/media/staff/anne-laure-bondy.jpg",
  },
];

export const staffMembers: StaffMember[] = [
  { id: "s1", name: "Paul Mourioux", role: "Responsable équipes jeunes", pole: "Technique" },
  { id: "s2", name: "Hubert Gaget", role: "Entraîneur loisirs", pole: "Technique" },
  { id: "s3", name: "Guillaume Taudin", role: "Responsable communication", pole: "Communication" },
  { id: "s4", name: "Steeve Martin-Pavailler", role: "Entraîneur U11", pole: "Technique" },
  { id: "s5", name: "Loïc Vergez", role: "Entraîneur U11 / U13", pole: "Technique" },
  { id: "s6", name: "Christophe Suire", role: "Entraîneur U13", pole: "Technique" },
  { id: "s7", name: "Fabien Boulanger", role: "Entraîneur U15", pole: "Technique" },
  { id: "s8", name: "Yann Bidon", role: "Entraîneur U18 (entente Bruges)", pole: "Technique" },
  { id: "s9", name: "Guillaume Giraudet-Bacchiolelli", role: "Entraîneur U9 / Baby", pole: "Technique" },
  { id: "s10", name: "Céline", role: "École d'arbitrage", pole: "Arbitrage", image: "/media/staff/celine-ecole-arbitrage.jpg" },
  { id: "s11", name: "Carine Laborde", role: "Dirigeante loisirs", pole: "Loisirs", image: "/media/staff/carinne-laborde.jpg" },
  { id: "s12", name: "Jean-Gilles Féron", role: "Podologue / Thérapeute", pole: "Santé" },
];

/* ============================================================
   TARIFS — montants indicatifs, à confirmer par le club.
   Faits réels conservés : forfait famille -15 €, Pass'Sport,
   équipement inclus, renouvellement par email fédéral.
   ============================================================ */
export const licensePricing: PricingRow[] = [
  { category: "Baby hand (U7 – U9)", fee: "Sur demande" },
  { category: "Jeunes (U11 – U18)", fee: "Sur demande" },
  { category: "Seniors", fee: "Sur demande" },
  { category: "Beach handball", fee: "Sur demande" },
];

export const pricingPerks: string[] = [
  "Forfait famille : −15 € par licence supplémentaire d'une même famille",
  "Pass'Sport accepté",
  "Équipement (maillot, short, chaussettes) inclus dans la licence",
  "Renouvellement via le lien reçu par email de la fédération",
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
   ACTUALITÉS (basées sur de vrais évènements)
   ============================================================ */
export const newsItems: NewsItem[] = [
  {
    id: "n1",
    title: "Lacanau remporte la Coupe de France 2024",
    excerpt:
      "Après 60 minutes intenses, nos seniors s'imposent 30-29 face à Ste Gemmes sur Loire, à Bercy.",
    date: "22 avril 2024",
    tags: ["Seniors", "Coupe de France"],
    cover: "/media/club/coupe-de-france-bercy.jpg",
    slug: "coupe-de-france-2024",
  },
  {
    id: "n2",
    title: "Nos seniors en finale à Bercy",
    excerpt:
      "Deux victoires en quart et demi-finale ouvrent les portes de l'Accor Arena. Un rêve de handballeur.",
    date: "18 avril 2024",
    tags: ["Seniors", "Coupe de France"],
    cover: "/media/teams/seniors-groupe.jpg",
    slug: "finale-bercy",
  },
  {
    id: "n3",
    title: "La section beach handball reprend",
    excerpt:
      "Dès l'U13 et pour les adultes, le beach handball revient sur le sable du Pôle de l'Ardilouse.",
    date: "Saison estivale",
    tags: ["Beach handball"],
    cover: "/media/teams/beach-team.jpg",
    slug: "beach-handball",
  },
];

/* ============================================================
   FAQ — SEO (FAQPage schema). Réponses courtes, mot-clé Lacanau.
   ============================================================ */
export const faqItems: FaqItem[] = [
  {
    question: "Où jouer au handball à Lacanau ?",
    answer:
      "Lacanau Océhand accueille tous les niveaux, du baby hand aux seniors, en salle et en beach handball. Les entraînements ont lieu à la salle de la Cousteyre.",
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
      "Lacanau Océhand est vainqueur de la Coupe de France départementale 2024 et triple champion de Gironde (2022, 2023, 2024).",
  },
];

/* ============================================================
   PARTENAIRES
   ============================================================ */
export const partners: Partner[] = [
  { id: "p1", name: "VitalParc", website: "https://cutt.ly/TwLceujd", logo: "/placeholders/partner-vitalparc.png" },
  { id: "p2", name: "Briconautes", website: "https://magasin.leclub-bricolage.fr/38-briconautes-lacanau", logo: "/placeholders/partner-briconautes.png" },
  { id: "p3", name: "Médoc Atlantique", website: "#", logo: "/placeholders/partner-medoc.png" },
  { id: "p4", name: "Ville de Lacanau", website: "https://www.lacanau.fr/", logo: "/placeholders/partner-ville-lacanau.jpg" },
  { id: "p5", name: "209 Agency", website: "https://www.209-agency.com/", logo: "/placeholders/partner-209.png" },
  { id: "p6", name: "Désirs2Rêves", website: "https://desirs2reves.com/", logo: "/placeholders/partner-desirs2reves.jpg" },
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
   GALERIE
   ============================================================ */
export const galleryItems = [
  { src: "/media/club/coupe-de-france-bercy.jpg", alt: "Sacre en Coupe de France 2024 à Bercy" },
  { src: "/media/teams/seniors-groupe.jpg", alt: "Équipe seniors de Lacanau Océhand" },
  { src: "/media/teams/beach-team.jpg", alt: "Section beach handball sur le sable" },
  { src: "/media/club/club-famille.jpg", alt: "La grande famille du club" },
];

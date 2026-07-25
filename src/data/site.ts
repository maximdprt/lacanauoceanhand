import type {
  AgeCategory,
  FaqItem,
  NavItem,
  Partner,
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
export const teamSignupEmail = "inscription-equipe@lacanau-ocehand.fr";
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
    schedule: ["Lundi 20h00", "Mercredi 20h00"],
    coach: "Thierry Mayeur",
    description:
      "Notre groupe fanion, vainqueur de la Coupe de France 2024 et triple champion de Gironde. Intensité, vitesse et esprit de famille.",
    image: "/media/teams/seniors.jpg",
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
    image: "/media/teams/loisirs.jpg",
  },

  // --- ÉQUIPES JEUNES ---
  {
    slug: "ecole-de-hand",
    name: "Baby & École de hand",
    group: "jeunes",
    age: "5 à 9 ans · Samedi matin",
    schedule: ["Samedi 09h00"],
    coach: "Guillaume Giraudet-Bacchiolelli",
    description:
      "Découverte du jeu par des ateliers ludiques. Un cadre rassurant et joyeux pour les plus petits.",
    image: "/media/teams/ecole-de-hand.jpg",
  },
  {
    slug: "u11-mixtes",
    name: "U11 mixtes",
    group: "jeunes",
    age: "9 à 11 ans · Mercredi + samedi",
    schedule: ["Mercredi 16h30", "Samedi 10h00"],
    coach: "Steeve Martin-Pavailler",
    description:
      "Apprentissage des règles de base et premiers tournois, à son propre rythme et en s'amusant.",
    image: "/media/teams/u11.jpg",
  },
  {
    slug: "u13-filles",
    name: "U13 filles",
    group: "jeunes",
    age: "11 à 13 ans",
    schedule: ["Mardi 18h00", "Vendredi 18h30"],
    coach: "Christophe Suire",
    description:
      "Premières compétitions départementales pour les filles, dans la bonne humeur et l'esprit d'équipe.",
    image: "/media/teams/u13-filles.jpg",
  },
  {
    slug: "u13-garcons",
    name: "U13 garçons",
    group: "jeunes",
    age: "11 à 13 ans",
    schedule: ["Mardi 18h00", "Vendredi 18h30"],
    coach: "Christophe Suire",
    description:
      "Développement technique et tactique pour les garçons, vers plus d'autonomie sur le terrain.",
    image: "/media/teams/u13-garcons.jpg",
  },
  {
    slug: "u15-filles",
    name: "U15 filles",
    group: "jeunes",
    age: "13 à 15 ans",
    schedule: ["Lundi 18h30", "Jeudi 18h30"],
    coach: "Fabien Boulanger",
    description:
      "Compétitions régionales et progression collective pour les filles du club.",
    image: "/media/teams/u15-filles.jpg",
  },
  {
    slug: "u15-garcons",
    name: "U15 garçons",
    group: "jeunes",
    age: "13 à 15 ans",
    schedule: ["Lundi 18h30", "Jeudi 18h30"],
    coach: "Fabien Boulanger",
    description:
      "Intensité et cohésion pour les garçons, à un âge clé de la formation.",
    image: "/media/teams/u15-garcons.jpg",
  },
  {
    slug: "u18",
    name: "U18 (entente Bruges)",
    group: "jeunes",
    age: "15 à 18 ans · Lundi + jeudi",
    schedule: ["Lundi 19h00", "Jeudi 19h00"],
    coach: "Yann Bidon",
    description:
      "Performance et cohésion à l'approche du niveau senior, en entente avec Bruges Le Bouscat.",
    image: "/media/teams/u18.jpg",
  },

  // --- BEACH ---
  {
    slug: "beach-handball",
    name: "Beach handball",
    group: "beach",
    age: "Dès U13 · Mai à Août",
    schedule: ["Format 4 + 1 joueurs"],
    coach: "Bénévoles dédiés",
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
    schedule: ["Selon catégories"],
    coach: "Staff gardiens",
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
    coach: "Céline Dirson",
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
    role: "Président & entraîneur +16",
    pole: "Bureau",
    image: "/media/staff/thierry-mayeur.jpg",
  },
  {
    id: "b2",
    name: "Sébastien Laborde",
    role: "Vice-président",
    pole: "Bureau",
    image: "/media/staff/sebastien-laborde.jpg",
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
  { id: "s1", name: "Paul Mourioux", role: "Responsable équipes jeunes", pole: "Technique", image: "/media/staff/paul-mourioux.jpg" },
  { id: "s2", name: "Hubert Gaget", role: "Entraîneur loisirs", pole: "Technique", image: "/media/staff/hubert-gaget.jpg" },
  { id: "s3", name: "Guillaume Taudin", role: "Responsable communication", pole: "Communication", image: "/media/staff/guillaume-taudin.jpg" },
  { id: "s4", name: "Steeve Lozano", role: "Entraîneur U11", pole: "Technique", image: "/media/staff/steeve-lozano.jpg" },
  { id: "s5", name: "Sandrine Blanc", role: "Dirigeante", pole: "Loisirs", image: "/media/staff/sandrine-blanc.jpg" },
  { id: "s6", name: "Fabien Boulanger", role: "Entraîneur U15", pole: "Technique" },
  { id: "s7", name: "Christophe Suire", role: "Entraîneur U13", pole: "Technique", image: "/media/staff/christophe-suire.jpg" },
  { id: "s8", name: "Yann Bidon", role: "Entraîneur U18 (entente Bruges)", pole: "Technique", image: "/media/staff/yann-bidon.jpg" },
  { id: "s9", name: "Guillaume Giraudet-Bacchiolelli", role: "Entraîneur U9 / Baby", pole: "Technique", image: "/media/staff/guillaume-giraudet.jpg" },
  { id: "s10", name: "Céline Dirson", role: "École d'arbitrage", pole: "Arbitrage", image: "/media/staff/celine-ecole-arbitrage.jpg" },
  { id: "s11", name: "Carine Laborde", role: "Dirigeante loisirs", pole: "Loisirs", image: "/media/staff/carine-laborde.jpg" },
  { id: "s12", name: "Jean-Gilles Féron", role: "Podologue / Thérapeute", pole: "Santé", image: "/media/staff/jean-gilles-feron.jpg" },
];

/* ============================================================
   LICENCE — avantages inclus (montants communiqués par le club
   sur demande). Faits réels : forfait famille −15 €, Pass'Sport,
   équipement inclus, renouvellement par email fédéral.
   ============================================================ */
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
  { label: "Baby & École de hand", age: "5 à 9 ans", note: "Éveil & motricité", accent: "var(--c-jeunes)" },
  { label: "Jeunes", age: "U11 → U18", note: "Filles & garçons", accent: "var(--c-senior)" },
  { label: "Seniors", age: "+16 ans", note: "Compétition & loisirs", accent: "var(--c-gardien)" },
  { label: "Beach handball", age: "Dès U13", note: "Mai → Août", accent: "var(--c-beach)" },
];

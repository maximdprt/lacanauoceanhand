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

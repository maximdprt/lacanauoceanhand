export type NavItem = {
  label: string;
  href: string;
};

export type ClubStat = {
  label: string;
  value: number;
  suffix?: string;
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
  logo?: string;
};

export type Team = {
  slug: string;
  name: string;
  category: string;
  coach: string;
  schedule: string[];
  description: string;
  image: string;
};

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  pole: "Direction" | "Sportif" | "Medical" | "Communication" | "Formation";
  image: string;
};

export type TimelineEvent = {
  year: string;
  title: string;
  description: string;
};

export type PricingRow = {
  category: string;
  fee: string;
};

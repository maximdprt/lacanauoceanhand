import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { teams } from "@/data/site";

type Route = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

/*
  NB : pas de lastModified — Google ignore une date identique sur
  toutes les URLs à chaque build (« fausse fraîcheur ») et finit
  par ne plus en tenir compte. Mieux vaut l'omettre que la simuler.
  priority/changeFrequency sont ignorés par Google mais lus par
  d'autres moteurs — conservés à titre indicatif.
*/

/* Pages statiques principales */
const staticRoutes: Route[] = [
  { path: "/",             priority: 1.0, changeFrequency: "weekly" },
  { path: "/le-club",      priority: 0.9, changeFrequency: "monthly" },
  { path: "/equipes",      priority: 0.9, changeFrequency: "monthly" },
  { path: "/saison",       priority: 0.8, changeFrequency: "weekly" },
  { path: "/evenements",   priority: 0.8, changeFrequency: "weekly" },
  { path: "/rejoindre",    priority: 0.9, changeFrequency: "monthly" },
  { path: "/contact",      priority: 0.6, changeFrequency: "yearly" },
];

/* Sous-pages du club */
const clubSubRoutes: Route[] = [
  { path: "/le-club/histoire-palmares",    priority: 0.7, changeFrequency: "yearly" },
  { path: "/le-club/staff",                priority: 0.6, changeFrequency: "monthly" },
  { path: "/le-club/salles",               priority: 0.6, changeFrequency: "yearly" },
  { path: "/le-club/coupe-de-france-2024", priority: 0.8, changeFrequency: "yearly" },
];

/* Pages légales */
const legalRoutes: Route[] = [
  { path: "/mentions-legales",           priority: 0.2, changeFrequency: "yearly" },
  { path: "/politique-confidentialite",  priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base: MetadataRoute.Sitemap = [
    ...staticRoutes,
    ...clubSubRoutes,
    ...legalRoutes,
  ].map((r) => ({
    url: `${siteConfig.url}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  /* Pages dynamiques d'équipes — même source que generateStaticParams */
  const teamPages: MetadataRoute.Sitemap = teams.map((team) => ({
    url: `${siteConfig.url}/equipes/${team.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...base, ...teamPages];
}

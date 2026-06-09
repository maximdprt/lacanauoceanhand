import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { teams, newsItems } from "@/data/site";

type Route = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified?: Date;
};

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
  { path: "/le-club/histoire-palmares",   priority: 0.7, changeFrequency: "yearly" },
  { path: "/le-club/staff",               priority: 0.6, changeFrequency: "monthly" },
  { path: "/le-club/salles",              priority: 0.6, changeFrequency: "yearly" },
  { path: "/le-club/coupe-de-france-2024", priority: 0.8, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const base: MetadataRoute.Sitemap = [
    ...staticRoutes,
    ...clubSubRoutes,
  ].map((r) => ({
    url: `${siteConfig.url}${r.path}`,
    lastModified: r.lastModified ?? now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  /* Pages dynamiques d'équipes */
  const teamPages: MetadataRoute.Sitemap = teams.map((team) => ({
    url: `${siteConfig.url}/equipes/${team.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  /* Pages d'actualités individuelles (si futures routes /evenements/[slug]) */
  const newsPages: MetadataRoute.Sitemap = newsItems.map((news) => ({
    url: `${siteConfig.url}/evenements/${news.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...base, ...teamPages, ...newsPages];
}

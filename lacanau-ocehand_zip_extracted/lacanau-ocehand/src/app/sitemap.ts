import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/le-club", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/equipes", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/saison", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/evenements", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/rejoindre", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${siteConfig.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}

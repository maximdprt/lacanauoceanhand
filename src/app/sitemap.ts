import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getSiteContent } from "@/lib/content";

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

/* Pages statiques principales (5 onglets + contact) */
const staticRoutes: Route[] = [
  { path: "/",          priority: 1.0, changeFrequency: "weekly" },
  { path: "/equipes",   priority: 0.9, changeFrequency: "monthly" },
  { path: "/beach",     priority: 0.8, changeFrequency: "monthly" },
  { path: "/le-club",   priority: 0.9, changeFrequency: "monthly" },
  { path: "/rejoindre", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contact",   priority: 0.6, changeFrequency: "yearly" },
];

/* Sous-page du club (récit détaillé, reliée depuis /le-club) */
const clubSubRoutes: Route[] = [
  { path: "/le-club/coupe-de-france-2024", priority: 0.8, changeFrequency: "yearly" },
];

/* Pages légales */
const legalRoutes: Route[] = [
  { path: "/mentions-legales",           priority: 0.2, changeFrequency: "yearly" },
  { path: "/politique-confidentialite",  priority: 0.2, changeFrequency: "yearly" },
];

/* Même fenêtre de régénération que les pages du site (cf.
   `src/app/(site)/layout.tsx`) : ce fichier suit le contenu modifiable, il
   doit donc se rafraîchir avec lui. Valeur écrite en toutes lettres — Next.js
   lit cette configuration au build, sans exécuter le module. */
export const revalidate = 30;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { teams } = await getSiteContent();

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

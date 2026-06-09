import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Moteurs principaux : accès complet sauf pages techniques
        userAgent: "*",
        allow: "/",
        disallow: [
          "/_next/",
          "/api/",
          "/*.json$",
          "/admin",
          "/private",
        ],
      },
      {
        // Bloquer les crawlers d'IA/scraping commerciaux
        userAgent: ["GPTBot", "ChatGPT-User", "Google-Extended", "CCBot", "anthropic-ai"],
        disallow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}

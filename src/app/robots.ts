import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Accès complet pour TOUS les robots — moteurs classiques ET
        // IA génératives (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot,
        // Google-Extended/Gemini, ClaudeBot, CCBot…). Objectif : être
        // indexé ET cité dans les réponses IA (SEO + GEO). On NE bloque PAS
        // /_next/ : Google en a besoin pour rendre les pages et évaluer les
        // Core Web Vitals.
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}

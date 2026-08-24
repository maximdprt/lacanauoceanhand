import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self)",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,

  turbopack: {
    root: __dirname,
  },

  // Images : formats modernes + cache long
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 jours
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async headers() {
    const isProd = process.env.NODE_ENV === "production";

    return [
      {
        // Sécurité sur toutes les routes
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Cache immutable uniquement en production (évite chunks Turbopack obsolètes en dev)
      ...(isProd
        ? [
            {
              source: "/_next/static/(.*)",
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, max-age=31536000, immutable",
                },
              ],
            },
          ]
        : []),
      {
        // Cache long sur les médias
        source: "/media/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        // Cache court sur le sitemap / robots pour fraîcheur
        source: "/(sitemap.xml|robots.txt)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=3600",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      /* ------------------------------------------------------------
         DOMAINE CANONIQUE : www → apex
         Le site s'annonce partout en https://lacanauocehand.fr
         (canonical, sitemap, OG, JSON-LD). Sans cette regle, les deux
         versions coexistent et Google voit du contenu duplique.
         ------------------------------------------------------------ */
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.lacanauocehand.fr" }],
        destination: "https://lacanauocehand.fr/:path*",
        permanent: true,
      },

      /* ------------------------------------------------------------
         URL VERCEL → apex
         Le domaine de deploiement reste accessible et sert le meme
         contenu : sans redirection, Google peut l'indexer en double.
         ------------------------------------------------------------ */
      {
        source: "/:path*",
        has: [{ type: "host", value: "lacanauoceanhand.vercel.app" }],
        destination: "https://lacanauocehand.fr/:path*",
        permanent: true,
      },

      /* ------------------------------------------------------------
         ALIAS INTERNES (URLs courtes)
         ------------------------------------------------------------ */
      { source: "/club", destination: "/le-club", permanent: true },
      { source: "/inscription", destination: "/rejoindre", permanent: true },

      /* ------------------------------------------------------------
         MIGRATION WORDPRESS → NEXT.JS
         Toutes les URLs indexees de l'ancien site (releve du
         sitemap_index.xml du 21/08/2026) sont redirigees en 301 vers
         la page equivalente. Sans cela : 45 pages en 404 et perte du
         referencement acquis. NE PAS SUPPRIMER.
         ------------------------------------------------------------ */

      // --- Pages equipes (ancienne nomenclature sans « U ») ---
      { source: "/9-mixtes", destination: "/equipes/ecole-de-hand", permanent: true },
      { source: "/11-mixtes", destination: "/equipes/u11-mixtes", permanent: true },
      { source: "/13-filles", destination: "/equipes/u13-filles", permanent: true },
      { source: "/13-garcons", destination: "/equipes/u13-garcons", permanent: true },
      { source: "/15-filles", destination: "/equipes/u15-filles", permanent: true },
      { source: "/15-garcons", destination: "/equipes/u15-garcons", permanent: true },
      {
        source: "/18-garcons-entente-bruges-handball",
        destination: "/equipes/u18",
        permanent: true,
      },
      { source: "/seniors-masculins", destination: "/equipes/seniors-masculins", permanent: true },
      { source: "/seniors-loisirs", destination: "/equipes/seniors-loisirs", permanent: true },

      // --- Pages club ---
      { source: "/histoire-et-palmares", destination: "/le-club#histoire", permanent: true },
      { source: "/le-staff", destination: "/le-club#staff", permanent: true },
      { source: "/les-salles", destination: "/le-club#lieux", permanent: true },
      { source: "/nathand-fluo", destination: "/le-club", permanent: true },
      {
        source: "/coupe-de-france-departementale-2023-2024",
        destination: "/le-club/coupe-de-france-2024",
        permanent: true,
      },

      // --- Pages « rejoindre » ---
      { source: "/devenir-licenciee", destination: "/rejoindre#inscription", permanent: true },
      { source: "/devenir-partenaire", destination: "/rejoindre#partenaire", permanent: true },
      {
        source: "/plannings-entrainements-tarifs-licences",
        destination: "/rejoindre#tarifs",
        permanent: true,
      },

      // --- Beach handball ---
      { source: "/calendrier-resultats-beach-handball", destination: "/beach", permanent: true },
      { source: "/ledition-2022-resultats", destination: "/beach", permanent: true },
      { source: "/eidition-2022-equipes-engagees", destination: "/beach", permanent: true },

      // --- Divers ---
      { source: "/les-stages", destination: "/equipes", permanent: true },

      // --- Categories WordPress ---
      { source: "/entrainements", destination: "/equipes#creneaux", permanent: true },
      { source: "/matchs", destination: "/equipes", permanent: true },
      { source: "/partenaires", destination: "/le-club#soutenir", permanent: true },
      { source: "/vie-du-club", destination: "/le-club", permanent: true },
      { source: "/uncategorized", destination: "/", permanent: true },
      { source: "/non-classe", destination: "/", permanent: true },

      /* --- Articles : la rubrique actualites a ete retiree du site ---
         Les 5 articles du parcours Coupe de France 2024 pointent vers
         le recit dedie ; les autres retombent sur l'accueil via le
         motif generique /AAAA/MM/JJ/slug place en dernier. */
      {
        source: "/2024/04/22/le-lacanau-ocehand-remporte-la-coupe-de-france-departementale-2024",
        destination: "/le-club/coupe-de-france-2024",
        permanent: true,
      },
      {
        source: "/2024/04/18/nos-seniors-en-finale-de-coupe-de-france-a-bercy",
        destination: "/le-club/coupe-de-france-2024",
        permanent: true,
      },
      {
        source: "/2024/03/28/retrouvez-le-1-4-de-finale-de-cdf-du-lacanau-ocehand-en-direct-sur-youtube",
        destination: "/le-club/coupe-de-france-2024",
        permanent: true,
      },
      {
        source:
          "/2024/03/14/les-seniors-garcons-en-1-4-de-finale-de-la-coupe-de-france-departementale-2024",
        destination: "/le-club/coupe-de-france-2024",
        permanent: true,
      },
      {
        source: "/2024/02/18/direction-les-16eme-de-finale-de-coupe-de-france-pour-nos-seniors-garcons",
        destination: "/le-club/coupe-de-france-2024",
        permanent: true,
      },
      {
        source: "/2024/02/09/vital-parc-un-nouveau-partenaire-de-prestige-pour-le-lacanau-ocehand",
        destination: "/le-club#soutenir",
        permanent: true,
      },
      {
        source:
          "/2024/11/05/partez-en-sicile-a-tarif-special-avec-notre-partenaire-desirs2reves",
        destination: "/le-club#soutenir",
        permanent: true,
      },
      {
        source: "/2023/04/04/le-lacanau-ocehand-reve-en-grand-pour-la-coupe-de-france",
        destination: "/le-club#histoire",
        permanent: true,
      },
      // Filet : tout autre article WordPress (/AAAA/MM/JJ/slug) → accueil
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug",
        destination: "/",
        permanent: true,
      },
      // Rubrique actualites (index + pagination WordPress)
      { source: "/actualites", destination: "/", permanent: true },
      { source: "/actualites/page/:page", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;

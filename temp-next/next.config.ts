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
      // Alias /club → /le-club (URL propre)
      {
        source: "/club",
        destination: "/le-club",
        permanent: true,
      },
      // Alias /inscription → /rejoindre
      {
        source: "/inscription",
        destination: "/rejoindre",
        permanent: true,
      },
      // Alias /actualites → /evenements (redirect 301 déjà géré côté page mais aussi ici)
      {
        source: "/actualites",
        destination: "/evenements",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { siteConfig } from "@/lib/site";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  /**
   * Fil d'Ariane personnalisé.
   * Si omis, génère automatiquement : Accueil > eyebrow.
   */
  breadcrumbs?: Crumb[];
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: PageHeroProps) {
  // Fil d'Ariane par défaut : Accueil > eyebrow
  const crumbs: Crumb[] = breadcrumbs ?? [
    { label: "Accueil", href: "/" },
    { label: eyebrow },
  ];

  // Schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.label,
      ...(crumb.href
        ? { item: `${siteConfig.url}${crumb.href}` }
        : {}),
    })),
  };

  return (
    <section className="relative overflow-hidden border-b border-line bg-mist">
      {/* Données structurées BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* motif géométrique discret */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-line" />
      <div className="pointer-events-none absolute right-24 top-10 h-40 w-40 rounded-full border border-line" />

      <div className="container-x relative py-14 md:py-20">
        {/* Navigation breadcrumb visible */}
        <nav
          aria-label="Fil d'Ariane"
          className="mb-5 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-ink-soft"
        >
          {crumbs.map((crumb, idx) => (
            <span key={idx} className="flex items-center gap-1.5">
              {idx > 0 && <ChevronRight size={13} aria-hidden="true" />}
              {crumb.href ? (
                <Link href={crumb.href} className="transition hover:text-ocean">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-ink" aria-current="page">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="headline text-[clamp(2.4rem,7vw,4.5rem)] text-ink">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

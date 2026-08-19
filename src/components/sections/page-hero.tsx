import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

import { JsonLd } from "@/components/common/json-ld";
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
  /**
   * Photo de fond plein cadre (en-tête immersif, titre en blanc).
   * Si omis, bandeau clair sur fond gris.
   */
  image?: string;
}

function Breadcrumb({ crumbs, light = false }: { crumbs: Crumb[]; light?: boolean }) {
  return (
    <nav
      aria-label="Fil d'Ariane"
      className={`mb-5 flex flex-wrap items-center gap-1.5 text-xs font-semibold ${
        light ? "text-white/70" : "text-ink-soft"
      }`}
    >
      {crumbs.map((crumb, idx) => (
        <span key={idx} className="flex items-center gap-1.5">
          {idx > 0 && <ChevronRight size={13} aria-hidden="true" />}
          {crumb.href ? (
            <Link
              href={crumb.href}
              className={`transition ${light ? "hover:text-white" : "hover:text-ocean"}`}
            >
              {crumb.label}
            </Link>
          ) : (
            <span className={light ? "text-white" : "text-ink"} aria-current="page">
              {crumb.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  image,
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
      ...(crumb.href ? { item: `${siteConfig.url}${crumb.href}` } : {}),
    })),
  };

  // ---------- En-tête immersif : photo de fond ----------
  if (image) {
    return (
      <section className="relative overflow-hidden bg-ink">
        <JsonLd data={breadcrumbSchema} />

        {/* Photo de fond avec léger zoom d'entrée */}
        <div className="hero-zoom absolute inset-0">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        {/* Voile sombre : lisibilité du texte blanc */}
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/75 to-ink/45" />
        <div className="pointer-events-none absolute inset-0 grid-overlay opacity-30" />

        <div className="container-x relative py-20 md:py-28">
          <div className="hero-fade-up">
            <Breadcrumb crumbs={crumbs} light />
          </div>
          <h1
            className="hero-fade-up headline text-[clamp(2.4rem,7vw,4.5rem)] text-white"
            style={{ animationDelay: "0.08s" }}
          >
            {title}
          </h1>
          {description && (
            <p
              className="hero-fade-up mt-4 max-w-2xl text-lg leading-relaxed text-white/85"
              style={{ animationDelay: "0.16s" }}
            >
              {description}
            </p>
          )}
        </div>
      </section>
    );
  }

  // ---------- Bandeau clair (repli) ----------
  return (
    <section className="relative overflow-hidden border-b border-line bg-mist">
      <JsonLd data={breadcrumbSchema} />

      {/* motif géométrique discret */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-line" />
      <div className="pointer-events-none absolute right-24 top-10 h-40 w-40 rounded-full border border-line" />

      <div className="container-x relative py-14 md:py-20">
        <Breadcrumb crumbs={crumbs} />
        <h1 className="headline text-[clamp(2.4rem,7vw,4.5rem)] text-ink">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

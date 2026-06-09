import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page introuvable (404)",
  description:
    "Cette page n'existe pas ou a été déplacée. Retrouvez le club de handball Lacanau Océhand depuis l'accueil.",
  robots: { index: false, follow: true },
};

const suggestedLinks = [
  { label: "Nos équipes", href: "/equipes", desc: "Baby hand, jeunes, seniors, beach" },
  { label: "Rejoindre le club", href: "/rejoindre", desc: "Inscriptions ouvertes" },
  { label: "La saison", href: "/saison", desc: "Matchs et calendrier" },
  { label: "Le club", href: "/le-club", desc: "Histoire et palmarès" },
  { label: "Actualités", href: "/evenements", desc: "Vie du club" },
  { label: "Contact", href: "/contact", desc: "Nous écrire" },
];

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <span className="section-index text-[clamp(5rem,18vw,11rem)] leading-none text-ocean">
        404
      </span>
      <h1 className="headline mt-2 text-[clamp(1.8rem,5vw,2.8rem)] text-ink">
        Page introuvable
      </h1>
      <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink-soft">
        Cette page n'existe pas ou a été déplacée. Voici quelques raccourcis
        pour retrouver le handball à Lacanau.
      </p>

      <Link href="/" className="mt-8">
        <Button variant="primary" size="lg">
          <ArrowLeft size={18} /> Retour à l&apos;accueil
        </Button>
      </Link>

      {/* Maillage interne — aide le crawl Google et l'UX */}
      <nav
        aria-label="Pages suggérées"
        className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3"
      >
        {suggestedLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex flex-col rounded-2xl border border-line bg-white p-4 text-left transition hover:border-ocean hover:shadow-md"
          >
            <span className="text-sm font-bold text-ink group-hover:text-ocean">
              {link.label}
            </span>
            <span className="mt-1 text-xs text-ink-soft">{link.desc}</span>
            <ArrowRight
              size={13}
              className="mt-2 text-ink-soft transition group-hover:translate-x-1 group-hover:text-ocean"
            />
          </Link>
        ))}
      </nav>
    </section>
  );
}

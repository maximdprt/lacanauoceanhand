import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const filieres = [
  {
    tag: "Toute l'année",
    title: "Handball en salle",
    text: "Du baby hand aux seniors, l'entraînement et la compétition à la salle de la Cousteyre.",
    image: "/media/teams/seniors-groupe.jpg",
    href: "/equipes",
    accent: "var(--c-senior)",
  },
  {
    tag: "Mai – Août",
    title: "Beach handball",
    text: "Le handball sur le sable, à deux pas de l'océan Atlantique. Créatif, rapide, festif.",
    image: "/media/teams/beach-team.jpg",
    href: "/equipes",
    accent: "var(--c-beach)",
  },
];

export function FiliereCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {filieres.map((f) => (
        <Link
          key={f.title}
          href={f.href}
          className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-line"
        >
          <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
            <Image
              src={f.image}
              alt={f.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
            {/* barre d'accent géométrique */}
            <div
              className="absolute left-0 top-0 h-full w-1.5"
              style={{ background: f.accent }}
            />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                {f.tag}
              </span>
              <div className="mt-2 flex items-end justify-between gap-4">
                <h3 className="headline text-3xl text-white sm:text-4xl">{f.title}</h3>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink transition group-hover:bg-ocean group-hover:text-white">
                  <ArrowUpRight size={20} />
                </span>
              </div>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/80">
                {f.text}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Users } from "lucide-react";

const ctas = [
  { label: "Rejoindre le club", href: "/rejoindre", icon: ArrowRight, primary: true },
  { label: "Calendrier", href: "/saison", icon: CalendarDays, primary: false },
  { label: "Nos équipes", href: "/equipes", icon: Users, primary: false },
] as const;

export function HeroSection() {
  return (
    <section className="flex min-h-svh flex-col bg-ink">
      {/* Photo seule — aucun texte par-dessus */}
      <div className="relative min-h-[52svh] w-full flex-1 sm:min-h-[60svh]">
        <div className="hero-zoom absolute inset-0">
          <Image
            src="/media/club/hero-coupe-bercy.jpg"
            alt="Lacanau Océhand soulève la Coupe de France 2024 à l'Accor Arena de Bercy"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_18%]"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-ink to-transparent sm:h-28" />
      </div>

      {/* Texte + boutons sur fond uni — ne masque plus la photo */}
      <div className="container-x shrink-0 px-4 pb-8 pt-1 md:pb-10 md:pt-2">
        <div className="hero-fade-up mx-auto w-full max-w-3xl text-center">
          <h1 className="flex flex-col items-center gap-0.5 sm:gap-1">
            <span className="font-display text-[clamp(1.3rem,3.8vw,2.1rem)] font-black uppercase leading-tight tracking-tight text-white">
              Club de handball et de beach handball
            </span>
            <span className="font-display text-[clamp(1.6rem,4.8vw,2.75rem)] font-black uppercase leading-none tracking-tight text-gold">
              à Lacanau
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-pretty text-[clamp(0.82rem,1.5vw,0.95rem)] font-medium leading-relaxed text-white/75">
            Une équipe championne de France, familiale et ouverte à tous, du baby
            hand aux seniors, en salle et sur le sable.
          </p>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-center sm:gap-3">
            {ctas.map(({ label, href, icon: Icon, primary }) => (
              <Link
                key={label}
                href={href}
                className={
                  primary
                    ? "group inline-flex h-12 min-w-[200px] flex-1 items-center justify-center gap-2 rounded-md bg-gold px-5 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-white sm:flex-none sm:text-base"
                    : "inline-flex h-12 min-w-[200px] flex-1 items-center justify-center gap-2 rounded-md border border-white/25 bg-white/5 px-5 text-sm font-bold uppercase tracking-wide text-white transition hover:border-white/40 hover:bg-white/10 sm:flex-none sm:text-base"
                }
              >
                {!primary && <Icon size={17} strokeWidth={2.25} />}
                {label}
                {primary && (
                  <ArrowRight
                    size={17}
                    strokeWidth={2.25}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Users } from "lucide-react";

const textShadow =
  "0 2px 8px rgba(0,0,0,0.9), 0 4px 32px rgba(0,0,0,0.55)";

const ctas = [
  { label: "Rejoindre le club", href: "/rejoindre", icon: ArrowRight, primary: true },
  { label: "Calendrier", href: "/saison", icon: CalendarDays, primary: false },
  { label: "Nos équipes", href: "/equipes", icon: Users, primary: false },
] as const;

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-ink">
      <div className="hero-zoom absolute inset-0">
        <Image
          src="/media/club/hero-coupe-bercy.jpg"
          alt="Lacanau Océhand soulève la Coupe de France 2024 à l'Accor Arena de Bercy"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/85 via-ink/25 to-transparent" />

      <div className="container-x relative flex min-h-[100svh] flex-col justify-end px-4 pb-12 pt-32 text-center md:pb-16">
        <div className="hero-fade-up mx-auto w-full max-w-4xl">
          <h1
            className="headline-tight text-[clamp(2.5rem,8vw,4.5rem)] leading-[1] text-white"
            style={{ textShadow }}
          >
            Club de handball
            <br />
            <span
              className="text-gold-grad"
              style={{ filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.6))" }}
            >
              à Lacanau
            </span>
          </h1>

          <p
            className="mx-auto mt-5 max-w-xl text-[clamp(1rem,2.2vw,1.2rem)] font-semibold leading-relaxed text-white"
            style={{ textShadow }}
          >
            Une équipe championne de France, familiale et ouverte à tous, du baby
            hand aux seniors, en salle et sur le sable.
          </p>

          <div className="mt-8 grid w-full gap-3 sm:grid-cols-3">
            {ctas.map(({ label, href, icon: Icon, primary }) => (
              <Link
                key={label}
                href={href}
                className={
                  primary
                    ? "group flex h-14 w-full items-center justify-center gap-2.5 rounded-md bg-gold px-6 text-[15px] font-bold uppercase tracking-wide text-ink shadow-lg shadow-black/30 transition hover:bg-white sm:h-[56px] sm:text-base"
                    : "flex h-14 w-full items-center justify-center gap-2.5 rounded-md border border-white/40 bg-black/35 px-6 text-[15px] font-bold uppercase tracking-wide text-white backdrop-blur-[2px] transition hover:bg-black/50 sm:h-[56px] sm:text-base"
                }
              >
                {!primary && <Icon size={18} strokeWidth={2.25} />}
                {label}
                {primary && (
                  <ArrowRight
                    size={18}
                    strokeWidth={2.25}
                    className="transition-transform group-hover:translate-x-1"
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

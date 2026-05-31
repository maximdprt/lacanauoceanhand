import Image from "next/image";
import Link from "next/link";
import { Camera, ThumbsUp, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

import { beachXperienceUrl, facebookUrl, instagramUrl, navItems } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-slate-800 bg-slate-950">
      {/* Watermark logo */}
      <Image
        src="/placeholders/logo-alt-white.png"
        alt=""
        aria-hidden
        width={480}
        height={480}
        className="pointer-events-none absolute -right-16 -bottom-24 h-auto w-72 opacity-[0.04] select-none md:w-96"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/placeholders/logo-main.png"
                alt="Logo Lacanau Ocehand"
                width={44}
                height={44}
                className="h-10 w-10 object-contain"
              />
              <span className="font-display text-2xl uppercase tracking-wider text-white">
                Lacanau Ocehand
              </span>
            </Link>
            <p className="mt-4 max-w-[240px] text-sm leading-relaxed text-white/50">
              Club de handball et beach handball ancré sur la côte atlantique à Lacanau, Gironde.
            </p>
            {/* Réseaux sociaux */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition hover:border-white/40 hover:text-white"
              >
                <Camera size={16} />
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition hover:border-white/40 hover:text-white"
              >
                <ThumbsUp size={16} />
              </a>
              <a
                href="mailto:contact@lacanau-ocehand.fr"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition hover:border-white/40 hover:text-white"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-ocean-light">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/55 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-ocean-light">
              Contact
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/55">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-ocean-light" />
                <span>19 Av Albert Francois, 33680 Lacanau</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/55">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-ocean-light" />
                <span>1er All. du College, 33680 Lacanau</span>
              </li>
              <li>
                <a
                  href="mailto:contact@lacanau-ocehand.fr"
                  className="flex items-center gap-2 text-sm text-white/55 transition hover:text-white"
                >
                  <Mail size={14} className="text-ocean-light" />
                  contact@lacanau-ocehand.fr
                </a>
              </li>
              <li>
                <a
                  href="tel:+33000000000"
                  className="flex items-center gap-2 text-sm text-white/55 transition hover:text-white"
                >
                  <Phone size={14} className="text-ocean-light" />
                  +33 (0) 00 00 00 00
                </a>
              </li>
            </ul>
          </div>

          {/* Événement */}
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-ocean-light">
              Événement
            </p>
            <a
              href={beachXperienceUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-ocean/40 hover:bg-ocean/10"
            >
              <div>
                <p className="text-sm font-semibold text-white group-hover:text-ocean-light">
                  Lacanau Beach Handball Xperience
                </p>
                <p className="mt-1 text-xs text-white/40">site-lbhx.vercel.app</p>
              </div>
              <ExternalLink size={14} className="mt-0.5 flex-shrink-0 text-white/30 group-hover:text-ocean-light" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-10 border-t border-white/10 pt-10">
          <a
            href="https://www.ffhandball.fr/"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 opacity-90 transition hover:opacity-100"
          >
            <Image
              src="/federation/ffhb.png"
              alt="Fédération française de handball"
              width={280}
              height={112}
              className="h-12 w-auto max-h-14 max-w-[min(100vw-2rem,280px)] object-contain sm:h-14"
            />
          </a>
          <a
            href="https://nouvelleaquitaine-handball.org/"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 opacity-90 transition hover:opacity-100"
          >
            <Image
              src="/federation/ligue-nouvelle-aquitaine.png"
              width={320}
              height={112}
              alt="Ligue Nouvelle-Aquitaine de handball"
              className="h-12 w-auto max-h-14 max-w-[min(100vw-2rem,320px)] object-contain sm:h-14"
            />
          </a>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Lacanau Ocehand — Tous droits réservés.
          </p>
          <p className="text-xs text-white/20">
            Handball Lacanau · Beach Handball Lacanau · Gironde
          </p>
        </div>
      </div>
    </footer>
  );
}

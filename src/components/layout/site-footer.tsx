"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/icons/social";

import { stagger, fadeUp, VIEWPORT } from "@/lib/animations";
import { openConsentBanner } from "@/lib/consent";
import {
  beachXperienceUrl,
  clubEmail,
  facebookUrl,
  federationLogos,
  instagramUrl,
  navItems,
} from "@/data/site";
import { ExternalLink } from "lucide-react";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-mist">
      {/* Bande fédération (logos en couleur) */}
      <div className="border-b border-line">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="container-x flex flex-wrap items-center justify-center gap-x-10 gap-y-6 py-9"
        >
          {federationLogos.map((f) => (
            <motion.div
              key={f.name}
              variants={fadeUp}
              className="relative h-16 w-40 rounded-xl bg-white px-4 py-3 shadow-(--shadow-xs)"
            >
              <Image src={f.logo} alt={f.name} fill sizes="160px" className="object-contain" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="container-x grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]"
      >
        {/* Marque */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center gap-2.5">
            <Image
              src="/brand/logo-color.png"
              alt="Logo Lacanau Océhand"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <span className="font-display text-2xl uppercase tracking-tight text-ink">
              Lacanau<span className="text-ocean"> Océhand</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-ink-soft">
            Le club de handball à Lacanau. Handball en salle et beach handball, du
            baby hand aux seniors, dans une ambiance familiale.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-ink hover:bg-ink hover:text-white"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-ink hover:bg-ink hover:text-white"
            >
              <FacebookIcon size={18} />
            </a>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div variants={fadeUp}>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
            Navigation
          </p>
          <nav aria-label="Pied de page">
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base text-ink/80 transition hover:text-ocean"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>

        {/* Contact */}
        <motion.div variants={fadeUp}>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
            Contact
          </p>
          <ul className="space-y-3 text-base text-ink/80">
            <li className="flex items-start gap-2.5">
              <MapPin size={18} className="mt-0.5 shrink-0 text-ocean" />
              <span>Salle de la Cousteyre, Lacanau (Gironde)</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail size={18} className="mt-0.5 shrink-0 text-ocean" />
              <a href={`mailto:${clubEmail}`} className="transition hover:text-ocean">
                {clubEmail}
              </a>
            </li>
          </ul>
          <a
            href={beachXperienceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-start gap-3 rounded-2xl border border-line bg-white p-4 transition hover:border-ocean/40 hover:shadow-sm"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">Lacanau Beach Handball Xperience</p>
              <p className="mt-1 text-xs text-ink-soft">Tournoi & événement beach, site dédié</p>
            </div>
            <ExternalLink size={16} className="mt-0.5 shrink-0 text-ocean" />
          </a>
        </motion.div>
      </motion.div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-ink-soft sm:flex-row">
          <p>© {year} Lacanau Océhand · Site officiel du handball à Lacanau.</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <li>
              <Link href="/mentions-legales" className="transition hover:text-ocean">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/politique-confidentialite" className="transition hover:text-ocean">
                Confidentialité
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={openConsentBanner}
                className="cursor-pointer transition hover:text-ocean"
              >
                Gérer mes cookies
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/icons/social";

import {
  clubEmail,
  facebookUrl,
  federationLogos,
  instagramUrl,
  navItems,
} from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-mist">
      {/* Bande fédération */}
      <div className="border-b border-line">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-12 gap-y-6 py-8">
          {federationLogos.map((f) => (
            <div key={f.name} className="relative h-12 w-28 opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
              <Image src={f.logo} alt={f.name} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>

      <div className="container-x grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* Marque */}
        <div>
          <div className="flex items-center gap-2.5">
            <Image
              src="/placeholders/logo-main.png"
              alt="Logo Lacanau Océhand"
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
            <span className="font-display text-2xl uppercase tracking-tight text-ink">
              Lacanau<span className="text-ocean"> Océhand</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-soft">
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
        </div>

        {/* Navigation */}
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
            Navigation
          </p>
          <ul className="space-y-2.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[15px] text-ink/80 transition hover:text-ocean"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
            Contact
          </p>
          <ul className="space-y-3 text-[15px] text-ink/80">
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
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-soft sm:flex-row">
          <p>© {year} Lacanau Océhand — Site officiel du handball à Lacanau.</p>
          <p>Champions de France 2024 · ⚫⚪</p>
        </div>
      </div>
    </footer>
  );
}

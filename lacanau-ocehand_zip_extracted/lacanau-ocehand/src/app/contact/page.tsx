import { Mail, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/icons/social";

import { buildMetadata } from "@/lib/site";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { Reveal } from "@/components/common/reveal";
import { clubEmail, facebookUrl, instagramUrl } from "@/data/site";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contactez le club de handball de Lacanau Océhand : e-mail, réseaux sociaux et salle de la Cousteyre à Lacanau. Une question ? Écrivez-nous.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Nous contacter"
        description="Une question sur le club, les inscriptions ou un partenariat ? Écrivez-nous, on vous répond vite."
      />

      <section className="container-x py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* Coordonnées */}
          <Reveal>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-tight text-ink">
                Coordonnées
              </h2>
              <ul className="mt-6 space-y-5">
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ocean-tint text-ocean">
                    <MapPin size={18} />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">Salle de la Cousteyre</p>
                    <p className="text-[15px] text-ink-soft">Lacanau, Gironde (33)</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ocean-tint text-ocean">
                    <Mail size={18} />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">E-mail</p>
                    <a
                      href={`mailto:${clubEmail}`}
                      className="text-[15px] text-ink-soft transition hover:text-ocean"
                    >
                      {clubEmail}
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-7">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
                  Suivez-nous
                </p>
                <div className="flex gap-3">
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

              {/* Carte */}
              <div className="mt-8 overflow-hidden rounded-[var(--radius)] border border-line">
                <iframe
                  title="Carte — Lacanau"
                  src="https://www.google.com/maps?q=Lacanau%2C+Gironde&output=embed"
                  width="100%"
                  height="260"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block w-full"
                />
              </div>
            </div>
          </Reveal>

          {/* Formulaire */}
          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

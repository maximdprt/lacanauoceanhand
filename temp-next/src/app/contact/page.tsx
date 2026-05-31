import type { Metadata } from "next";
import { Mail, Phone, MapPin, Send } from "lucide-react";

import { Reveal } from "@/components/common/reveal";
import { SectionTitle } from "@/components/common/section-title";
import { SocialFeedPlaceholder } from "@/components/sections/social-feed-placeholder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contacte Lacanau Ocehand: formulaire, map, reseaux sociaux et inscription newsletter.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="space-y-14">
      <SectionTitle
        eyebrow="Contact"
        title="Parlons handball"
        description="Une question, un projet de partenariat ou une demande d'inscription ? Ecris-nous directement."
      />

      <Reveal>
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Formulaire */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:col-span-3">
            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="font-display text-2xl uppercase tracking-wide text-slate-900">Nous ecrire</h2>
            </div>
            <div className="space-y-4 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder="Nom" aria-label="Nom" />
                <Input placeholder="Prénom" aria-label="Prénom" />
              </div>
              <Input placeholder="Email" type="email" aria-label="Email" />
              <Input placeholder="Sujet" aria-label="Sujet" />
              <Textarea placeholder="Votre message..." aria-label="Message" className="min-h-[140px]" />
              <Button className="flex w-full items-center gap-2">
                <Send size={14} /> Envoyer le message
              </Button>
            </div>
          </div>

          {/* Infos + cartes */}
          <div className="space-y-5 lg:col-span-2">
            {/* Info block */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-display text-xl uppercase tracking-wide text-slate-900">Nos coordonnees</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-slate-600">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0 text-ocean" />
                  <span>19 Av Albert Francois, 33680 Lacanau</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0 text-ocean" />
                  <span>1er All. du College, 33680 Lacanau</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail size={16} className="flex-shrink-0 text-ocean" />
                  <a href="mailto:contact@lacanau-ocehand.fr" className="hover:text-ocean hover:underline">
                    contact@lacanau-ocehand.fr
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-600">
                  <Phone size={16} className="flex-shrink-0 text-ocean" />
                  <a href="tel:+33000000000" className="hover:text-ocean hover:underline">
                    +33 (0) 00 00 00 00
                  </a>
                </li>
              </ul>
            </div>

            {/* Maps */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
              <iframe
                title="19 Av Albert Francois Lacanau"
                src="https://www.google.com/maps?q=19+Av+Albert+Francois,+33680+Lacanau&output=embed"
                className="h-44 w-full border-0"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
              <iframe
                title="1 allee du college Lacanau"
                src="https://www.google.com/maps?q=1+allee+du+college,+33680+Lacanau&output=embed"
                className="h-44 w-full border-0"
                loading="lazy"
              />
            </div>

            {/* Newsletter */}
            <div className="overflow-hidden rounded-3xl border border-ocean/20 bg-ocean/5 p-5">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-ocean">
                Newsletter
              </p>
              <p className="mb-3 text-sm text-slate-600">
                Recevez les infos matchs, evenements et inscriptions directement dans votre boite.
              </p>
              <div className="flex gap-2">
                <Input placeholder="Votre email" type="email" aria-label="Email newsletter" className="flex-1" />
                <Button size="sm">OK</Button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <section className="space-y-6">
          <SectionTitle
            eyebrow="Reseaux"
            title="Nous suivre"
            description="Instagram et Facebook pour les photos, videos et annonces du club."
          />
          <SocialFeedPlaceholder />
        </section>
      </Reveal>
    </div>
  );
}

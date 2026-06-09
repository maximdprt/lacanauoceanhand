"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { clubEmail } from "@/data/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-[var(--radius)] border border-line bg-white px-6 py-14 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ocean-tint text-ocean">
          <CheckCircle2 size={28} />
        </span>
        <h3 className="mt-5 font-display text-2xl uppercase tracking-tight text-ink">
          Message envoyé
        </h3>
        <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-ink-soft">
          Merci, nous vous répondrons rapidement. Vous pouvez aussi nous écrire à{" "}
          <a href={`mailto:${clubEmail}`} className="font-semibold text-ocean">
            {clubEmail}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[var(--radius-lg)] border border-line bg-white p-6 md:p-9"
    >
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Prénom & nom" htmlFor="c-nom">
            <Input id="c-nom" name="nom" required autoComplete="name" />
          </Field>
          <Field label="E-mail" htmlFor="c-email">
            <Input id="c-email" name="email" type="email" required autoComplete="email" />
          </Field>
        </div>
        <Field label="Sujet" htmlFor="c-sujet">
          <Input id="c-sujet" name="sujet" required />
        </Field>
        <Field label="Message" htmlFor="c-message">
          <Textarea id="c-message" name="message" required placeholder="Votre message…" />
        </Field>
        <Button type="submit" variant="ocean" size="lg" className="w-full sm:w-auto">
          Envoyer le message
        </Button>
      </div>
    </form>
  );
}

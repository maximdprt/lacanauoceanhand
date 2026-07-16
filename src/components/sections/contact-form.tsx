"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormPrivacyNotice } from "@/components/common/form-privacy-notice";
import { clubEmail } from "@/data/site";
import { sendForm } from "@/lib/send-form";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSending(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const nom = String(fd.get("nom") ?? "");
    const sujet = String(fd.get("sujet") ?? "");

    try {
      await sendForm(
        {
          Nom: nom,
          "E-mail": String(fd.get("email") ?? ""),
          Sujet: sujet,
          Message: String(fd.get("message") ?? ""),
        },
        { subject: `Contact site · ${sujet || nom}` },
      );
      setSent(true);
    } catch {
      setError(
        "L'envoi a échoué. Vérifiez votre connexion ou écrivez-nous directement par e-mail.",
      );
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-(--radius) border border-line bg-white px-6 py-14 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ocean-tint text-ocean">
          <CheckCircle2 size={28} />
        </span>
        <h3 className="mt-5 font-display text-2xl uppercase tracking-tight text-ink">
          Message envoyé
        </h3>
        <p className="mt-2 max-w-sm text-base leading-relaxed text-ink-soft">
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
      className="rounded-(--radius-lg) border border-line bg-white p-6 md:p-9"
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
        <FormPrivacyNotice />
        {error && (
          <p role="alert" className="text-sm font-medium text-red-600">
            {error}
          </p>
        )}
        <Button
          type="submit"
          variant="ocean"
          size="lg"
          className="w-full sm:w-auto"
          disabled={sending}
        >
          {sending ? "Envoi en cours…" : "Envoyer le message"}
        </Button>
      </div>
    </form>
  );
}

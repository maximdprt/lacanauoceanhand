"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, User, HeartHandshake, Handshake } from "lucide-react";

import { cn } from "@/lib/utils";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormPrivacyNotice } from "@/components/common/form-privacy-notice";
import { clubEmail, playerCategories, volunteerRoles } from "@/data/site";
import { sendForm } from "@/lib/send-form";

const tabLabel: Record<TabId, string> = {
  joueur: "Inscription joueur",
  benevole: "Bénévolat",
  partenaire: "Partenariat",
};

type TabId = "joueur" | "benevole" | "partenaire";

const tabs: { id: TabId; label: string; icon: typeof User }[] = [
  { id: "joueur", label: "Joueur", icon: User },
  { id: "benevole", label: "Bénévole", icon: HeartHandshake },
  { id: "partenaire", label: "Partenaire", icon: Handshake },
];

function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center rounded-(--radius) border border-line bg-white px-6 py-14 text-center"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ocean-tint text-ocean">
        <CheckCircle2 size={28} />
      </span>
      <h3 className="mt-5 font-display text-2xl uppercase tracking-tight text-ink">
        Merci&nbsp;!
      </h3>
      <p className="mt-2 max-w-sm text-base leading-relaxed text-ink-soft">
        Votre demande a bien été prise en compte. Le club revient vers vous très
        vite. Une question d’ici là&nbsp;?{" "}
        <a href={`mailto:${clubEmail}`} className="font-semibold text-ocean">
          {clubEmail}
        </a>
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-sm font-semibold text-ink underline underline-offset-4 hover:text-ocean"
      >
        Envoyer une autre demande
      </button>
    </div>
  );
}

function PrivacyRow({ error, minors = false }: { error: string; minors?: boolean }) {
  return (
    <>
      <FormPrivacyNotice minors={minors} />
      {error && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </>
  );
}

export function JoinForms() {
  const [active, setActive] = useState<TabId>("joueur");
  const [sent, setSent] = useState<TabId | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "benevole" || hash === "partenaire" || hash === "joueur") {
      setActive(hash);
    }
  }, []);

  const toggleRole = (role: string) =>
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSending(true);

    const fd = new FormData(e.currentTarget);
    const entries: Record<string, string> = {};
    for (const [key, value] of fd.entries()) {
      if (typeof value === "string" && value.trim()) entries[key] = value;
    }
    if (active === "benevole" && roles.length) {
      entries["Souhaits d'aide"] = roles.join(", ");
    }

    try {
      await sendForm(entries, {
        subject: `${tabLabel[active]} · site Lacanau Océhand`,
      });
      setSent(active);
    } catch {
      setError(
        "L'envoi a échoué. Vérifiez votre connexion ou écrivez-nous directement par e-mail.",
      );
    } finally {
      setSending(false);
    }
  };

  const switchTab = (id: TabId) => {
    setActive(id);
    setSent(null);
    setError("");
  };

  return (
    <div>
      {/* Onglets */}
      <div className="flex flex-wrap gap-2.5">
        {tabs.map((t) => {
          const on = t.id === active;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              type="button"
              aria-pressed={on}
              onClick={() => switchTab(t.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all",
                on
                  ? "border-ink bg-ink text-white"
                  : "border-line text-ink hover:border-ink",
              )}
            >
              <Icon size={16} />
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        {sent === active ? (
          <SuccessPanel onReset={() => setSent(null)} />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-(--radius-lg) border border-line bg-white p-6 md:p-9"
          >
            {/* JOUEUR */}
            {active === "joueur" && (
              <div className="space-y-5">
                <div className="rounded-xl bg-ocean-tint px-5 py-4 text-sm leading-relaxed text-ink">
                  Les licenciés de la saison précédente recevront directement un
                  e-mail de la fédération pour renouveler leur licence.
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Prénom" htmlFor="j-prenom">
                    <Input id="j-prenom" name="prenom" required autoComplete="given-name" />
                  </Field>
                  <Field label="Nom" htmlFor="j-nom">
                    <Input id="j-nom" name="nom" required autoComplete="family-name" />
                  </Field>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Date de naissance" htmlFor="j-naissance">
                    <Input id="j-naissance" name="naissance" type="date" required />
                  </Field>
                  <Field label="Catégorie" htmlFor="j-categorie">
                    <Select id="j-categorie" name="categorie" defaultValue="" required>
                      <option value="" disabled>
                        Sélectionner…
                      </option>
                      {playerCategories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </Select>
                  </Field>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="E-mail" htmlFor="j-email">
                    <Input id="j-email" name="email" type="email" required autoComplete="email" />
                  </Field>
                  <Field label="Téléphone" htmlFor="j-tel">
                    <Input id="j-tel" name="tel" type="tel" autoComplete="tel" />
                  </Field>
                </div>
                <Field label="Message (facultatif)" htmlFor="j-message">
                  <Textarea id="j-message" name="message" placeholder="Niveau, expérience, questions…" />
                </Field>
                <PrivacyRow error={error} minors />
                <Button type="submit" variant="ocean" size="lg" className="w-full sm:w-auto" disabled={sending}>
                  {sending ? "Envoi en cours…" : "Envoyer ma demande d'inscription"}
                </Button>
              </div>
            )}

            {/* BÉNÉVOLE */}
            {active === "benevole" && (
              <div className="space-y-5">
                <p className="text-base leading-relaxed text-ink-soft">
                  Le club fonctionne grâce à ses bénévoles. Indiquez vos
                  préférences, nous trouverons ensemble comment vous impliquer.
                </p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Prénom & nom" htmlFor="b-nom">
                    <Input id="b-nom" name="nom" required autoComplete="name" />
                  </Field>
                  <Field label="E-mail" htmlFor="b-email">
                    <Input id="b-email" name="email" type="email" required autoComplete="email" />
                  </Field>
                </div>
                <Field label="Téléphone" htmlFor="b-tel">
                  <Input id="b-tel" name="tel" type="tel" autoComplete="tel" />
                </Field>
                <div>
                  <span className="mb-2.5 block text-sm font-semibold text-ink">
                    Comment souhaitez-vous aider&nbsp;?
                  </span>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {volunteerRoles.map((role) => {
                      const checked = roles.includes(role);
                      return (
                        <label
                          key={role}
                          className={cn(
                            "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-base transition",
                            checked
                              ? "border-ocean bg-ocean-tint text-ink"
                              : "border-line text-ink hover:border-ink",
                          )}
                        >
                          <input
                            type="checkbox"
                            name="roles"
                            value={role}
                            checked={checked}
                            onChange={() => toggleRole(role)}
                            className="h-4 w-4 accent-(--ocean)"
                          />
                          {role}
                        </label>
                      );
                    })}
                  </div>
                </div>
                <Field label="Message (facultatif)" htmlFor="b-message">
                  <Textarea id="b-message" name="message" placeholder="Vos disponibilités, vos envies…" />
                </Field>
                <PrivacyRow error={error} />
                <Button type="submit" variant="ocean" size="lg" className="w-full sm:w-auto" disabled={sending}>
                  {sending ? "Envoi en cours…" : "Devenir bénévole"}
                </Button>
              </div>
            )}

            {/* PARTENAIRE */}
            {active === "partenaire" && (
              <div className="space-y-5">
                <p className="text-base leading-relaxed text-ink-soft">
                  Associez votre image à un club ambitieux et ancré sur son
                  territoire. Parlons de votre projet de partenariat.
                </p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Entreprise" htmlFor="p-entreprise">
                    <Input id="p-entreprise" name="entreprise" required autoComplete="organization" />
                  </Field>
                  <Field label="Interlocuteur" htmlFor="p-nom">
                    <Input id="p-nom" name="nom" required autoComplete="name" />
                  </Field>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="E-mail" htmlFor="p-email">
                    <Input id="p-email" name="email" type="email" required autoComplete="email" />
                  </Field>
                  <Field label="Téléphone" htmlFor="p-tel">
                    <Input id="p-tel" name="tel" type="tel" autoComplete="tel" />
                  </Field>
                </div>
                <Field label="Votre projet" htmlFor="p-message">
                  <Textarea
                    id="p-message"
                    name="message"
                    placeholder="Type de partenariat envisagé, budget, attentes…"
                  />
                </Field>
                <PrivacyRow error={error} />
                <Button type="submit" variant="ocean" size="lg" className="w-full sm:w-auto" disabled={sending}>
                  {sending ? "Envoi en cours…" : "Proposer un partenariat"}
                </Button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { CheckCircle2, Send, Users, HandHeart } from "lucide-react";

import { sendForm } from "@/lib/send-form";
import { FormPrivacyNotice } from "@/components/common/form-privacy-notice";

type Role = "joueur" | "benevole";

const roles: { id: Role; icon: typeof Users; label: string; desc: string }[] = [
  {
    id: "joueur",
    icon: Users,
    label: "Joueur / Joueuse",
    desc: "Je veux intégrer une équipe",
  },
  {
    id: "benevole",
    icon: HandHeart,
    label: "Bénévole",
    desc: "Je veux donner un coup de main",
  },
];

export function Newsletter() {
  const [role, setRole] = useState<Role>("joueur");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError("Merci d'indiquer votre prénom et nom."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Merci d'indiquer une adresse e-mail valide."); return; }
    setError("");
    setSending(true);

    const roleLabel = role === "joueur" ? "Joueur / joueuse" : "Bénévole";
    try {
      await sendForm(
        {
          "Souhait": roleLabel,
          Nom: name,
          "E-mail": email,
          Téléphone: phone || "—",
          Message: message || "—",
        },
        { subject: `Demande de participation · ${roleLabel} · ${name}` },
      );
      setSent(true);
    } catch {
      setError(
        "L'envoi a échoué. Vérifiez votre connexion ou écrivez-nous à contact@lacanau-ocehand.fr.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-(--radius-xl) bg-ink px-6 py-12 md:px-16 md:py-16">
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-60" />
      <div className="glow-gold pointer-events-none absolute inset-x-0 top-0 h-40" />

      <div className="relative grid items-start gap-10 lg:grid-cols-2">
        {/* Texte gauche */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white">
            <Users size={14} className="text-gold" />
            Rejoindre le club
          </span>
          <h2 className="headline mt-5 text-[clamp(1.9rem,4.5vw,3rem)] text-white">
            Prêt à nous rejoindre&nbsp;?
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
            Joueur, joueuse ou bénévole, remplissez ce formulaire et votre message
            sera envoyé directement au président du club. Nous vous recontactons
            rapidement.
          </p>

          {/* Sélecteur joueur / bénévole */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {roles.map((r) => {
              const Icon = r.icon;
              const active = role === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setRole(r.id)}
                  className={`flex flex-1 items-center gap-3 rounded-2xl border px-5 py-4 text-left transition ${
                    active
                      ? "border-gold bg-gold/15 text-white"
                      : "border-white/15 bg-white/5 text-white/60 hover:border-white/30 hover:text-white"
                  }`}
                >
                  <Icon size={20} className={active ? "text-gold" : ""} />
                  <div>
                    <p className="text-sm font-bold">{r.label}</p>
                    <p className="text-xs text-white/55">{r.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Formulaire droite */}
        <div>
          {sent ? (
            <div
              role="status"
              className="flex flex-col items-start rounded-2xl border border-white/15 bg-white/5 p-7 text-white"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-gold">
                <CheckCircle2 size={26} />
              </span>
              <h3 className="mt-4 font-display text-xl uppercase tracking-tight">
                Message envoyé !
              </h3>
              <p className="mt-2 text-base leading-relaxed text-white/70">
                Votre demande a bien été transmise au club. Nous vous recontactons
                rapidement. Une question d’ici là&nbsp;? Écrivez-nous à{" "}
                <a
                  href="mailto:contact@lacanau-ocehand.fr"
                  className="underline text-gold hover:text-white transition"
                >
                  contact@lacanau-ocehand.fr
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre prénom et nom"
                aria-label="Prénom et nom"
                autoComplete="name"
                className="h-[52px] w-full rounded-2xl border border-white/20 bg-white/10 px-5 text-base text-white placeholder:text-white/60 transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.fr"
                  aria-label="Adresse e-mail"
                  autoComplete="email"
                  className="h-[52px] w-full rounded-2xl border border-white/20 bg-white/10 px-5 text-base text-white placeholder:text-white/60 transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Téléphone (facultatif)"
                  aria-label="Numéro de téléphone"
                  autoComplete="tel"
                  className="h-[52px] w-full rounded-2xl border border-white/20 bg-white/10 px-5 text-base text-white placeholder:text-white/60 transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                />
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  role === "joueur"
                    ? "Dites-nous votre âge, catégorie souhaitée…"
                    : "Décrivez comment vous souhaitez aider…"
                }
                aria-label="Message"
                rows={3}
                className="w-full resize-none rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-base text-white placeholder:text-white/60 transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
              <FormPrivacyNotice dark minors={role === "joueur"} />
              {error && (
                <p role="alert" className="text-sm font-medium text-gold">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={sending}
                className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-gold px-7 text-sm font-bold text-ink transition hover:bg-white disabled:opacity-70 sm:w-auto"
              >
                {sending ? "Envoi en cours…" : "Envoyer ma demande"} <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

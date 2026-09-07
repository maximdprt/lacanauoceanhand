"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff, LoaderCircle, LogIn } from "lucide-react";

import { seConnecter, type EtatConnexion } from "@/app/admin/actions";

/* ============================================================
   FORMULAIRE DE CONNEXION
   Le code n'est jamais vérifié dans le navigateur : le formulaire
   l'envoie à l'action serveur, qui seule connaît la bonne valeur.
   ============================================================ */

const etatInitial: EtatConnexion = {};

export function LoginForm({ suite }: { suite?: string }) {
  const [etat, action, enCours] = useActionState(seConnecter, etatInitial);
  const [visible, setVisible] = useState(false);

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="suite" value={suite ?? ""} />

      <div>
        <label
          htmlFor="code-admin"
          className="mb-2 block text-sm font-semibold text-white"
        >
          Code d&apos;accès
        </label>
        <div className="relative">
          <input
            id="code-admin"
            name="code"
            type={visible ? "text" : "password"}
            required
            autoFocus
            autoComplete="current-password"
            aria-describedby={etat.erreur ? "erreur-code" : undefined}
            className="h-12 w-full rounded-(--radius-sm) border border-white/15 bg-ink-2 pl-4 pr-12 text-base text-white placeholder:text-white/30 transition focus:border-ocean focus:outline-none focus:ring-2 focus:ring-ocean/30"
            placeholder="••••••••••••"
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-1 top-1 flex h-10 w-10 items-center justify-center rounded-full text-white/40 transition hover:text-white"
            aria-label={visible ? "Masquer le code" : "Afficher le code"}
          >
            {visible ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {etat.erreur && (
        <p
          id="erreur-code"
          role="alert"
          className="rounded-(--radius-sm) border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200"
        >
          {etat.erreur}
        </p>
      )}

      <button
        type="submit"
        disabled={enCours}
        className="btn-press flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gold text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-white disabled:opacity-60"
      >
        {enCours ? (
          <>
            <LoaderCircle size={17} className="animate-spin" aria-hidden="true" />
            Vérification…
          </>
        ) : (
          <>
            <LogIn size={17} aria-hidden="true" />
            Entrer
          </>
        )}
      </button>
    </form>
  );
}

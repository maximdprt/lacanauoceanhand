/**
 * Envoi des formulaires du site vers la boîte du club.
 *
 * Le navigateur poste sur `/api/contact`, une route serveur du site qui
 * remet le message au serveur SMTP de la messagerie du club (o2switch).
 * Aucun prestataire d'acheminement externe n'intervient, et il n'y a
 * aucune activation ni inscription préalable à faire.
 *
 * Les identifiants SMTP vivent uniquement côté serveur (cf.
 * `src/app/api/contact/route.ts`) : ils ne sont jamais envoyés au
 * navigateur.
 */

const ENDPOINT = "/api/contact";

export type FormPayload = Record<string, string | string[] | undefined>;

/** Reconnaît le champ contenant l'adresse du visiteur, quelle que soit la
 *  façon dont le formulaire l'a nommé (`email`, `E-mail`, `e_mail`…). */
const CLE_EMAIL = /^e[-_ ]?mail$/i;

/**
 * Envoie les données du formulaire par e-mail au club.
 * Lève une erreur si l'envoi échoue (à catcher côté composant).
 */
export async function sendForm(
  data: FormPayload,
  options?: { subject?: string },
): Promise<void> {
  const champs: Record<string, string> = {};
  let honeypot = "";
  let repondreA: string | undefined;

  for (const [cle, valeur] of Object.entries(data)) {
    if (valeur === undefined) continue;
    const texte = Array.isArray(valeur) ? valeur.join(", ") : valeur;

    // Champ piège : transmis à part, jamais affiché dans le message.
    if (cle === "_honey") {
      honeypot = texte;
      continue;
    }
    // Première adresse trouvée = destinataire du bouton « Répondre ».
    if (!repondreA && CLE_EMAIL.test(cle.trim())) repondreA = texte.trim();

    champs[cle] = texte;
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sujet: options?.subject,
      champs,
      honeypot,
      repondreA,
    }),
  });

  const json = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    error?: string;
  };

  if (!res.ok || !json.ok) {
    throw new Error(json.error ?? "L'envoi a échoué. Merci de réessayer.");
  }
}

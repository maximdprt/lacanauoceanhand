/**
 * Envoi des formulaires du site vers la boîte du club.
 *
 * Utilise FormSubmit (https://formsubmit.co) — aucun backend ni clé API requis.
 * Les demandes arrivent directement dans la boîte `contact@lacanau-ocehand.fr`.
 *
 * ⚠️ Activation : au TOUT PREMIER envoi, FormSubmit envoie un e-mail de
 * confirmation à l'adresse ci-dessous. Il faut cliquer le lien d'activation
 * une seule fois pour que les messages suivants soient délivrés.
 *
 * L'adresse peut être surchargée via NEXT_PUBLIC_CONTACT_EMAIL.
 */
export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@lacanau-ocehand.fr";

const ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(contactEmail)}`;

export type FormPayload = Record<string, string | string[] | undefined>;

/**
 * Envoie les données du formulaire par e-mail au club.
 * Lève une erreur si l'envoi échoue (à catcher côté composant).
 */
export async function sendForm(
  data: FormPayload,
  options?: { subject?: string },
): Promise<void> {
  const payload: Record<string, string> = {
    // Champs de configuration FormSubmit
    _subject: options?.subject ?? "Nouveau message — site Lacanau Océhand",
    _template: "table",
    _captcha: "false",
  };

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) continue;
    payload[key] = Array.isArray(value) ? value.join(", ") : value;
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Échec de l'envoi (HTTP ${res.status})`);
  }

  const json = (await res.json()) as { success?: string | boolean; message?: string };
  const ok = json.success === true || json.success === "true";
  if (!ok) {
    throw new Error(json.message ?? "L'envoi a échoué. Merci de réessayer.");
  }
}

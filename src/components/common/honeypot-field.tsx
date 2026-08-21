/**
 * Piège à robots (honeypot) pour les formulaires FormSubmit.
 *
 * Le champ `_honey` est invisible et inatteignable au clavier : un
 * humain ne le remplit jamais. Les robots spammeurs, eux, remplissent
 * tous les champs qu'ils trouvent — FormSubmit rejette alors l'envoi
 * silencieusement côté serveur.
 *
 * Indispensable ici car `_captcha` est désactivé (cf. lib/send-form.ts) :
 * sans ce garde-fou, l'adresse du club se retrouve exposée au spam.
 */
export function HoneypotField() {
  return (
    <input
      type="text"
      name="_honey"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="hidden"
    />
  );
}

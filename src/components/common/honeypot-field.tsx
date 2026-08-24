/**
 * Piège à robots (honeypot) pour les formulaires du site.
 *
 * Le champ `_honey` est invisible et inatteignable au clavier : un
 * humain ne le remplit jamais. Les robots spammeurs, eux, remplissent
 * tous les champs qu'ils trouvent — la route `/api/contact` fait alors
 * semblant d'accepter l'envoi sans expédier le moindre e-mail.
 *
 * Indispensable : sans ce garde-fou, l'adresse du club se retrouverait
 * rapidement exposée au spam, faute de captcha.
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

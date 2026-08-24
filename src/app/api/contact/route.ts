/**
 * Envoi des formulaires du site — sans prestataire externe.
 *
 * Les demandes partent directement par le serveur SMTP de la messagerie du
 * club et arrivent dans sa boîte. Aucun service tiers de formulaires ne voit
 * passer les données : le navigateur appelle cette route, la route parle au
 * serveur de mail, point final. Rien à activer, contrairement aux relais de
 * formulaires du type FormSubmit.
 *
 * Variables d'environnement à définir sur Vercel (Production + Preview) :
 *   SMTP_HOST      serveur d'envoi (smtp.gmail.com)
 *   SMTP_PORT      465 (SSL, recommandé) ou 587 (STARTTLS)
 *   SMTP_USER      adresse complète du compte d'envoi
 *   SMTP_PASSWORD  ⚠️ Gmail refuse le mot de passe du compte depuis 2022 :
 *                  il faut un « mot de passe d'application » (16 caractères,
 *                  myaccount.google.com/apppasswords, validation en deux
 *                  étapes requise), saisi sans les espaces.
 *   MAIL_FROM      (option) expéditeur affiché, sinon SMTP_USER
 *   CONTACT_TO     (option) destinataire, sinon la boîte du club
 *
 * Le mot de passe n'est jamais exposé au navigateur : ces variables n'ont
 * pas le préfixe NEXT_PUBLIC_, elles ne vivent que côté serveur.
 */
import nodemailer from "nodemailer";

// nodemailer a besoin des API Node (sockets TLS) : pas de runtime edge.
export const runtime = "nodejs";

const DESTINATAIRE_PAR_DEFAUT = "lacanauocehand123@gmail.com";

/* -------------------------------------------------------------------------
   Garde-fous : le formulaire est public, donc la route l'est aussi.
   ------------------------------------------------------------------------- */
const MAX_CHAMPS = 25;
const MAX_LONGUEUR_CLE = 60;
const MAX_LONGUEUR_VALEUR = 5000;
const MAX_TOTAL = 20000;
const MAX_SUJET = 150;

/** Fenêtre glissante par IP. En serverless la mémoire n'est pas partagée
 *  entre instances : ce n'est pas un rempart, juste un ralentisseur qui
 *  suffit à casser les envois en rafale. */
const FENETRE_MS = 10 * 60 * 1000;
const MAX_ENVOIS_PAR_FENETRE = 5;
const envois = new Map<string, number[]>();

function tropDEnvois(ip: string): boolean {
  const maintenant = Date.now();
  const recents = (envois.get(ip) ?? []).filter((t) => maintenant - t < FENETRE_MS);
  if (recents.length >= MAX_ENVOIS_PAR_FENETRE) {
    envois.set(ip, recents);
    return true;
  }
  recents.push(maintenant);
  envois.set(ip, recents);
  // Purge opportuniste pour que la Map ne gonfle pas indéfiniment.
  if (envois.size > 500) {
    for (const [cle, valeurs] of envois) {
      if (valeurs.every((t) => maintenant - t >= FENETRE_MS)) envois.delete(cle);
    }
  }
  return false;
}

const echapper = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Empêche l'injection d'en-têtes : un retour à la ligne dans un Subject ou
 *  un Reply-To permettrait d'ajouter des destinataires cachés. */
const surUneLigne = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

const emailValide = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "inconnue";

  if (tropDEnvois(ip)) {
    return Response.json(
      { error: "Trop de demandes envoyées. Merci de réessayer dans quelques minutes." },
      { status: 429 },
    );
  }

  let corps: unknown;
  try {
    corps = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (typeof corps !== "object" || corps === null) {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  const { sujet, champs, honeypot, repondreA } = corps as {
    sujet?: unknown;
    champs?: unknown;
    honeypot?: unknown;
    repondreA?: unknown;
  };

  // Piège à robots : le champ est invisible pour un humain. S'il est rempli,
  // on répond « envoyé » sans rien envoyer — le robot ne réessaiera pas.
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return Response.json({ ok: true });
  }

  if (typeof champs !== "object" || champs === null || Array.isArray(champs)) {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  const entrees = Object.entries(champs as Record<string, unknown>)
    .filter(([, v]) => typeof v === "string" && v.trim() !== "")
    .map(([k, v]) => [k.slice(0, MAX_LONGUEUR_CLE), (v as string).slice(0, MAX_LONGUEUR_VALEUR)] as const)
    .slice(0, MAX_CHAMPS);

  if (entrees.length === 0) {
    return Response.json({ error: "Le formulaire est vide." }, { status: 400 });
  }

  const poids = entrees.reduce((n, [k, v]) => n + k.length + v.length, 0);
  if (poids > MAX_TOTAL) {
    return Response.json({ error: "Message trop long." }, { status: 413 });
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!host || !user || !pass) {
    console.error("SMTP non configuré : SMTP_HOST / SMTP_USER / SMTP_PASSWORD manquants.");
    return Response.json(
      { error: "L'envoi est momentanément indisponible." },
      { status: 503 },
    );
  }
  const port = Number(process.env.SMTP_PORT ?? 465);
  const destinataire = process.env.CONTACT_TO ?? DESTINATAIRE_PAR_DEFAUT;

  const objet = surUneLigne(
    typeof sujet === "string" && sujet.trim()
      ? sujet.slice(0, MAX_SUJET)
      : "Nouveau message — site Lacanau Océhand",
  );

  // Adresse du visiteur : sert de Reply-To pour que le club réponde d'un clic.
  const adresseVisiteur =
    typeof repondreA === "string" && emailValide(repondreA.trim())
      ? surUneLigne(repondreA.trim())
      : undefined;

  const texte = entrees.map(([k, v]) => `${k} : ${v}`).join("\n");
  const html = `<table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px">
${entrees
  .map(
    ([k, v]) =>
      `<tr><td style="padding:6px 14px 6px 0;vertical-align:top;color:#555"><strong>${echapper(k)}</strong></td>` +
      `<td style="padding:6px 0;vertical-align:top;white-space:pre-wrap">${echapper(v)}</td></tr>`,
  )
  .join("\n")}
</table>
<p style="margin-top:18px;font-family:system-ui,sans-serif;font-size:12px;color:#888">
Envoyé depuis le formulaire du site lacanauocehand.fr</p>`;

  try {
    const transport = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // 465 = SSL direct ; 587 = STARTTLS
      auth: { user, pass },
    });

    await transport.sendMail({
      from: process.env.MAIL_FROM ?? `Site Lacanau Océhand <${user}>`,
      to: destinataire,
      replyTo: adresseVisiteur,
      subject: objet,
      text: texte,
      html,
    });
  } catch (erreur) {
    // Le détail reste dans les logs Vercel : inutile de l'exposer au visiteur.
    console.error("Échec de l'envoi SMTP :", erreur);
    return Response.json(
      { error: "L'envoi a échoué. Merci de réessayer ou de nous écrire directement." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}

/**
 * ACCÈS À L'ESPACE D'ADMINISTRATION
 *
 * Un seul code partagé par le bureau du club, saisi une fois, puis un cookie
 * de session valable 12 heures. Le cookie ne contient pas le code : il
 * contient une date d'expiration et sa signature HMAC-SHA256. Impossible donc
 * de le fabriquer ou d'en prolonger la validité sans connaître le secret,
 * et rien de sensible ne circule dans le navigateur.
 *
 * Tout passe par la Web Crypto API (et non `node:crypto`) : le même code
 * fonctionne dans `proxy.ts`, exécuté en amont du rendu, et dans les actions
 * serveur de l'espace admin.
 *
 * Variables d'environnement (facultatives — des valeurs par défaut existent) :
 *   ADMIN_CODE            le code d'accès (défaut : celui du club)
 *   ADMIN_SESSION_SECRET  la clé de signature (défaut : dérivée du code)
 */

export const ADMIN_COOKIE = "lo_admin";

/** Durée d'une session. Assez longue pour une soirée de mise à jour. */
const DUREE_SESSION_MS = 12 * 60 * 60 * 1000;

const encodeur = new TextEncoder();

function codeAttendu(): string {
  return process.env.ADMIN_CODE?.trim() || "LacanauOcehand123";
}

function secretSignature(): string {
  return process.env.ADMIN_SESSION_SECRET?.trim() || `lo-admin::${codeAttendu()}`;
}

/** Comparaison à durée constante : ne révèle pas où deux valeurs divergent. */
function egalitesSures(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let i = 0; i < a.length; i += 1) {
    difference |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return difference === 0;
}

function base64url(octets: ArrayBuffer): string {
  let binaire = "";
  for (const octet of new Uint8Array(octets)) binaire += String.fromCharCode(octet);
  return btoa(binaire).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function signer(charge: string): Promise<string> {
  const cle = await crypto.subtle.importKey(
    "raw",
    encodeur.encode(secretSignature()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return base64url(await crypto.subtle.sign("HMAC", cle, encodeur.encode(charge)));
}

/** Vrai si le code saisi dans le formulaire est le bon. */
export function verifierCode(saisie: unknown): boolean {
  if (typeof saisie !== "string") return false;
  return egalitesSures(saisie.trim(), codeAttendu());
}

/** Fabrique la valeur du cookie de session. */
export async function creerSession(): Promise<{ valeur: string; expireLe: Date }> {
  const expiration = Date.now() + DUREE_SESSION_MS;
  const charge = String(expiration);
  return {
    valeur: `${charge}.${await signer(charge)}`,
    expireLe: new Date(expiration),
  };
}

/** Vrai si le cookie présenté est authentique et pas encore expiré. */
export async function sessionValide(valeur: string | undefined | null): Promise<boolean> {
  if (!valeur) return false;

  const separateur = valeur.lastIndexOf(".");
  if (separateur <= 0) return false;

  const charge = valeur.slice(0, separateur);
  const signature = valeur.slice(separateur + 1);

  const expiration = Number(charge);
  if (!Number.isFinite(expiration) || expiration < Date.now()) return false;

  return egalitesSures(signature, await signer(charge));
}

/** Options du cookie, identiques à la pose et à la suppression. */
export const optionsCookieSession = {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
  secure: process.env.NODE_ENV === "production",
} as const;

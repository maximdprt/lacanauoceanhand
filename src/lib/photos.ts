/**
 * PRÉPARATION D'UNE PHOTO AVANT ENVOI
 *
 * Une photo prise au téléphone pèse couramment 4 à 8 Mo pour 4000 pixels de
 * large. Deux problèmes, et un seul geste les règle tous les deux :
 *
 *   1. l'envoi lui-même. Une action serveur accepte un corps de requête
 *      limité (1 Mo par défaut, 4,5 Mo au maximum chez l'hébergeur). Une
 *      photo brute serait refusée — et l'erreur, côté navigateur, ne dirait
 *      rien d'utile au club ;
 *   2. le site. Une photo de 4000 px affichée dans un cadre de 800 est du
 *      poids pur : elle ralentit la page sans rien apporter à l'œil.
 *
 * On redimensionne donc dans le navigateur avant d'envoyer : 2400 px sur le
 * plus grand côté, réencodé en WebP. Une photo de 6 Mo descend typiquement
 * sous 400 Ko, sans différence visible.
 *
 * En cas de pépin (navigateur ancien, image exotique, mémoire insuffisante),
 * le fichier d'origine est envoyé tel quel : la préparation est une
 * optimisation, jamais un point de passage obligé.
 *
 * Ce module est volontairement utilisable des deux côtés : le serveur y lit
 * les mêmes limites que celles appliquées par le navigateur.
 */

/* Taille maximale acceptée par l'envoi. Reste sous la limite de corps de
   requête déclarée dans `next.config.ts` (4 Mo), elle-même sous celle de
   l'hébergeur (4,5 Mo) : la marge absorbe l'encodage multipart. */
export const LIMITE_ENVOI = 3.5 * 1024 * 1024;

/* Le SVG est volontairement absent : c'est un document qui peut contenir du
   script, et il serait servi depuis le domaine du site. Les logos passent
   en PNG. */
export const TYPES_ACCEPTES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
] as const;

export const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

/** Le plus grand côté d'une photo publiée. Au-delà, l'œil ne voit plus rien. */
const COTE_MAX = 2400;

/** En dessous, une photo est déjà légère : inutile de la réencoder. */
const SEUIL_REENCODAGE = 600 * 1024;

export const enMo = (octets: number) => (octets / 1024 / 1024).toFixed(1).replace(".", ",");

/**
 * Rend une version allégée de la photo, ou la photo d'origine si l'alléger
 * n'apporte rien (ou n'est pas possible).
 */
export async function preparerPhoto(fichier: File): Promise<File> {
  // Un GIF peut être animé ; le passage par un canevas n'en garderait que la
  // première image. On n'y touche pas.
  if (fichier.type === "image/gif") return fichier;
  if (typeof createImageBitmap !== "function" || typeof document === "undefined") {
    return fichier;
  }

  let bitmap: ImageBitmap | null = null;
  try {
    bitmap = await createImageBitmap(fichier);
    const facteur = Math.min(1, COTE_MAX / Math.max(bitmap.width, bitmap.height));

    // Déjà petite et déjà légère : on n'a rien à gagner.
    if (facteur === 1 && fichier.size <= SEUIL_REENCODAGE) return fichier;

    const canevas = document.createElement("canvas");
    canevas.width = Math.max(1, Math.round(bitmap.width * facteur));
    canevas.height = Math.max(1, Math.round(bitmap.height * facteur));

    const contexte = canevas.getContext("2d");
    if (!contexte) return fichier;
    contexte.drawImage(bitmap, 0, 0, canevas.width, canevas.height);

    const allegee = await new Promise<Blob | null>((resoudre) =>
      canevas.toBlob(resoudre, "image/webp", 0.85),
    );
    if (!allegee || allegee.size === 0) return fichier;

    // On ne garde la version allégée que si elle est effectivement plus
    // légère — sauf si l'originale est de toute façon trop lourde pour être
    // envoyée, auquel cas c'est elle ou rien.
    const gagnante = allegee.size < fichier.size || fichier.size > LIMITE_ENVOI;
    if (!gagnante) return fichier;

    const nom = `${fichier.name.replace(/\.[^.]+$/, "")}.webp`;
    return new File([allegee], nom, { type: "image/webp" });
  } catch {
    return fichier;
  } finally {
    bitmap?.close();
  }
}

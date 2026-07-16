/* ============================================================
   CONSENTEMENT COOKIES (CNIL / RGPD)
   - Le choix (acceptation OU refus) est horodaté et versionné,
     et expire après ~6 mois (recommandation CNIL) : passé ce
     délai, la bannière re-sollicite le visiteur.
   - Aucun traceur soumis à consentement ne doit être chargé
     tant que readConsent() !== "accepted"
     (cf. components/layout/analytics-scripts.tsx).
   Fonctions à n'appeler que côté client.
   ============================================================ */

export type ConsentValue = "accepted" | "refused";

const STORAGE_KEY = "ocehand-cookie-consent";
/** À incrémenter si la liste des traceurs change : re-sollicite tout le monde. */
const CONSENT_VERSION = 2;
/** ~6 mois, durée de validité du choix recommandée par la CNIL. */
const MAX_AGE_MS = 182 * 24 * 60 * 60 * 1000;

/** Émis après chaque choix (detail: ConsentValue). */
export const CONSENT_CHANGE_EVENT = "ocehand-consent-change";
/** Émis pour ré-afficher la bannière (lien « Gérer mes cookies »). */
export const CONSENT_OPEN_EVENT = "ocehand-consent-open";

type StoredConsent = {
  value: ConsentValue;
  /** Horodatage du choix (preuve du consentement, art. 7 RGPD). */
  date: number;
  version: number;
};

/** Choix en cours de validité, ou null s'il faut (re)poser la question. */
export function readConsent(): ConsentValue | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as Partial<StoredConsent>;
    if (
      (stored.value !== "accepted" && stored.value !== "refused") ||
      stored.version !== CONSENT_VERSION ||
      typeof stored.date !== "number" ||
      Date.now() - stored.date > MAX_AGE_MS
    ) {
      return null;
    }
    return stored.value;
  } catch {
    // Ancien format (chaîne brute) ou localStorage indisponible : re-solliciter.
    return null;
  }
}

export function writeConsent(value: ConsentValue) {
  try {
    const stored: StoredConsent = { value, date: Date.now(), version: CONSENT_VERSION };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    /* localStorage indisponible : le choix ne sera pas mémorisé */
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_CHANGE_EVENT, { detail: value }));
}

/** Ré-ouvre la bannière de consentement (retrait du choix, art. 7.3 RGPD). */
export function openConsentBanner() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

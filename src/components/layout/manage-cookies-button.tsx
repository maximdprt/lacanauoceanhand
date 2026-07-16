"use client";

import { openConsentBanner } from "@/lib/consent";

/**
 * Ré-ouvre la bannière cookies pour modifier/retirer son consentement
 * (le retrait doit être aussi simple que le don — art. 7.3 RGPD).
 */
export function ManageCookiesButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentBanner} className={className}>
      Gérer mes cookies
    </button>
  );
}

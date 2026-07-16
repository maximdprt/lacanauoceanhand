"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";

import { CONSENT_CHANGE_EVENT, readConsent } from "@/lib/consent";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

/**
 * Scripts de mesure d'audience, chargés UNIQUEMENT après consentement
 * (art. 82 loi Informatique et Libertés — GA4/GTM/Clarity ne sont
 * jamais exemptés de consentement selon la CNIL).
 *
 * Si GTM est configuré, GA4 doit être déclenché comme balise DANS GTM :
 * on ne charge pas gtag.js en double.
 */
function subscribeToConsent(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
}

export function AnalyticsScripts() {
  // null côté serveur/hydratation, puis valeur du localStorage côté client.
  const consent = useSyncExternalStore(subscribeToConsent, readConsent, () => null);

  if (consent !== "accepted") return null;

  return (
    <>
      {gtmId && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      )}

      {!gtmId && gaMeasurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${gaMeasurementId}',{page_path:window.location.pathname});`}
          </Script>
        </>
      )}

      {clarityId && (
        <Script id="clarity-init" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      )}
    </>
  );
}

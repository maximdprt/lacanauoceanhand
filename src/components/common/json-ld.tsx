/**
 * Bloc JSON-LD Schema.org.
 * L'échappement de « < » en < est requis contre le XSS
 * (recommandation officielle Next.js pour le JSON-LD).
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

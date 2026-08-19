import { cn } from "@/lib/utils";

/* ============================================================
   EN-TÊTE DE SECTION — un seul composant pour tout le site.
   `action` permet de poser un lien à droite du titre (motif
   « titre à gauche, action à droite ») sans réinventer une
   mise en page par page.
   ============================================================ */

export function SectionTitle({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  action,
  as: Tag = "h2",
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  /** Lien ou bouton aligné à droite du titre (ignoré si align="center"). */
  action?: React.ReactNode;
  /** "h1" quand le SectionTitle sert de titre principal de page (un seul h1 par page). */
  as?: "h1" | "h2";
}) {
  const centered = align === "center";
  const hasAction = Boolean(action) && !centered;

  const heading = (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
      {(eyebrow || index) && (
        <div
          className={cn(
            "mb-4 flex items-center gap-3",
            centered && "justify-center",
          )}
        >
          {index && (
            <span
              className={cn(
                "section-index text-sm",
                light ? "text-white/40" : "text-ocean",
              )}
            >
              {index}
            </span>
          )}
          {eyebrow && (
            <span
              className={cn(
                "text-xs font-bold uppercase tracking-[0.22em]",
                light ? "text-white/60" : "text-ink-soft",
              )}
            >
              {eyebrow}
            </span>
          )}
        </div>
      )}
      <Tag
        className={cn(
          "headline text-[clamp(1.9rem,5vw,3.25rem)]",
          light ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            // ~62 caractères : la longueur de ligne confortable en lecture
            "mt-5 max-w-[62ch] text-lg leading-relaxed",
            centered && "mx-auto",
            light ? "text-white/70" : "text-ink-soft",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );

  if (!hasAction) return heading;

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
      {heading}
      <div className="shrink-0">{action}</div>
    </div>
  );
}

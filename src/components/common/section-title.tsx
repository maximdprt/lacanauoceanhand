import { cn } from "@/lib/utils";

export function SectionTitle({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {(eyebrow || index) && (
        <div
          className={cn(
            "mb-3 flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          {index && (
            <span className={cn("section-index text-sm", light ? "text-white/40" : "text-ocean")}>
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
      <h2
        className={cn(
          "headline text-[clamp(1.9rem,5vw,3.25rem)]",
          light ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            light ? "text-white/70" : "text-ink-soft",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

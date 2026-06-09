import { clubStats } from "@/data/site";
import { Reveal } from "@/components/common/reveal";

export function StatBand() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-ink">
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-50" />
      <div className="glow-gold pointer-events-none absolute inset-x-0 top-0 h-32" />
      <div className="container-x relative grid grid-cols-2 divide-x divide-y divide-white/10 md:grid-cols-4 md:divide-y-0">
        {clubStats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div className="px-4 py-10 text-center md:py-14">
              <p
                className={`section-index text-[clamp(2.6rem,6vw,4.5rem)] ${
                  i === 0 ? "text-gold-grad" : "text-white"
                }`}
              >
                {s.prefix}
                {s.value}
                {s.suffix}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-white/55">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import { clubStats } from "@/data/site";
import { Reveal } from "@/components/common/reveal";

export function StatBand() {
  return (
    <section className="border-y border-line bg-ink">
      <div className="container-x grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
        {clubStats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div className="px-4 py-9 text-center md:py-12">
              <p className="section-index text-[clamp(2.4rem,6vw,4rem)] text-white">
                {s.prefix}
                {s.value}
                {s.suffix}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

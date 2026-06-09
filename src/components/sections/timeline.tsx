import type { TimelineEvent } from "@/types";

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="space-y-4 border-l border-ocean/45 pl-5">
      {events.map((event) => (
        <article key={event.year} className="relative rounded-lg border border-white/10 bg-black/40 p-4">
          <span className="absolute -left-8 top-6 h-3 w-3 rounded-full bg-ocean" />
          <p className="font-display text-3xl text-ocean-light">{event.year}</p>
          <h3 className="text-lg font-semibold text-white">{event.title}</h3>
          <p className="mt-1 text-white/70">{event.description}</p>
        </article>
      ))}
    </div>
  );
}

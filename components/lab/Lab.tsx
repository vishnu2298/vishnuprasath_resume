import { labProjects, labStages } from "@/data/experience";
import { progression } from "@/data/journey";
import { Reveal } from "@/components/ui/Reveal";
import { StatusBadge } from "@/components/projects/StatusBadge";

/** Stage track instead of fake percentages: Concept → Exploring → Building → Shipped. */
function StageTrack({ stage, title }: { stage: number; title: string }) {
  const pct = (stage / (labStages.length - 1)) * 100;
  return (
    <div>
      <div
        role="meter"
        aria-label={`${title} progress stage`}
        aria-valuemin={0}
        aria-valuemax={labStages.length - 1}
        aria-valuenow={stage}
        aria-valuetext={labStages[Math.floor(stage)]}
        className="relative h-1 rounded-full bg-white/[0.08]"
      >
        <span className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber to-accent" style={{ width: `${pct}%` }} />
        {labStages.map((s, i) => (
          <span
            key={s}
            aria-hidden
            className={`absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border ${
              i <= stage ? "border-accent bg-accent" : "border-white/25 bg-ink"
            }`}
            style={{ left: `${(i / (labStages.length - 1)) * 100}%` }}
          />
        ))}
      </div>
      <div aria-hidden className="mt-2 flex justify-between font-mono text-[0.55rem] uppercase tracking-[0.14em] text-dim">
        {labStages.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
    </div>
  );
}

export function Lab() {
  return (
    <div>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {labProjects.map((p, i) => (
          <Reveal as="li" key={p.title} delay={(i % 4) * 0.06}>
            <article className="panel panel-hover relative flex h-full flex-col overflow-hidden p-6">
              {/* Experimental feel: blueprint grid + dashed outline */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.35]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              <div className="relative flex items-center justify-between">
                <StatusBadge status={p.status} text={p.statusText} />
                <span className="font-mono text-[0.6rem] text-dim">LAB/{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="heading relative mt-6 text-xl">{p.title}</h3>
              <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted">{p.note}</p>
              <div className="relative mt-6">
                <StageTrack stage={p.stage} title={p.title} />
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-16">
        <p className="eyebrow mb-5">The progression</p>
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-3" aria-label="From work experience to entrepreneurial thinking">
          {progression.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <span
                className={`heading text-[clamp(0.95rem,1.8vw,1.35rem)] ${i === progression.length - 1 ? "accent-gradient" : i >= 3 ? "text-fg" : "text-muted"}`}
              >
                {s}
              </span>
              {i < progression.length - 1 && (
                <span aria-hidden className="text-accent">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  );
}

"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { journey } from "@/data/journey";
import { Flow } from "@/components/ui/Flow";
import { StageGlyph } from "./StageGlyph";

/** The progression as an ARIA tab list: a rail of six stages and one detail panel. */
export function Journey() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = journey[active];

  const go = (i: number, focus = false) => {
    const n = (i + journey.length) % journey.length;
    setActive(n);
    if (focus) tabs.current[n]?.focus();
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      go(e.key === "Home" ? 0 : journey.length - 1, true);
      return;
    }
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    go(active + dir, true);
  };

  return (
    <div>
      {/* Rail */}
      <div
        role="tablist"
        aria-label="Career progression"
        onKeyDown={onKey}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-6 md:overflow-visible md:px-0"
      >
        {journey.map((s, i) => {
          const on = i === active;
          const past = i < active;
          return (
            <button
              key={s.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`stage-tab-${s.id}`}
              aria-selected={on}
              aria-controls={`stage-panel-${s.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => go(i)}
              className={`group relative flex min-w-[10.5rem] snap-start flex-col items-start justify-start border-t-2 pb-2 pr-4 pt-5 text-left transition-colors duration-300 md:min-w-0 ${
                on ? "border-accent" : past ? "border-accent/35" : "border-[var(--line-strong)] hover:border-ice/40"
              }`}
            >
              <StageGlyph stage={i} active={on} />
              <span className={`mt-3 block text-[0.75rem] ${on ? "text-accent" : "text-dim"}`}>
                {String(i + 1).padStart(2, "0")} · {s.period}
              </span>
              <span className={`mt-1 block text-[0.98rem] leading-snug ${on ? "text-fg" : "text-muted group-hover:text-fg"}`}>{s.stage}</span>
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <AnimatePresence mode="wait">
        <m.div
          key={stage.id}
          role="tabpanel"
          id={`stage-panel-${stage.id}`}
          aria-labelledby={`stage-tab-${stage.id}`}
          tabIndex={0}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="mt-10 grid gap-12 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]"
        >
          <div>
            <h3 className="heading text-[clamp(1.6rem,3vw,2.3rem)]">{stage.title}</h3>
            {stage.role && <p className="mt-2 text-sm text-dim">{stage.role}</p>}
            <p className="mt-6 text-lg italic text-ice">{stage.label}</p>
            <ul className="mt-6 space-y-2.5 text-[0.98rem] leading-relaxed text-fg/85">
              {stage.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span aria-hidden className="mt-[0.75rem] h-px w-3 shrink-0 bg-accent" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-7 text-sm text-muted">{stage.tech.join(" · ")}</p>
            <div className="mt-8 flex gap-3">
              <button onClick={() => go(active - 1)} disabled={active === 0} className="btn btn-ghost h-10 px-3 disabled:opacity-35" aria-label="Previous stage">
                <ArrowLeft size={16} aria-hidden />
              </button>
              <button onClick={() => go(active + 1)} disabled={active === journey.length - 1} className="btn btn-ghost h-10 disabled:opacity-35">
                {active < journey.length - 1 ? (
                  <>
                    Next: {journey[active + 1].stage} <ArrowRight size={16} aria-hidden />
                  </>
                ) : (
                  "Current stage"
                )}
              </button>
            </div>
          </div>
          <figure className="panel self-start p-6 md:p-8">
            <figcaption className="eyebrow mb-5">The system at this stage</figcaption>
            <Flow steps={stage.flow} direction="vertical" highlightLast label={`${stage.stage} system flow`} />
          </figure>
        </m.div>
      </AnimatePresence>
      <p className="mt-6 text-xs text-dim">Stages three to six overlap within my current role — they are how the work deepened, not separate jobs.</p>
    </div>
  );
}

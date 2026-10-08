"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, m } from "framer-motion";
import { journey } from "@/data/journey";
import { Flow } from "@/components/ui/Flow";
import { StageGlyph } from "./StageGlyph";

/** "Engineering Evolution": an ARIA tab list where each stage is a node on a rail. */
export function Journey() {
  const [active, setActive] = useState(3);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = journey[active];

  const onKey = (e: KeyboardEvent) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      const i = e.key === "Home" ? 0 : journey.length - 1;
      setActive(i);
      tabs.current[i]?.focus();
      return;
    }
    if (!dir) return;
    e.preventDefault();
    const i = (active + dir + journey.length) % journey.length;
    setActive(i);
    tabs.current[i]?.focus();
  };

  return (
    <div>
      {/* Rail */}
      <div className="relative">
        <div aria-hidden className="absolute left-0 right-0 top-[52px] hidden h-px bg-gradient-to-r from-white/5 via-white/15 to-accent/60 md:block" />
        <div
          role="tablist"
          aria-label="Career stages"
          onKeyDown={onKey}
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:px-0"
        >
          {journey.map((s, i) => {
            const on = i === active;
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
                onClick={() => setActive(i)}
                className={`group relative flex min-w-[9.5rem] snap-start flex-col items-center gap-3 rounded-2xl border px-3 pb-4 pt-3 text-center transition-colors duration-300 md:min-w-0 ${
                  on ? "border-accent/50 bg-accent/[0.07]" : "border-white/[0.06] bg-ink-2/70 hover:border-white/20"
                }`}
              >
                <span className="relative grid h-[76px] place-items-center">
                  <StageGlyph stage={i} active={on} />
                </span>
                <span className={`font-mono text-[0.68rem] uppercase tracking-[0.2em] ${on ? "text-accent" : "text-dim"}`}>
                  {s.period}
                </span>
                <span className={`text-sm font-semibold leading-tight ${on ? "text-fg" : "text-muted"}`}>{s.stage}</span>
                {s.status === "current" && (
                  <span className="absolute right-2 top-2 flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-accent">
                    <span className="status-dot" aria-hidden /> Now
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Panel */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <m.div
            key={stage.id}
            role="tabpanel"
            id={`stage-panel-${stage.id}`}
            aria-labelledby={`stage-tab-${stage.id}`}
            tabIndex={0}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45 }}
            className="panel grid gap-8 p-6 md:grid-cols-[1.1fr_1fr] md:p-10"
          >
            <div>
              <p className="eyebrow mb-3 text-accent">
                {stage.period} · {stage.stage}
              </p>
              <h3 className="heading text-[clamp(1.6rem,3.2vw,2.5rem)]">{stage.title}</h3>
              {stage.role && <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">{stage.role}</p>}
              <p className="mt-6 border-l-2 border-accent pl-4 text-lg italic text-fg/90">“{stage.label}”</p>
              <ul className="mt-6 space-y-2.5 text-[0.95rem] text-muted">
                {stage.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-8">
              <div>
                <p className="eyebrow mb-4">System at this stage</p>
                <Flow steps={stage.flow} direction="vertical" highlightLast label={`${stage.stage} system flow`} />
              </div>
              <div>
                <p className="eyebrow mb-3">Technology</p>
                <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                  {stage.tech.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </m.div>
        </AnimatePresence>
        <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-dim">
          Years mark career stages, not exact technology adoption dates.
        </p>
      </div>
    </div>
  );
}

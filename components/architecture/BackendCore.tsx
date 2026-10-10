"use client";

import { useState } from "react";
import { backendFlow } from "@/data/stack";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The request path as a diagram you can interrogate: pick a layer, read the decision I make there.
 * The travelling dot is the request; it pauses for reduced motion.
 */
export function BackendCore() {
  const [active, setActive] = useState(0);
  const step = backendFlow[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
      <Reveal>
        <div className="panel p-4 md:p-6">
          <p className="eyebrow mb-4 px-2">One request, eight layers</p>
          <ol className="relative" aria-label="Request path through a backend system">
            <div aria-hidden className="absolute bottom-7 left-[1.45rem] top-7 w-px bg-[var(--line-strong)]" />
            <div
              aria-hidden
              className="request-pulse absolute left-[1.2rem] top-6 h-2 w-2 rounded-full bg-ice"
              style={{ ["--travel" as string]: `calc(${backendFlow.length - 1} * 3.6rem)` }}
            />
            {backendFlow.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.label} className="relative">
                  <button
                    aria-pressed={on}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`flex h-[3.6rem] w-full items-center gap-4 rounded-lg px-2 text-left transition-colors ${
                      on ? "bg-accent/[0.09]" : "hover:bg-white/[0.03]"
                    }`}
                  >
                    <span
                      className={`relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-md border font-mono text-[0.65rem] ${
                        on ? "border-accent bg-accent text-ink" : "border-[var(--line-strong)] bg-ink text-muted"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className={`flex-1 font-medium ${on ? "text-fg" : "text-fg/80"}`}>{s.label}</span>
                    <span className="hidden text-right text-xs text-dim sm:block">{s.note}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
        <div aria-live="polite">
          <p className="text-sm text-accent">
            Layer {active + 1} · {step.label}
          </p>
          <p className="heading mt-4 text-[clamp(1.5rem,2.6vw,2.1rem)] text-fg">{step.decision}</p>
        </div>
        <p className="mt-10 border-t border-[var(--line)] pt-5 text-sm leading-relaxed text-muted">
          Node.js · Express · Mongoose · Sequelize · MongoDB · PostgreSQL · MySQL · Elasticsearch · REST APIs — hands-on, in
          production work.
        </p>
      </Reveal>
    </div>
  );
}

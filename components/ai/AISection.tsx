"use client";

import { m } from "framer-motion";
import { aiHub } from "@/data/thinking";
import { Reveal } from "@/components/ui/Reveal";

const AI_STEPS = new Set(["Intent understanding", "AI enrichment", "Ranking"]);

function Pipeline({ title, note, steps, ai }: { title: string; note: string; steps: string[]; ai?: boolean }) {
  return (
    <figure className={`panel p-6 md:p-8 ${ai ? "border-accent/30" : ""}`}>
      <figcaption>
        <p className={`text-sm ${ai ? "text-accent" : "text-dim"}`}>{title}</p>
        <p className="mt-1 text-sm text-muted">{note}</p>
      </figcaption>
      <ol className="mt-6 flex flex-col gap-2" aria-label={title}>
        {steps.map((s, i) => {
          const isAI = ai && AI_STEPS.has(s);
          return (
            <m.li
              key={s}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="flex items-center gap-4"
            >
              <span className="w-5 text-right font-mono text-[0.65rem] text-dim">{i + 1}</span>
              <span
                className={`flex flex-1 items-center justify-between rounded-md border px-4 py-2.5 text-[0.95rem] ${
                  isAI ? "border-accent/50 bg-accent/[0.1] text-fg" : "border-[var(--line)] bg-ink/30 text-fg/80"
                }`}
              >
                {s}
                {isAI && <span className="font-mono text-[0.62rem] text-accent-strong">AI step</span>}
              </span>
            </m.li>
          );
        })}
      </ol>
    </figure>
  );
}

export function AISection() {
  return (
    <div>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
        <Reveal>
          <blockquote className="display text-[clamp(1.7rem,3.2vw,2.6rem)] text-fg">“{aiHub.statement}”</blockquote>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="leading-relaxed text-muted">
            It&apos;s the same request path I&apos;ve built for years, with a model called at the few points where it changes the
            outcome — understanding what someone asked for, enriching the data, and ordering the results. Everything else stays
            ordinary, testable code.
          </p>
          <p className="mt-6 text-sm text-fg/80">
            <span className="text-dim">Where I&apos;ve used it: </span>
            {aiHub.uses.join(" · ")}
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-2">
        <Reveal>
          <Pipeline title="Before" note="A conventional API" steps={aiHub.traditional} />
        </Reveal>
        <Reveal delay={0.1}>
          <Pipeline title="After" note="Same API, three steps where AI earns its place" steps={aiHub.enabled} ai />
        </Reveal>
      </div>
    </div>
  );
}

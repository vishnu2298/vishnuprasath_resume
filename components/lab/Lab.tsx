"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { labExperiments, labStages } from "@/data/experience";
import { projects, type Project } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { StatusBadge } from "@/components/projects/StatusBadge";
import { ProjectDialog } from "@/components/projects/Projects";

/** Stage track instead of fake percentages: Concept → Exploring → Building → Shipped. */
function StageTrack({ stage, title }: { stage: number; title: string }) {
  const pct = (stage / (labStages.length - 1)) * 100;
  return (
    <div className="w-full">
      <div
        role="meter"
        aria-label={`${title} stage`}
        aria-valuemin={0}
        aria-valuemax={labStages.length - 1}
        aria-valuenow={stage}
        aria-valuetext={labStages[Math.floor(stage)]}
        className="relative h-px bg-[var(--line-strong)]"
      >
        <span className="absolute inset-y-0 left-0 bg-accent" style={{ width: `${pct}%` }} />
        {labStages.map((s, i) => (
          <span
            key={s}
            aria-hidden
            className={`absolute top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full border ${
              i <= stage ? "border-accent bg-accent" : "border-[var(--line-strong)] bg-ink"
            }`}
            style={{ left: `${(i / (labStages.length - 1)) * 100}%` }}
          />
        ))}
      </div>
      <div aria-hidden className="mt-2.5 flex justify-between text-[0.66rem] text-dim">
        {labStages.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
    </div>
  );
}

export function Lab() {
  const [open, setOpen] = useState<Project | null>(null);
  const products = projects.filter((p) => p.kind === "product");

  return (
    <div className="grid gap-16 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
      <ul className="flex flex-col gap-3">
        {products.map((p, i) => (
          <Reveal as="li" key={p.id} delay={i * 0.05}>
            <article className="panel panel-hover grid gap-6 p-6 md:grid-cols-[minmax(0,1fr)_14rem] md:items-center md:p-7">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="heading text-[1.45rem]">{p.title}</h3>
                  <StatusBadge status={p.status} />
                </div>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{p.summary}</p>
                <button onClick={() => setOpen(p)} aria-haspopup="dialog" className="link mt-4 inline-flex items-center gap-1.5 text-sm">
                  How it works <ArrowUpRight size={14} aria-hidden />
                  <span className="sr-only">: {p.title}</span>
                </button>
              </div>
              <StageTrack stage={p.labStage ?? 0} title={p.title} />
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.1}>
        <h3 className="heading text-xl">Smaller experiments</h3>
        <ul className="mt-6 border-b border-[var(--line)]">
          {labExperiments.map((e) => (
            <li key={e.title} className="rule-top py-5">
              <p className="font-medium text-fg">{e.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{e.note}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-dim">
          Nothing here is shipped. These are where I try ideas before they are useful at work — or decide they aren&apos;t.
        </p>
      </Reveal>

      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </div>
  );
}

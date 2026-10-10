"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { Flow } from "@/components/ui/Flow";
import { Reveal } from "@/components/ui/Reveal";
import { StatusBadge } from "./StatusBadge";

/** The diagram that belongs to one project: its architecture, or a worked example of its behaviour. */
function ProjectDiagram({ p }: { p: Project }) {
  if (p.example) {
    return (
      <figure className="panel p-6 md:p-8">
        <figcaption className="eyebrow mb-5">Worked example</figcaption>
        <p className="mb-6 font-mono text-[0.95rem] text-ice">
          query: <span className="text-fg">“{p.example.prompt}”</span>
        </p>
        <Flow steps={p.example.steps} direction="vertical" highlightLast label={`${p.title} example`} />
        {p.example.outcome && <p className="mt-6 border-t border-[var(--line)] pt-5 text-sm leading-relaxed text-muted">{p.example.outcome}</p>}
      </figure>
    );
  }
  if (!p.architecture) return null;
  return (
    <figure className="panel p-6 md:p-8">
      <figcaption className="eyebrow mb-5">{p.id === "recommendation" ? "Recommendation pipeline" : "Request path"}</figcaption>
      <Flow steps={p.architecture} direction="vertical" highlightLast label={`${p.title} architecture`} />
    </figure>
  );
}

function CaseStudy({ p, flip, onOpen }: { p: Project; flip: boolean; onOpen: () => void }) {
  return (
    <article className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={flip ? "lg:order-2" : ""}>
        <p className="font-mono text-xs text-dim">{p.index}</p>
        <h3 className="heading mt-3 text-[clamp(1.7rem,3vw,2.4rem)]">{p.title}</h3>
        <p className="mt-4 text-lg leading-relaxed text-muted">{p.summary}</p>
        {p.decision && (
          <div className="mt-8 border-l-2 border-accent pl-5">
            <p className="text-sm text-dim">The decision that shaped it</p>
            <p className="mt-1 leading-relaxed text-fg">{p.decision}</p>
          </div>
        )}
        <p className="mt-8 text-sm text-fg/80">{p.tech.join(" · ")}</p>
        <button onClick={onOpen} aria-haspopup="dialog" className="link mt-6 inline-flex items-center gap-1.5 text-[0.95rem]">
          Everything I worked on <ArrowUpRight size={15} aria-hidden />
          <span className="sr-only">: {p.title}</span>
        </button>
      </Reveal>
      <Reveal delay={0.1} className={flip ? "lg:order-1" : ""}>
        <ProjectDiagram p={p} />
      </Reveal>
    </article>
  );
}

export function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project && !d.open) d.showModal();
    if (!project && d.open) d.close();
  }, [project]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="project-dialog-title"
      className="m-auto w-[min(52rem,calc(100vw-1.5rem))] rounded-2xl border border-[var(--line-strong)] bg-surface p-0 text-fg shadow-2xl backdrop:bg-[#0a1015]/75 backdrop:backdrop-blur-sm"
    >
      {project && (
        <div className="max-h-[85svh] overflow-y-auto p-6 md:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-dim">{project.index}</span>
                <StatusBadge status={project.status} />
              </div>
              <h3 id="project-dialog-title" className="heading mt-4 text-[clamp(1.6rem,3.6vw,2.4rem)]">
                {project.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-lg border border-[var(--line-strong)] p-2 text-muted transition-colors hover:border-accent hover:text-fg"
            >
              <X size={18} />
            </button>
          </div>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">{project.summary}</p>

          <dl className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              ["My role", project.role],
              ["Problem", project.problem],
              ["Engineering challenge", project.challenge],
              ["Decision", project.decision],
              ["Purpose", project.purpose],
            ]
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k}>
                  <dt className="text-sm text-dim">{k}</dt>
                  <dd className="mt-1 text-fg/90">{v}</dd>
                </div>
              ))}
          </dl>

          <div className="mt-8">
            <p className="text-sm text-dim">
              {project.capabilitiesLabel ?? (project.kind === "professional" ? "What I worked on" : "Capabilities")}
            </p>
            <ul className="mt-3 grid gap-x-6 gap-y-2 text-[0.95rem] text-fg/85 sm:grid-cols-2">
              {project.built.map((b) => (
                <li key={b} className="flex gap-3">
                  <span aria-hidden className="mt-[0.6rem] h-px w-3 shrink-0 bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {project.architecture && (
            <div className="mt-8">
              <p className="mb-3 text-sm text-dim">{project.id === "investor" ? "Workflow" : "Architecture"}</p>
              <Flow steps={project.architecture} highlightLast label={`${project.title} architecture`} />
            </div>
          )}

          {project.example && (
            <div className="mt-8 rounded-xl border border-[var(--line)] bg-ink/40 p-5">
              <p className="mb-3 text-sm text-dim">Example</p>
              <p className="mb-4 font-mono text-sm text-ice">“{project.example.prompt}”</p>
              <Flow steps={project.example.steps} size="sm" highlightLast label="Example flow" />
              {project.example.outcome && <p className="mt-4 text-sm text-muted">{project.example.outcome}</p>}
            </div>
          )}

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technology">
            {project.tech.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>

          <p className="mt-8 border-t border-[var(--line)] pt-5 text-xs text-dim">
            {project.footnote ??
              (project.kind === "professional"
                ? "Client and product names are kept confidential. No metrics are claimed."
                : "Personal product work — shown at its real stage, not presented as a finished production system.")}
          </p>
        </div>
      )}
    </dialog>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => p.kind === "professional" && !p.featured);

  return (
    <div>
      <div className="flex flex-col gap-24 md:gap-32">
        {featured.map((p, i) => (
          <CaseStudy key={p.id} p={p} flip={i % 2 === 1} onOpen={() => setOpen(p)} />
        ))}
      </div>

      <div className="mt-28">
        <Reveal className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="heading text-2xl">Earlier enterprise work</h3>
          <p className="text-sm text-dim">ERP, logistics, fleet and billing systems — the foundation for everything above.</p>
        </Reveal>
        <ul className="border-b border-[var(--line)]">
          {rest.map((p) => (
            <li key={p.id} className="rule-top">
              <button
                onClick={() => setOpen(p)}
                aria-haspopup="dialog"
                className="group grid w-full gap-x-8 gap-y-1 py-5 text-left transition-colors hover:bg-white/[0.02] md:grid-cols-[3rem_minmax(0,1.1fr)_minmax(0,1.4fr)_auto] md:items-baseline"
              >
                <span className="font-mono text-xs text-dim">{p.index}</span>
                <span className="text-[1.05rem] font-medium text-fg">{p.title}</span>
                <span className="text-sm text-muted">{p.summary}</span>
                <span className="hidden items-center gap-1 text-sm text-muted transition-colors group-hover:text-accent md:flex">
                  Details <ArrowUpRight size={14} aria-hidden />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </div>
  );
}

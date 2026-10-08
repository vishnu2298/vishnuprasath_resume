"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { Flow } from "@/components/ui/Flow";
import { TiltCard } from "@/components/ui/TiltCard";
import { StatusBadge } from "./StatusBadge";

type Filter = "all" | "professional" | "product";
const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All systems" },
  { id: "professional", label: "Professional" },
  { id: "product", label: "Products I'm building" },
];

function ProjectCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <TiltCard className="group panel panel-hover h-full rounded-[18px]" max={4}>
      <article className="flex h-full flex-col p-6 md:p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-xs text-accent">{p.index}</span>
          <StatusBadge status={p.status} />
        </div>
        <h3 className="heading mt-6 text-[1.45rem] md:text-[1.65rem]">{p.title}</h3>
        <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">{p.summary}</p>
        {p.architecture && (
          <div className="mt-5 hidden md:block">
            <Flow steps={p.architecture.slice(0, 4).concat(p.architecture.length > 4 ? ["…"] : [])} size="sm" label={`${p.title} architecture preview`} />
          </div>
        )}
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-6" aria-label="Technologies">
          {p.tech.slice(0, 5).map((t) => (
            <li key={t} className="chip text-[0.64rem]">
              {t}
            </li>
          ))}
        </ul>
        <button
          onClick={onOpen}
          className="mt-6 inline-flex items-center gap-2 self-start font-mono text-[0.7rem] uppercase tracking-[0.18em] text-fg transition-colors hover:text-accent"
          aria-haspopup="dialog"
        >
          View system <ArrowUpRight size={14} aria-hidden />
          <span className="sr-only">: {p.title}</span>
        </button>
      </article>
    </TiltCard>
  );
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
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
      className="m-auto w-[min(56rem,calc(100vw-1.5rem))] rounded-3xl border border-white/10 bg-ink-2 p-0 text-fg backdrop:bg-black/75 backdrop:backdrop-blur-sm"
    >
      {project && (
        <div className="max-h-[85svh] overflow-y-auto p-6 md:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-accent">{project.index}</span>
                <StatusBadge status={project.status} />
              </div>
              <h3 id="project-dialog-title" className="heading mt-4 text-[clamp(1.7rem,4vw,2.8rem)]">
                {project.title}
              </h3>
            </div>
            <button onClick={onClose} aria-label="Close" className="rounded-full border border-white/10 p-2 text-muted hover:border-accent hover:text-fg">
              <X size={18} />
            </button>
          </div>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">{project.summary}</p>

          <dl className="mt-8 grid gap-6 md:grid-cols-2">
            {project.role && (
              <div>
                <dt className="eyebrow mb-2">My role</dt>
                <dd>{project.role}</dd>
              </div>
            )}
            {project.problem && (
              <div>
                <dt className="eyebrow mb-2">Problem</dt>
                <dd className="text-fg/90">{project.problem}</dd>
              </div>
            )}
            {project.challenge && (
              <div>
                <dt className="eyebrow mb-2">Engineering challenge</dt>
                <dd className="text-fg/90">{project.challenge}</dd>
              </div>
            )}
            {project.purpose && (
              <div>
                <dt className="eyebrow mb-2">Purpose</dt>
                <dd className="text-fg/90">{project.purpose}</dd>
              </div>
            )}
          </dl>

          <div className="mt-8">
            <p className="eyebrow mb-3">
              {project.capabilitiesLabel ?? (project.kind === "professional" ? "What I worked on" : "Capabilities")}
            </p>
            <ul className="grid gap-x-6 gap-y-2 text-[0.95rem] text-fg/85 sm:grid-cols-2">
              {project.built.map((b) => (
                <li key={b} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {project.architecture && (
            <div className="mt-8">
              <p className="eyebrow mb-3">{project.kind === "product" && project.id === "investor" ? "Workflow" : "Architecture"}</p>
              <Flow steps={project.architecture} highlightLast label={`${project.title} architecture`} />
            </div>
          )}

          {project.example && (
            <div className="mt-8 rounded-2xl border border-white/[0.08] bg-black/30 p-5">
              <p className="eyebrow mb-3">Example</p>
              <p className="mb-4 font-mono text-sm text-amber">“{project.example.prompt}”</p>
              <Flow steps={project.example.steps} size="sm" highlightLast label="Example flow" />
              {project.example.outcome && <p className="mt-4 text-sm text-muted">{project.example.outcome}</p>}
            </div>
          )}

          <div className="mt-8">
            <p className="eyebrow mb-3">Technology</p>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 border-t border-white/[0.06] pt-5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-dim">
            {project.footnote ??
              (project.kind === "professional"
                ? "Client and product names are kept confidential. No metrics are claimed."
                : "Personal product work — status shown as-is, not represented as a finished production system.")}
          </p>
        </div>
      )}
    </dialog>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<Project | null>(null);
  const list = projects.filter((p) => filter === "all" || p.kind === filter);

  return (
    <div>
      <div role="group" aria-label="Filter systems" className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full border px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] transition-colors ${
              filter === f.id ? "border-fg bg-fg text-ink" : "border-white/15 text-muted hover:border-white/40 hover:text-fg"
            }`}
          >
            {f.label}
            <span className="ml-2 opacity-60">{projects.filter((p) => f.id === "all" || p.kind === f.id).length}</span>
          </button>
        ))}
      </div>

      {/* Swipeable rail on mobile, grid from md up. */}
      <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 xl:grid-cols-3">
        {list.map((p) => (
          <li key={p.id} className="w-[85%] shrink-0 snap-center md:w-auto">
            <ProjectCard p={p} onOpen={() => setOpen(p)} />
          </li>
        ))}
      </ul>
      <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-dim md:hidden">Swipe → {list.length} systems</p>

      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </div>
  );
}

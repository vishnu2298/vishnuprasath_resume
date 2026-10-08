import { GraduationCap } from "lucide-react";
import { leadership, metrics, roles } from "@/data/experience";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";

export function Roles() {
  return (
    <ol className="relative flex flex-col gap-4 border-l border-white/10 pl-6 md:pl-10">
      {roles.map((r, i) => (
        <Reveal as="li" key={r.title + r.period} delay={i * 0.05} className="relative">
          <span
            aria-hidden
            className={`absolute -left-[1.85rem] top-8 h-3 w-3 rounded-full border-2 md:-left-[2.85rem] ${
              r.current ? "border-accent bg-accent shadow-[0_0_16px_rgba(255,90,31,0.8)]" : "border-white/30 bg-ink"
            }`}
          />
          <article className={`panel p-6 md:p-8 ${r.current ? "border-accent/40" : ""}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <h3 className="heading text-xl md:text-2xl">{r.title}</h3>
                <p className="mt-1 text-muted">{r.context}</p>
              </div>
              <span className={`font-mono text-xs uppercase tracking-[0.16em] ${r.current ? "text-accent" : "text-dim"}`}>{r.period}</span>
            </div>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {r.points.map((p) => (
                <li key={p} className="chip text-[0.66rem]">
                  {p}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      ))}
    </ol>
  );
}

export function Leadership() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Reveal className="panel p-6 md:p-8">
        <p className="eyebrow mb-5">Foundations</p>
        <ul className="space-y-2.5 text-fg/85">
          {leadership.foundations.map((l) => (
            <li key={l} className="flex gap-3">
              <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-white/30" />
              {l}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal className="panel border-accent/30 p-6 md:p-8" delay={0.1}>
        <p className="eyebrow mb-5 text-accent">As a technical lead</p>
        <ul className="space-y-2.5 text-fg/85">
          {leadership.now.map((l) => (
            <li key={l} className="flex gap-3">
              <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
              {l}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

export function Education() {
  return (
    <Reveal className="panel flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
      <div className="flex items-center gap-4">
        <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-accent">
          <GraduationCap size={20} aria-hidden />
        </span>
        <h3 className="eyebrow">Education</h3>
      </div>
      <ul className="flex flex-col gap-3 md:flex-row md:gap-10">
        {profile.education.map((e) => (
          <li key={e.degree}>
            <p className="font-semibold">{e.degree}</p>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-dim">{e.note}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function Metrics() {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[18px] border border-white/[0.08] bg-white/[0.08] lg:grid-cols-5">
      {metrics.map((m, i) => (
        <Reveal key={m.label} delay={i * 0.06} className={`bg-ink-2 p-6 md:p-8 ${i === 0 ? "col-span-2 lg:col-span-1" : ""}`}>
          <dt className="sr-only">{m.label}</dt>
          <dd>
            <span className="display block text-[clamp(2rem,4.2vw,3.4rem)] text-fg">
              {m.value === "7+" ? <span className="accent-gradient">7+</span> : m.value}
            </span>
            <span className="mt-3 block font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg/80">{m.label}</span>
            <span className="mt-1 block text-sm text-dim">{m.note}</span>
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}

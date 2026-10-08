"use client";

import { ArrowLeft, MapPin, Printer } from "lucide-react";
import { profile } from "@/data/profile";
import { roles, leadership } from "@/data/experience";
import { stackLevels } from "@/data/stack";
import { projects } from "@/data/projects";
import { useMode } from "@/components/providers/ModeProvider";

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-5 border-b border-white/10 pb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">{children}</h2>;
}

/** Recruiter view: everything important on one scannable, printable page. No 3D is loaded. */
export function Resume() {
  const { setMode, printResume } = useMode();
  const pro = projects.filter((p) => p.kind === "professional");
  const product = projects.filter((p) => p.kind === "product");
  const contact = [
    profile.links.email && { label: profile.links.email, href: `mailto:${profile.links.email}` },
    profile.links.linkedin && { label: "LinkedIn", href: profile.links.linkedin },
    profile.links.github && { label: "GitHub", href: profile.links.github },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <main id="main" className="resume-doc relative z-10 px-4 pb-24 pt-24 md:pt-28">
      <article className="mx-auto max-w-4xl">
        <div data-print="hide" className="mb-10 flex flex-wrap items-center justify-between gap-3">
          <button onClick={() => setMode("experience")} className="btn btn-ghost h-10">
            <ArrowLeft size={14} aria-hidden /> Back to experience
          </button>
          <button onClick={printResume} className="btn btn-primary h-10">
            <Printer size={14} aria-hidden /> Print / save PDF
          </button>
        </div>

        <header className="mb-12">
          <h1 className="display text-[clamp(2rem,5.6vw,3.7rem)]">{profile.name}</h1>
          <p className="mt-4 font-mono text-sm uppercase tracking-[0.16em] text-fg/85">{profile.roles.join(" · ")}</p>
          <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} aria-hidden /> {profile.location}
            </span>
            <span>{profile.yearsExperience} years experience</span>
            {contact.map((c) => (
              <a key={c.href} href={c.href} className="underline decoration-white/20 underline-offset-4 hover:text-fg">
                {c.label}
              </a>
            ))}
          </p>
        </header>

        <section className="mb-12" aria-labelledby="r-summary">
          <H>
            <span id="r-summary">Summary</span>
          </H>
          <p className="text-lg leading-relaxed text-fg/90">{profile.mainStatement}</p>
          <p className="mt-3 leading-relaxed text-muted">
            {profile.summary} {profile.secondary} Currently focused on backend engineering, system architecture, API development, AI
            integration, automation, recommendation systems and search intelligence — including converting existing Python/AI
            workflows into maintainable Node.js services.
          </p>
        </section>

        <section className="mb-12" aria-labelledby="r-exp">
          <H>
            <span id="r-exp">Experience</span>
          </H>
          <ol className="space-y-8">
            {roles.map((r) => (
              <li key={r.title + r.period}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">{r.title}</h3>
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-dim">{r.period}</span>
                </div>
                <p className="text-sm text-muted">{r.context}</p>
                <ul className="mt-3 grid list-disc gap-x-8 gap-y-1 pl-5 text-[0.92rem] text-fg/85 marker:text-accent sm:grid-cols-2">
                  {r.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <h3 className="mb-2 text-sm font-semibold">Leadership & collaboration</h3>
            <p className="text-[0.92rem] leading-relaxed text-muted">{[...leadership.now, ...leadership.foundations.slice(0, 4)].join(" · ")}</p>
          </div>
        </section>

        <section className="mb-12" aria-labelledby="r-skills">
          <H>
            <span id="r-skills">Skills</span>
          </H>
          <dl className="space-y-3">
            {[...stackLevels].reverse().map((l) => (
              <div key={l.level} className="grid gap-1 sm:grid-cols-[9rem_1fr]">
                <dt className="font-mono text-xs uppercase tracking-[0.14em] text-dim">{l.name}</dt>
                <dd className="text-[0.95rem] text-fg/90">{l.items.join(", ")}</dd>
              </div>
            ))}
            <div className="grid gap-1 sm:grid-cols-[9rem_1fr]">
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-dim">Cloud & APIs</dt>
              <dd className="text-[0.95rem] text-fg/90">Azure, Firebase, SerpAPI, Affiliate / Push / OCR / Analytics APIs</dd>
            </div>
          </dl>
        </section>

        <section className="mb-12" aria-labelledby="r-projects">
          <H>
            <span id="r-projects">Selected systems</span>
          </H>
          <ul className="space-y-5">
            {pro.map((p) => (
              <li key={p.id}>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-[0.92rem] text-muted">{p.summary}</p>
                <p className="mt-1 font-mono text-[0.7rem] text-dim">{p.tech.join(" · ")}</p>
              </li>
            ))}
          </ul>
          <h3 className="mb-4 mt-10 text-sm font-semibold">Personal products (in progress)</h3>
          <ul className="space-y-4">
            {product.map((p) => (
              <li key={p.id}>
                <p className="font-semibold">
                  {p.title} <span className="ml-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">{p.status}</span>
                </p>
                <p className="text-[0.92rem] text-muted">{p.summary}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-dim">Client and product names are kept confidential.</p>
        </section>

        <section className="mb-12" aria-labelledby="r-edu">
          <H>
            <span id="r-edu">Education</span>
          </H>
          <ul className="space-y-2">
            {profile.education.map((e) => (
              <li key={e.degree} className="flex flex-wrap justify-between gap-2">
                <span className="font-semibold">{e.degree}</span>
                <span className="font-mono text-xs text-dim">{e.note}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="r-contact">
          <H>
            <span id="r-contact">Contact</span>
          </H>
          {contact.length ? (
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {contact.map((c) => (
                <li key={c.href}>
                  <a href={c.href} className="underline decoration-white/20 underline-offset-4">
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">{profile.location}</p>
          )}
        </section>
      </article>
    </main>
  );
}

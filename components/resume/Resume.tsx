"use client";

import { ArrowLeft, Printer } from "lucide-react";
import { profile } from "@/data/profile";
import { roles, leadership } from "@/data/experience";
import { stackLevels } from "@/data/stack";
import { projects } from "@/data/projects";
import { useMode } from "@/components/providers/ModeProvider";

/* Resume Mode is a light document on purpose: easy to scan, and identical on screen and on paper. */
const ink = "text-[#1b2630]";
const sub = "text-[#51616d]";
const faint = "text-[#7a8892]";

function H({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mb-4 border-b border-[#dde3e7] pb-2 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[#2f7d75]">
      {children}
    </h2>
  );
}

/** Recruiter view: everything important on one scannable, printable page. No 3D is loaded. */
export function Resume() {
  const { setMode, printResume } = useMode();
  const pro = projects.filter((p) => p.kind === "professional");
  const product = projects.filter((p) => p.kind === "product");
  const contact = [
    profile.links.email && { label: profile.links.email, href: `mailto:${profile.links.email}` },
    profile.links.linkedin && { label: profile.links.linkedin.replace(/^https?:\/\/(www\.)?/, ""), href: profile.links.linkedin },
    profile.links.github && { label: profile.links.github.replace(/^https?:\/\//, ""), href: profile.links.github },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <main id="main" className={`resume-doc relative z-10 px-3 pb-20 pt-24 md:pt-28 ${ink}`}>
      <div data-print="hide" className="mx-auto mb-6 flex max-w-[52rem] flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => setMode("experience")}
          className="inline-flex h-10 items-center gap-2 rounded-[9px] border border-[#cfd8de] bg-white px-4 text-sm text-[#1b2630] transition-colors hover:border-[#2f7d75]"
        >
          <ArrowLeft size={15} aria-hidden /> Back to portfolio
        </button>
        <button
          onClick={printResume}
          className="inline-flex h-10 items-center gap-2 rounded-[9px] bg-[#1b2630] px-4 text-sm text-white transition-colors hover:bg-[#2f7d75]"
        >
          <Printer size={15} aria-hidden /> Print / save as PDF
        </button>
      </div>

      <article className="resume-paper mx-auto max-w-[52rem] rounded-md border border-[#dde3e7] bg-white px-6 py-10 shadow-[0_20px_60px_-30px_rgba(16,24,32,0.25)] md:px-14 md:py-14">
        <header className="mb-10">
          <h1 className="font-serif text-[2.4rem] font-normal leading-tight tracking-[-0.01em]">{profile.name}</h1>
          <p className={`mt-1 text-[1.05rem] ${sub}`}>{profile.focus}</p>
          <p className={`mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm ${sub}`}>
            <span>{profile.location}</span>
            <span>{profile.yearsExperience} years experience</span>
            {contact.map((c) => (
              <a key={c.href} href={c.href} className="underline decoration-[#b9c6ce] underline-offset-4 hover:text-[#2f7d75]">
                {c.label}
              </a>
            ))}
          </p>
        </header>

        <section className="mb-9" aria-labelledby="r-summary">
          <H id="r-summary">Summary</H>
          <p className="leading-relaxed">
            {profile.summary} Currently focused on backend engineering, API and service design, MongoDB and Elasticsearch, search and
            recommendation systems, and integrating AI into existing applications — while leading a team as technical lead.
          </p>
        </section>

        <section className="mb-9" aria-labelledby="r-exp">
          <H id="r-exp">Experience</H>
          <ol className="space-y-6">
            {roles.map((r) => (
              <li key={r.title + r.period}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold">{r.title}</h3>
                  <span className={`text-sm ${faint}`}>{r.period}</span>
                </div>
                <p className={`text-sm ${sub}`}>{r.context}</p>
                <ul className="mt-2 grid list-disc gap-x-8 gap-y-0.5 pl-5 text-[0.92rem] marker:text-[#9fb0ba] sm:grid-cols-2">
                  {r.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p className={`mt-5 text-[0.92rem] leading-relaxed ${sub}`}>
            <span className={`font-semibold ${ink}`}>Leadership: </span>
            {leadership.now.join(" · ")}
          </p>
        </section>

        <section className="mb-9" aria-labelledby="r-skills">
          <H id="r-skills">Skills</H>
          <dl className="space-y-2">
            {[...stackLevels].reverse().map((l) => (
              <div key={l.level} className="grid gap-x-4 sm:grid-cols-[8.5rem_1fr]">
                <dt className={`text-sm ${faint}`}>{l.name}</dt>
                <dd className="text-[0.95rem]">{l.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mb-9" aria-labelledby="r-projects">
          <H id="r-projects">Selected systems</H>
          <ul className="space-y-3">
            {pro.map((p) => (
              <li key={p.id}>
                <p className="font-semibold">{p.title}</p>
                <p className={`text-[0.92rem] ${sub}`}>{p.summary}</p>
              </li>
            ))}
          </ul>
          <h3 className="mb-2 mt-6 text-sm font-semibold">Personal products (in progress)</h3>
          <ul className="space-y-1.5 text-[0.92rem]">
            {product.map((p) => (
              <li key={p.id}>
                <span className="font-medium">{p.title}</span> <span className={faint}>— {p.status}</span>
              </li>
            ))}
          </ul>
          <p className={`mt-4 text-xs ${faint}`}>Client and product names are kept confidential.</p>
        </section>

        <section aria-labelledby="r-edu">
          <H id="r-edu">Education</H>
          <ul className="space-y-1">
            {profile.education.map((e) => (
              <li key={e.degree} className="flex flex-wrap justify-between gap-2">
                <span className="font-medium">{e.degree}</span>
                <span className={`text-sm ${faint}`}>{e.note}</span>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}

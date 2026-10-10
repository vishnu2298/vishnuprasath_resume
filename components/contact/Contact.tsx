"use client";

import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { useMode } from "@/components/providers/ModeProvider";
import { Reveal } from "@/components/ui/Reveal";

type Row = { label: string; value: string; href?: string; onClick?: () => void; external?: boolean };

/** Deliberately plain: one sentence, a few real ways to reach me. Empty links are simply not shown. */
export function Contact() {
  const { setMode, printResume } = useMode();
  const { links } = profile;

  const rows: Row[] = [
    links.email && { label: "Email", value: links.email, href: `mailto:${links.email}` },
    links.linkedin && { label: "LinkedIn", value: links.linkedin.replace(/^https?:\/\/(www\.)?/, ""), href: links.linkedin, external: true },
    links.github && { label: "GitHub", value: links.github.replace(/^https?:\/\//, ""), href: links.github, external: true },
    { label: "Résumé", value: "Read the one-page version", onClick: () => setMode("resume") },
    links.resume
      ? { label: "PDF", value: "Download résumé", href: links.resume }
      : { label: "PDF", value: "Save résumé as PDF", onClick: printResume },
  ].filter(Boolean) as Row[];

  return (
    <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end">
      <Reveal>
        <h2 id="contact-title" className="display text-[clamp(2.3rem,5vw,4rem)]">
          If you&apos;re working on something like this, let&apos;s talk.
        </h2>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
          Backend systems, search, recommendations, AI integration — or leading a team that builds them.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <ul className="border-b border-[var(--line)]">
          {rows.map((r) => {
            const inner = (
              <>
                <span className="w-20 shrink-0 text-sm text-dim">{r.label}</span>
                <span className="flex-1 text-[1.02rem] text-fg">{r.value}</span>
                <ArrowUpRight size={16} aria-hidden className="text-muted transition-colors group-hover:text-accent" />
              </>
            );
            const cls = "group flex w-full items-center gap-4 py-4 text-left transition-colors hover:bg-white/[0.02]";
            return (
              <li key={r.label} className="rule-top">
                {r.href ? (
                  <a href={r.href} className={cls} {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {inner}
                  </a>
                ) : (
                  <button onClick={r.onClick} className={cls}>
                    {inner}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </Reveal>
    </div>
  );
}

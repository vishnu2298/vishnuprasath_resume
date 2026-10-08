"use client";

import { useEffect, useState } from "react";
import { Briefcase, FlaskConical, Mail, Network, Printer, Sparkles, User } from "lucide-react";
import { profile } from "@/data/profile";
import { getActiveChapter, subscribeChapter, type Chapter } from "@/lib/world";
import { useMode } from "@/components/providers/ModeProvider";
import { ModeToggle } from "./ModeToggle";

const items: { label: string; href: string; chapters: Chapter[]; icon: typeof Briefcase }[] = [
  { label: "Work", href: "#systems", chapters: ["build", "systems"], icon: Briefcase },
  { label: "Systems", href: "#architecture", chapters: ["backend", "problems", "architecture", "principles"], icon: Network },
  { label: "AI", href: "#ai", chapters: ["ai"], icon: Sparkles },
  { label: "Experiments", href: "#lab", chapters: ["lab"], icon: FlaskConical },
  { label: "About", href: "#journey", chapters: ["journey", "stack", "experience"], icon: User },
  { label: "Contact", href: "#contact", chapters: ["contact"], icon: Mail },
];

export function Nav() {
  const { mode, printResume } = useMode();
  const [active, setActive] = useState<Chapter>(getActiveChapter());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => subscribeChapter(setActive), []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isExperience = mode === "experience";

  return (
    <>
      <a href="#main" className="sr-only-focusable fixed left-4 top-4 z-[70] rounded-full bg-accent px-4 py-2 font-mono text-xs text-ink">
        Skip to content
      </a>

      <header
        data-print="hide"
        className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color] duration-500 ${
          scrolled ? "border-b border-white/[0.06] bg-ink/80 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between gap-4">
          <a href="#top" className="group flex items-center gap-3" aria-label={`${profile.shortName} — home`}>
            <span aria-hidden className="grid h-7 w-7 place-items-center rounded-md bg-accent font-display text-[0.7rem] font-black text-ink">
              VP
            </span>
            <span className="font-display text-[0.82rem] font-bold uppercase tracking-[0.12em]">{profile.shortName}</span>
          </a>

          {isExperience && (
            <ul className="hidden items-center gap-1 lg:flex">
              {items.map((it) => {
                const on = it.chapters.includes(active);
                return (
                  <li key={it.label}>
                    <a
                      href={it.href}
                      aria-current={on ? "location" : undefined}
                      className={`relative rounded-full px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-colors ${
                        on ? "text-fg" : "text-muted hover:text-fg"
                      }`}
                    >
                      {it.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-3 -bottom-0.5 h-px bg-accent transition-transform duration-500 ${
                          on ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted xl:flex">
              <span className="status-dot" aria-hidden />
              {profile.status}
            </span>
            {!isExperience && (
              <button onClick={printResume} className="btn btn-ghost hidden h-9 px-4 text-[0.66rem] sm:inline-flex">
                <Printer size={14} aria-hidden /> Print / PDF
              </button>
            )}
            <span className="hidden sm:block">
              <ModeToggle />
            </span>
            <span className="sm:hidden">
              <ModeToggle compact />
            </span>
          </div>
        </nav>
      </header>

      {/* Mobile: thumb-reachable bottom navigation. */}
      {isExperience && (
        <nav
          aria-label="Sections"
          data-print="hide"
          className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-white/10 bg-ink/90 backdrop-blur-md lg:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <ul className="grid grid-cols-6">
            {items.map((it) => {
              const on = it.chapters.includes(active);
              const Icon = it.icon;
              return (
                <li key={it.label}>
                  <a
                    href={it.href}
                    aria-current={on ? "location" : undefined}
                    className={`flex flex-col items-center gap-1 py-2.5 font-mono text-[0.55rem] uppercase tracking-[0.08em] ${
                      on ? "text-accent" : "text-muted"
                    }`}
                  >
                    <Icon size={17} aria-hidden />
                    {it.label === "Experiments" ? "Lab" : it.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </>
  );
}

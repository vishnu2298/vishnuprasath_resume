"use client";

import { useEffect, useState } from "react";
import { Boxes, Briefcase, FlaskConical, Mail, Sparkles, User } from "lucide-react";
import { profile } from "@/data/profile";
import { getActiveChapter, subscribeChapter, type Chapter } from "@/lib/world";
import { useMode } from "@/components/providers/ModeProvider";
import { ModeToggle } from "./ModeToggle";

const items: { label: string; short?: string; href: string; chapters: Chapter[]; icon: typeof Briefcase }[] = [
  { label: "About", href: "#journey", chapters: ["journey", "stack", "experience"], icon: User },
  { label: "Work", href: "#systems", chapters: ["backend", "build", "systems"], icon: Briefcase },
  { label: "Architecture", short: "Design", href: "#architecture", chapters: ["problems", "architecture", "principles"], icon: Boxes },
  { label: "AI", href: "#ai", chapters: ["ai"], icon: Sparkles },
  { label: "Lab", href: "#lab", chapters: ["lab"], icon: FlaskConical },
  { label: "Contact", href: "#contact", chapters: ["contact"], icon: Mail },
];

export function Nav() {
  const { mode } = useMode();
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
  const bar = isExperience
    ? scrolled
      ? "border-b border-[var(--line)] bg-ink/75 backdrop-blur-md"
      : "border-b border-transparent"
    : "border-b border-[#dde3e7] bg-white/85 text-[#1b2630] backdrop-blur-md";

  return (
    <>
      <a href="#main" className="sr-only-focusable fixed left-4 top-4 z-[70] rounded-md bg-accent px-4 py-2 text-sm text-ink">
        Skip to content
      </a>

      <header data-print="hide" className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color] duration-500 ${bar}`}>
        <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between gap-4">
          <a
            href="#top"
            aria-label={`${profile.name} — home`}
            className={`heading text-[1.15rem] transition-opacity duration-500 ${isExperience && !scrolled ? "pointer-events-none opacity-0" : "opacity-100"}`}
            tabIndex={isExperience && !scrolled ? -1 : undefined}
          >
            {profile.name}
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
                      className={`relative px-3 py-2 text-[0.88rem] transition-colors ${on ? "text-fg" : "text-muted hover:text-fg"}`}
                    >
                      {it.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-3 -bottom-0.5 h-px bg-accent transition-transform duration-500 ${on ? "scale-x-100" : "scale-x-0"}`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}

          <ModeToggle />
        </nav>
      </header>

      {/* Mobile: thumb-reachable bottom navigation. */}
      {isExperience && (
        <nav
          aria-label="Sections"
          data-print="hide"
          className="fixed inset-x-3 bottom-3 z-50 rounded-xl border border-[var(--line)] bg-ink/85 backdrop-blur-md lg:hidden"
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
                    className={`flex flex-col items-center gap-1 py-2.5 text-[0.62rem] ${on ? "text-accent" : "text-muted"}`}
                  >
                    <Icon size={17} aria-hidden />
                    {it.short ?? it.label}
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

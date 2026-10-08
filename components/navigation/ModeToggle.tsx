"use client";

import { useMode } from "@/components/providers/ModeProvider";

export function ModeToggle({ compact = false }: { compact?: boolean }) {
  const { mode, setMode } = useMode();
  const options = [
    { id: "experience" as const, label: compact ? "3D" : "Experience" },
    { id: "resume" as const, label: compact ? "CV" : "Resume" },
  ];
  return (
    <div
      role="radiogroup"
      aria-label="View mode"
      className="relative flex items-center rounded-full border border-white/10 bg-black/50 p-1 font-mono text-[0.66rem] uppercase tracking-[0.16em]"
    >
      {options.map((o) => {
        const active = mode === o.id;
        return (
          <button
            key={o.id}
            role="radio"
            aria-checked={active}
            onClick={() => setMode(o.id)}
            className={`relative rounded-full px-3 py-1.5 transition-colors ${
              active ? "bg-fg text-ink" : "text-muted hover:text-fg"
            }`}
          >
            {o.label}
            {!compact && <span className="sr-only"> mode</span>}
          </button>
        );
      })}
    </div>
  );
}

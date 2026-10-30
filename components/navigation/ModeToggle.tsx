"use client";

import { useMode } from "@/components/providers/ModeProvider";

/** Switch between the portfolio and the printable résumé. */
export function ModeToggle() {
  const { mode, setMode } = useMode();
  const light = mode === "resume";
  const options = [
    { id: "experience" as const, label: "Portfolio" },
    { id: "resume" as const, label: "Résumé" },
  ];
  return (
    <div
      role="radiogroup"
      aria-label="View mode"
      className={`flex items-center rounded-[9px] border p-0.5 text-[0.8rem] ${
        light ? "border-[#d3dbe0] bg-white" : "border-[var(--line-strong)] bg-ink/60"
      }`}
    >
      {options.map((o) => {
        const active = mode === o.id;
        return (
          <button
            key={o.id}
            role="radio"
            aria-checked={active}
            onClick={() => setMode(o.id)}
            className={`rounded-[7px] px-3 py-1.5 transition-colors ${
              active
                ? light
                  ? "bg-[#1b2630] text-white"
                  : "bg-fg text-ink"
                : light
                  ? "text-[#5b6b77] hover:text-[#1b2630]"
                  : "text-muted hover:text-fg"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

"use client";

import { useState } from "react";
import { stackLevels } from "@/data/stack";

/**
 * Five layers of depth, bottom to top. The isometric slabs are decorative;
 * the list on the right is the real content (and drives the highlight).
 */
export function EngineeringStack() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div aria-hidden className="relative mx-auto h-[320px] w-full max-w-[420px] [perspective:1400px] md:h-[400px]">
        <div className="absolute inset-0 [transform-style:preserve-3d] [transform:rotateX(58deg)_rotateZ(-42deg)_translate(-6%,-14%)]">
          {stackLevels.map((l, i) => {
            const on = hover === i;
            const lift = i * 46 + (on ? 26 : 0);
            return (
              <div
                key={l.level}
                className="absolute left-1/2 top-1/2 h-[190px] w-[190px] rounded-2xl border transition-all duration-500 md:h-[220px] md:w-[220px]"
                style={{
                  transform: `translate(-50%,-50%) translateZ(${lift}px)`,
                  borderColor: on || (hover === null && i === 4) ? "rgba(255,90,31,0.9)" : "rgba(255,255,255,0.14)",
                  background:
                    i === 4
                      ? "linear-gradient(135deg, rgba(255,90,31,0.35), rgba(255,61,46,0.12))"
                      : `linear-gradient(135deg, rgba(255,255,255,${0.04 + i * 0.015}), rgba(255,255,255,0.01))`,
                  boxShadow: on ? "0 0 60px rgba(255,90,31,0.35)" : "0 20px 40px rgba(0,0,0,0.5)",
                }}
              >
                <span className="absolute bottom-3 left-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-fg/70">
                  L{l.level} · {l.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <ol className="flex flex-col-reverse gap-3" aria-label="Engineering stack, from foundations to intelligence">
        {stackLevels.map((l, i) => (
          <li
            key={l.level}
            tabIndex={0}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            className={`panel panel-hover p-5 outline-none md:p-6 ${hover === i ? "border-accent/50" : ""}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="heading text-xl md:text-2xl">
                <span className="mr-3 font-mono text-sm text-accent">L{l.level}</span>
                {l.name}
              </h3>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-dim">{l.note}</span>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {l.items.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

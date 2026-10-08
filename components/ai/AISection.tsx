"use client";

import { m } from "framer-motion";
import { aiHub } from "@/data/thinking";

function Hub() {
  const n = aiHub.nodes.length;
  const R = 200;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <svg viewBox="-280 -280 560 560" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffd2a1" />
            <stop offset="45%" stopColor="#ff5a1f" />
            <stop offset="100%" stopColor="#ff3d2e" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[90, 150, 200, 250].map((r, i) => (
          <circle key={r} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray={i % 2 ? "2 6" : undefined} />
        ))}
        <g>
          {aiHub.nodes.map((_, i) => {
            const a = (i / n) * Math.PI * 2 - Math.PI / 2;
            return (
              <line
                key={i}
                x1={0}
                y1={0}
                x2={Math.cos(a) * R}
                y2={Math.sin(a) * R}
                stroke="rgba(255,106,43,0.45)"
                strokeWidth="1"
                className="flow-dash"
              />
            );
          })}
        </g>
        <circle r="110" fill="url(#core)" opacity="0.35" />
        <circle r="54" fill="#120a07" stroke="#ff5a1f" strokeWidth="1.5" />
      </svg>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="font-display text-xl font-black tracking-tight text-fg">{aiHub.center}</p>
      </div>

      <ul aria-label="Where AI connects into systems">
        {aiHub.nodes.map((label, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + (Math.cos(a) * R * 100) / 560;
          const y = 50 + (Math.sin(a) * R * 100) / 560;
          return (
            <m.li
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.6 }}
              className="absolute max-w-[6.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40 bg-ink/90 px-2.5 py-1 text-center font-mono text-[0.55rem] uppercase leading-tight tracking-[0.08em] text-fg sm:max-w-none sm:whitespace-nowrap sm:px-3 sm:py-1.5 sm:text-[0.68rem] sm:tracking-[0.12em]"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {label}
            </m.li>
          );
        })}
      </ul>
    </div>
  );
}

function Pipeline({ title, steps, ai }: { title: string; steps: string[]; ai?: boolean }) {
  const aiSteps = new Set(["Intent Understanding", "AI Enrichment", "Ranking"]);
  return (
    <div className={`panel p-6 md:p-8 ${ai ? "border-accent/40" : ""}`}>
      <p className={`eyebrow mb-6 ${ai ? "text-accent" : ""}`}>{title}</p>
      <ol className="flex flex-col gap-2" aria-label={title}>
        {steps.map((s, i) => {
          const isAI = ai && aiSteps.has(s);
          return (
            <m.li
              key={s}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ delay: i * 0.09, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <span className="w-6 text-right font-mono text-[0.65rem] text-dim">{String(i + 1).padStart(2, "0")}</span>
              <span
                className={`flex-1 rounded-xl border px-4 py-3 text-[0.95rem] ${
                  isAI ? "border-accent/60 bg-accent/10 text-fg" : "border-white/[0.08] bg-white/[0.02] text-fg/80"
                }`}
              >
                {s}
                {isAI && <span className="ml-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent">AI</span>}
              </span>
            </m.li>
          );
        })}
      </ol>
    </div>
  );
}

export function AISection() {
  return (
    <div>
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <Hub />
        <div>
          <blockquote className="heading border-l-2 border-accent pl-6 text-[clamp(1.3rem,2.3vw,1.85rem)] text-fg">
            “{aiHub.statement}”
          </blockquote>
          <p className="mt-6 max-w-lg leading-relaxed text-muted">
            The same request path I&apos;ve built for years — with intelligence added at the points where it creates value:
            understanding intent, enriching data and ranking results.
          </p>
        </div>
      </div>
      <div className="mt-16 grid gap-4 md:grid-cols-2">
        <Pipeline title="Traditional API" steps={aiHub.traditional} />
        <Pipeline title="AI-enabled API" steps={aiHub.enabled} ai />
      </div>
    </div>
  );
}

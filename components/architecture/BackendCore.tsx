import { backendFlow, backendTech } from "@/data/stack";
import { codeSnippets } from "@/data/code";
import { Reveal } from "@/components/ui/Reveal";

function Code({ lines, file }: { lines: string[]; file: string }) {
  return (
    <figure className="panel overflow-hidden">
      <figcaption className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3 font-mono text-[0.68rem] text-dim">
        <span>{file}</span>
        <span className="text-accent">illustrative</span>
      </figcaption>
      <pre className="overflow-x-auto p-5 font-mono text-[0.8rem] leading-relaxed text-fg/85">
        <code>
          {lines.map((l, i) => (
            <span key={i} className="block">
              <span aria-hidden className="mr-4 inline-block w-4 select-none text-right text-dim">
                {i + 1}
              </span>
              {highlight(l)}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

function highlight(line: string) {
  const parts = line.split(/(\b(?:const|await|async|return)\b|'[^']*')/g);
  return parts.map((p, i) =>
    /^(const|await|async|return)$/.test(p) ? (
      <span key={i} className="text-accent">
        {p}
      </span>
    ) : p.startsWith("'") ? (
      <span key={i} className="text-amber">
        {p}
      </span>
    ) : (
      p
    ),
  );
}

export function BackendCore() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr]">
      {/* Request path */}
      <Reveal>
        <ol className="relative" aria-label="Request path through a backend system">
          <div aria-hidden className="absolute bottom-6 left-[1.15rem] top-6 w-px bg-gradient-to-b from-white/20 via-accent/50 to-ember/70" />
          <div aria-hidden className="request-pulse absolute left-[0.95rem] top-6 h-2.5 w-2.5 rounded-full bg-amber shadow-[0_0_18px_4px_rgba(255,140,60,0.6)]" />
          {backendFlow.map((s, i) => (
            <li key={s.label} className="relative flex items-center gap-5 py-2.5">
              <span
                className={`relative z-10 grid h-[2.3rem] w-[2.3rem] shrink-0 place-items-center rounded-full border font-mono text-[0.65rem] ${
                  i === backendFlow.length - 1 ? "border-accent bg-accent text-ink" : "border-white/15 bg-ink-2 text-muted"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="panel flex flex-1 items-center justify-between gap-4 px-5 py-3.5">
                <span className="font-semibold">{s.label}</span>
                <span className="text-right font-mono text-[0.68rem] uppercase tracking-[0.12em] text-dim">{s.note}</span>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <div className="flex flex-col gap-6">
        <Reveal delay={0.1}>
          <Code lines={codeSnippets.route} file="routes/products.ts" />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          <Reveal delay={0.15}>
            <Code lines={codeSnippets.recommend} file="recommendation.ts" />
          </Reveal>
          <Reveal delay={0.2}>
            <Code lines={codeSnippets.enrich} file="ai.service.ts" />
          </Reveal>
        </div>
        <Reveal delay={0.25} className="panel p-6">
          <p className="eyebrow mb-4">Hands-on, in production work</p>
          <ul className="flex flex-wrap gap-2">
            {backendTech.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}

import { problems } from "@/data/thinking";
import { Reveal } from "@/components/ui/Reveal";

/** Problem → approach, as an editorial two-column list. */
export function Problems() {
  return (
    <ol className="border-b border-[var(--line)]">
      <li aria-hidden className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-16 pb-4 text-sm text-dim md:grid">
        <span>The problem</span>
        <span>What I did about it</span>
      </li>
      {problems.map((p, i) => (
        <Reveal as="li" key={p.problem} delay={i * 0.04} className="rule-top grid gap-x-16 gap-y-3 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <p className="text-xs text-dim">{p.tag}</p>
            <h3 className="heading mt-1 text-[1.45rem] text-fg">{p.problem}</h3>
          </div>
          <p className="self-end text-[1.02rem] leading-relaxed text-fg/80">{p.solution}</p>
        </Reveal>
      ))}
    </ol>
  );
}

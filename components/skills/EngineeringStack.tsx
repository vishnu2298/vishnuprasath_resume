import { stackLevels } from "@/data/stack";
import { Reveal } from "@/components/ui/Reveal";

/** Five layers, read top-down from what I'm adding now to where it started. Plain typography, no bars. */
export function EngineeringStack() {
  const levels = [...stackLevels].reverse();
  return (
    <ol className="border-b border-[var(--line)]" aria-label="Engineering stack, from intelligence down to application foundations">
      {levels.map((l, i) => (
        <Reveal
          as="li"
          key={l.level}
          delay={i * 0.04}
          className="rule-top grid gap-x-10 gap-y-2 py-6 md:grid-cols-[3rem_14rem_minmax(0,1fr)] md:items-baseline"
        >
          <span className="font-mono text-xs text-dim">L{l.level}</span>
          <div>
            <h3 className="heading text-[1.4rem]">{l.name}</h3>
            <p className="text-sm text-dim">{l.note}</p>
          </div>
          <p className="text-[1rem] leading-relaxed text-fg/85">{l.items.join(" · ")}</p>
        </Reveal>
      ))}
    </ol>
  );
}

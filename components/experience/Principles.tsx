import { principles } from "@/data/thinking";
import { Reveal } from "@/components/ui/Reveal";

/** Six short working principles — a numbered list, not a card grid. */
export function Principles() {
  return (
    <ol className="grid gap-x-16 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {principles.map((p, i) => (
        <Reveal as="li" key={p.title} delay={(i % 3) * 0.05} className="border-t border-[var(--line-strong)] pt-5">
          <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="heading mt-3 text-[1.35rem]">{p.title}</h3>
          <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}

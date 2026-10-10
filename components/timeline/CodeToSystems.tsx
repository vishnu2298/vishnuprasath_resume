import { codeToSystems } from "@/data/journey";
import { Flow } from "@/components/ui/Flow";
import { Reveal } from "@/components/ui/Reveal";

/** Two questions, side by side — the shift from features to systems. */
export function CodeToSystems() {
  const { early, current, message } = codeToSystems;
  return (
    <div className="mt-32">
      <Reveal>
        <h3 className="heading max-w-2xl text-[clamp(1.8rem,3.6vw,2.8rem)]">{message}</h3>
      </Reveal>
      <div className="mt-12 grid gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] md:gap-0">
        <Reveal className="md:pr-12">
          <p className="text-sm text-dim">{early.label}</p>
          <p className="heading mt-2 text-2xl italic text-muted">“{early.question}”</p>
          <div className="mt-8">
            <Flow steps={early.flow} label="Early system flow" />
          </div>
        </Reveal>
        <Reveal className="md:border-l md:border-[var(--line)] md:pl-12" delay={0.12}>
          <p className="text-sm text-accent">{current.label}</p>
          <p className="heading mt-2 text-2xl italic text-fg">“{current.question}”</p>
          <div className="mt-8">
            <Flow steps={current.flow} highlightLast label="Current system flow" />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

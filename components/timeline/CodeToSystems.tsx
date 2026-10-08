import { codeToSystems } from "@/data/journey";
import { Flow } from "@/components/ui/Flow";
import { Reveal } from "@/components/ui/Reveal";

export function CodeToSystems() {
  const { early, current, message } = codeToSystems;
  return (
    <div className="mt-24">
      <Reveal>
        <p className="eyebrow mb-4">From code to systems</p>
        <h3 className="heading max-w-3xl text-[clamp(1.8rem,4vw,3.2rem)]">{message}</h3>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-[1fr_auto_1.6fr] md:items-stretch">
        <Reveal className="panel p-6 md:p-8">
          <p className="eyebrow mb-3">{early.label}</p>
          <p className="heading text-2xl text-muted">“{early.question}”</p>
          <div className="mt-8">
            <Flow steps={early.flow} direction="vertical" label="Early system flow" />
          </div>
        </Reveal>
        <div aria-hidden className="hidden items-center justify-center md:flex">
          <span className="font-display text-4xl text-accent">→</span>
        </div>
        <Reveal className="panel relative overflow-hidden p-6 md:p-8" delay={0.15}>
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <p className="eyebrow mb-3 text-accent">{current.label}</p>
          <p className="heading text-2xl text-fg">“{current.question}”</p>
          <div className="mt-8">
            <Flow steps={current.flow} highlightLast label="Current system flow" />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

import { problems } from "@/data/thinking";
import { Reveal } from "@/components/ui/Reveal";

export function Problems() {
  return (
    <ol className="flex flex-col gap-3">
      {problems.map((p, i) => (
        <Reveal as="li" key={p.problem} delay={i * 0.05}>
          <article className="panel panel-hover grid gap-6 p-6 md:grid-cols-[4rem_1fr_auto_1fr] md:items-center md:gap-8 md:p-8">
            <span className="font-display text-3xl font-black text-white/15 md:text-4xl" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="eyebrow mb-2">Problem · {p.tag}</p>
              <h3 className="text-lg font-semibold leading-snug md:text-xl">{p.problem}</h3>
            </div>
            <span aria-hidden className="hidden font-display text-2xl text-accent md:block">
              →
            </span>
            <div>
              <p className="eyebrow mb-2 text-accent">Approach</p>
              <p className="leading-relaxed text-fg/85">{p.solution}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </ol>
  );
}

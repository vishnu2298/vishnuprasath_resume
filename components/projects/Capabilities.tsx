import { capabilities } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

export function Capabilities() {
  return (
    <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {capabilities.map((c, i) => (
        <Reveal as="li" key={c.id} delay={(i % 3) * 0.08}>
          <TiltCard className="group panel panel-hover h-full rounded-[18px]">
            <article className="flex h-full flex-col p-6 md:p-8" style={{ transform: "translateZ(20px)" }}>
              <div className="flex items-start justify-between">
                <span className="font-display text-5xl font-black text-accent/90">{String(i + 1).padStart(2, "0")}</span>
                <span aria-hidden className="mt-3 h-px w-16 bg-gradient-to-r from-accent to-transparent" />
              </div>
              <h3 className="heading mt-6 text-2xl md:text-[1.7rem]">{c.title}</h3>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{c.description}</p>
              <p className="eyebrow mb-3 mt-auto pt-8">{c.listLabel}</p>
              <ul className="flex flex-wrap gap-1.5">
                {c.items.map((t) => (
                  <li key={t} className="chip text-[0.66rem]">
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </TiltCard>
        </Reveal>
      ))}
    </ul>
  );
}

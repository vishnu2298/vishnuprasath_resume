import { principles } from "@/data/thinking";
import { Reveal } from "@/components/ui/Reveal";

export function Principles() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-[18px] border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
      {principles.map((p, i) => (
        <Reveal as="li" key={p.title} delay={(i % 3) * 0.07} className="group relative bg-ink-2 p-7 md:p-9">
          <span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 group-hover:scale-x-100" />
          <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="heading mt-5 text-xl md:text-2xl">{p.title}</h3>
          <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
        </Reveal>
      ))}
    </ul>
  );
}

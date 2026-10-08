import type { ReactNode } from "react";
import type { Chapter } from "@/lib/world";
import { Reveal } from "./Reveal";

export function Section({
  id,
  chapter,
  children,
  className = "",
  labelledBy,
}: {
  id: string;
  chapter: Chapter;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      data-chapter={chapter}
      aria-labelledby={labelledBy ?? `${id}-title`}
      className={`relative z-10 scroll-mt-20 overflow-x-clip py-24 md:py-36 ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  id,
  index,
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  id: string;
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={`mb-12 md:mb-16 ${align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}`}>
      <p className={`eyebrow mb-5 flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        {index && <span className="text-accent">{index}</span>}
        <span aria-hidden className="h-px w-8 bg-white/20" />
        {eyebrow}
      </p>
      <h2 id={`${id}-title`} className="heading text-[clamp(2.1rem,6vw,4.75rem)] text-fg">
        {title}
      </h2>
      {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{lead}</p>}
    </Reveal>
  );
}

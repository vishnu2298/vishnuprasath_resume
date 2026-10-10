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
      className={`relative z-10 scroll-mt-16 overflow-x-clip py-24 md:py-32 ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * Section heading. "stacked" puts the lead under the title; "split" sets the lead beside it on wide screens.
 * Size varies with the weight of the section so the page doesn't repeat one header from top to bottom.
 */
export function SectionHeader({
  id,
  eyebrow,
  title,
  lead,
  layout = "stacked",
  size = "lg",
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  layout?: "stacked" | "split";
  size?: "lg" | "md";
}) {
  const titleSize = size === "lg" ? "text-[clamp(2.2rem,5vw,3.9rem)]" : "text-[clamp(1.8rem,3.4vw,2.6rem)]";
  return (
    <Reveal
      className={`mb-14 md:mb-20 ${
        layout === "split" ? "grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16" : "max-w-3xl"
      }`}
    >
      <div>
        {eyebrow && <p className="mb-4 text-sm text-accent">{eyebrow}</p>}
        <h2 id={`${id}-title`} className={`display ${titleSize} text-fg`}>
          {title}
        </h2>
      </div>
      {lead && (
        <p className={`text-lg leading-relaxed text-muted ${layout === "split" ? "lg:pb-2" : "mt-6 max-w-2xl"}`}>{lead}</p>
      )}
    </Reveal>
  );
}

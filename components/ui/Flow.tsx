import { Fragment } from "react";

/**
 * A system flow (A → B → C) rendered as real, accessible list markup.
 * Vertical flows draw a connector line between steps; horizontal flows wrap with arrows.
 */
export function Flow({
  steps,
  direction = "auto",
  highlightLast = false,
  size = "md",
  label,
}: {
  steps: readonly string[];
  direction?: "auto" | "vertical" | "horizontal";
  highlightLast?: boolean;
  size?: "sm" | "md";
  label?: string;
}) {
  const vertical = direction === "vertical";
  const box = size === "sm" ? "text-[0.7rem] px-2.5 py-1.5" : "text-[0.78rem] px-3 py-2";
  const tone = (last: boolean) =>
    highlightLast && last ? "border-accent/60 bg-accent/[0.12] text-fg" : "border-[var(--line-strong)] bg-ink/40 text-fg/85";

  if (vertical) {
    return (
      <ol aria-label={label ?? "Flow"} className="flex flex-col items-start font-mono">
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          return (
            <li key={`${s}-${i}`} className="flex flex-col items-start">
              <span className={`rounded-md border ${box} ${tone(last)}`}>{s}</span>
              {!last && <span aria-hidden className="ml-5 h-4 w-px bg-accent/40" />}
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol aria-label={label ?? "Flow"} className="flex flex-wrap items-center gap-x-1.5 gap-y-2 font-mono">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <Fragment key={`${s}-${i}`}>
            <li className={`rounded-md border ${box} ${tone(last)}`}>{s}</li>
            {!last && (
              <li aria-hidden className="text-accent/60">
                →
              </li>
            )}
          </Fragment>
        );
      })}
    </ol>
  );
}

import { Fragment } from "react";

/**
 * A system flow (A → B → C) rendered as real, accessible list markup.
 * Vertical on small screens / when requested, horizontal-wrapping otherwise.
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
  const base = size === "sm" ? "text-[0.68rem] px-2.5 py-1.5" : "text-[0.74rem] px-3 py-2";
  return (
    <ol
      aria-label={label ?? "Flow"}
      className={`flex font-mono ${vertical ? "flex-col items-start gap-1.5" : "flex-wrap items-center gap-x-1.5 gap-y-2"}`}
    >
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <Fragment key={`${s}-${i}`}>
            <li
              className={`rounded-lg border ${base} ${
                highlightLast && last
                  ? "border-accent/60 bg-accent/15 text-fg"
                  : "border-white/10 bg-white/[0.03] text-fg/85"
              }`}
            >
              {s}
            </li>
            {!last && (
              <li aria-hidden className={`text-accent/70 ${vertical ? "pl-4 leading-none" : ""}`}>
                {vertical ? "↓" : "→"}
              </li>
            )}
          </Fragment>
        );
      })}
    </ol>
  );
}

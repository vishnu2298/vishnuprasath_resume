/** Honest status labels: teal for active work, ice for early-stage, neutral for everything else. */
const styles: Record<string, string> = {
  "Professional Experience": "border-[var(--line-strong)] text-fg/75",
  "Selected Engineering Experience": "border-[var(--line-strong)] text-fg/65",
  "Currently Building": "border-accent/50 text-accent-strong bg-accent/10",
  "Concept → Building": "border-ice/40 text-ice bg-ice/[0.06]",
  "Architecture / Product Exploration": "border-ice/40 text-ice",
};

export function StatusBadge({ status, text }: { status: string; text?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[0.72rem] ${styles[status] ?? "border-[var(--line-strong)] text-fg/70"}`}
    >
      {text ?? status}
    </span>
  );
}

const styles: Record<string, string> = {
  "Professional Experience": "border-white/15 text-fg/80",
  "Selected Engineering Experience": "border-white/15 text-fg/70",
  "Currently Building": "border-accent/60 text-accent bg-accent/10",
  "Concept → Building": "border-ember/50 text-[#ff8a7d] bg-ember/10",
  "Architecture / Product Exploration": "border-amber/50 text-amber bg-amber/10",
  BUILDING: "border-accent/60 text-accent bg-accent/10",
  EXPLORING: "border-amber/50 text-amber bg-amber/10",
  EXPERIMENT: "border-white/20 text-fg/80",
  CONCEPT: "border-ember/50 text-[#ff8a7d] bg-ember/10",
};

export function StatusBadge({ status, text }: { status: string; text?: string }) {
  const live = status === "Currently Building" || status === "BUILDING";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] ${
        styles[status] ?? "border-white/15 text-fg/70"
      }`}
    >
      {live && <span className="status-dot" aria-hidden style={{ width: 6, height: 6 }} />}
      {text ?? status}
    </span>
  );
}

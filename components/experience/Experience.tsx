import { leadership, roles } from "@/data/experience";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";

/** Career history as plain typography: period, role, what the work was. */
export function Roles() {
  return (
    <ol className="border-b border-[var(--line)]">
      {roles.map((r, i) => (
        <Reveal as="li" key={r.title + r.period} delay={i * 0.04} className="rule-top grid gap-x-10 gap-y-3 py-9 md:grid-cols-[10rem_minmax(0,1fr)]">
          <p className={`text-sm ${r.current ? "text-accent" : "text-dim"}`}>{r.period}</p>
          <div>
            <h3 className="heading text-[1.55rem]">{r.title}</h3>
            <p className="mt-1 text-muted">{r.context}</p>
            <ul className="mt-5 grid gap-x-10 gap-y-2 text-[0.95rem] leading-relaxed text-fg/85 sm:grid-cols-2">
              {r.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span aria-hidden className="mt-[0.7rem] h-px w-3 shrink-0 bg-white/25" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

export function Leadership() {
  return (
    <div className="grid gap-12 sm:grid-cols-2">
      {[
        { title: "How I lead now", items: leadership.now, accent: true },
        { title: "What it's built on", items: leadership.foundations, accent: false },
      ].map((g) => (
        <Reveal key={g.title}>
          <h3 className="heading text-xl">{g.title}</h3>
          <ul className="mt-5 space-y-2.5 text-[0.95rem] text-fg/85">
            {g.items.map((l) => (
              <li key={l} className="flex gap-3">
                <span aria-hidden className={`mt-[0.7rem] h-px w-3 shrink-0 ${g.accent ? "bg-accent" : "bg-white/25"}`} />
                {l}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}

export function Education() {
  return (
    <Reveal>
      <h3 className="heading text-xl">Education</h3>
      <ul className="mt-5 space-y-3">
        {profile.education.map((e) => (
          <li key={e.degree} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <span className="text-fg/90">{e.degree}</span>
            <span className="text-sm text-dim">{e.note}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

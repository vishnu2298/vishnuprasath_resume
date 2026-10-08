import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import { profile } from "@/data/profile";

/** Server-rendered hero: text paints immediately; the 3D workspace fades in behind it later. */
export function Hero() {
  return (
    <section
      id="top"
      data-chapter="hero"
      aria-labelledby="hero-title"
      className="relative z-10 flex min-h-[100svh] items-end overflow-x-clip pb-28 pt-24 lg:items-center lg:pb-16"
    >
      <div className="container-x">
        <div>
          <p className="eyebrow hero-rise mb-6 flex items-center gap-3" style={{ animationDelay: "0.05s" }}>
            <span aria-hidden className="h-px w-10 bg-accent" />
            {profile.eyebrow}
          </p>

          <h1 id="hero-title" className="display hero-rise text-[clamp(3.1rem,10.4vw,8.8rem)]" style={{ animationDelay: "0.12s" }}>
            <span className="block">{profile.displayName[0]}</span>
            <span className="inline-block accent-gradient pr-[0.04em]">{profile.displayName[1]}</span>
            <span className="sr-only">
              {" "}
              K — {profile.roles.join(", ")}
            </span>
          </h1>

          <p
            className="heading hero-rise mt-8 text-[clamp(1.5rem,3.4vw,2.6rem)] text-fg"
            style={{ animationDelay: "0.24s" }}
          >
            {profile.headline[0]}
            <br />
            <span className="text-glow text-accent">{profile.headline[1]}</span>
          </p>

          <p className="hero-rise mt-6 max-w-[34rem] text-base leading-relaxed text-muted md:text-lg" style={{ animationDelay: "0.34s" }}>
            {profile.supporting}
          </p>

          <div className="hero-rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "0.44s" }}>
            <a href="#systems" className="btn btn-primary">
              Explore my work <ArrowRight size={16} aria-hidden />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Let&apos;s connect
            </a>
          </div>

          <div className="hero-rise mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-dim" style={{ animationDelay: "0.54s" }}>
            <span>
              <span className="text-fg">{profile.yearsExperience}</span> years engineering experience
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} aria-hidden /> {profile.location}
            </span>
            <span className="hidden sm:inline">{profile.smallStatement}</span>
          </div>
        </div>
      </div>

      {/* Role stack, bottom-right on desktop */}
      <ul
        aria-label="Roles"
        className="absolute bottom-16 right-8 hidden flex-col items-end gap-1 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted lg:flex"
      >
        {profile.roles.map((r, i) => (
          <li key={r} className="hero-rise" style={{ animationDelay: `${0.6 + i * 0.08}s` }}>
            <span className="mr-2 text-accent">0{i + 1}</span>
            {r}
          </li>
        ))}
      </ul>

      <a
        href="#journey"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-dim transition-colors hover:text-fg md:flex"
      >
        <ArrowDown size={14} aria-hidden className="animate-bounce" /> Enter the workspace
      </a>
    </section>
  );
}

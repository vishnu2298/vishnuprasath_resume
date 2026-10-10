import { ArrowRight } from "lucide-react";
import { assetPath, profile } from "@/data/profile";

/**
 * Server-rendered hero: text paints immediately. The visual is either an optional portrait
 * (profile.portrait) or the quiet workstation scene that fades in behind the right-hand side.
 */
export function Hero() {
  const { headline } = profile;
  return (
    <section
      id="top"
      data-chapter="hero"
      aria-labelledby="hero-title"
      className="relative z-10 flex min-h-[100svh] items-end overflow-x-clip pb-28 pt-28 lg:items-center lg:pb-20"
    >
      <div className="container-x grid w-full items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="max-w-[44rem]">
          <div className="hero-rise flex flex-wrap items-baseline gap-x-4 gap-y-1" style={{ animationDelay: "0.05s" }}>
            <h1 id="hero-title" className="heading text-[1.65rem] text-fg md:text-[1.9rem]">
              {profile.name}
              <span className="sr-only"> — {profile.roles.join(", ")}</span>
            </h1>
            <p aria-hidden className="text-sm text-muted">
              {profile.focus}
            </p>
          </div>

          <p className="display hero-rise mt-8 max-w-[38rem] text-[clamp(2.5rem,5.1vw,4.5rem)] text-fg" style={{ animationDelay: "0.14s" }}>
            {headline.lead[0]} <em className="font-[350] italic text-accent">{headline.lead[1]}</em> {headline.lead[2]}
            <span className="mt-2 block text-[0.6em] leading-[1.15] text-muted">{headline.follow}</span>
          </p>

          <p className="hero-rise mt-8 max-w-[34rem] text-[1.05rem] leading-relaxed text-fg/80 md:text-lg" style={{ animationDelay: "0.24s" }}>
            {profile.supporting}
          </p>

          <div className="hero-rise mt-10 flex flex-wrap items-center gap-x-7 gap-y-4" style={{ animationDelay: "0.34s" }}>
            <a href="#systems" className="btn btn-primary">
              See selected work <ArrowRight size={16} aria-hidden />
            </a>
            <a href="#backend" className="link text-[0.95rem]">
              How I design a request path
            </a>
          </div>

          <dl
            className="hero-rise mt-14 grid max-w-[36rem] grid-cols-[auto_1fr] gap-x-8 gap-y-2 border-t border-[var(--line)] pt-5 text-sm"
            style={{ animationDelay: "0.44s" }}
          >
            <dt className="text-dim">Experience</dt>
            <dd className="text-fg/85">
              {profile.yearsExperience} years · {profile.location}
            </dd>
            <dt className="text-dim">Works with</dt>
            <dd className="text-fg/85">{profile.focusStack.join(" · ")}</dd>
          </dl>
        </div>

        {profile.portrait && (
          <figure className="hero-rise relative mx-auto hidden w-full max-w-[22rem] lg:block" style={{ animationDelay: "0.3s" }}>
            <div className="panel overflow-hidden p-2">
              {/* Plain img: static export, already sized; no optimisation pipeline needed. */}
              <img
                src={assetPath(profile.portrait)}
                alt={`Portrait of ${profile.name}`}
                width={720}
                height={900}
                className="aspect-[4/5] w-full rounded-[10px] object-cover"
              />
            </div>
            <figcaption className="mt-3 text-right text-xs text-dim">{profile.location}</figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}

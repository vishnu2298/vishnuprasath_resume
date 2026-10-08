"use client";

import { Download, FileText, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { biggerStory } from "@/data/journey";
import { useMode } from "@/components/providers/ModeProvider";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";

function LinkButton({ href, label, children, external = true }: { href: string; label: string; children: React.ReactNode; external?: boolean }) {
  if (!href) {
    return (
      <span className="btn btn-ghost" aria-disabled="true" title={`Add your ${label} link in data/profile.ts`}>
        {children} {label}
      </span>
    );
  }
  return (
    <a href={href} className="btn btn-ghost" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children} {label}
    </a>
  );
}

export function BiggerStory() {
  return (
    <ol className="mx-auto max-w-3xl space-y-3 text-center">
      {biggerStory.map((line, i) => (
        <Reveal as="li" key={line} delay={i * 0.05}>
          <p
            className={`text-[clamp(1.05rem,2.2vw,1.5rem)] leading-snug ${
              i === biggerStory.length - 1 ? "font-semibold text-fg" : i > 4 ? "text-fg/80" : "text-muted"
            }`}
          >
            {line}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}

export function Contact() {
  const { setMode, printResume } = useMode();
  const { links } = profile;

  return (
    <div className="text-center">
      <Reveal>
        <p className="heading text-[clamp(1.4rem,3vw,2.2rem)] text-muted">
          From applications to systems.
          <br />
          <span className="text-fg">From systems to intelligence.</span>
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 id="contact-title" className="display mx-auto mt-16 max-w-6xl text-[clamp(2.6rem,9vw,8rem)]">
          Let&apos;s build something <span className="accent-gradient text-glow">intelligent.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          Open to interesting engineering problems, AI products, backend architecture and opportunities where technology can
          create real impact.
        </p>
      </Reveal>

      <Reveal delay={0.3} className="mt-12 flex flex-wrap justify-center gap-3">
        <LinkButton href={links.linkedin} label="LinkedIn">
          <LinkedInIcon size={16} />
        </LinkButton>
        <LinkButton href={links.github} label="GitHub">
          <GitHubIcon size={16} />
        </LinkButton>
        <LinkButton href={links.email ? `mailto:${links.email}` : ""} label="Email" external={false}>
          <Mail size={16} aria-hidden />
        </LinkButton>
        <button className="btn btn-ghost" onClick={() => setMode("resume")}>
          <FileText size={16} aria-hidden /> Resume
        </button>
      </Reveal>

      <Reveal delay={0.4} className="mt-6">
        {links.resume ? (
          <a href={links.resume} download className="btn btn-primary">
            <Download size={16} aria-hidden /> Download resume
          </a>
        ) : (
          <button onClick={printResume} className="btn btn-primary">
            <Download size={16} aria-hidden /> Download resume (PDF)
          </button>
        )}
      </Reveal>
    </div>
  );
}

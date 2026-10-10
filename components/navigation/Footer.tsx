"use client";

import { profile } from "@/data/profile";
import { useMode } from "@/components/providers/ModeProvider";

export function Footer() {
  const { mode } = useMode();
  const light = mode === "resume";
  return (
    <footer
      data-print="hide"
      className={`relative z-10 border-t pb-28 pt-8 lg:pb-8 ${light ? "border-[#dde3e7] bg-[#eef1f3] text-[#6b7a85]" : "border-[var(--line)] bg-ink text-dim"}`}
    >
      <div className="container-x flex flex-col justify-between gap-2 text-[0.8rem] md:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <p>Built with Next.js and React Three Fiber.</p>
      </div>
    </footer>
  );
}

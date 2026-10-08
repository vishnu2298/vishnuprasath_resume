import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer data-print="hide" className="relative z-10 border-t border-white/[0.06] bg-ink pb-28 pt-10 lg:pb-10">
      <div className="container-x flex flex-col justify-between gap-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-dim md:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <p>Next.js · React Three Fiber · Built to load fast</p>
      </div>
    </footer>
  );
}

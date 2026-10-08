"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Mode = "experience" | "resume";

type Ctx = { mode: Mode; setMode: (m: Mode) => void; printResume: () => void };
const ModeContext = createContext<Ctx | null>(null);

const KEY = "portfolio-mode";

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>("experience");

  // Deep links (?mode=resume or #resume) win over the remembered preference.
  useEffect(() => {
    const url = new URL(window.location.href);
    let initial: Mode | null = null;
    if (url.searchParams.get("mode") === "resume" || url.hash === "#resume") initial = "resume";
    else if (url.searchParams.get("mode") === "experience") initial = "experience";
    if (!initial) {
      try {
        const stored = localStorage.getItem(KEY);
        if (stored === "resume" || stored === "experience") initial = stored;
      } catch {}
    }
    if (initial && initial !== "experience") setModeState(initial);
  }, []);

  const setMode = useCallback((m: Mode) => {
    setModeState(m);
    try {
      localStorage.setItem(KEY, m);
    } catch {}
    const url = new URL(window.location.href);
    if (m === "resume") url.searchParams.set("mode", "resume");
    else url.searchParams.delete("mode");
    url.hash = "";
    window.history.replaceState(null, "", url.toString());
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const printResume = useCallback(() => {
    setMode("resume");
    // Give React a frame to render Resume Mode before opening the print dialog.
    window.setTimeout(() => window.print(), 350);
  }, [setMode]);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
  }, [mode]);

  return <ModeContext.Provider value={{ mode, setMode, printResume }}>{children}</ModeContext.Provider>;
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
}

/** Renders one of two server-rendered trees depending on the active mode. */
export function ModeView({ experience, resume }: { experience: ReactNode; resume: ReactNode }) {
  const { mode } = useMode();
  return <>{mode === "experience" ? experience : resume}</>;
}

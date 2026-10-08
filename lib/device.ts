"use client";

import { useEffect, useState } from "react";

export type Tier = "high" | "low";

function detectTier(): Tier {
  if (typeof window === "undefined") return "high";
  const small = window.matchMedia("(max-width: 820px)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const weakCpu = (nav.hardwareConcurrency ?? 8) <= 4;
  const weakMem = (nav.deviceMemory ?? 8) <= 4;
  return small || coarse || weakCpu || weakMem ? "low" : "high";
}

/** Device capability + motion preference. Values settle after mount (SSR-safe). */
export function useDevice() {
  const [state, setState] = useState<{ tier: Tier; reducedMotion: boolean; ready: boolean; coarse: boolean }>({
    tier: "high",
    reducedMotion: false,
    ready: false,
    coarse: false,
  });

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      setState({
        tier: detectTier(),
        reducedMotion: motion.matches,
        ready: true,
        coarse: window.matchMedia("(pointer: coarse)").matches,
      });
    update();
    motion.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      motion.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return state;
}

export function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

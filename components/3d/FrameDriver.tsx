"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { subscribeChapter, worldState } from "@/lib/world";

/**
 * Drives a frameloop="demand" canvas with an fps budget instead of rendering every display frame.
 * - Visual chapters render at up to 60fps.
 * - Text-heavy chapters (world dimmed) render at 30fps.
 * - Paused entirely while an interactive section canvas is visible.
 * - Reduced motion: only re-render when the chapter changes.
 */
export function FrameDriver({ reducedMotion }: { reducedMotion: boolean }) {
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    if (reducedMotion) {
      invalidate();
      const unsub = subscribeChapter(() => invalidate());
      const onResize = () => invalidate();
      window.addEventListener("resize", onResize);
      return () => {
        unsub();
        window.removeEventListener("resize", onResize);
      };
    }
    let raf = 0;
    let last = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (worldState.pauseCount > 0) return;
      const dim = parseFloat(document.documentElement.style.getPropertyValue("--world-dim") || "0");
      const budget = dim > 0.6 ? 1000 / 30 : 1000 / 60;
      if (t - last >= budget - 2) {
        last = t;
        invalidate();
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [invalidate, reducedMotion]);

  return null;
}

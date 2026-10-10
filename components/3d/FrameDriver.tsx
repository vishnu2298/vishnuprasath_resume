"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { subscribeChapter, worldState } from "@/lib/world";

/**
 * Drives a frameloop="demand" canvas with an fps budget instead of rendering every display frame.
 * - Visual chapters render at up to 60fps.
 * - Text-heavy chapters (world dimmed) render at 30fps.
 * - Paused entirely while an interactive section canvas is visible.
 * - Reduced motion: render a short burst of frames on load and on chapter change, nothing in between.
 */
export function FrameDriver({ reducedMotion }: { reducedMotion: boolean }) {
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    if (reducedMotion) {
      // A short burst rather than one frame: the canvas sizes itself and draws its screen textures
      // over the first few frames, and the camera needs a moment to settle on a new chapter.
      let burstRaf = 0;
      const burst = (frames = 24) => {
        cancelAnimationFrame(burstRaf);
        let i = 0;
        const step = () => {
          invalidate();
          if (++i < frames) burstRaf = requestAnimationFrame(step);
        };
        step();
      };
      burst(60);
      const unsub = subscribeChapter(() => burst());
      const onResize = () => burst();
      window.addEventListener("resize", onResize);
      return () => {
        cancelAnimationFrame(burstRaf);
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

"use client";

import { useEffect } from "react";
import { chapterIndex, setActiveChapter, worldState, type Chapter } from "@/lib/world";

/** How much the world is shaded behind each chapter (0 = fully visible). */
const DIM: Record<Chapter, number> = {
  hero: 0,
  journey: 0.74,
  stack: 0.5,
  backend: 0.7,
  build: 0.45,
  systems: 0.72,
  problems: 0.72,
  architecture: 0.82,
  principles: 0.7,
  ai: 0.55,
  experience: 0.75,
  lab: 0.45,
  contact: 0.42,
};

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const smoothstep = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

/**
 * Maps document scroll → a continuous chapter value for the 3D world.
 * Sections are measured once (and on resize), so the scroll handler only does arithmetic.
 */
export function ScrollDirector() {
  useEffect(() => {
    let sections: { name: Chapter; top: number }[] = [];
    let raf = 0;
    let lastY = window.scrollY;
    const root = document.documentElement;

    const measure = () => {
      sections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]")).map((el) => ({
        name: el.dataset.chapter as Chapter,
        top: el.getBoundingClientRect().top + window.scrollY,
      }));
      update();
    };

    const update = () => {
      raf = 0;
      if (!sections.length) return;
      const anchor = window.scrollY + window.innerHeight * 0.5;
      let i = 0;
      while (i < sections.length - 1 && sections[i + 1].top <= anchor) i++;
      const cur = sections[i];
      const next = sections[i + 1];
      const span = next ? next.top - cur.top : window.innerHeight;
      // Hold on a chapter, then travel during the last part of the section.
      const t = next ? smoothstep(0.55, 1, (anchor - cur.top) / span) : 0;
      const a = chapterIndex(cur.name);
      const b = next ? chapterIndex(next.name) : a;
      worldState.chapter = a + (b - a) * t;
      setActiveChapter(cur.name);

      const dim = DIM[cur.name] + ((next ? DIM[next.name] : DIM[cur.name]) - DIM[cur.name]) * t;
      root.style.setProperty("--world-dim", dim.toFixed(3));

      const dy = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      worldState.scrollEnergy = Math.min(1, worldState.scrollEnergy + dy / 600);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      worldState.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      worldState.mouseY = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      root.style.removeProperty("--world-dim");
      worldState.chapter = 0;
    };
  }, []);

  return null;
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { changePause } from "@/lib/world";
import { supportsWebGL } from "@/lib/device";

/**
 * Mounts an interactive canvas only when it approaches the viewport (code + GPU work is deferred),
 * reports whether it is actually visible so the scene can stop its render loop when off-screen,
 * and pauses the background world while it's on screen (one active WebGL loop at a time).
 */
export function InteractiveStage({
  children,
  fallback,
  className,
  label,
}: {
  children: (visible: boolean) => ReactNode;
  fallback: ReactNode;
  className?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => setWebgl(supportsWebGL()), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nearObs = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "400px 0px" });
    const visObs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 });
    nearObs.observe(el);
    visObs.observe(el);
    return () => {
      nearObs.disconnect();
      visObs.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!visible || !near) return;
    changePause(1);
    return () => changePause(-1);
  }, [visible, near]);

  return (
    <div ref={ref} className={className} role="img" aria-label={label}>
      {near && webgl ? children(visible) : fallback}
    </div>
  );
}

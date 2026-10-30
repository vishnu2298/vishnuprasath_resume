"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { supportsWebGL, useDevice } from "@/lib/device";

const World = dynamic(() => import("./World"), { ssr: false });

/**
 * Fixed background layer. A pure-CSS "poster" renders immediately; the WebGL world is
 * fetched after the page is idle, then fades in over it.
 */
export function WorldLoader() {
  const { tier, reducedMotion, ready } = useDevice();
  const [mount, setMount] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ready || !supportsWebGL()) return;
    const go = () => setMount(true);
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(go, { timeout: 1500 });
      return () => (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(go, 300);
    return () => window.clearTimeout(t);
  }, [ready]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0" data-print="hide">
      {/* Poster: visible before WebGL and as the fallback when it's unavailable. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 50% at 72% 52%, rgba(99,183,174,0.10), transparent 70%), radial-gradient(40% 40% at 90% 85%, rgba(167,199,217,0.08), transparent 70%), #101820",
        }}
      />
      {mount && (
        <div className="absolute inset-0 transition-opacity duration-[1400ms]" style={{ opacity: visible ? 1 : 0 }}>
          <World tier={tier} reducedMotion={reducedMotion} onReady={() => setTimeout(() => setVisible(true), 120)} />
        </div>
      )}
      {/* Readability shade, driven by the scroll director per chapter. */}
      <div className="world-shade absolute inset-0 bg-ink" />
      {/* Phones: keep the lower two-thirds calm for hero text. */}
      <div
        className="absolute inset-0 md:hidden"
        style={{ background: "linear-gradient(0deg, rgba(16,24,32,0.96) 0%, rgba(16,24,32,0.9) 48%, rgba(16,24,32,0) 72%)" }}
      />
      {/* Permanent vignette so edges and the text column stay calm. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(16,24,32,0.85) 0%, rgba(16,24,32,0.35) 38%, rgba(16,24,32,0) 60%), linear-gradient(0deg, rgba(16,24,32,0.9) 0%, rgba(16,24,32,0) 30%)",
        }}
      />
    </div>
  );
}

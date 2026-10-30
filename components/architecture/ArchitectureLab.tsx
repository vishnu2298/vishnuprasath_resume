"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Minus, Plus, RotateCcw, RotateCw } from "lucide-react";
import { architecturePatterns, type PatternId } from "@/data/thinking";
import { patterns } from "./patterns";
import { InteractiveStage } from "@/components/3d/InteractiveStage";
import { Flow } from "@/components/ui/Flow";
import { useDevice } from "@/lib/device";

const ArchitectureScene = dynamic(() => import("./ArchitectureScene"), { ssr: false });

const order: PatternId[] = ["monolith", "microservices", "ai"];

export function ArchitectureLab() {
  const { tier, reducedMotion, coarse } = useDevice();
  const [pattern, setPattern] = useState<PatternId>("monolith");
  const [zoom, setZoom] = useState(1);
  const [spin, setSpin] = useState(0);

  const ctrl =
    "grid h-10 w-10 place-items-center rounded-lg border border-[var(--line-strong)] bg-ink/80 text-muted transition-colors hover:border-accent hover:text-fg";

  return (
    <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
      <div className="flex flex-col gap-4">
        <div role="radiogroup" aria-label="Architecture pattern" className="flex flex-col gap-2">
          {order.map((id, i) => {
            const on = id === pattern;
            return (
              <button
                key={id}
                role="radio"
                aria-checked={on}
                onClick={() => setPattern(id)}
                className={`panel flex items-center justify-between px-5 py-4 text-left transition-colors ${
                  on ? "border-accent/60 bg-accent/[0.1]" : "hover:border-ice/30"
                }`}
              >
                <span>
                  <span className="mr-3 font-mono text-xs text-dim">{i + 1}</span>
                  <span className="heading text-[1.2rem]">{architecturePatterns[id].label}</span>
                </span>
                {i < order.length - 1 && <span aria-hidden className="font-mono text-xs text-dim">→</span>}
              </button>
            );
          })}
        </div>
        <div className="panel p-5" aria-live="polite">
          <p className="text-sm leading-relaxed text-muted">{architecturePatterns[pattern].description}</p>
          <div className="mt-5">
            <Flow steps={patterns[pattern].flow} direction="vertical" highlightLast label={`${architecturePatterns[pattern].label} flow`} />
          </div>
        </div>
      </div>

      <div className="panel relative overflow-hidden">
        <InteractiveStage
          className="h-[460px] md:h-[620px]"
          label={`3D architecture diagram: ${architecturePatterns[pattern].label}. ${patterns[pattern].flow.join(" to ")}.`}
          fallback={<div className="grid h-full place-items-center text-sm text-dim">Loading the model…</div>}
        >
          {(visible) => (
            <ArchitectureScene
              pattern={pattern}
              zoom={zoom}
              spin={spin}
              visible={visible}
              allowDrag={!coarse}
              reducedMotion={reducedMotion}
              tier={tier}
            />
          )}
        </InteractiveStage>
        <div className="absolute bottom-4 right-4 flex gap-2" role="toolbar" aria-label="View controls">
          <button className={ctrl} aria-label="Rotate left" onClick={() => setSpin((s) => s - Math.PI / 4)}>
            <RotateCcw size={16} />
          </button>
          <button className={ctrl} aria-label="Rotate right" onClick={() => setSpin((s) => s + Math.PI / 4)}>
            <RotateCw size={16} />
          </button>
          <button className={ctrl} aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(0.7, z - 0.15))}>
            <Minus size={16} />
          </button>
          <button className={ctrl} aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(1.6, z + 0.15))}>
            <Plus size={16} />
          </button>
        </div>
        <p className="pointer-events-none absolute left-5 top-4 text-xs text-dim">
          {coarse ? "Use the controls to rotate & zoom" : "Drag to orbit · controls to zoom"}
        </p>
      </div>
    </div>
  );
}

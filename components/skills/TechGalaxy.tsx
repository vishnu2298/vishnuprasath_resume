"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { galaxyCategories, galaxyEdges, galaxyNodes, type GalaxyCategory } from "@/data/stack";
import { InteractiveStage } from "@/components/3d/InteractiveStage";
import { useDevice } from "@/lib/device";

const GalaxyScene = dynamic(() => import("./GalaxyScene"), { ssr: false });

const byId = Object.fromEntries(galaxyNodes.map((n) => [n.id, n]));

export function TechGalaxy() {
  const { tier, reducedMotion } = useDevice();
  const [hover, setHover] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [category, setCategory] = useState<GalaxyCategory | null>(null);
  const active = hover ?? selected;

  const connected = useMemo(() => {
    if (!active) return [];
    return galaxyEdges
      .filter(([a, b]) => a === active || b === active)
      .map(([a, b]) => byId[a === active ? b : a])
      .filter(Boolean);
  }, [active]);

  const fallback = (
    <div className="grid h-full place-items-center text-center text-sm text-dim">
      Loading the map…
    </div>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <div className="panel relative overflow-hidden">
        <InteractiveStage
          className="h-[440px] md:h-[600px]"
          label="Interactive map of technologies. Use the category and technology lists to explore it with a keyboard."
          fallback={fallback}
        >
          {(visible) => (
            <GalaxyScene
              active={active}
              focusCategory={category}
              onHover={setHover}
              onSelect={(id) => setSelected((s) => (s === id ? null : id))}
              visible={visible}
              reducedMotion={reducedMotion}
              tier={tier}
            />
          )}
        </InteractiveStage>
        <p className="pointer-events-none absolute bottom-4 left-5 text-xs text-dim">
          Hover or tap a technology · drag to rotate
        </p>
      </div>

      <aside className="flex flex-col gap-4" aria-label="Constellation controls">
        <div className="panel p-5">
          <p className="eyebrow mb-3">Filter by area</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Technology areas">
            {galaxyCategories.map((c) => {
              const on = category === c.id;
              return (
                <button
                  key={c.id}
                  aria-pressed={on}
                  onClick={() => setCategory(on ? null : c.id)}
                  className={`chip transition-colors ${on ? "border-accent bg-accent/15" : "hover:border-ice/40"}`}
                >
                  <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="panel min-h-[13rem] flex-1 p-5" aria-live="polite">
          {active ? (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="eyebrow mb-2">{galaxyCategories.find((c) => c.id === byId[active].category)?.label}</p>
                  <p className="heading text-[1.6rem]">{byId[active].label}</p>
                </div>
                {selected && (
                  <button aria-label="Clear selection" onClick={() => setSelected(null)} className="rounded-md p-1.5 text-muted hover:text-fg">
                    <X size={16} />
                  </button>
                )}
              </div>
              <p className="eyebrow mb-3 mt-5">Connects to</p>
              <ul className="flex flex-wrap gap-2">
                {connected.map((n) => (
                  <li key={n.id}>
                    <button className="chip hover:border-accent" onClick={() => setSelected(n.id)}>
                      {n.label}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p className="eyebrow mb-3">How it connects</p>
              <p className="text-sm leading-relaxed text-muted">
                Technologies are linked by how they work together in real systems:{" "}
                <span className="text-fg">Node.js ↔ MongoDB ↔ Elasticsearch ↔ AI ↔ External APIs</span>. Select one to see its
                neighbours.
              </p>
            </>
          )}
        </div>

        {/* Keyboard / screen-reader path through every node. */}
        <details className="panel p-5">
          <summary className="eyebrow cursor-pointer">All technologies ({galaxyNodes.length})</summary>
          <ul className="mt-4 flex flex-wrap gap-2">
            {galaxyNodes.map((n) => (
              <li key={n.id}>
                <button
                  className={`chip ${selected === n.id ? "border-accent" : ""}`}
                  aria-pressed={selected === n.id}
                  onClick={() => setSelected((s) => (s === n.id ? null : n.id))}
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        </details>
      </aside>
    </div>
  );
}

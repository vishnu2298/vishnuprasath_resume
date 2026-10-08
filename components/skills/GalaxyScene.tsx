"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { galaxyCategories, galaxyEdges, galaxyNodes, type GalaxyCategory } from "@/data/stack";
import { makeLabel } from "@/lib/canvasTexture";

type Props = {
  active: string | null;
  focusCategory: GalaxyCategory | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  visible: boolean;
  reducedMotion: boolean;
  tier: "high" | "low";
};

const catColor = Object.fromEntries(galaxyCategories.map((c) => [c.id, c.color])) as Record<GalaxyCategory, string>;

/** Deterministic layout: categories form clusters around the Node.js core. */
function useLayout() {
  return useMemo(() => {
    const centers: Partial<Record<GalaxyCategory, THREE.Vector3>> = {};
    const ring = galaxyCategories.filter((c) => c.id !== "backend");
    ring.forEach((c, i) => {
      const a = (i / ring.length) * Math.PI * 2;
      centers[c.id] = new THREE.Vector3(Math.cos(a) * 3.1, Math.sin(i * 1.7) * 0.9, Math.sin(a) * 3.1);
    });
    centers.backend = new THREE.Vector3(0, 0, 0);
    const counters: Record<string, number> = {};
    const pos = new Map<string, THREE.Vector3>();
    for (const n of galaxyNodes) {
      if (n.id === "node") {
        pos.set(n.id, new THREE.Vector3(0, 0, 0));
        continue;
      }
      const k = (counters[n.category] = (counters[n.category] ?? 0) + 1);
      const golden = k * 2.39996;
      const r = n.category === "backend" ? 1.05 : 0.45 + Math.sqrt(k) * 0.32;
      const offset = new THREE.Vector3(Math.cos(golden) * r, ((k % 3) - 1) * 0.42, Math.sin(golden) * r);
      pos.set(n.id, centers[n.category]!.clone().add(offset));
    }
    const neighbors = new Map<string, Set<string>>();
    galaxyNodes.forEach((n) => neighbors.set(n.id, new Set()));
    for (const [a, b] of galaxyEdges) {
      neighbors.get(a)?.add(b);
      neighbors.get(b)?.add(a);
    }
    return { pos, neighbors };
  }, []);
}

function Graph({ active, focusCategory, onHover, onSelect, reducedMotion }: Omit<Props, "visible" | "tier">) {
  const { pos, neighbors } = useLayout();
  const group = useRef<THREE.Group>(null);
  const drag = useRef<{ x: number; rot: number } | null>(null);
  const userRot = useRef(0);

  const labels = useMemo(
    () => galaxyNodes.map((n) => makeLabel(n.label, { size: 40, weight: n.core ? 700 : 500, color: "#f4f1ec" })),
    [],
  );
  useEffect(() => () => labels.forEach((l) => l.texture.dispose()), [labels]);

  const edgeGeo = useMemo(() => {
    const p: number[] = [];
    for (const [a, b] of galaxyEdges) p.push(...pos.get(a)!.toArray(), ...pos.get(b)!.toArray());
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(p, 3));
    g.setAttribute("color", new THREE.Float32BufferAttribute(new Float32Array(p.length), 3));
    return g;
  }, [pos]);

  const nodeMats = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const labelMats = useRef<(THREE.SpriteMaterial | null)[]>([]);
  const nodeMeshes = useRef<(THREE.Mesh | null)[]>([]);

  // Recolor only when highlight state changes — not every frame.
  useEffect(() => {
    const lit = (id: string) => {
      if (active) return id === active || neighbors.get(active)!.has(id);
      if (focusCategory) return galaxyNodes.find((n) => n.id === id)!.category === focusCategory;
      return true;
    };
    galaxyNodes.forEach((n, i) => {
      const on = lit(n.id);
      const m = nodeMats.current[i];
      if (m) {
        m.color.set(n.id === active ? "#ffffff" : catColor[n.category]);
        m.opacity = on ? 1 : 0.18;
      }
      const l = labelMats.current[i];
      if (l) l.opacity = on ? (active || focusCategory || n.core ? 1 : 0.62) : 0.12;
      const mesh = nodeMeshes.current[i];
      if (mesh) mesh.scale.setScalar(n.id === active ? 1.6 : 1);
    });
    const colors = edgeGeo.attributes.color as THREE.BufferAttribute;
    const hot = new THREE.Color("#ff5a1f");
    const cold = new THREE.Color("#3a2a22");
    galaxyEdges.forEach(([a, b], i) => {
      const on = active ? a === active || b === active : focusCategory ? lit(a) && lit(b) : false;
      const c = on ? hot : active || focusCategory ? new THREE.Color("#1c1614") : cold;
      colors.setXYZ(i * 2, c.r, c.g, c.b);
      colors.setXYZ(i * 2 + 1, c.r, c.g, c.b);
    });
    colors.needsUpdate = true;
  }, [active, focusCategory, neighbors, edgeGeo]);

  useFrame((_, dt) => {
    if (!group.current) return;
    if (!reducedMotion && !active && !drag.current) userRot.current += dt * 0.06;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, userRot.current, 6, dt);
  });

  const onDown = (e: ThreeEvent<PointerEvent>) => {
    if (e.pointerType !== "mouse") return;
    drag.current = { x: e.clientX, rot: userRot.current };
  };

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (drag.current) userRot.current = drag.current.rot + (e.clientX - drag.current.x) * 0.008;
    };
    const up = () => (drag.current = null);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <group ref={group} rotation={[0.18, 0, 0]}>
      {/* Invisible drag surface */}
      <mesh onPointerDown={onDown} visible={false}>
        <sphereGeometry args={[6, 8, 8]} />
        <meshBasicMaterial side={THREE.BackSide} />
      </mesh>
      <lineSegments geometry={edgeGeo}>
        <lineBasicMaterial vertexColors transparent opacity={0.9} depthWrite={false} />
      </lineSegments>
      {galaxyNodes.map((n, i) => {
        const p = pos.get(n.id)!;
        const r = n.id === "node" ? 0.2 : n.core ? 0.13 : 0.075;
        const l = labels[i];
        return (
          <group key={n.id} position={p}>
            <mesh
              ref={(m) => {
                nodeMeshes.current[i] = m;
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                onHover(n.id);
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                onHover(null);
                document.body.style.cursor = "";
              }}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(n.id);
              }}
            >
              <sphereGeometry args={[r, 18, 14]} />
              <meshBasicMaterial
                ref={(m) => {
                  nodeMats.current[i] = m;
                }}
                color={catColor[n.category]}
                transparent
                toneMapped={false}
              />
            </mesh>
            <sprite position={[0, r + 0.17, 0]} scale={[0.26 * l.aspect, 0.26, 1]}>
              <spriteMaterial
                ref={(m) => {
                  labelMats.current[i] = m;
                }}
                map={l.texture}
                transparent
                depthWrite={false}
                toneMapped={false}
              />
            </sprite>
          </group>
        );
      })}
    </group>
  );
}

export default function GalaxyScene(props: Props) {
  const { visible, tier, ...rest } = props;
  return (
    <Canvas
      frameloop={visible ? "always" : "never"}
      dpr={tier === "high" ? [1, 1.75] : [1, 1.25]}
      camera={{ position: [0, 1.4, 8.6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
      onPointerMissed={() => props.onHover(null)}
    >
      <Graph {...rest} />
    </Canvas>
  );
}

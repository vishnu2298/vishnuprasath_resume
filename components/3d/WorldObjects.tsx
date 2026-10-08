"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { createCardFace, createCodePanel, createGlowTexture } from "./screens";
import { codeSnippets } from "@/data/code";
import { capabilities } from "@/data/projects";
import { labProjects } from "@/data/experience";
import { chapterIndex, worldState } from "@/lib/world";

const smooth = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

/** Closeness of the camera to a chapter: 1 when sitting on it, 0 when ≥1 chapter away. */
const near = (chapter: number) => Math.max(0, 1 - Math.abs(worldState.chapter - chapter));

/* ------------------------------------------------------------------ */
/* Floating code panels around the desk — parallax with the pointer.   */
/* ------------------------------------------------------------------ */
export function FloatingCode({ reducedMotion }: { reducedMotion: boolean }) {
  const panels = useMemo(
    () => [
      { ...createCodePanel(codeSnippets.route, "routes/products.ts"), pos: [-0.35, 2.15, -0.9] as const, depth: 0.5, h: 0.62 },
      { ...createCodePanel(codeSnippets.recommend, "recommendation.ts", 760), pos: [2.75, 2.5, -1.3] as const, depth: 0.8, h: 0.42 },
      { ...createCodePanel(codeSnippets.enrich, "ai.service.ts", 760), pos: [0.95, 2.95, -2.3] as const, depth: 0.3, h: 0.36 },
    ],
    [],
  );
  const group = useRef<THREE.Group>(null);
  useEffect(() => () => panels.forEach((p) => p.texture.dispose()), [panels]);

  useFrame(({ clock }) => {
    if (!group.current || reducedMotion) return;
    const t = clock.elapsedTime;
    const fade = 1 - smooth(1.2, 2, worldState.chapter) * 0.7;
    group.current.children.forEach((c, i) => {
      const p = panels[i];
      c.position.x = p.pos[0] + worldState.mouseX * 0.12 * p.depth;
      c.position.y = p.pos[1] + Math.sin(t * 0.6 + i * 2) * 0.04 + worldState.mouseY * 0.06 * p.depth;
      c.rotation.y = -0.15 + Math.sin(t * 0.3 + i) * 0.04 + worldState.mouseX * 0.05;
      ((c as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = 0.92 * fade;
    });
  });

  return (
    <group ref={group}>
      {panels.map((p, i) => (
        <mesh key={i} position={p.pos as unknown as THREE.Vector3Tuple} rotation={[0, -0.15, 0]}>
          <planeGeometry args={[p.h * p.aspect, p.h]} />
          <meshBasicMaterial map={p.texture} transparent depthWrite={false} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Small symbolic objects: database cylinders and search lens.         */
/* ------------------------------------------------------------------ */
export function DeskSymbols({ reducedMotion }: { reducedMotion: boolean }) {
  const db = useRef<THREE.Group>(null);
  const search = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.elapsedTime;
    if (db.current) {
      db.current.rotation.y = t * 0.3;
      db.current.position.y = 1.15 + Math.sin(t * 0.8) * 0.05;
    }
    if (search.current) {
      search.current.rotation.z = Math.sin(t * 0.5) * 0.2;
      search.current.position.y = 2.75 + Math.sin(t * 0.7 + 1) * 0.05;
    }
  });
  return (
    <group>
      <group ref={db} position={[2.3, 1.15, -1.3]}>
        {[0, 1, 2].map((i) => (
          <group key={i} position={[0, i * 0.11, 0]}>
            <mesh>
              <cylinderGeometry args={[0.14, 0.14, 0.08, 32]} />
              <meshStandardMaterial color="#1b1b20" roughness={0.4} metalness={0.5} />
            </mesh>
            <mesh position={[0, 0.041, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.12, 0.14, 32]} />
              <meshBasicMaterial color="#ff5a1f" toneMapped={false} />
            </mesh>
          </group>
        ))}
      </group>
      <group ref={search} position={[-0.75, 2.75, -1.6]}>
        <mesh>
          <torusGeometry args={[0.12, 0.018, 12, 40]} />
          <meshBasicMaterial color="#ffb36b" toneMapped={false} />
        </mesh>
        <mesh position={[0.13, -0.13, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.016, 0.016, 0.16, 10]} />
          <meshBasicMaterial color="#ffb36b" toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Constellation: nodes rise out of the monitor into a tech galaxy.    */
/* ------------------------------------------------------------------ */
export function Constellation({ count = 26 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const center = useMemo(() => new THREE.Vector3(0.5, 6.5, -5), []);

  const { starts, ends, pairs } = useMemo(() => {
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const starts: THREE.Vector3[] = [];
    const ends: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      starts.push(new THREE.Vector3(-0.75 + rnd() * 1.5, 1.0 + rnd() * 0.6, -0.2));
      const dir = new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize();
      ends.push(center.clone().add(dir.multiplyScalar(1.2 + rnd() * 1.6)));
    }
    const pairs: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      const d = ends.map((e, j) => ({ j, d: e.distanceTo(ends[i]) })).filter((x) => x.j !== i);
      d.sort((a, b) => a.d - b.d);
      for (const { j } of d.slice(0, 2)) if (!pairs.some(([a, b]) => (a === j && b === i) || (a === i && b === j))) pairs.push([i, j]);
    }
    return { starts, ends, pairs };
  }, [count, center]);

  const linePositions = useMemo(() => new Float32Array(pairs.length * 6), [pairs]);
  const current = useMemo(() => starts.map((s) => s.clone()), [starts]);
  const m = useMemo(() => new THREE.Matrix4(), []);
  const from = chapterIndex("journey") + 0.15;

  useFrame(({ clock }) => {
    if (!mesh.current || !lines.current) return;
    const t = smooth(from, from + 0.85, worldState.chapter);
    const fadeOut = 1 - smooth(chapterIndex("stack") + 0.6, chapterIndex("backend") + 0.3, worldState.chapter) * 0.6;
    const visible = t > 0.001;
    mesh.current.visible = visible;
    lines.current.visible = visible;
    if (!visible) return;
    const time = clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      // Each node has a slightly different departure time — they peel off the screen.
      const ti = smooth(i / count / 3, 1 - (count - i) / count / 3, t);
      current[i].lerpVectors(starts[i], ends[i], ti);
      current[i].y += Math.sin(time * 0.6 + i) * 0.04 * ti;
      const s = 0.02 + 0.028 * ti;
      m.makeScale(s, s, s).setPosition(current[i]);
      mesh.current.setMatrixAt(i, m);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    pairs.forEach(([a, b], k) => {
      current[a].toArray(linePositions, k * 6);
      current[b].toArray(linePositions, k * 6 + 3);
    });
    const geo = lines.current.geometry as THREE.BufferGeometry;
    (geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (lines.current.material as THREE.LineBasicMaterial).opacity = Math.max(0, t - 0.5) * 0.9 * fadeOut;
    mesh.current.rotation.set(0, 0, 0);
  });

  return (
    <group>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
        <sphereGeometry args={[1, 12, 10]} />
        <meshBasicMaterial color="#ff8a4a" toneMapped={false} />
      </instancedMesh>
      <lineSegments ref={lines} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#ff6a2b" transparent opacity={0} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Project wall: one tall panel per category of system.                */
/* ------------------------------------------------------------------ */
export function ProjectWall() {
  const faces = useMemo(
    () =>
      capabilities.map((c, i) =>
        createCardFace({
          index: String(i + 1).padStart(2, "0"),
          title: c.title,
          subtitle: c.description,
          lines: c.items.slice(0, 3),
        }),
      ),
    [],
  );
  useEffect(() => () => faces.forEach((f) => f.texture.dispose()), [faces]);
  const group = useRef<THREE.Group>(null);
  const build = chapterIndex("build");
  const systems = chapterIndex("systems");

  useFrame(({ clock }) => {
    if (!group.current) return;
    const k = Math.max(near(build), near(systems));
    group.current.visible = worldState.chapter > build - 1.6 && worldState.chapter < systems + 1.6;
    group.current.children.forEach((c, i) => {
      c.position.y = 2 + Math.sin(clock.elapsedTime * 0.5 + i) * 0.05;
      ((c as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = 0.35 + 0.6 * k;
    });
  });

  return (
    <group ref={group} position={[-9.4, 0, -5.4]}>
      {faces.map((f, i) => {
        const a = -0.9 + i * 0.36;
        const r = 3.6;
        return (
          <mesh key={i} position={[Math.sin(a) * r, 2, Math.cos(a) * r - r + 0.4]} rotation={[0, a + 0.35, 0]}>
            <planeGeometry args={[1.25 * f.aspect, 1.25]} />
            <meshBasicMaterial map={f.texture} transparent depthWrite={false} toneMapped={false} side={THREE.DoubleSide} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* AI core: a neural structure that brightens when the AI chapter is   */
/* active.                                                             */
/* ------------------------------------------------------------------ */
export function AICore({ tier }: { tier: "high" | "low" }) {
  const shell = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Group>(null);
  const coreMat = useRef<THREE.MeshBasicMaterial>(null);
  const glowMat = useRef<THREE.SpriteMaterial>(null);
  const glow = useMemo(() => createGlowTexture(), []);
  const ai = chapterIndex("ai");

  const net = useMemo(() => {
    const layers = [4, 6, 6, 3];
    const pts: THREE.Vector3[][] = layers.map((n, li) =>
      Array.from({ length: n }, (_, k) => new THREE.Vector3(-1.4 + li * 0.95, (k - (n - 1) / 2) * 0.32, -1.6)),
    );
    const seg: number[] = [];
    for (let l = 0; l < pts.length - 1; l++)
      for (const a of pts[l]) for (const b of pts[l + 1]) seg.push(a.x, a.y, a.z, b.x, b.y, b.z);
    return { nodes: pts.flat(), seg: new Float32Array(seg) };
  }, []);

  const satellites = 9;
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const k = near(ai);
    if (shell.current) {
      shell.current.rotation.y = t * 0.15;
      shell.current.rotation.x = t * 0.07;
    }
    if (ring.current) ring.current.rotation.y = t * 0.2;
    if (coreMat.current) coreMat.current.color.setRGB(1, 0.28 + 0.14 * k, 0.08);
    if (glowMat.current) glowMat.current.opacity = 0.35 + 0.55 * k + Math.sin(t * 2) * 0.05;
  });

  return (
    <group position={[8, 2.4, -5]}>
      <mesh ref={shell}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial color="#ff6a2b" wireframe transparent opacity={0.45} toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.32, 24, 18]} />
        <meshBasicMaterial ref={coreMat} color="#ff5a1f" toneMapped={false} />
      </mesh>
      <sprite scale={[3.4, 3.4, 1]}>
        <spriteMaterial ref={glowMat} map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <group ref={ring} rotation={[0.35, 0, 0.15]}>
        {Array.from({ length: satellites }).map((_, i) => {
          const a = (i / satellites) * Math.PI * 2;
          return (
            <group key={i}>
              <mesh position={[Math.cos(a) * 1.6, 0, Math.sin(a) * 1.6]}>
                <octahedronGeometry args={[0.07, 0]} />
                <meshBasicMaterial color="#ffb36b" toneMapped={false} />
              </mesh>
            </group>
          );
        })}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.6, 0.004, 6, 96]} />
          <meshBasicMaterial color="#ff8a4a" transparent opacity={0.4} toneMapped={false} />
        </mesh>
      </group>
      {tier === "high" && (
        <group>
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[net.seg, 3]} />
            </bufferGeometry>
            <lineBasicMaterial color="#ff5a1f" transparent opacity={0.16} depthWrite={false} />
          </lineSegments>
          {net.nodes.map((p, i) => (
            <mesh key={i} position={p}>
              <sphereGeometry args={[0.035, 10, 8]} />
              <meshBasicMaterial color="#ffb36b" toneMapped={false} />
            </mesh>
          ))}
        </group>
      )}
      <pointLight color="#ff5a1f" intensity={3} distance={6} decay={1.5} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* The Lab: personal projects floating in their own room.              */
/* ------------------------------------------------------------------ */
const statusColor: Record<string, string> = {
  BUILDING: "rgba(255,90,31,0.25)",
  EXPLORING: "rgba(255,179,107,0.2)",
  EXPERIMENT: "rgba(255,255,255,0.12)",
  CONCEPT: "rgba(255,61,46,0.2)",
};

export function LabRoom() {
  const faces = useMemo(
    () =>
      labProjects.map((p) =>
        createCardFace({ title: p.title, tag: p.statusText.toUpperCase(), tagColor: statusColor[p.status], subtitle: p.note, w: 640, h: 560 }),
      ),
    [],
  );
  useEffect(() => () => faces.forEach((f) => f.texture.dispose()), [faces]);
  const group = useRef<THREE.Group>(null);
  const lab = chapterIndex("lab");

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.visible = worldState.chapter > lab - 1.8;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.1) * 0.08;
    group.current.children.forEach((c, i) => {
      c.position.y = 1.2 + (i % 2) * 0.95 + Math.sin(clock.elapsedTime * 0.6 + i * 1.3) * 0.06;
    });
  });

  return (
    <group ref={group} position={[0, 0, -13]}>
      {faces.map((f, i) => {
        const a = ((i - (faces.length - 1) / 2) / faces.length) * Math.PI * 1.1;
        const r = 3.2;
        return (
          <mesh key={i} position={[Math.sin(a) * r, 1.2, Math.cos(a) * r - r + 1.2]} rotation={[0, a, 0]}>
            <planeGeometry args={[0.85 * f.aspect, 0.85]} />
            <meshBasicMaterial map={f.texture} transparent depthWrite={false} toneMapped={false} side={THREE.DoubleSide} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Atmosphere: horizon glow + slow dust particles.                     */
/* ------------------------------------------------------------------ */
export function Atmosphere({ particles, reducedMotion }: { particles: number; reducedMotion: boolean }) {
  const glow = useMemo(() => createGlowTexture("rgba(255,120,60,0.9)"), []);
  const pts = useRef<THREE.Points>(null);
  const horizon = useRef<THREE.MeshBasicMaterial>(null);
  const positions = useMemo(() => {
    let seed = 3;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const arr = new Float32Array(particles * 3);
    for (let i = 0; i < particles; i++) {
      arr[i * 3] = (rnd() - 0.5) * 26;
      arr[i * 3 + 1] = rnd() * 9;
      arr[i * 3 + 2] = (rnd() - 0.5) * 26 - 5;
    }
    return arr;
  }, [particles]);
  const contact = chapterIndex("contact");

  useFrame(({ clock }) => {
    if (pts.current && !reducedMotion) pts.current.rotation.y = clock.elapsedTime * 0.01;
    if (horizon.current) horizon.current.opacity = 0.35 + 0.55 * Math.max(near(contact), near(0) * 0.6);
  });

  return (
    <group>
      <mesh position={[0, 4, -32]}>
        <planeGeometry args={[70, 30]} />
        <meshBasicMaterial ref={horizon} map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} fog={false} toneMapped={false} />
      </mesh>
      <points ref={pts}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#ffb38a" size={0.025} sizeAttenuation transparent opacity={0.55} depthWrite={false} />
      </points>
    </group>
  );
}

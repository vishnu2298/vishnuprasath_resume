"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { labNodes, patterns, type Shape } from "./patterns";
import type { PatternId } from "@/data/thinking";
import { makeLabel } from "@/lib/canvasTexture";

type Props = {
  pattern: PatternId;
  zoom: number;
  spin: number;
  visible: boolean;
  allowDrag: boolean;
  reducedMotion: boolean;
  tier: "high" | "low";
};

const MAX_EDGES = 8;
const PULSES_PER_EDGE = 2;

function geometryFor(shape: Shape) {
  switch (shape) {
    case "screen":
      return new THREE.BoxGeometry(1.5, 0.5, 0.08);
    case "gateway":
      return new THREE.BoxGeometry(1.9, 0.32, 0.9);
    case "db":
      return new THREE.CylinderGeometry(0.42, 0.42, 0.62, 32);
    case "ai":
      return new THREE.IcosahedronGeometry(0.42, 1);
    case "external":
      return new THREE.OctahedronGeometry(0.42, 0);
    default:
      return new THREE.BoxGeometry(0.9, 0.5, 0.6);
  }
}

function Graph({ pattern, reducedMotion, spin }: Pick<Props, "pattern" | "reducedMotion" | "spin">) {
  const group = useRef<THREE.Group>(null);
  const nodeRefs = useRef<(THREE.Group | null)[]>([]);
  const lineRef = useRef<THREE.LineSegments>(null);
  const pulses = useRef<THREE.InstancedMesh>(null);

  const assets = useMemo(
    () =>
      labNodes.map((n) => {
        const geo = geometryFor(n.shape);
        return {
          geo,
          edges: new THREE.EdgesGeometry(geo, 20),
          label: makeLabel(n.label, { size: 38, weight: 600, bg: "rgba(16,24,32,0.88)", border: "rgba(99,183,174,0.45)" }),
        };
      }),
    [],
  );
  useEffect(
    () => () =>
      assets.forEach((a) => {
        a.geo.dispose();
        a.edges.dispose();
        a.label.texture.dispose();
      }),
    [assets],
  );

  const linePos = useMemo(() => new Float32Array(MAX_EDGES * 6), []);
  const tmp = useMemo(() => new THREE.Matrix4(), []);
  const va = useMemo(() => new THREE.Vector3(), []);
  const vb = useMemo(() => new THREE.Vector3(), []);
  const scales = useRef<number[]>(labNodes.map((n) => (patterns.monolith.positions[n.id] ? 1 : 0)));

  useFrame(({ clock }, dt) => {
    const d = Math.min(dt, 0.1);
    const p = patterns[pattern];
    const speed = reducedMotion ? 1000 : 4;

    labNodes.forEach((n, i) => {
      const g = nodeRefs.current[i];
      if (!g) return;
      const target = p.positions[n.id];
      const s = target ? 1 : 0;
      scales.current[i] = THREE.MathUtils.damp(scales.current[i], s, speed, d);
      if (target) {
        g.position.x = THREE.MathUtils.damp(g.position.x, target[0], speed, d);
        g.position.y = THREE.MathUtils.damp(g.position.y, target[1], speed, d);
        g.position.z = THREE.MathUtils.damp(g.position.z, target[2], speed, d);
      }
      const sc = Math.max(0.0001, scales.current[i]);
      g.scale.setScalar(sc);
      g.visible = sc > 0.01;
      if (n.shape === "ai" && !reducedMotion) g.children[0].rotation.y = clock.elapsedTime * 0.6;
    });

    // Edges follow the animated node positions.
    const idx = (id: string) => labNodes.findIndex((n) => n.id === id);
    let k = 0;
    for (const [a, b] of p.edges) {
      nodeRefs.current[idx(a)]?.getWorldPosition(va);
      nodeRefs.current[idx(b)]?.getWorldPosition(vb);
      group.current?.worldToLocal(va);
      group.current?.worldToLocal(vb);
      va.toArray(linePos, k * 6);
      vb.toArray(linePos, k * 6 + 3);
      // Pulses travel from source to target along each edge.
      for (let j = 0; j < PULSES_PER_EDGE; j++) {
        const t = reducedMotion ? 0.5 : (clock.elapsedTime * 0.45 + j / PULSES_PER_EDGE + k * 0.13) % 1;
        const pos = va.clone().lerp(vb, t);
        tmp.makeScale(1, 1, 1).setPosition(pos);
        pulses.current?.setMatrixAt(k * PULSES_PER_EDGE + j, tmp);
      }
      k++;
    }
    for (let r = k; r < MAX_EDGES; r++) {
      linePos.fill(0, r * 6, r * 6 + 6);
      for (let j = 0; j < PULSES_PER_EDGE; j++) {
        tmp.makeScale(0, 0, 0);
        pulses.current?.setMatrixAt(r * PULSES_PER_EDGE + j, tmp);
      }
    }
    if (lineRef.current) (lineRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    if (pulses.current) pulses.current.instanceMatrix.needsUpdate = true;

    if (group.current) group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, spin, 5, d);
  });

  return (
    <group ref={group}>
      <lineSegments ref={lineRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#63b7ae" transparent opacity={0.5} />
      </lineSegments>
      <instancedMesh ref={pulses} args={[undefined, undefined, MAX_EDGES * PULSES_PER_EDGE]} frustumCulled={false}>
        <sphereGeometry args={[0.06, 10, 8]} />
        <meshBasicMaterial color="#d8efeb" toneMapped={false} />
      </instancedMesh>

      {labNodes.map((n, i) => {
        const a = assets[i];
        const start = patterns.monolith.positions[n.id] ?? [0, 0, 0];
        const accent = n.shape === "ai";
        return (
          <group
            key={n.id}
            position={start}
            ref={(g) => {
              nodeRefs.current[i] = g;
            }}
          >
            <group>
              <mesh geometry={a.geo}>
                <meshStandardMaterial
                  color={accent ? "#4f9c94" : "#2a3943"}
                  emissive={accent ? "#1f4a46" : "#101c24"}
                  emissiveIntensity={accent ? 0.7 : 0.5}
                  roughness={0.45}
                  metalness={0.35}
                  transparent
                  opacity={accent ? 0.95 : 0.92}
                />
              </mesh>
              <lineSegments geometry={a.edges}>
                <lineBasicMaterial color={accent ? "#c9e6e2" : "#7fa9bf"} transparent opacity={0.75} />
              </lineSegments>
            </group>
            <sprite position={[0, n.shape === "gateway" ? 0.48 : 0.62, 0]} scale={[0.3 * a.label.aspect, 0.3, 1]}>
              <spriteMaterial map={a.label.texture} transparent depthWrite={false} toneMapped={false} />
            </sprite>
          </group>
        );
      })}
    </group>
  );
}

function Zoom({ zoom }: { zoom: number }) {
  const camera = useThree((s) => s.camera);
  useFrame((_, dt) => {
    const target = 10.5 / zoom;
    const len = camera.position.length();
    const next = THREE.MathUtils.damp(len, target, 5, Math.min(dt, 0.1));
    camera.position.multiplyScalar(next / len);
  });
  return null;
}

export default function ArchitectureScene(props: Props) {
  const { visible, tier, allowDrag, zoom, ...rest } = props;
  return (
    <Canvas
      frameloop={visible ? "always" : "never"}
      dpr={tier === "high" ? [1, 1.75] : [1, 1.25]}
      camera={{ position: [0, 1.2, 10.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 6]} intensity={1.2} />
      <pointLight position={[-4, -2, 3]} intensity={4} distance={14} decay={1.5} color="#63b7ae" />
      <gridHelper args={[16, 16, "#1b2730", "#1b2730"]} position={[0, -3.4, 0]} />
      <Graph {...rest} />
      <Zoom zoom={zoom} />
      {allowDrag && <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={0.6} maxPolarAngle={2.1} />}
    </Canvas>
  );
}

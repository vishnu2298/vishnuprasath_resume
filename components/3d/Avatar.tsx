"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { chapterIndex, worldState } from "@/lib/world";

/**
 * Stylized professional developer, built from primitives (no model download).
 * Deliberately faceless and mannequin-like: modern, not cartoonish, and never the focus.
 * Swap for a GLB later by replacing this component — the rig API (root/upper/head) is all that's used.
 */
const skin = { color: "#9c6b4f", roughness: 0.62, metalness: 0 } as const;
const jacket = { color: "#24242a", roughness: 0.78, metalness: 0.05 } as const;
const trousers = { color: "#17171b", roughness: 0.85 } as const;
const hair = { color: "#0f0d0e", roughness: 0.9 } as const;

/** Per-chapter stance: where the avatar stands and which way it faces. */
const stations: { from: number; pos: [number, number, number]; yaw: number }[] = [
  { from: chapterIndex("hero"), pos: [1.6, 0, 0.62], yaw: -0.5 },
  { from: chapterIndex("journey"), pos: [1.5, 0, 0.35], yaw: -1.15 }, // turns to the monitor
  { from: chapterIndex("stack"), pos: [1.5, 0, 0.35], yaw: -0.4 },
  { from: chapterIndex("ai"), pos: [1.6, 0, 0.4], yaw: 0.6 }, // looks toward the AI core
  { from: chapterIndex("experience"), pos: [1.6, 0, 0.62], yaw: -0.5 },
  { from: chapterIndex("contact"), pos: [0.9, 0, 1.4], yaw: 0 }, // faces the visitor
];

export function Avatar({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<THREE.Group>(null);
  const upper = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const tablet = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }, dt) => {
    if (!root.current || !upper.current || !head.current) return;
    const t = clock.elapsedTime;
    const ch = worldState.chapter;
    let station = stations[0];
    for (const s of stations) if (ch >= s.from - 0.4) station = s;

    const d = Math.min(dt, 0.1);
    const r = root.current;
    if (reducedMotion) {
      r.position.set(...station.pos);
      r.rotation.y = station.yaw;
      return;
    }
    r.position.x = THREE.MathUtils.damp(r.position.x, station.pos[0], 1.6, d);
    r.position.z = THREE.MathUtils.damp(r.position.z, station.pos[2], 1.6, d);
    r.rotation.y = THREE.MathUtils.damp(r.rotation.y, station.yaw, 2, d);

    // Breathing + weight shift.
    upper.current.scale.y = 1 + Math.sin(t * 1.6) * 0.006;
    upper.current.rotation.z = Math.sin(t * 0.5) * 0.012;

    // Head follows the pointer a little.
    head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, worldState.mouseX * 0.45, 3, d);
    head.current.rotation.x = THREE.MathUtils.damp(head.current.rotation.x, -worldState.mouseY * 0.18 + 0.08, 3, d);

    if (tablet.current) tablet.current.opacity = 0.75 + Math.sin(t * 2.2) * 0.1;
  });

  return (
    <group ref={root} position={[1.6, 0, 0.62]} rotation={[0, -0.5, 0]}>
      {/* Legs */}
      {[-0.1, 0.1].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.5, 0]}>
            <capsuleGeometry args={[0.075, 0.74, 6, 14]} />
            <meshStandardMaterial {...trousers} />
          </mesh>
          <mesh position={[x, 0.045, 0.045]}>
            <boxGeometry args={[0.1, 0.06, 0.25]} />
            <meshStandardMaterial color="#1f1f24" roughness={0.5} metalness={0.2} />
          </mesh>
        </group>
      ))}

      <group ref={upper} position={[0, 0.92, 0]}>
        {/* Hips */}
        <mesh position={[0, 0.03, 0]} scale={[1.25, 0.6, 0.85]}>
          <sphereGeometry args={[0.15, 20, 14]} />
          <meshStandardMaterial {...trousers} />
        </mesh>
        {/* Torso */}
        <mesh position={[0, 0.36, 0]} scale={[1.06, 1, 0.68]}>
          <capsuleGeometry args={[0.19, 0.36, 8, 20]} />
          <meshStandardMaterial {...jacket} />
        </mesh>
        {/* T-shirt hint at the collar */}
        <mesh position={[0, 0.6, 0.085]} rotation={[0.25, 0, 0]}>
          <circleGeometry args={[0.06, 3]} />
          <meshStandardMaterial color="#d9d4cc" roughness={0.8} side={THREE.DoubleSide} />
        </mesh>

        {/* Arms */}
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 0.23, 0.56, 0]} rotation={[0, 0, side * 0.07]}>
            <mesh position={[0, -0.01, 0]}>
              <sphereGeometry args={[0.078, 16, 12]} />
              <meshStandardMaterial {...jacket} />
            </mesh>
            <mesh position={[0, -0.17, 0]}>
              <capsuleGeometry args={[0.056, 0.24, 6, 12]} />
              <meshStandardMaterial {...jacket} />
            </mesh>
            {/* Forearm: right arm raised, holding a tablet */}
            <group position={[0, -0.33, 0]} rotation={side === 1 ? [-1.25, 0, -0.35] : [-0.15, 0, 0]}>
              <mesh position={[0, -0.13, 0]}>
                <capsuleGeometry args={[0.047, 0.22, 6, 12]} />
                <meshStandardMaterial {...jacket} />
              </mesh>
              <mesh position={[0, -0.29, 0]} scale={[0.85, 1.1, 0.6]}>
                <sphereGeometry args={[0.05, 12, 10]} />
                <meshStandardMaterial {...skin} />
              </mesh>
              {side === 1 && (
                <group position={[-0.06, -0.31, 0.03]} rotation={[1.25, 0, 0.2]}>
                  <mesh>
                    <boxGeometry args={[0.2, 0.008, 0.14]} />
                    <meshStandardMaterial color="#1b1b1f" roughness={0.4} metalness={0.6} />
                  </mesh>
                  <mesh position={[0, 0.0045, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[0.185, 0.125]} />
                    <meshBasicMaterial ref={tablet} color="#ff7a3d" transparent opacity={0.8} toneMapped={false} />
                  </mesh>
                </group>
              )}
            </group>
          </group>
        ))}

        {/* Neck + head */}
        <mesh position={[0, 0.66, 0]}>
          <cylinderGeometry args={[0.052, 0.058, 0.1, 14]} />
          <meshStandardMaterial {...skin} />
        </mesh>
        <group ref={head} position={[0, 0.79, 0]}>
          <mesh scale={[0.9, 1.1, 0.98]}>
            <sphereGeometry args={[0.112, 28, 22]} />
            <meshStandardMaterial {...skin} />
          </mesh>
          {/* Jaw / short beard shadow */}
          <mesh position={[0, -0.045, 0.018]} scale={[0.86, 0.62, 0.9]}>
            <sphereGeometry args={[0.1, 22, 16, 0, Math.PI * 2, Math.PI * 0.45, Math.PI * 0.55]} />
            <meshStandardMaterial color="#2a1f1a" roughness={0.95} />
          </mesh>
          {/* Hair */}
          <mesh position={[0, 0.018, -0.012]} rotation={[-0.42, 0, 0]} scale={[0.93, 1.02, 1.0]}>
            <sphereGeometry args={[0.113, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
            <meshStandardMaterial {...hair} />
          </mesh>
          {/* Ears */}
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * 0.1, 0, -0.005]} scale={[0.35, 0.6, 0.45]}>
              <sphereGeometry args={[0.05, 10, 8]} />
              <meshStandardMaterial {...skin} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

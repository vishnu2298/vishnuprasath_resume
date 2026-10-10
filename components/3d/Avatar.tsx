"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { chapterIndex, worldState } from "@/lib/world";

/**
 * Stylized 3D likeness, built from primitives (no model download, no photo shipped).
 * Character-style proportions: slightly larger head, soft shapes, readable from far away.
 * Look: side-swept black hair, short goatee, navy suit, light-blue shirt, black tie.
 * Swap for a GLB later by replacing this component — only root/upper/head/arm refs drive motion.
 */
const skin = { color: "#8a5a3f", roughness: 0.55, metalness: 0 } as const;
const suit = { color: "#283456", roughness: 0.72, metalness: 0.04 } as const;
const lapel = { color: "#1d2742", roughness: 0.6, metalness: 0.06 } as const;
const shirt = { color: "#b8c8e6", roughness: 0.7 } as const;
const tie = { color: "#0c0c10", roughness: 0.45, metalness: 0.1 } as const;
const hair = { color: "#0b0909", roughness: 0.85 } as const;
const beard = { color: "#17110f", roughness: 0.95 } as const;

/** Per-chapter stance: where the avatar stands and which way it faces. */
const stations: { from: number; pos: [number, number, number]; yaw: number; wave?: boolean }[] = [
  { from: chapterIndex("hero"), pos: [1.25, 0, 1.05], yaw: 0.05 }, // faces the visitor beside the desk
  { from: chapterIndex("journey"), pos: [1.5, 0, 0.35], yaw: -1.15 }, // turns to the monitor
  { from: chapterIndex("stack"), pos: [1.5, 0, 0.35], yaw: -0.4 },
  { from: chapterIndex("ai"), pos: [1.6, 0, 0.4], yaw: 0.6 }, // looks toward the AI core
  { from: chapterIndex("experience"), pos: [1.25, 0, 1.05], yaw: 0.05 },
  { from: chapterIndex("contact"), pos: [0.9, 0, 1.4], yaw: 0, wave: true }, // faces the visitor and waves
];

export function Avatar({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<THREE.Group>(null);
  const upper = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const pupils = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const foreR = useRef<THREE.Group>(null);
  const wave = useRef(0);

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

    // Head and eyes follow the pointer a little.
    head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, worldState.mouseX * 0.4, 3, d);
    head.current.rotation.x = THREE.MathUtils.damp(head.current.rotation.x, -worldState.mouseY * 0.16 + 0.04, 3, d);
    if (pupils.current) {
      pupils.current.position.x = THREE.MathUtils.damp(pupils.current.position.x, worldState.mouseX * 0.004, 6, d);
      pupils.current.position.y = THREE.MathUtils.damp(pupils.current.position.y, worldState.mouseY * 0.003, 6, d);
    }

    // Blink: a quick squash every ~4s.
    if (eyes.current) {
      const phase = (t + 0.7) % 4.2;
      eyes.current.scale.y = phase < 0.13 ? Math.max(0.08, Math.abs(phase - 0.065) / 0.065) : 1;
    }

    // Wave hello on the contact chapter.
    wave.current = THREE.MathUtils.damp(wave.current, station.wave ? 1 : 0, 3, d);
    if (armR.current && foreR.current) {
      const w = wave.current;
      armR.current.rotation.z = 0.08 + w * 2.55;
      armR.current.rotation.x = -w * 0.25;
      foreR.current.rotation.z = w * (0.35 + Math.sin(t * 7) * 0.35);
      foreR.current.rotation.x = (1 - w) * -0.12;
    }
  });

  return (
    <group ref={root} position={stations[0].pos} rotation={[0, stations[0].yaw, 0]}>
      {/* Soft key light that travels with the character so the face always reads. */}
      <pointLight position={[0.35, 1.9, 1.1]} intensity={2.2} distance={2.6} decay={1.6} color="#ffe6d2" />

      {/* Legs + shoes */}
      {[-0.095, 0.095].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.47, 0]}>
            <capsuleGeometry args={[0.078, 0.72, 6, 14]} />
            <meshStandardMaterial {...suit} />
          </mesh>
          <mesh position={[x, 0.04, 0.05]} scale={[1, 0.7, 1]}>
            <capsuleGeometry args={[0.055, 0.16, 6, 12]} />
            <meshStandardMaterial color="#09090b" roughness={0.3} metalness={0.4} />
          </mesh>
        </group>
      ))}

      <group ref={upper} position={[0, 0.9, 0]}>
        {/* Hips */}
        <mesh position={[0, 0.03, 0]} scale={[1.25, 0.6, 0.85]}>
          <sphereGeometry args={[0.15, 20, 14]} />
          <meshStandardMaterial {...suit} />
        </mesh>
        {/* Jacket */}
        <mesh position={[0, 0.34, 0]} scale={[1.08, 1, 0.7]}>
          <capsuleGeometry args={[0.19, 0.34, 8, 24]} />
          <meshStandardMaterial {...suit} />
        </mesh>
        {/* Shirt V, tie, lapels and buttons on the jacket front */}
        <group position={[0, 0.535, 0.137]} rotation={[-0.06, 0, 0]}>
          <mesh position={[0, -0.02, 0]} rotation={[0, 0, -Math.PI / 2]} scale={[1.45, 1.0, 1]}>
            <circleGeometry args={[0.085, 3]} />
            <meshStandardMaterial {...shirt} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0.07, 0.006]}>
            <boxGeometry args={[0.032, 0.026, 0.01]} />
            <meshStandardMaterial {...tie} />
          </mesh>
          <mesh position={[0, -0.04, 0.005]} scale={[1, 1, 1]}>
            <boxGeometry args={[0.03, 0.17, 0.006]} />
            <meshStandardMaterial {...tie} />
          </mesh>
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * 0.05, -0.02, 0.004]} rotation={[0, 0, -s * 0.36]}>
              <boxGeometry args={[0.028, 0.17, 0.008]} />
              <meshStandardMaterial {...lapel} />
            </mesh>
          ))}
          {[-0.15, -0.22].map((y) => (
            <mesh key={y} position={[0.012, y, 0.002]}>
              <sphereGeometry args={[0.009, 8, 6]} />
              <meshStandardMaterial color="#0a0c14" roughness={0.3} metalness={0.4} />
            </mesh>
          ))}
        </group>
        {/* Shirt collar around the neck */}
        <mesh position={[0, 0.62, 0.01]}>
          <cylinderGeometry args={[0.066, 0.078, 0.06, 18, 1, true]} />
          <meshStandardMaterial {...shirt} side={THREE.DoubleSide} />
        </mesh>

        {/* Arms */}
        {[-1, 1].map((side) => (
          <group
            key={side}
            ref={side === 1 ? armR : undefined}
            position={[side * 0.235, 0.56, 0]}
            rotation={[0, 0, side * 0.08]}
          >
            <mesh position={[0, -0.01, 0]}>
              <sphereGeometry args={[0.082, 16, 12]} />
              <meshStandardMaterial {...suit} />
            </mesh>
            <mesh position={[0, -0.17, 0]}>
              <capsuleGeometry args={[0.06, 0.24, 6, 12]} />
              <meshStandardMaterial {...suit} />
            </mesh>
            <group ref={side === 1 ? foreR : undefined} position={[0, -0.33, 0]} rotation={[-0.12, 0, 0]}>
              <mesh position={[0, -0.13, 0]}>
                <capsuleGeometry args={[0.052, 0.22, 6, 12]} />
                <meshStandardMaterial {...suit} />
              </mesh>
              {/* Shirt cuff */}
              <mesh position={[0, -0.255, 0]}>
                <cylinderGeometry args={[0.045, 0.045, 0.025, 12]} />
                <meshStandardMaterial {...shirt} />
              </mesh>
              <mesh position={[0, -0.305, 0]} scale={[0.85, 1.15, 0.6]}>
                <sphereGeometry args={[0.05, 12, 10]} />
                <meshStandardMaterial {...skin} />
              </mesh>
            </group>
          </group>
        ))}

        {/* Neck */}
        <mesh position={[0, 0.66, 0]}>
          <cylinderGeometry args={[0.054, 0.06, 0.12, 14]} />
          <meshStandardMaterial {...skin} />
        </mesh>

        <group ref={head} position={[0, 0.84, 0]} scale={1.08}>
          {/* Face + jaw: an oval, slightly longer than wide */}
          <mesh scale={[0.82, 1.12, 0.95]}>
            <sphereGeometry args={[0.13, 32, 24]} />
            <meshStandardMaterial {...skin} />
          </mesh>
          <mesh position={[0, -0.055, 0.02]} scale={[0.84, 1, 1.15]}>
            <sphereGeometry args={[0.085, 24, 18]} />
            <meshStandardMaterial {...skin} />
          </mesh>

          {/* Eyes (blink by scaling this group) */}
          <group ref={eyes} position={[0, 0.008, 0]}>
            {[-1, 1].map((s) => (
              <mesh key={s} position={[s * 0.037, 0, 0.108]} scale={[1.15, 0.8, 0.55]}>
                <sphereGeometry args={[0.018, 16, 12]} />
                <meshStandardMaterial color="#f4efe8" roughness={0.25} />
              </mesh>
            ))}
            <group ref={pupils}>
              {[-1, 1].map((s) => (
                <group key={s} position={[s * 0.037, 0, 0.117]}>
                  <mesh scale={[1, 1, 0.4]}>
                    <sphereGeometry args={[0.0105, 14, 10]} />
                    <meshStandardMaterial color="#1a0d08" roughness={0.15} />
                  </mesh>
                  <mesh position={[0.0035, 0.0035, 0.004]}>
                    <sphereGeometry args={[0.0024, 8, 6]} />
                    <meshBasicMaterial color="#ffffff" toneMapped={false} />
                  </mesh>
                </group>
              ))}
            </group>
          </group>

          {/* Brows: straight, slightly thick */}
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * 0.039, 0.044, 0.11]} rotation={[0.15, s * 0.3, Math.PI / 2 - s * 0.06]}>
              <capsuleGeometry args={[0.0055, 0.026, 4, 8]} />
              <meshStandardMaterial {...hair} />
            </mesh>
          ))}

          {/* Nose */}
          <mesh position={[0, -0.004, 0.12]} rotation={[0.3, 0, 0]}>
            <capsuleGeometry args={[0.008, 0.03, 4, 10]} />
            <meshStandardMaterial {...skin} />
          </mesh>
          <mesh position={[0, -0.027, 0.124]} scale={[1.45, 0.85, 1]}>
            <sphereGeometry args={[0.012, 14, 10]} />
            <meshStandardMaterial {...skin} />
          </mesh>

          {/* Mouth: calm, closed */}
          <mesh position={[0, -0.064, 0.119]} rotation={[0, 0, Math.PI / 2]} scale={[0.6, 1, 0.5]}>
            <capsuleGeometry args={[0.008, 0.03, 4, 10]} />
            <meshStandardMaterial color="#6a3b31" roughness={0.5} />
          </mesh>

          {/* Light moustache + short goatee */}
          <mesh position={[0, -0.047, 0.121]} rotation={[0, 0, Math.PI / 2]} scale={[0.3, 1, 0.35]}>
            <capsuleGeometry args={[0.01, 0.034, 4, 8]} />
            <meshStandardMaterial {...beard} />
          </mesh>
          <mesh position={[0, -0.106, 0.09]} rotation={[0.5, 0, 0]} scale={[1, 1.1, 0.45]}>
            <sphereGeometry args={[0.019, 14, 10]} />
            <meshStandardMaterial {...beard} />
          </mesh>

          {/* Ears */}
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * 0.104, -0.005, -0.005]} scale={[0.35, 0.62, 0.45]}>
              <sphereGeometry args={[0.05, 12, 10]} />
              <meshStandardMaterial {...skin} />
            </mesh>
          ))}

          {/* Hair: short back and sides, volume on top, swept up at the front */}
          <mesh position={[0, 0.014, -0.02]} scale={[0.92, 1.05, 0.97]}>
            <sphereGeometry args={[0.12, 28, 20]} />
            <meshStandardMaterial {...hair} />
          </mesh>
          <mesh position={[0, 0.088, -0.006]} scale={[0.87, 0.58, 1.02]}>
            <sphereGeometry args={[0.12, 28, 20]} />
            <meshStandardMaterial {...hair} />
          </mesh>
          <mesh position={[0.008, 0.13, 0.052]} rotation={[-0.2, 0, -0.12]} scale={[1.2, 0.5, 1.0]}>
            <sphereGeometry args={[0.065, 20, 14]} />
            <meshStandardMaterial {...hair} />
          </mesh>
          <mesh position={[0.04, 0.115, 0.088]} rotation={[0.3, 0, -0.35]} scale={[1.15, 0.5, 0.7]}>
            <sphereGeometry args={[0.042, 16, 12]} />
            <meshStandardMaterial {...hair} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

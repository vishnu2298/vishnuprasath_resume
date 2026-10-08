"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { createGlowTexture, createLaptopScreen, createMonitorScreen } from "./screens";
import { codeSnippets } from "@/data/code";
import { worldState } from "@/lib/world";

const metal = { color: "#17171b", roughness: 0.45, metalness: 0.6 } as const;
const matte = { color: "#141417", roughness: 0.85, metalness: 0.1 } as const;

/** Curved monitor: an open cylinder arc showing the live architecture. */
function Monitor() {
  const screen = useMemo(() => createMonitorScreen(), []);
  const acc = useRef(0);
  const R = 2.4;
  const theta = 0.78;
  const height = R * theta / screen.aspect;

  useEffect(() => {
    // Viewed from the inside of the cylinder, so mirror horizontally.
    screen.texture.wrapS = THREE.RepeatWrapping;
    screen.texture.repeat.x = -1;
    screen.texture.offset.x = 1;
    screen.draw(0, 0);
    return () => screen.texture.dispose();
  }, [screen]);

  useFrame((state, dt) => {
    acc.current += dt;
    // Redraw at ~15fps — plenty for a slow diagram, and cheap.
    if (acc.current > 1 / 15) {
      acc.current = 0;
      screen.draw(state.clock.elapsedTime, worldState.scrollEnergy);
    }
  });

  return (
    <group position={[0, 1.3, -0.28 + R]}>
      <mesh>
        <cylinderGeometry args={[R, R, height, 48, 1, true, Math.PI - theta / 2, theta]} />
        <meshBasicMaterial map={screen.texture} side={THREE.BackSide} toneMapped={false} />
      </mesh>
      {/* Bezel / back shell */}
      <mesh>
        <cylinderGeometry args={[R + 0.018, R + 0.018, height + 0.04, 48, 1, true, Math.PI - theta / 2 - 0.008, theta + 0.016]} />
        <meshStandardMaterial {...metal} side={THREE.DoubleSide} />
      </mesh>
      {/* Stand */}
      <mesh position={[0, -height / 2 - 0.13, -R - 0.08]}>
        <boxGeometry args={[0.07, 0.3, 0.05]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      <mesh position={[0, -0.535, -R - 0.06]}>
        <boxGeometry args={[0.38, 0.015, 0.22]} />
        <meshStandardMaterial {...metal} />
      </mesh>
    </group>
  );
}

function Laptop() {
  const screen = useMemo(() => createLaptopScreen(codeSnippets.laptop), []);
  const acc = useRef(0);
  useEffect(() => {
    screen.draw(0);
    return () => screen.texture.dispose();
  }, [screen]);
  useFrame((state, dt) => {
    acc.current += dt;
    if (acc.current > 0.5) {
      acc.current = 0;
      screen.draw(state.clock.elapsedTime);
    }
  });
  return (
    <group position={[0.82, 0.78, 0.12]} rotation={[0, -0.45, 0]}>
      <mesh position={[0, 0.006, 0]}>
        <boxGeometry args={[0.46, 0.012, 0.32]} />
        <meshStandardMaterial color="#2a2a2f" roughness={0.35} metalness={0.7} />
      </mesh>
      <group position={[0, 0.012, -0.16]} rotation={[-0.32, 0, 0]}>
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.46, 0.3, 0.008]} />
          <meshStandardMaterial color="#2a2a2f" roughness={0.35} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.15, 0.0045]}>
          <planeGeometry args={[0.43, 0.27]} />
          <meshBasicMaterial map={screen.texture} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

/** Mechanical keyboard — keycaps are a single instanced draw call. */
function Keyboard() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const cols = 15;
  const rows = 5;
  const accentKeys = useMemo(() => new Set([0, 14, 31, 47, 62]), []);
  useEffect(() => {
    const m = new THREE.Matrix4();
    const c = new THREE.Color();
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let k = 0; k < cols; k++) {
        m.makeTranslation(-0.21 + k * 0.03, 0.012, -0.06 + r * 0.03);
        ref.current!.setMatrixAt(i, m);
        ref.current!.setColorAt(i, c.set(accentKeys.has(i) ? "#ff5a1f" : "#26262b"));
        i++;
      }
    }
    ref.current!.instanceMatrix.needsUpdate = true;
    if (ref.current!.instanceColor) ref.current!.instanceColor.needsUpdate = true;
  }, [accentKeys]);
  return (
    <group position={[-0.05, 0.765, 0.22]}>
      <mesh>
        <boxGeometry args={[0.48, 0.016, 0.17]} />
        <meshStandardMaterial color="#101013" roughness={0.6} metalness={0.4} />
      </mesh>
      <instancedMesh ref={ref} args={[undefined, undefined, cols * rows]}>
        <boxGeometry args={[0.025, 0.012, 0.025]} />
        <meshStandardMaterial roughness={0.55} />
      </instancedMesh>
    </group>
  );
}

function Lamp({ glow }: { glow: THREE.Texture }) {
  return (
    <group position={[-0.95, 0.75, -0.2]}>
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.08, 0.09, 0.02, 24]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      <mesh position={[0.04, 0.2, 0]} rotation={[0, 0, -0.35]}>
        <cylinderGeometry args={[0.008, 0.008, 0.42, 8]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      <mesh position={[0.2, 0.4, 0]} rotation={[0, 0, 1.0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.34, 8]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      <group position={[0.34, 0.33, 0]} rotation={[0, 0, 2.6]}>
        <mesh>
          <coneGeometry args={[0.07, 0.11, 24, 1, true]} />
          <meshStandardMaterial {...metal} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -0.03, 0]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshBasicMaterial color="#ffd9b0" toneMapped={false} />
        </mesh>
      </group>
      <sprite position={[0.34, 0.3, 0]} scale={[0.5, 0.5, 0.5]}>
        <spriteMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.55} />
      </sprite>
      <pointLight position={[0.36, 0.24, 0.05]} color="#ffb070" intensity={2.4} distance={2.4} decay={1.4} />
    </group>
  );
}

function Desk() {
  return (
    <group>
      <mesh position={[0, 0.735, 0]}>
        <boxGeometry args={[2.5, 0.04, 0.95]} />
        <meshStandardMaterial color="#1a1918" roughness={0.6} metalness={0.15} />
      </mesh>
      {/* Accent light strip along the front edge */}
      <mesh position={[0, 0.712, 0.476]}>
        <boxGeometry args={[2.46, 0.006, 0.006]} />
        <meshBasicMaterial color="#ff5a1f" toneMapped={false} />
      </mesh>
      {[-1.15, 1.15].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 0.36, 0.38]}>
            <boxGeometry args={[0.04, 0.72, 0.04]} />
            <meshStandardMaterial {...metal} />
          </mesh>
          <mesh position={[0, 0.36, -0.38]}>
            <boxGeometry args={[0.04, 0.72, 0.04]} />
            <meshStandardMaterial {...metal} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[0.05, 0.04, 0.85]} />
            <meshStandardMaterial {...metal} />
          </mesh>
        </group>
      ))}
      {/* Mug */}
      <mesh position={[-0.55, 0.8, 0.25]}>
        <cylinderGeometry args={[0.04, 0.037, 0.1, 20]} />
        <meshStandardMaterial color="#e8e2d8" roughness={0.5} />
      </mesh>
    </group>
  );
}

/** Server rack in the background — the infrastructure under everything. */
function ServerRack() {
  const leds = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!leds.current) return;
    leds.current.children.forEach((c, i) => {
      const m = (c as THREE.Mesh).material as THREE.MeshBasicMaterial;
      m.opacity = 0.35 + 0.65 * (Math.sin(clock.elapsedTime * (1.3 + i * 0.37) + i) > 0.2 ? 1 : 0.2);
    });
  });
  return (
    <group position={[-3.1, 0, -2.1]} rotation={[0, 0.5, 0]}>
      <mesh position={[0, 1.05, 0]}>
        <boxGeometry args={[0.7, 2.1, 0.7]} />
        <meshStandardMaterial {...matte} />
      </mesh>
      <group ref={leds}>
        {Array.from({ length: 10 }).map((_, i) => (
          <mesh key={i} position={[-0.2 + (i % 2) * 0.08, 0.3 + i * 0.17, 0.352]}>
            <planeGeometry args={[0.04, 0.012]} />
            <meshBasicMaterial color={i % 3 === 0 ? "#ff3d2e" : "#ff8a3d"} transparent toneMapped={false} />
          </mesh>
        ))}
      </group>
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[0.06, 0.3 + i * 0.17, 0.352]}>
          <planeGeometry args={[0.45, 0.004]} />
          <meshBasicMaterial color="#2a2a30" />
        </mesh>
      ))}
    </group>
  );
}

function Floor({ tier }: { tier: "high" | "low" }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -6]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#09090b" roughness={0.92} metalness={0.05} />
      </mesh>
      {tier === "high" && (
        <gridHelper args={[60, 60, "#1f1410", "#1a1210"]} position={[0, 0.002, -6]} />
      )}
    </group>
  );
}

export function Workstation({ tier }: { tier: "high" | "low" }) {
  const glow = useMemo(() => createGlowTexture(), []);
  return (
    <group>
      <Floor tier={tier} />
      <Desk />
      <Monitor />
      <Laptop />
      <Keyboard />
      <Lamp glow={glow} />
      <ServerRack />
    </group>
  );
}

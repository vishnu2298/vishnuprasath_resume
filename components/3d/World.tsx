"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { CameraRig } from "./CameraRig";
import { FrameDriver } from "./FrameDriver";
import { Workstation } from "./Workstation";
import type { Tier } from "@/lib/device";

/**
 * The background world: one quiet workstation whose monitor shows the request path I build around.
 * Loaded lazily, never blocks first paint, never receives pointer events.
 */
export default function World({ tier, reducedMotion, onReady }: { tier: Tier; reducedMotion: boolean; onReady?: () => void }) {
  const high = tier === "high";
  return (
    <Canvas
      frameloop="demand"
      dpr={high ? [1, 1.75] : [1, 1.25]}
      gl={{ antialias: high, powerPreference: "high-performance", alpha: false, stencil: false }}
      camera={{ fov: 38, near: 0.1, far: 70, position: [2.4, 1.75, 4.9] }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.0;
        onReady?.();
      }}
      aria-hidden
      tabIndex={-1}
    >
      <color attach="background" args={["#101820"]} />
      <fog attach="fog" args={["#101820", 7, 22]} />
      <FrameDriver reducedMotion={reducedMotion} />
      <CameraRig reducedMotion={reducedMotion} />

      {/* Cool, low-contrast lighting: neutral key, teal and ice rims. */}
      <hemisphereLight args={["#c9dbe6", "#0d141a", 0.35]} />
      <directionalLight position={[3, 5, 4]} intensity={0.75} color="#eef3f5" />
      <pointLight position={[2.8, 2.4, -1.6]} intensity={5} distance={9} decay={1.6} color="#63b7ae" />
      <pointLight position={[-3, 1.8, -2.6]} intensity={4} distance={8} decay={1.6} color="#a7c7d9" />
      <pointLight position={[2.9, 2.0, 2.4]} intensity={1.6} distance={4.5} decay={1.6} color="#e7eef2" />

      <Workstation tier={tier} />
    </Canvas>
  );
}

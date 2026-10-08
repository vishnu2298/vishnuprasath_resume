"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { CameraRig } from "./CameraRig";
import { FrameDriver } from "./FrameDriver";
import { Workstation } from "./Workstation";
import { Avatar } from "./Avatar";
import { AICore, Atmosphere, Constellation, DeskSymbols, FloatingCode, LabRoom, ProjectWall } from "./WorldObjects";
import type { Tier } from "@/lib/device";

/** The background world. Loaded lazily, never blocks first paint, never receives pointer events. */
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
        gl.toneMappingExposure = 1.05;
        onReady?.();
      }}
      aria-hidden
      tabIndex={-1}
    >
      <color attach="background" args={["#070709"]} />
      <fog attach="fog" args={["#070709", 8, 26]} />
      <FrameDriver reducedMotion={reducedMotion} />
      <CameraRig reducedMotion={reducedMotion} />

      {/* Lighting: low ambient, warm key, strong orange/red rims. */}
      <ambientLight intensity={0.22} color="#ffe7d6" />
      <directionalLight position={[3, 5, 4]} intensity={0.7} color="#fff1e6" />
      <pointLight position={[2.8, 2.4, -1.6]} intensity={9} distance={9} decay={1.6} color="#ff5a1f" />
      <pointLight position={[-3, 1.8, -2.6]} intensity={7} distance={8} decay={1.6} color="#ff2d1a" />
      <pointLight position={[0, 1.4, 0.8]} intensity={1.2} distance={3} decay={1.6} color="#ffd0a8" />
      <pointLight position={[2.9, 2.0, 2.4]} intensity={2.6} distance={4.5} decay={1.6} color="#ffe2c8" />

      <Workstation tier={tier} />
      <Avatar reducedMotion={reducedMotion} />
      <FloatingCode reducedMotion={reducedMotion} />
      <DeskSymbols reducedMotion={reducedMotion} />
      <Constellation count={high ? 28 : 16} />
      <ProjectWall />
      <AICore tier={tier} />
      <LabRoom />
      <Atmosphere particles={high ? 420 : 120} reducedMotion={reducedMotion} />
    </Canvas>
  );
}

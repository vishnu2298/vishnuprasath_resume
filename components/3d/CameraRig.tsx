"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { CHAPTERS, worldState, type Chapter } from "@/lib/world";

type Key = { pos: [number, number, number]; look: [number, number, number] };

/** Where the camera sits for each chapter of the page — one connected world. */
const desktop: Record<Chapter, Key> = {
  hero: { pos: [2.1, 1.8, 5.7], look: [-1.0, 1.2, 0] },
  journey: { pos: [0.95, 1.5, 2.1], look: [-0.45, 1.25, -0.4] },
  stack: { pos: [0.6, 5.0, 1.6], look: [0.5, 6.5, -5] },
  backend: { pos: [-1.8, 2.7, 3.3], look: [0.3, 1.0, -0.3] },
  build: { pos: [-5.0, 2.3, 1.8], look: [-9, 2, -5] },
  systems: { pos: [-6.6, 2.1, -0.4], look: [-9.6, 2, -6.2] },
  problems: { pos: [-2.2, 3.6, 5.2], look: [0, 1, -2] },
  architecture: { pos: [0, 7, 6.5], look: [0, 1, -3] },
  principles: { pos: [3.2, 2.6, 4.2], look: [0, 1.2, 0] },
  ai: { pos: [4.6, 2.7, 0.9], look: [8, 2.4, -5] },
  experience: { pos: [2.4, 1.8, 5.6], look: [-0.2, 1.15, 0] },
  lab: { pos: [0, 2.3, -7.2], look: [0, 1.8, -13] },
  contact: { pos: [0, 3.2, 9.8], look: [0, 1.7, -6] },
};

/** Portrait screens: keep the scene in the upper half so hero text below stays clear. */
const portraitOverrides: Partial<Record<Chapter, Key>> = {
  hero: { pos: [0.75, 2.3, 9.4], look: [0.9, -0.75, 0] },
  journey: { pos: [0.6, 1.6, 3.4], look: [0, 1.0, -0.4] },
  ai: { pos: [6.2, 2.6, 2.6], look: [8, 2.0, -5] },
  lab: { pos: [0, 2.4, -5.6], look: [0, 1.4, -13] },
  contact: { pos: [0, 3.6, 13], look: [0, 1.4, -6] },
};

const tmpPos = new THREE.Vector3();
const tmpLook = new THREE.Vector3();
const a = new THREE.Vector3();
const b = new THREE.Vector3();

function keyFor(i: number, portrait: boolean): Key {
  const c = CHAPTERS[Math.max(0, Math.min(CHAPTERS.length - 1, i))];
  return (portrait && portraitOverrides[c]) || desktop[c];
}

export function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const look = useRef(new THREE.Vector3(-1.15, 1.15, 0));
  const first = useRef(true);

  useFrame((_, dt) => {
    const portrait = size.width / size.height < 0.9;
    const f = worldState.chapter;
    const i = Math.floor(f);
    const t = f - i;
    const k0 = keyFor(i, portrait);
    const k1 = keyFor(i + 1, portrait);

    tmpPos.copy(a.fromArray(k0.pos)).lerp(b.fromArray(k1.pos), t);
    tmpLook.copy(a.fromArray(k0.look)).lerp(b.fromArray(k1.look), t);

    if (!reducedMotion) {
      // Subtle parallax: the camera drifts with the pointer, never enough to lose the subject.
      tmpPos.x += worldState.mouseX * 0.22;
      tmpPos.y += worldState.mouseY * 0.12;
    }

    if (reducedMotion || first.current) {
      camera.position.copy(tmpPos);
      look.current.copy(tmpLook);
      first.current = false;
    } else {
      const d = Math.min(dt, 0.1);
      const lambda = 3.2;
      camera.position.x = THREE.MathUtils.damp(camera.position.x, tmpPos.x, lambda, d);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, tmpPos.y, lambda, d);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, tmpPos.z, lambda, d);
      look.current.x = THREE.MathUtils.damp(look.current.x, tmpLook.x, lambda, d);
      look.current.y = THREE.MathUtils.damp(look.current.y, tmpLook.y, lambda, d);
      look.current.z = THREE.MathUtils.damp(look.current.z, tmpLook.z, lambda, d);
    }
    camera.lookAt(look.current);
    worldState.scrollEnergy = Math.max(0, worldState.scrollEnergy - dt * 0.8);
  });

  return null;
}

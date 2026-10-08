/**
 * Shared, mutable world state read by the 3D scene every frame.
 * Kept outside React on purpose: scroll/mouse updates must never trigger re-renders.
 */
export const CHAPTERS = [
  "hero",
  "journey",
  "stack",
  "backend",
  "build",
  "systems",
  "problems",
  "architecture",
  "principles",
  "ai",
  "experience",
  "lab",
  "contact",
] as const;

export type Chapter = (typeof CHAPTERS)[number];

export const worldState = {
  /** Continuous chapter position: 2.0 = sitting in "stack", 2.5 = halfway to "backend". */
  chapter: 0,
  /** Normalized pointer, -1..1. */
  mouseX: 0,
  mouseY: 0,
  /** Decays toward 0; spikes while scrolling. Used to pulse architecture nodes. */
  scrollEnergy: 0,
  /** >0 while an interactive in-section canvas is on screen; the background world pauses. */
  pauseCount: 0,
};

export const chapterIndex = (c: Chapter) => CHAPTERS.indexOf(c);

type Listener = (c: Chapter) => void;
const listeners = new Set<Listener>();
let activeChapter: Chapter = "hero";

export function setActiveChapter(c: Chapter) {
  if (c === activeChapter) return;
  activeChapter = c;
  listeners.forEach((l) => l(c));
}
export function subscribeChapter(l: Listener) {
  listeners.add(l);
  return () => void listeners.delete(l);
}
export const getActiveChapter = () => activeChapter;

type PauseListener = (paused: boolean) => void;
const pauseListeners = new Set<PauseListener>();
export function changePause(delta: 1 | -1) {
  worldState.pauseCount = Math.max(0, worldState.pauseCount + delta);
  pauseListeners.forEach((l) => l(worldState.pauseCount > 0));
}
export function subscribePause(l: PauseListener) {
  pauseListeners.add(l);
  return () => void pauseListeners.delete(l);
}

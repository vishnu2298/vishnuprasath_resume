import * as THREE from "three";

export const ACCENT = "#ff5a1f";
export const ACCENT_2 = "#ff3d2e";
export const AMBER = "#ffb36b";
export const INK = "#0b0b0e";

function fontFamily(kind: "mono" | "sans") {
  if (typeof window === "undefined") return kind === "mono" ? "monospace" : "sans-serif";
  const v = getComputedStyle(document.documentElement).getPropertyValue(kind === "mono" ? "--font-mono" : "--font-sans");
  return `${v.trim() || ""}${v.trim() ? ", " : ""}${kind === "mono" ? "ui-monospace, monospace" : "system-ui, sans-serif"}`;
}

export function makeCanvas(w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  return { canvas, ctx };
}

export function toTexture(canvas: HTMLCanvasElement) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.generateMipmaps = true;
  return tex;
}

/** A pill-shaped text label, returned with its aspect so sprites keep proportions. */
export function makeLabel(
  text: string,
  opts: { color?: string; bg?: string; border?: string; size?: number; weight?: number; mono?: boolean } = {},
) {
  const size = opts.size ?? 44;
  const pad = size * 0.6;
  const font = `${opts.weight ?? 600} ${size}px ${fontFamily(opts.mono ? "mono" : "sans")}`;
  const probe = makeCanvas(8, 8).ctx;
  probe.font = font;
  const w = Math.ceil(probe.measureText(text).width + pad * 2);
  const h = Math.ceil(size * 1.9);
  const { canvas, ctx } = makeCanvas(w, h);
  if (opts.bg) {
    roundRect(ctx, 2, 2, w - 4, h - 4, h / 2 - 2);
    ctx.fillStyle = opts.bg;
    ctx.fill();
    if (opts.border) {
      ctx.lineWidth = 3;
      ctx.strokeStyle = opts.border;
      ctx.stroke();
    }
  }
  ctx.font = font;
  ctx.fillStyle = opts.color ?? "#f2efe9";
  ctx.textBaseline = "middle";
  ctx.fillText(text, pad, h / 2 + 2);
  return { texture: toTexture(canvas), aspect: w / h };
}

export function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Very small syntax colorizer for the illustrative code panels. */
const KEYWORDS = /^(const|await|async|return|export|function|new|import|from)$/;
export function drawCode(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  x: number,
  y: number,
  size: number,
  lineHeight = 1.55,
  maxLines = lines.length,
) {
  ctx.font = `500 ${size}px ${fontFamily("mono")}`;
  ctx.textBaseline = "top";
  lines.slice(0, maxLines).forEach((line, i) => {
    const ly = y + i * size * lineHeight;
    ctx.fillStyle = "rgba(255,255,255,0.22)";
    ctx.fillText(String(i + 1).padStart(2, " "), x, ly);
    let cx = x + size * 2;
    if (line.trim().startsWith("//")) {
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.fillText(line, cx, ly);
      return;
    }
    // Tokenize into keyword / string / other chunks.
    const parts = line.split(/(\b(?:const|await|async|return|export|function|new|import|from)\b|'[^']*')/g);
    for (const p of parts) {
      if (!p) continue;
      if (KEYWORDS.test(p)) ctx.fillStyle = ACCENT;
      else if (p.startsWith("'")) ctx.fillStyle = AMBER;
      else if (/\w+\(/.test(p) || /\.\w+/.test(p)) ctx.fillStyle = "#f2efe9";
      else ctx.fillStyle = "rgba(242,239,233,0.78)";
      ctx.fillText(p, cx, ly);
      cx += ctx.measureText(p).width;
    }
  });
}

export { fontFamily };

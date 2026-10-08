import { ACCENT, AMBER, drawCode, fontFamily, makeCanvas, roundRect, toTexture } from "@/lib/canvasTexture";
import { monitorArchitecture } from "@/data/code";

/** The curved monitor: a live, slowly animated backend architecture. */
export function createMonitorScreen() {
  const W = 1280;
  const H = 540;
  const { canvas, ctx } = makeCanvas(W, H);
  const texture = toTexture(canvas);
  const nodes = monitorArchitecture;
  const logs = [
    "GET  /products?q=...        → 200",
    "POST /recommendations/user  → 200",
    "es.search(products)         → hits",
    "queue: enrich.product       → done",
    "GET  /compare/:id           → 200",
    "external.search(intent)     → ok",
  ];

  function draw(time: number, energy: number) {
    ctx.fillStyle = "#08080b";
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "rgba(255,255,255,0.035)";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Title bar
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.fillRect(0, 0, W, 48);
    ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(28 + i * 22, 24, 6, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    ctx.font = `500 18px ${fontFamily("mono")}`;
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.textBaseline = "middle";
    ctx.fillText("system.architecture — live", 110, 25);
    ctx.fillStyle = ACCENT;
    ctx.fillText("● running", W - 140, 25);

    // Snake layout: 4 on top row → 3 on bottom row (right to left).
    const positions = nodes.map((_, i) => {
      if (i < 4) return { x: 160 + i * 320, y: 170 };
      return { x: 160 + (6 - i) * 320 + 160, y: 360 };
    });

    const pulse = (time * 0.35) % 1; // travels the whole chain
    const seg = pulse * (nodes.length - 1);

    // Edges
    for (let i = 0; i < nodes.length - 1; i++) {
      const p = positions[i];
      const q = positions[i + 1];
      ctx.strokeStyle = "rgba(255,120,60,0.35)";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 8]);
      ctx.lineDashOffset = -time * 30;
      ctx.beginPath();
      if (p.y === q.y) {
        ctx.moveTo(p.x + 110, p.y);
        ctx.lineTo(q.x - 110 * Math.sign(q.x - p.x), q.y);
      } else {
        ctx.moveTo(p.x, p.y + 42);
        ctx.bezierCurveTo(p.x + 140, p.y + 90, q.x + 140, q.y - 90, q.x + 60, q.y - 42);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      if (Math.floor(seg) === i) {
        const t = seg - i;
        const px = p.y === q.y ? p.x + (q.x - p.x) * t : p.x + (q.x + 60 - p.x) * t;
        const py = p.y + (q.y - p.y) * t;
        const g = ctx.createRadialGradient(px, py, 0, px, py, 26);
        g.addColorStop(0, "rgba(255,180,120,1)");
        g.addColorStop(1, "rgba(255,90,31,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, 26, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Nodes
    nodes.forEach((label, i) => {
      const { x, y } = positions[i];
      const near = Math.max(0, 1 - Math.abs(seg - i) * 1.4);
      const glow = Math.min(1, near + energy * 0.8);
      roundRect(ctx, x - 110, y - 42, 220, 84, 16);
      ctx.fillStyle = `rgba(${18 + glow * 40},${16 + glow * 10},${16},0.95)`;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = `rgba(255,${110 + glow * 60},${60},${0.35 + glow * 0.65})`;
      ctx.stroke();
      ctx.font = `600 22px ${fontFamily("sans")}`;
      ctx.fillStyle = glow > 0.5 ? "#fff" : "rgba(242,239,233,0.85)";
      ctx.textAlign = "center";
      ctx.fillText(label, x, y + 1);
      ctx.textAlign = "start";
    });

    // Log ticker
    ctx.fillStyle = "rgba(255,255,255,0.03)";
    ctx.fillRect(0, H - 76, W, 76);
    ctx.font = `500 16px ${fontFamily("mono")}`;
    const start = Math.floor(time * 0.8);
    for (let i = 0; i < 2; i++) {
      const line = logs[(start + i) % logs.length];
      ctx.fillStyle = i === 1 ? AMBER : "rgba(255,255,255,0.45)";
      ctx.fillText(line, 30, H - 54 + i * 26);
    }
    texture.needsUpdate = true;
  }

  return { texture, draw, aspect: W / H };
}

/** A code panel with a glassy background (transparent canvas). */
export function createCodePanel(lines: string[], title: string, w = 900, lineCount = lines.length) {
  const size = 30;
  const h = 90 + lineCount * size * 1.55 + 40;
  const { canvas, ctx } = makeCanvas(w, h);
  roundRect(ctx, 2, 2, w - 4, h - 4, 26);
  ctx.fillStyle = "rgba(14,14,18,0.82)";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255,120,60,0.45)";
  ctx.stroke();
  ctx.font = `500 22px ${fontFamily("mono")}`;
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.textBaseline = "middle";
  ctx.fillText(title, 34, 42);
  ctx.fillStyle = ACCENT;
  ctx.beginPath();
  ctx.arc(w - 40, 42, 7, 0, Math.PI * 2);
  ctx.fill();
  drawCode(ctx, lines, 30, 86, size);
  return { texture: toTexture(canvas), aspect: w / h };
}

/** Laptop editor screen with a blinking cursor. */
export function createLaptopScreen(lines: string[]) {
  const W = 1024;
  const H = 640;
  const { canvas, ctx } = makeCanvas(W, H);
  const texture = toTexture(canvas);
  function draw(time: number) {
    ctx.fillStyle = "#0b0b0f";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.fillRect(0, 0, 180, H);
    ctx.font = `500 18px ${fontFamily("mono")}`;
    ctx.textBaseline = "top";
    ["services/", "  search.ts", "  reco.ts", "workers/", "  enrich.ts", "routes/", "  products.ts"].forEach((f, i) => {
      ctx.fillStyle = i === 1 ? ACCENT : "rgba(255,255,255,0.4)";
      ctx.fillText(f, 20, 30 + i * 30);
    });
    drawCode(ctx, lines, 200, 30, 21, 1.6);
    if (Math.floor(time * 2) % 2 === 0) {
      ctx.fillStyle = ACCENT;
      ctx.fillRect(200 + 21 * 2 + 21 * 0.6 * 28, 30 + 5 * 21 * 1.6, 11, 24);
    }
    texture.needsUpdate = true;
  }
  return { texture, draw };
}

/** Card faces for floating world panels (projects wall, lab). */
export function createCardFace(opts: {
  index?: string;
  title: string;
  subtitle?: string;
  tag?: string;
  tagColor?: string;
  lines?: string[];
  w?: number;
  h?: number;
}) {
  const W = opts.w ?? 640;
  const H = opts.h ?? 820;
  const { canvas, ctx } = makeCanvas(W, H);
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "rgba(28,26,30,0.92)");
  g.addColorStop(1, "rgba(12,12,15,0.92)");
  roundRect(ctx, 3, 3, W - 6, H - 6, 34);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(255,120,60,0.4)";
  ctx.stroke();

  ctx.textBaseline = "top";
  if (opts.index) {
    ctx.font = `800 120px ${fontFamily("sans")}`;
    ctx.fillStyle = "rgba(255,90,31,0.9)";
    ctx.fillText(opts.index, 44, 40);
  }
  if (opts.tag) {
    ctx.font = `600 24px ${fontFamily("mono")}`;
    const tw = ctx.measureText(opts.tag).width;
    roundRect(ctx, 44, opts.index ? 190 : 50, tw + 36, 46, 23);
    ctx.fillStyle = opts.tagColor ?? "rgba(255,90,31,0.18)";
    ctx.fill();
    ctx.fillStyle = "#ffd2b8";
    ctx.fillText(opts.tag, 62, (opts.index ? 190 : 50) + 11);
  }
  ctx.font = `800 54px ${fontFamily("sans")}`;
  ctx.fillStyle = "#f4f1ec";
  const titleY = opts.index ? 270 : 130;
  wrap(ctx, opts.title.toUpperCase(), 44, titleY, W - 88, 60).forEach((l, i) => ctx.fillText(l, 44, titleY + i * 60));
  if (opts.subtitle) {
    ctx.font = `400 26px ${fontFamily("sans")}`;
    ctx.fillStyle = "rgba(242,239,233,0.6)";
    wrap(ctx, opts.subtitle, 44, 0, W - 88, 36)
      .slice(0, 5)
      .forEach((l, i) => ctx.fillText(l, 44, H - 300 + i * 36));
  }
  (opts.lines ?? []).slice(0, 4).forEach((l, i) => {
    ctx.font = `500 22px ${fontFamily("mono")}`;
    ctx.fillStyle = i === 0 ? ACCENT : "rgba(255,255,255,0.4)";
    ctx.fillText(`→ ${l}`, 44, H - 120 + i * 30 - (opts.lines!.length - 1) * 0);
  });
  return { texture: toTexture(canvas), aspect: W / H };
}

function wrap(ctx: CanvasRenderingContext2D, text: string, _x: number, _y: number, maxW: number, _lh: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

/** Soft radial glow used for lamps, cores and the horizon. */
export function createGlowTexture(inner = "rgba(255,150,90,1)", outer = "rgba(255,60,30,0)") {
  const { canvas, ctx } = makeCanvas(256, 256);
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, inner);
  g.addColorStop(0.35, "rgba(255,90,31,0.35)");
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return toTexture(canvas);
}

import { ACCENT, ICE, drawCode, fontFamily, makeCanvas, roundRect, toTexture } from "@/lib/canvasTexture";
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
    ctx.fillStyle = "#0d151b";
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "rgba(167,199,217,0.04)";
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
    ctx.fillStyle = "rgba(167,199,217,0.05)";
    ctx.fillRect(0, 0, W, 48);
    [0, 1, 2].forEach((i) => {
      ctx.fillStyle = "#3a4852";
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(28 + i * 22, 24, 6, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    ctx.font = `500 18px ${fontFamily("mono")}`;
    ctx.fillStyle = "rgba(167,199,217,0.6)";
    ctx.textBaseline = "middle";
    ctx.fillText("request path · search + recommendations", 110, 25);
    ctx.fillStyle = ACCENT;
    ctx.fillText("healthy", W - 110, 25);

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
      ctx.strokeStyle = "rgba(99,183,174,0.35)";
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
        g.addColorStop(0, "rgba(214,240,236,1)");
        g.addColorStop(1, "rgba(99,183,174,0)");
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
      ctx.fillStyle = `rgba(${19 + glow * 8},${29 + glow * 26},${37 + glow * 18},0.96)`;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = `rgba(99,183,174,${0.25 + glow * 0.6})`;
      ctx.stroke();
      ctx.font = `600 22px ${fontFamily("sans")}`;
      ctx.fillStyle = glow > 0.5 ? "#f1f2ee" : "rgba(241,242,238,0.8)";
      ctx.textAlign = "center";
      ctx.fillText(label, x, y + 1);
      ctx.textAlign = "start";
    });

    // Log ticker
    ctx.fillStyle = "rgba(167,199,217,0.04)";
    ctx.fillRect(0, H - 76, W, 76);
    ctx.font = `500 16px ${fontFamily("mono")}`;
    const start = Math.floor(time * 0.8);
    for (let i = 0; i < 2; i++) {
      const line = logs[(start + i) % logs.length];
      ctx.fillStyle = i === 1 ? ICE : "rgba(167,199,217,0.45)";
      ctx.fillText(line, 30, H - 54 + i * 26);
    }
    texture.needsUpdate = true;
  }

  return { texture, draw, aspect: W / H };
}

/** Laptop editor screen with a blinking cursor. */
export function createLaptopScreen(lines: string[]) {
  const W = 1024;
  const H = 640;
  const { canvas, ctx } = makeCanvas(W, H);
  const texture = toTexture(canvas);
  function draw(time: number) {
    ctx.fillStyle = "#0d151b";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(167,199,217,0.05)";
    ctx.fillRect(0, 0, 180, H);
    ctx.font = `500 18px ${fontFamily("mono")}`;
    ctx.textBaseline = "top";
    ["services/", "  search.ts", "  reco.ts", "workers/", "  enrich.ts", "routes/", "  products.ts"].forEach((f, i) => {
      ctx.fillStyle = i === 1 ? ACCENT : "rgba(167,199,217,0.45)";
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

/** Soft radial glow used for the desk lamp. */
export function createGlowTexture(inner = "rgba(246,239,226,1)", outer = "rgba(246,239,226,0)") {
  const { canvas, ctx } = makeCanvas(256, 256);
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, inner);
  g.addColorStop(0.35, inner.replace(/[\d.]+\)$/, "0.3)"));
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return toTexture(canvas);
}

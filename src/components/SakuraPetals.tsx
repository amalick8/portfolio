"use client";

import { useEffect, useRef } from "react";

const COLORS: [number, number, number][] = [
  [220, 100, 135], [238, 148, 175], [250, 190, 210],
  [255, 215, 228], [205,  75, 110], [245, 170, 195],
  [255, 230, 240], [200,  90, 130],
];

const LAYERS = [
  { sizeMin: 10, sizeMax: 16, speedMin: 0.90, speedMax: 1.50, opMin: 0.78, opMax: 0.95, wind: 1.4, count: 16 },
  { sizeMin:  7, sizeMax: 11, speedMin: 0.58, speedMax: 0.95, opMin: 0.52, opMax: 0.78, wind: 1.0, count: 21 },
  { sizeMin:  4, sizeMax:  7, speedMin: 0.32, speedMax: 0.55, opMin: 0.28, opMax: 0.52, wind: 0.6, count: 13 },
] as const;

// ─── Pre-built unit Path2D — created ONCE, reused every frame ────────────────
const PETAL_PATH = (() => {
  const p = new Path2D();
  p.moveTo(0, -1.05);
  p.bezierCurveTo( 0.78, -0.58,  0.82, 0.48, 0,  1.0);
  p.bezierCurveTo(-0.82,  0.48, -0.78, -0.58, 0, -1.05);
  p.closePath();
  return p;
})();

// ─── Spawn origins — all at y≈0 (nav/menu bar), spread across full width ─────
const ORIGINS: [number, number, number][] = [
  [0.08, 0.0, 1.5], [0.20, 0.0, 2.0], [0.33, 0.0, 2.8],
  [0.46, 0.0, 3.5], [0.57, 0.0, 4.0], [0.69, 0.0, 3.2],
  [0.81, 0.0, 2.5], [0.92, 0.0, 1.8],
];
const ORIGIN_TOTAL = ORIGINS.reduce((s, o) => s + o[2], 0);

function pickOrigin(W: number, _H: number) {
  let r = Math.random() * ORIGIN_TOTAL;
  for (const [nx, , w] of ORIGINS) {
    r -= w;
    if (r <= 0) return { x: nx * W + (Math.random() - 0.5) * 32, y: (Math.random() - 0.5) * 5 };
  }
  return { x: ORIGINS[0][0] * W, y: 0 };
}

type Petal = {
  x: number; y: number; vx: number; vy: number;
  angle: number; av: number;
  size: number; opacity: number;
  r: number; g: number; b: number;
  layer: number; windPhase: number; windResp: number;
  isBlossom: boolean;
};


function drawLoose(ctx: CanvasRenderingContext2D, p: Petal) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.angle);
  ctx.scale(p.size, p.size);
  ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.opacity})`;
  ctx.fill(PETAL_PATH);
  ctx.restore();
}

function drawBlossom(ctx: CanvasRenderingContext2D, p: Petal) {
  const s = p.size;
  // All 5 petals in a single beginPath/fill — no save/restore per petal
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const ang = p.angle + (i / 5) * Math.PI * 2;
    const ox = p.x + Math.sin(ang) * s * 0.60;
    const oy = p.y - Math.cos(ang) * s * 0.60;
    ctx.moveTo(ox + s * 0.28, oy);
    ctx.ellipse(ox, oy, s * 0.28, s * 0.50, ang + Math.PI / 2, 0, Math.PI * 2);
  }
  ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.opacity})`;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(p.x, p.y, s * 0.18, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255,240,175,${p.opacity * 0.95})`;
  ctx.fill();
}

function makePetal(W: number, H: number, li: number, initialY = false): Petal {
  const L = LAYERS[li];
  const [r, g, b] = COLORS[Math.floor(Math.random() * COLORS.length)];
  const o = pickOrigin(W, H);
  return {
    x: o.x,
    y: initialY ? Math.random() * H * 1.1 : o.y,
    vx: (Math.random() - 0.5) * 0.5,
    vy: L.speedMin + Math.random() * (L.speedMax - L.speedMin),
    angle:   Math.random() * Math.PI * 2,
    av:      (Math.random() - 0.5) * 0.018,
    size:    L.sizeMin + Math.random() * (L.sizeMax - L.sizeMin),
    opacity: L.opMin  + Math.random() * (L.opMax - L.opMin),
    r, g, b,
    layer: li, windPhase: Math.random() * Math.PI * 2, windResp: L.wind,
    isBlossom: Math.random() < 0.45,
  };
}

export default function SakuraPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = window.innerWidth, H = window.innerHeight;

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width  = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();

    const petals: Petal[] = [];
    LAYERS.forEach((L, li) => { for (let i = 0; i < L.count; i++) petals.push(makePetal(W, H, li, true)); });

let windVx = -0.18, windTarget = -0.18, gustCooldown = 0;
    const mouse = { x: -9999, y: -9999 };
    const onMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    document.addEventListener("mousemove", onMouse);
    document.addEventListener("mouseleave", onLeave);

    // Scroll velocity — petals rush down when user scrolls, float up when scrolling back
    let prevScrollY = window.scrollY;
    let scrollVel   = 0;

    // Branch petal spawns — petals fall from section-edge blossom positions
    const onBranchPetal = (e: Event) => {
      const { x, y } = (e as CustomEvent<{ x: number; y: number }>).detail;
      const li = Math.floor(Math.random() * LAYERS.length);
      const L  = LAYERS[li];
      const [r, g, b] = COLORS[Math.floor(Math.random() * COLORS.length)];
      petals.push({
        x: x + (Math.random() - 0.5) * 22,
        y: y + (Math.random() - 0.5) * 12,
        vx: (Math.random() - 0.5) * 0.9,
        vy: L.speedMin + Math.random() * (L.speedMax - L.speedMin),
        angle:    Math.random() * Math.PI * 2,
        av:       (Math.random() - 0.5) * 0.018,
        size:     L.sizeMin + Math.random() * (L.sizeMax - L.sizeMin),
        opacity:  L.opMin  + Math.random() * (L.opMax - L.opMin),
        r, g, b,
        layer: li, windPhase: Math.random() * Math.PI * 2, windResp: L.wind,
        isBlossom: li === 0 && Math.random() < 0.25,
      });
      // Prevent the pool growing unbounded — trim oldest if over soft cap
      const softCap = LAYERS.reduce((s, l) => s + l.count, 0) + 40;
      if (petals.length > softCap) petals.splice(0, petals.length - softCap);
    };
    window.addEventListener("sakura:branch-petal", onBranchPetal);

    let lastT = 0, raf: number;

    const tick = (t: number) => {
      const dt = Math.min(t - lastT, 50);
      lastT = t;

      // Track scroll velocity for petal rush effect
      const curScrollY = window.scrollY;
      const rawVel = (curScrollY - prevScrollY) / Math.max(dt, 1); // px/ms
      scrollVel += (rawVel - scrollVel) * 0.18;  // smoothed
      prevScrollY = curScrollY;

      gustCooldown -= dt;
      if (gustCooldown <= 0) {
        windTarget = -0.10 - Math.random() * 0.55;
        gustCooldown = 3200 + Math.random() * 4000;
        setTimeout(() => { windTarget = -0.10 - Math.random() * 0.18; }, 1300 + Math.random() * 700);
      }
      windVx += (windTarget - windVx) * 0.011;

      // Boost when scrolling down — never negative so petals always fall forward
      const scrollBoost = Math.max(0, Math.min(1.8, scrollVel * 40));

      ctx.clearRect(0, 0, W, H);

for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.windPhase += 0.011 * (0.6 + p.layer * 0.2);
        const sway = Math.sin(p.windPhase) * 0.42 * p.windResp;
        p.vx += (windVx * p.windResp + sway - p.vx) * 0.038;
        p.vx  = Math.max(-2.2, Math.min(2.2, p.vx));

        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14400 && d2 > 0.1) {
          const d = Math.sqrt(d2);
          const f = 8500 / d2;
          p.vx += (dx / d) * f * 0.13;
          p.vy += (dy / d) * f * 0.06;
        }

        // Apply scroll boost (all layers, proportional to wind response)
        const boost = scrollBoost * (0.5 + p.windResp * 0.35);
        p.vx *= 0.979;
        p.vy = p.vy * 0.989 + 0.004 + Math.max(0, boost * 0.015);
        p.x += p.vx; p.y += p.vy; p.angle += p.av;

        if (p.y > H + 26) {
          window.dispatchEvent(new CustomEvent("sakura:land", {
            detail: { x: p.x, size: p.size, r: p.r, g: p.g, b: p.b, isBlossom: p.isBlossom },
          }));
          petals[i] = makePetal(W, H, p.layer, false);
          continue;
        }
        if (p.x < -55)    p.x = W + 44;
        if (p.x > W + 55) p.x = -44;

        if (p.isBlossom) drawBlossom(ctx, p);
        else             drawLoose(ctx, p);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMouse);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("sakura:branch-petal", onBranchPetal);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }} />;
}

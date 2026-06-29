"use client";

import { useRef, useEffect } from "react";

const COLORS: [number, number, number][] = [
  [255, 210, 225], [255, 190, 210], [245, 168, 192],
  [255, 235, 243], [230, 155, 182], [255, 220, 233],
  [210, 135, 168], [255, 245, 250], [250, 178, 205],
];

const SPRING_K_X = 0.038;
const SPRING_K_Y = 0.022;
const GRAVITY    = 0.28;
const DAMPING    = 0.82;
const REPEL_R    = 120;
const REPEL_STR  = 5500;
const REPEL_MIN_D2 = 1600; // clamp minimum d to 40px — prevents explosion in dense piles

const COUNT    = 5000;
const POOL_MAX = 12000;

const FLOOR_TOP = 0.82; // pile = bottom 18% of Contact section

const POOL_PATH = (() => {
  const p = new Path2D();
  p.moveTo(0, -1.0);
  p.bezierCurveTo( 0.80, -0.56,  0.84, 0.46, 0,  0.96);
  p.bezierCurveTo(-0.84,  0.46, -0.80, -0.56, 0, -1.0);
  p.closePath();
  return p;
})();

type P = {
  rx: number; ry: number;
  x: number;  y: number;
  vx: number; vy: number;
  angle: number; av: number;
  size: number;
  r: number; g: number; b: number;
  depth: number;
  isBlossom: boolean;
};

function seed(i: number, W: number, H: number): P {
  const [r, g, b] = COLORS[Math.floor(Math.random() * COLORS.length)];
  const ry    = H * (FLOOR_TOP + Math.random() * (1 - FLOOR_TOP));
  const rx    = W * (Math.random() * 1.04 - 0.02); // slightly beyond edges so pile looks full
  const depth = Math.max(0, Math.min(1, (ry / H - FLOOR_TOP) / (1 - FLOOR_TOP)));
  return {
    rx, ry, x: rx, y: ry, vx: 0, vy: 0,
    angle: Math.random() * Math.PI * 2,
    av: (Math.random() - 0.5) * 0.002,
    size: 10 + Math.random() * 13,
    r, g, b, depth,
    isBlossom: i % 5 === 0,
  };
}

function drawGroundPetal(ctx: CanvasRenderingContext2D, p: P) {
  const scY = 0.14;
  const op  = 0.88;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.angle);
  ctx.scale(p.size, p.size * scY);
  ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${op})`;
  ctx.fill(POOL_PATH);
  ctx.restore();
}

function drawGroundBlossom(ctx: CanvasRenderingContext2D, p: P) {
  const s   = p.size;
  const scY = 0.14;
  const op  = 0.88;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const ang = p.angle + (i / 5) * Math.PI * 2;
    const ox = p.x + Math.sin(ang) * s * 0.58;
    const oy = p.y - Math.cos(ang) * s * 0.58 * scY;
    ctx.moveTo(ox + s * 0.25, oy);
    ctx.ellipse(ox, oy, s * 0.25, s * 0.44 * scY, ang + Math.PI / 2, 0, Math.PI * 2);
  }
  ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${op})`;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(p.x, p.y, s * 0.16, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255,242,178,${op * 0.9})`;
  ctx.fill();
}

export default function SakuraPool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    const petals: P[] = [];
    const mouse = { x: -9999, y: -9999 };

    const buildAndSort = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width  = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      if (petals.length === 0) {
        for (let i = 0; i < COUNT; i++) petals.push(seed(i, W, H));
      } else {
        const base = Math.min(petals.length, COUNT);
        for (let i = 0; i < base; i++) {
          const n = seed(i, W, H);
          petals[i].rx = n.rx; petals[i].ry = n.ry;
          petals[i].depth = n.depth; petals[i].size = n.size;
        }
      }
      petals.sort((a, b) => a.ry - b.ry);
    };
    buildAndSort();

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    document.addEventListener("mousemove", onMouse);
    document.addEventListener("mouseleave", onLeave);

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      for (const p of petals) {
        let ax = (p.rx - p.x) * SPRING_K_X;
        let ay = (p.ry - p.y) * SPRING_K_Y;
        if (p.y < p.ry) ay += GRAVITY;

        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < REPEL_R * REPEL_R && d2 > 1) {
          const d = Math.sqrt(d2);
          const f = REPEL_STR / Math.max(d2, REPEL_MIN_D2);
          ax += (dx / d) * f;
          ay += (dy / d) * f * 0.70;
        }

        p.vx = p.vx * DAMPING + ax;
        p.vy = p.vy * DAMPING + ay;
        p.x += p.vx; p.y += p.vy; p.angle += p.av;

        if (p.y > H - 1) { p.y = H - 1; p.vy = 0; }

        if (p.isBlossom) drawGroundBlossom(ctx, p);
        else             drawGroundPetal(ctx, p);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Permanently add landed petals — pile grows over time
    const onLand = (e: Event) => {
      if (petals.length >= POOL_MAX || H === 0) return;
      const { x: vpX, size, r, g, b, isBlossom } = (e as CustomEvent).detail;
      const rect = canvas.getBoundingClientRect();
      const localX = vpX - rect.left;
      if (localX < -size || localX > W + size) return;

      // Land only in the lower 55% of the pile band — adds density without raising the top
      const bandStart = FLOOR_TOP + (1 - FLOOR_TOP) * 0.45;
      const ry = H * (bandStart + Math.random() * (1 - bandStart));
      const depth = Math.max(0, Math.min(1, (ry / H - FLOOR_TOP) / (1 - FLOOR_TOP)));

      petals.push({
        rx: localX, ry,
        x: localX, y: ry,
        vx: 0, vy: 0,
        angle: Math.random() * Math.PI * 2,
        av: (Math.random() - 0.5) * 0.002,
        size: size * (0.9 + depth * 0.2), r, g, b, depth, isBlossom,
      });
    };
    window.addEventListener("sakura:land", onLand);

    const ro = new ResizeObserver(buildAndSort);
    ro.observe(canvas.parentElement!);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMouse);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("sakura:land", onLand);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }} />;
}

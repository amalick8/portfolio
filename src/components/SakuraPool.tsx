"use client";

import { useRef, useEffect } from "react";

const COLORS: [number, number, number][] = [
  [255, 210, 225], [255, 190, 210], [245, 168, 192],
  [255, 235, 243], [230, 155, 182], [255, 220, 233],
  [210, 135, 168], [255, 245, 250], [250, 178, 205],
];

const SPRING_K_X = 0.028;
const SPRING_K_Y = 0.014;
const GRAVITY    = 0.22;
const DAMPING    = 0.82;
const REPEL_R    = 160;
const REPEL_STR  = 36000;
const COUNT      = 320;

// Pre-built unit petal Path2D — created once, reused every frame
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
  depth: number;   // 0 = far/top, 1 = near/bottom
  isBlossom: boolean;
};

function seed(i: number, W: number, H: number): P {
  const [r, g, b] = COLORS[Math.floor(Math.random() * COLORS.length)];
  const rand = Math.random();

  // Extreme bottom concentration — dense pile at the floor
  let ry: number;
  if      (rand < 0.82) ry = H * (0.78 + Math.random() * 0.20);  // main pile: 78–98%
  else if (rand < 0.94) ry = H * (0.60 + Math.random() * 0.18);  // mid: 60–78%
  else                  ry = H * (0.20 + Math.random() * 0.40);  // scattered: 20–60%

  const rx    = W * (0.01 + Math.random() * 0.98);
  const depth = Math.max(0, Math.min(1, (ry / H - 0.55) / 0.45));

  return {
    rx, ry, x: rx, y: ry, vx: 0, vy: 0,
    angle: Math.random() * Math.PI * 2,
    av: (Math.random() - 0.5) * 0.004,
    size: 9 + depth * 12 + Math.random() * 6,  // 9–27px — largest at bottom
    r, g, b, depth,
    isBlossom: i % 6 === 0,
  };
}

function drawGroundPetal(ctx: CanvasRenderingContext2D, p: P) {
  // Ground-plane: compress Y to simulate petals lying flat
  const scY = 0.28 + p.depth * 0.22;
  const op  = 0.42 + p.depth * 0.54;
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
  const scY = 0.28 + p.depth * 0.22;
  const op  = 0.42 + p.depth * 0.54;
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
        petals.forEach((p, i) => {
          const n = seed(i, W, H);
          p.rx = n.rx; p.ry = n.ry; p.depth = n.depth; p.size = n.size;
        });
      }
      // Sort ONCE by rest-y (painter's algorithm) — bottom petals drawn last = on top
      petals.sort((a, b) => a.ry - b.ry);
    };
    buildAndSort();

    // Document-level mouse: convert viewport → canvas-local coords
    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    document.addEventListener("mousemove", onMouse);
    document.addEventListener("mouseleave", onLeave);

    // ── Incoming petals: handed off from SakuraPetals when they hit the floor ──
    type Incoming = {
      x: number; y: number; vy: number; vx: number;
      angle: number; av: number;
      size: number; r: number; g: number; b: number;
      targetRy: number;
    };
    const incoming: Incoming[] = [];

    const onLand = (e: Event) => {
      const { x: vpX, size, r, g, b } = (e as CustomEvent).detail;
      const rect = canvas.getBoundingClientRect();
      if (rect.height === 0) return;
      const localX = vpX - rect.left;
      // Clamp to canvas bounds
      if (localX < -20 || localX > W + 20) return;
      // Pick a rest-y in the main pile zone as the landing target
      const targetRy = H * (0.78 + Math.random() * 0.20);
      incoming.push({
        x: localX + (Math.random() - 0.5) * 30,
        y: -size,                        // start just above canvas
        vy: 1.5 + Math.random() * 1.0,
        vx: (Math.random() - 0.5) * 0.8,
        angle: Math.random() * Math.PI * 2,
        av: (Math.random() - 0.5) * 0.03,
        size, r, g, b,
        targetRy,
      });
    };
    window.addEventListener("sakura:land", onLand);

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      // ── Draw settled pool ──────────────────────────────────────────────────
      for (const p of petals) {
        let ax = (p.rx - p.x) * SPRING_K_X;
        let ay = (p.ry - p.y) * SPRING_K_Y;
        if (p.y < p.ry) ay += GRAVITY;

        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < REPEL_R * REPEL_R && d2 > 1) {
          const d = Math.sqrt(d2);
          const f = REPEL_STR / d2;
          ax += (dx / d) * f;
          ay += (dy / d) * f * 0.70;
        }

        p.vx = p.vx * DAMPING + ax;
        p.vy = p.vy * DAMPING + ay;
        p.x += p.vx; p.y += p.vy; p.angle += p.av;

        if (p.isBlossom) drawGroundBlossom(ctx, p);
        else             drawGroundPetal(ctx, p);
      }

      // ── Animate incoming petals falling from above ─────────────────────────
      for (let i = incoming.length - 1; i >= 0; i--) {
        const inc = incoming[i];
        inc.vy += 0.28;          // gravity
        inc.vx *= 0.97;          // air resistance
        inc.y  += inc.vy;
        inc.x  += inc.vx;
        inc.angle += inc.av;

        if (inc.y >= inc.targetRy) {
          // Settled — give nearby pool petals a tiny ripple impulse
          for (const p of petals) {
            const ddx = p.rx - inc.x;
            if (Math.abs(ddx) < 50) {
              p.vy -= 0.4 * (1 - Math.abs(ddx) / 50);
              p.vx += ddx > 0 ? 0.2 : -0.2;
            }
          }
          incoming.splice(i, 1);
          continue;
        }

        // Draw the incoming petal using same ground-plane style
        const depth = Math.max(0, Math.min(1, (inc.targetRy / H - 0.55) / 0.45));
        const scY   = 0.28 + depth * 0.22;
        const op    = 0.55 + depth * 0.40;
        ctx.save();
        ctx.translate(inc.x, inc.y);
        ctx.rotate(inc.angle);
        ctx.scale(inc.size, inc.size * scY);
        ctx.fillStyle = `rgba(${inc.r},${inc.g},${inc.b},${op})`;
        ctx.fill(POOL_PATH);
        ctx.restore();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

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

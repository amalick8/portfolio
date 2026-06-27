"use client";

import { useRef, useEffect } from "react";

function rng(seed: number) {
  const s = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

// Kanji pairs that mirror the portfolio themes:
// 建築 = architecture  創造 = creation  道 = the way  革新 = innovation  出口 = exit
// Alternating left/right x so they feel hand-placed, not mechanical
const GLYPHS = [
  { char: "建", x: 62,  size: 94,  alpha: 0.46, progStart: 0.03, progEnd: 0.11 },
  { char: "築", x: 150, size: 78,  alpha: 0.38, progStart: 0.08, progEnd: 0.17 },
  { char: "創", x: 56,  size: 88,  alpha: 0.44, progStart: 0.18, progEnd: 0.27 },
  { char: "造", x: 154, size: 80,  alpha: 0.40, progStart: 0.25, progEnd: 0.34 },
  { char: "道", x: 68,  size: 100, alpha: 0.48, progStart: 0.37, progEnd: 0.46 },
  { char: "革", x: 148, size: 82,  alpha: 0.39, progStart: 0.44, progEnd: 0.53 },
  { char: "新", x: 60,  size: 90,  alpha: 0.43, progStart: 0.55, progEnd: 0.64 },
  { char: "出", x: 152, size: 76,  alpha: 0.41, progStart: 0.66, progEnd: 0.75 },
  { char: "口", x: 66,  size: 86,  alpha: 0.45, progStart: 0.77, progEnd: 0.85 },
] as const;

const FONT = `"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", "MS Mincho", serif`;

export default function InkBrushScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number | null>(null);
  const lastP     = useRef(-1);

  // Force redraw once web fonts finish loading
  useEffect(() => {
    document.fonts.ready.then(() => { lastP.current = -1; });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const W   = 240;

    const resize = () => {
      const H = window.innerHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.height = H + "px";
      lastP.current = -1;
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      animRef.current = requestAnimationFrame(render);
      // Read scroll progress directly — no Lenis event binding needed
      const scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const prog = window.scrollY / scrollMax;
      if (Math.abs(prog - lastP.current) < 0.0008) return;
      lastP.current = prog;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const H = window.innerHeight;
      const N = GLYPHS.length;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.fillStyle   = "#1c0f0b";
      ctx.strokeStyle = "#1c0f0b";

      GLYPHS.forEach((g, i) => {
        const t = clamp01((prog - g.progStart) / (g.progEnd - g.progStart));
        if (t <= 0) return;

        // Distribute characters evenly across viewport height
        const y = (H / N) * (i + 0.5);

        // The clip rect grows from top to bottom — simulates brush writing downward
        const charHalf = g.size * 0.62;
        const fullH    = g.size * 1.24;
        const revealH  = fullH * t;
        const clipTop  = y - charHalf;

        // ── Draw character inside growing clip ──
        ctx.save();
        ctx.beginPath();
        ctx.rect(g.x - g.size * 0.72, clipTop, g.size * 1.44, revealH);
        ctx.clip();

        // Opacity: fade in gently as it reveals, per-glyph alpha variation
        ctx.globalAlpha = g.alpha * (0.6 + 0.4 * t);
        ctx.font = `700 ${g.size}px ${FONT}`;
        ctx.textAlign    = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(g.char, g.x, y);

        ctx.restore();

        // ── Ink drip at the bottom edge, visible while writing ──
        if (t > 0.06 && t < 0.90) {
          const dripSeed = i * 41 + 3;
          const dripY    = clipTop + revealH;
          const dripR    = (2.2 + rng(dripSeed) * 2.8) * (1 - t * 0.75);
          ctx.globalAlpha = g.alpha * 0.65;
          ctx.beginPath();
          ctx.ellipse(
            g.x + (rng(dripSeed + 1) - 0.5) * 18,
            dripY + dripR * 1.4,
            dripR * 0.6,
            dripR,
            0, 0, Math.PI * 2
          );
          ctx.fill();
        }

        // ── Ink spray micro-dots (brush flicking off the end) ──
        // appear as the reveal nears completion, then fade
        if (t > 0.55 && t < 0.90) {
          const sprayFade = 1 - (t - 0.55) / 0.35;
          for (let s = 0; s < 5; s++) {
            const seed  = i * 200 + s * 13;
            const angle = rng(seed) * Math.PI * 2;
            const dist  = 10 + rng(seed + 1) * 22;
            ctx.globalAlpha = g.alpha * 0.45 * sprayFade * rng(seed + 2);
            ctx.beginPath();
            ctx.arc(
              g.x + Math.cos(angle) * dist,
              y  + Math.sin(angle) * dist * 0.45,
              0.8 + rng(seed + 3) * 2.2,
              0, Math.PI * 2
            );
            ctx.fill();
          }
        }

        // ── Dried ink halo — faint ghost that lingers after character is written ──
        if (t >= 0.90) {
          const haloAlpha = g.alpha * 0.18 * (t - 0.90) / 0.10;
          ctx.globalAlpha = haloAlpha;
          ctx.font = `700 ${g.size * 1.06}px ${FONT}`;
          ctx.textAlign    = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(g.char, g.x + 1.5, y + 1.5);
        }
      });

      ctx.restore();
    };

    animRef.current = requestAnimationFrame(render);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        width: "240px",
        zIndex: 1,
      }}
    />
  );
}

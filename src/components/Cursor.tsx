"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = window.innerWidth, H = window.innerHeight;

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width  = W * dpr; canvas.height = H * dpr;
      canvas.style.width  = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();

    let mx = -999, my = -999;
    let bx = -999, by = -999;
    let visible = false;
    let isLink = false;
    let targetR = 10, currentR = 10;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      visible = true;
      const el = document.elementFromPoint(mx, my) as HTMLElement | null;
      isLink = !!el?.closest('a, button, [data-cursor="link"]');
    };
    const onLeave = () => { visible = false; };
    const onEnter = () => { visible = true; };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      if (visible && mx > -900) {
        if (bx < -900) { bx = mx; by = my; }
        bx += (mx - bx) * 0.85;
        by += (my - by) * 0.85;

        targetR = isLink ? 16 : 10;
        currentR += (targetR - currentR) * 0.12;

        // Outer ring
        ctx.beginPath();
        ctx.arc(bx, by, currentR, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(201,80,122,0.75)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Center dot
        ctx.beginPath();
        ctx.arc(bx, by, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(201,80,122,0.90)";
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
}

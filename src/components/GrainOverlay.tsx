"use client";

import { useEffect, useRef } from "react";

export default function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 300;
    const H = 300;
    canvas.width = W;
    canvas.height = H;

    let frame = 0;
    let animId: number;

    function render() {
      frame++;
      // Regenerate noise every 3 frames for that classic cinematic grain flicker
      if (frame % 3 === 0) {
        const imageData = ctx!.createImageData(W, H);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const val = (Math.random() * 255) | 0;
          data[i] = val;
          data[i + 1] = val;
          data[i + 2] = val;
          data[i + 3] = 28;
        }
        ctx!.putImageData(imageData, 0, 0);
      }
      animId = requestAnimationFrame(render);
    }

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9998] will-change-transform"
      style={{
        width: "100vw",
        height: "100vh",
        opacity: 0.038,
        mixBlendMode: "overlay",
      }}
    />
  );
}

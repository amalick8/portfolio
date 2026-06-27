"use client";

import { useEffect, useRef } from "react";

export default function SakuraWipeOverlay() {
  const ref = useRef<HTMLDivElement>(null);
  const running = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = () => {
      if (running.current) return;
      running.current = true;

      const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
      const DUR  = 480;

      // Sweep in: right clip 100% → 0% (panel enters from left)
      el.style.transition = `clip-path ${DUR}ms ${EASE}`;
      el.style.clipPath    = "inset(0 0% 0 0)";

      setTimeout(() => {
        // Sweep out: left clip 0% → 100% (panel exits to right)
        el.style.transition = `clip-path ${DUR}ms ${EASE}`;
        el.style.clipPath    = "inset(0 0% 0 100%)";

        setTimeout(() => {
          // Reset to initial hidden state (from left, ready for next wipe)
          el.style.transition = "none";
          el.style.clipPath    = "inset(0 100% 0 0)";
          running.current = false;
        }, DUR + 20);
      }, DUR + 40);
    };

    window.addEventListener("sakura:wipe", trigger);
    return () => window.removeEventListener("sakura:wipe", trigger);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        background: "#c9507a",
        clipPath: "inset(0 100% 0 0)",
        zIndex: 200,
        pointerEvents: "none",
      }}
    />
  );
}

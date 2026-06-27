"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export default function SakuraWipeTrigger() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const lastFired = useRef(0);

  useEffect(() => {
    if (!isInView) return;
    const now = Date.now();
    // 1.5s cooldown prevents double-fire on slight scroll jitter
    if (now - lastFired.current < 1500) return;
    lastFired.current = now;
    window.dispatchEvent(new CustomEvent("sakura:wipe"));
  }, [isInView]);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{ height: "2px", overflow: "hidden", pointerEvents: "none" }}
    />
  );
}

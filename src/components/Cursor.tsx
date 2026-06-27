"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorType = "default" | "link" | "drag";

export default function Cursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [visible, setVisible] = useState(false);

  // Outer ring — laggy
  const outerX = useSpring(mouseX, { stiffness: 140, damping: 18, mass: 0.4 });
  const outerY = useSpring(mouseY, { stiffness: 140, damping: 18, mass: 0.4 });

  // Inner dot — snappy
  const innerX = useSpring(mouseX, { stiffness: 900, damping: 50 });
  const innerY = useSpring(mouseY, { stiffness: 900, damping: 50 });

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      // Detect cursor type from data-cursor attribute
      const target = e.target as HTMLElement;
      const el = target.closest("[data-cursor]");
      const type = (el?.getAttribute("data-cursor") as CursorType) ?? "default";
      setCursorType(type);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY, visible]);

  const outerSize = cursorType === "link" ? 56 : cursorType === "drag" ? 72 : 36;
  const showLabel = cursorType === "drag";

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-white flex items-center justify-center"
        style={{
          x: outerX,
          y: outerY,
          width: outerSize,
          height: outerSize,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
          opacity: visible ? 1 : 0,
        }}
        animate={{ width: outerSize, height: outerSize }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {showLabel && (
          <span className="text-white text-[8px] font-mono uppercase tracking-widest select-none">
            drag
          </span>
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full bg-white"
        style={{
          x: innerX,
          y: innerY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  );
}

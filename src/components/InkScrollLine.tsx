"use client";

import { useScroll, useSpring, useTransform, motion } from "framer-motion";

export default function InkScrollLine() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 28, restDelta: 0.001 });
  const tipY = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  return (
    <div className="fixed left-7 top-20 bottom-20 pointer-events-none z-20 hidden lg:block w-px">
      {/* Static background track */}
      <div className="absolute inset-0 bg-ink/8 rounded-full" />

      {/* Animated ink fill — grows from top as you scroll */}
      <motion.div
        className="absolute top-0 left-0 w-full rounded-full origin-top"
        style={{
          scaleY,
          height: "100%",
          background:
            "linear-gradient(180deg, var(--color-accent-deep) 0%, var(--color-accent) 55%, var(--color-accent-soft) 100%)",
          opacity: 0.65,
        }}
      />

      {/* Ink brush tip — the moving dot */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[7px] h-[7px] -ml-[3px] rounded-full"
        style={{
          top: tipY,
          background: "var(--color-accent)",
          boxShadow: "0 0 10px var(--color-accent-soft), 0 0 4px var(--color-accent)",
          opacity: 0.9,
        }}
      />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

interface Props {
  className?: string;
  delay?: number;
  color?: string;
  width?: "full" | "auto";
}

export default function BrushstrokeUnderline({
  className = "",
  delay = 0,
  color = "var(--color-accent)",
  width = "full",
}: Props) {
  return (
    <div
      className={`overflow-visible ${width === "full" ? "w-full" : ""} ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 400 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        style={{ height: "0.55em", display: "block" }}
        preserveAspectRatio="none"
      >
        {/* Main thick brushstroke */}
        <motion.path
          d="M3,15 C40,7 100,20 180,13 C240,8 300,18 397,12"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.88 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Thin secondary stroke — slightly offset, ink drag texture */}
        <motion.path
          d="M3,19 C70,13 150,21 230,16 C300,11 355,19 397,16"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.38 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1.25, delay: delay + 0.08, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Fine ink splatter at end of stroke */}
        <motion.circle
          cx="394"
          cy="12"
          r="2"
          fill={color}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: delay + 0.9 }}
        />
        <motion.circle
          cx="399"
          cy="16"
          r="1.2"
          fill={color}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.35 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: delay + 1.0 }}
        />
      </svg>
    </div>
  );
}

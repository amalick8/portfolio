"use client";

import { motion } from "framer-motion";

export type LogoVariant = "stamp" | "underline" | "monogram";

export default function LogoMark({ variant }: { variant: LogoVariant }) {
  if (variant === "stamp") {
    return (
      <motion.span
        className="relative grid size-10 place-items-center rounded-[0.42rem] border-2 border-accent text-accent"
        whileHover={{ rotate: -4, scale: 1.06 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
        aria-label="AM home"
      >
        <motion.span
          className="absolute inset-[-5px] rounded-[0.58rem] border border-accent/20"
          initial={{ opacity: 0, scale: 0.84 }}
          animate={{ opacity: [0, 0.45, 0], scale: [0.84, 1.18, 1.34] }}
          transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 0.8 }}
        />
        <span className="font-display text-[1.15rem] italic leading-none">AM</span>
      </motion.span>
    );
  }

  if (variant === "monogram") {
    return (
      <motion.span
        className="relative inline-grid h-10 w-12 place-items-center"
        whileHover={{ y: -1 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        aria-label="AM home"
      >
        <span className="absolute inset-0 rounded-full bg-accent/10 blur-md" />
        <svg viewBox="0 0 48 40" className="relative h-9 w-11" aria-hidden="true">
          <path
            d="M8 31 L16 9 L24 31 L32 9 L40 31"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 18 H34 M12 25 H36"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.82"
          />
        </svg>
      </motion.span>
    );
  }

  return (
    <span className="relative inline-flex pb-1 font-display italic text-2xl tracking-tight">
      am.
      <motion.svg
        viewBox="0 0 52 8"
        className="absolute -bottom-1 left-0 h-2 w-full text-accent"
        aria-hidden="true"
      >
        <motion.path
          d="M2 5 C12 2, 22 7, 31 4 S44 2, 50 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.svg>
    </span>
  );
}

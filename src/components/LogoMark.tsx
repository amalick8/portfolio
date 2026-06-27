"use client";

import { motion } from "framer-motion";

export type LogoVariant = "stamp" | "underline" | "monogram";

export default function LogoMark({ variant }: { variant: LogoVariant }) {
  if (variant === "stamp") {
    return (
      <motion.span
        className="inline-flex"
        whileHover={{ rotate: 8, scale: 1.12 }}
        whileTap={{ scale: 0.88, rotate: 3 }}
        transition={{ type: "spring", stiffness: 280, damping: 16 }}
        aria-label="AM home"
      >
        <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true" style={{ overflow: "visible" }}>
          <defs>
            <filter id="hk-ink" x="-14%" y="-14%" width="128%" height="128%">
              <feTurbulence type="fractalNoise" baseFrequency="0.062" numOctaves="5" seed="11" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.8" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          {/* Outer rough circle */}
          <circle cx="22" cy="22" r="19.5" fill="none" stroke="#c9507a" strokeWidth="2.2" filter="url(#hk-ink)" />
          {/* Inner thin ring */}
          <circle cx="22" cy="22" r="16" fill="none" stroke="#c9507a" strokeWidth="0.7" opacity="0.32" filter="url(#hk-ink)" />
          {/* Horizontal rule lines */}
          <line x1="6" y1="22" x2="11" y2="22" stroke="#c9507a" strokeWidth="1" opacity="0.38" />
          <line x1="33" y1="22" x2="38" y2="22" stroke="#c9507a" strokeWidth="1" opacity="0.38" />
          {/* AM italic */}
          <text
            x="22" y="27"
            textAnchor="middle"
            fontFamily="Georgia,'Times New Roman',serif"
            fontStyle="italic"
            fontSize="13.5"
            fill="#c9507a"
            letterSpacing="1.5"
          >AM</text>
          {/* Top/bottom accent dots */}
          <circle cx="22" cy="4" r="1.6" fill="#c9507a" opacity="0.38" />
          <circle cx="22" cy="40" r="1.6" fill="#c9507a" opacity="0.38" />
        </svg>
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

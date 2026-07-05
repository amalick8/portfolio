"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type LogoVariant = "stamp" | "underline" | "monogram";

export default function LogoMark({
  variant,
  glyph = "AM",
}: {
  variant: LogoVariant;
  glyph?: string;
}) {
  // A hanko never presses the same twice — randomize the impression once per
  // page load. Applied after mount so the SSR markup stays deterministic.
  const [press, setPress] = useState({ rot: 0, seed: 11, ink: 1 });
  useEffect(() => {
    setPress({
      rot: (Math.random() - 0.5) * 6, // ±3° off-axis, like a hand press
      seed: Math.floor(Math.random() * 90) + 2, // unique ink-edge texture
      ink: 0.9 + Math.random() * 0.1, // slight ink-coverage variance
    });
  }, []);

  if (variant === "stamp") {
    const isKanji = glyph !== "AM";
    return (
      <motion.span
        className="inline-flex"
        animate={{ rotate: press.rot }}
        whileHover={{ rotate: 8, scale: 1.12 }}
        whileTap={{ scale: 0.86, rotate: 2 }}
        transition={{ type: "spring", stiffness: 280, damping: 16 }}
        aria-label="AM home"
      >
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          aria-hidden="true"
          style={{ overflow: "visible", opacity: press.ink }}
        >
          <defs>
            <filter id="hk-ink" x="-14%" y="-14%" width="128%" height="128%">
              <feTurbulence type="fractalNoise" baseFrequency="0.062" numOctaves="5" seed={press.seed} result="noise" />
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
          {/* Ink flash — a fresh press of colour whenever the glyph changes */}
          <motion.circle
            key={`flash-${glyph}`}
            cx="22"
            cy="22"
            r="15"
            fill="#c9507a"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.16, 0] }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          {/* Section glyph — re-stamped on change */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.g
              key={glyph}
              initial={{ opacity: 0, scale: 1.45 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.72 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              <text
                x="22"
                y={isKanji ? 27.5 : 27}
                textAnchor="middle"
                fontFamily={
                  isKanji
                    ? "'Hiragino Mincho ProN','Yu Mincho','Noto Serif JP',Georgia,serif"
                    : "Georgia,'Times New Roman',serif"
                }
                fontStyle={isKanji ? "normal" : "italic"}
                fontSize={isKanji ? 16 : 13.5}
                fill="#c9507a"
                letterSpacing={isKanji ? 0 : 1.5}
              >
                {glyph}
              </text>
            </motion.g>
          </AnimatePresence>
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

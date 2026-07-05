"use client";

import { useRef } from "react";
import { useScroll, useVelocity, useSpring, useMotionValueEvent } from "framer-motion";

const TICKER_TEXT =
  "SALES ENGINEERING · UTA HONORS · 3.95 GPA · AI + FULL-STACK · VANCOUVER, BC · DALLAS, TX · OPEN TO WORK · ";

export default function Marquee() {
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const isPaused1 = useRef(false);
  const isPaused2 = useRef(false);

  const { scrollY } = useScroll();
  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, { damping: 50, stiffness: 400 });

  useMotionValueEvent(smoothVelocity, "change", (v) => {
    // Duration: clamp between 8s (fast scroll) and 28s (no scroll)
    const speed = Math.abs(v) / 400;
    const duration = Math.max(8, 28 - speed * 20);
    const skew = (v / 500) * -4; // max ±4deg

    if (track1Ref.current) {
      track1Ref.current.style.animationDuration = `${duration}s`;
      track1Ref.current.style.transform = `skewX(${skew}deg)`;
    }
    if (track2Ref.current) {
      track2Ref.current.style.animationDuration = `${duration * 1.4}s`;
      track2Ref.current.style.transform = `skewX(${skew * 0.6}deg)`;
    }
  });

  const pauseAll = () => {
    isPaused1.current = true;
    isPaused2.current = true;
    if (track1Ref.current) track1Ref.current.style.animationPlayState = "paused";
    if (track2Ref.current) track2Ref.current.style.animationPlayState = "paused";
  };

  const resumeAll = () => {
    isPaused1.current = false;
    isPaused2.current = false;
    if (track1Ref.current) track1Ref.current.style.animationPlayState = "running";
    if (track2Ref.current) track2Ref.current.style.animationPlayState = "running";
  };

  return (
    <div
      className="overflow-hidden border-t border-line py-2 select-none bg-bg marquee-mask"
      onMouseEnter={pauseAll}
      onMouseLeave={resumeAll}
    >
      {/* Primary track — forward */}
      <div
        ref={track1Ref}
        className="flex whitespace-nowrap will-change-transform"
        style={{ animation: "marquee 28s linear infinite", transition: "transform 0.3s ease" }}
      >
        <span className="shrink-0 font-display text-[5rem] sm:text-[7rem] leading-none tracking-tight text-ink/[0.07] pr-16">
          {TICKER_TEXT}
        </span>
        <span className="shrink-0 font-display text-[5rem] sm:text-[7rem] leading-none tracking-tight text-ink/[0.07] pr-16">
          {TICKER_TEXT}
        </span>
      </div>

      {/* Secondary track — reverse, slower, smaller */}
      <div
        ref={track2Ref}
        className="flex whitespace-nowrap will-change-transform mt-1"
        style={{
          animation: "marquee-reverse 40s linear infinite",
          transition: "transform 0.3s ease",
        }}
      >
        <span className="shrink-0 font-display text-[2.5rem] sm:text-[3.5rem] leading-none tracking-tight text-ink/[0.04] pr-16">
          {TICKER_TEXT}
        </span>
        <span className="shrink-0 font-display text-[2.5rem] sm:text-[3.5rem] leading-none tracking-tight text-ink/[0.04] pr-16">
          {TICKER_TEXT}
        </span>
      </div>
    </div>
  );
}

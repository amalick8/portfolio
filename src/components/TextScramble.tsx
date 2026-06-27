"use client";

import { useCallback, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%";

interface TextScrambleProps {
  text: string;
  className?: string;
  triggerOnMount?: boolean;
}

export default function TextScramble({ text, className = "" }: TextScrambleProps) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<number | null>(null);
  const iterRef = useRef(0);

  const scramble = useCallback(() => {
    iterRef.current = 0;
    const totalFrames = text.replace(/\s/g, "").length * 2.5;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const step = () => {
      const iter = iterRef.current;
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " " || char === "·" || char === "—") return char;
            if (i < iter / 2.5) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iterRef.current += 1;
      if (iter < totalFrames) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(text);
      }
    };
    step();
  }, [text]);

  return (
    <span onMouseEnter={scramble} className={`${className} cursor-pointer`}>
      {display}
    </span>
  );
}

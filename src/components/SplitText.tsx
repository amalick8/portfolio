"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  stagger?: number;
  duration?: number;
  colorWords?: Record<string, string>; // word → CSS color
  accentClassName?: string; // extra class applied to colored words
}

export default function SplitText({
  text,
  className = "",
  as: Tag = "h2",
  delay = 0,
  stagger = 0.055,
  duration = 0.75,
  colorWords = {},
  accentClassName = "",
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-10% 0px" });

  // Split on spaces, preserving the space as a word separator
  const words = text.split(" ");

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement>}
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => {
        const color = colorWords[word];
        return (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            style={{ marginRight: "0.28em", paddingBottom: "0.18em", marginBottom: "-0.18em" }}
          >
            <motion.span
              className={`inline-block${color && accentClassName ? ` ${accentClassName}` : ''}`}
              initial={{ y: "115%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : {}}
              transition={{
                duration,
                delay: delay + i * stagger,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={color && !accentClassName ? { color } : undefined}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}

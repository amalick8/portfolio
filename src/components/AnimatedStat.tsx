"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

function parseValue(raw: string) {
  const match = raw.match(/^([^\d]*)([\d,]+\.?\d*)(.*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const num = parseFloat(numStr.replace(/,/g, ""));
  if (Number.isNaN(num)) return null;
  const hasComma = numStr.includes(",");
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix, num, suffix, hasComma, decimals };
}

export default function AnimatedStat({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState<string>("0");
  const parsed = parseValue(value);

  useEffect(() => {
    if (!inView || !parsed) return;
    const controls = animate(0, parsed.num, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        const fixed = latest.toFixed(parsed.decimals);
        const withCommas = parsed.hasComma
          ? Number(fixed).toLocaleString(undefined, {
              minimumFractionDigits: parsed.decimals,
              maximumFractionDigits: parsed.decimals,
            })
          : fixed;
        setDisplay(`${parsed.prefix}${withCommas}${parsed.suffix}`);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {parsed ? display : value}
    </motion.span>
  );
}

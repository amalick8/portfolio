"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const BARK = "#3a1520";
const PINK = {
  light: "#fce4ef",
  soft:  "#f5b8d0",
  mid:   "#e8709a",
  deep:  "#d44a7a",
};
const BD = { ease: [0.4, 0, 0.2, 1] as const };
const TE = [0.16, 1, 0.3, 1] as const;

function B({ cx, cy, r, color, d = 0 }: { cx: number; cy: number; r: number; color: string; d?: number }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
      transition={{ duration: 0.6, delay: d, ease: TE }}
    >
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx={cx} cy={cy - r * 0.70}
          rx={r * 0.42} ry={r * 0.62}
          fill={color} opacity={0.9}
          transform={`rotate(${a}, ${cx}, ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.20} fill="#f9f0b0" opacity={0.95} />
    </motion.g>
  );
}

function P({ d: path, w, delay }: { d: string; w: number; delay: number }) {
  return (
    <motion.path
      d={path}
      stroke={BARK}
      strokeWidth={w}
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ ...BD, duration: 1.4, delay }}
    />
  );
}

// SVG user-space coords of SECONDARY branch blossoms only (not main trunk).
// Sub-branch A: [216,200],[232,212] · Sub-branch B: [264,76],[278,90] · Twig from A: [270,158],[282,172]
const SECONDARY_BLOSSOMS: [number, number][] = [
  [216, 200], [232, 212],
  [264,  76], [278,  90],
  [270, 158], [282, 172],
];

/** A decorative branch that enters from one side of a section. */
export default function SakuraBranchDecor({ side }: { side: "left" | "right" }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const flip = side === "right" ? "scale(-1,1)" : undefined;
  const origin = side === "right" ? "280px center" : undefined;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const svgEl = el.querySelector("svg") as SVGSVGElement | null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let isVisible = false;

    const spawnPetal = () => {
      if (!isVisible || !svgEl) return;
      const ctm = svgEl.getScreenCTM();
      if (!ctm) return;

      const [sx, sy] = SECONDARY_BLOSSOMS[Math.floor(Math.random() * SECONDARY_BLOSSOMS.length)];
      const pt = svgEl.createSVGPoint();
      pt.x = sx; pt.y = sy;
      // getScreenCTM handles scaling and position; CSS scale(-1,1) flip is not in CTM,
      // so mirror x manually for right-side branches (flip axis = 280px in viewBox).
      const screen = pt.matrixTransform(ctm);
      let vx = screen.x;
      if (side === "right") {
        const origin = svgEl.createSVGPoint();
        origin.x = 280; origin.y = 0;
        const originScreen = origin.matrixTransform(ctm);
        vx = 2 * originScreen.x - screen.x;
      }

      if (screen.y >= 0 && screen.y <= window.innerHeight) {
        window.dispatchEvent(new CustomEvent("sakura:branch-petal", { detail: { x: vx, y: screen.y } }));
      }
      timeoutId = setTimeout(spawnPetal, 1800 + Math.random() * 2400);
    };

    const obs = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !timeoutId) {
        timeoutId = setTimeout(spawnPetal, 600 + Math.random() * 1200);
      } else if (!isVisible && timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    }, { threshold: 0.05 });

    obs.observe(el);
    return () => {
      obs.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [side]);

  return (
    <div
      ref={containerRef}
      className={`absolute top-0 ${side === "left" ? "left-0" : "right-0"} w-[260px] sm:w-[320px] h-full pointer-events-none`}
      style={{ zIndex: 0 }}
      aria-hidden
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 280 600"
        fill="none"
        overflow="visible"
        preserveAspectRatio="xMidYMid meet"
        style={{ transform: flip, transformOrigin: origin }}
      >
        {/* Main branch: enters from left edge mid-height, curves up-right */}
        <P d="M -12,520 C 30,450 80,360 130,270 C 170,195 210,130 252,68" w={14} delay={0.1} />

        {/* Sub-branch A: from mid-trunk, goes upper-right */}
        <P d="M 130,270 C 158,240 188,218 218,204" w={8} delay={0.5} />

        {/* Sub-branch B: near top, splits off */}
        <P d="M 210,132 C 230,112 250,96 266,80" w={7} delay={0.6} />

        {/* Twig from A */}
        <P d="M 218,204 C 238,186 256,172 272,162" w={4.5} delay={0.75} />

        {/* Twig up from tip */}
        <P d="M 252,68 C 262,48 268,28 268,8" w={5} delay={0.65} />

        {/* Blossoms — top cluster */}
        <B cx={250} cy={64}  r={26} color={PINK.soft}  d={1.0} />
        <B cx={268} cy={80}  r={20} color={PINK.light} d={1.1} />
        <B cx={234} cy={80}  r={17} color={PINK.mid}   d={1.2} />
        <B cx={268} cy={8}   r={18} color={PINK.light} d={1.15} />
        <B cx={254} cy={20}  r={14} color={PINK.soft}  d={1.25} />

        {/* Blossoms — B split cluster */}
        <B cx={264} cy={76}  r={20} color={PINK.mid}   d={1.05} />
        <B cx={278} cy={90}  r={15} color={PINK.light} d={1.18} />

        {/* Blossoms — A cluster */}
        <B cx={216} cy={200} r={22} color={PINK.light} d={1.05} />
        <B cx={232} cy={212} r={16} color={PINK.soft}  d={1.18} />

        {/* Blossoms — twig cluster */}
        <B cx={270} cy={158} r={19} color={PINK.mid}   d={1.1} />
        <B cx={282} cy={172} r={14} color={PINK.light} d={1.24} />

        {/* Scattered along trunk */}
        <B cx={196} cy={168} r={17} color={PINK.soft}  d={1.14} />
        <B cx={160} cy={220} r={15} color={PINK.light} d={1.20} />
        <B cx={110} cy={322} r={16} color={PINK.soft}  d={1.28} />

        {/* Loose petals */}
        {([
          [178, 310, 25,  PINK.light, 1.4],
          [94,  390, -18, PINK.soft,  1.44],
          [228, 248, 40,  PINK.mid,   1.48],
          [142, 196, -30, PINK.light, 1.52],
          [60,  440, 22,  PINK.soft,  1.56],
        ] as [number, number, number, string, number][]).map(([cx, cy, angle, color, delay], i) => (
          <motion.ellipse
            key={i}
            cx={cx} cy={cy} rx={8} ry={12}
            fill={color} opacity={0}
            transform={`rotate(${angle}, ${cx}, ${cy})`}
            whileInView={{ opacity: 0.72 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay, ease: TE }}
          />
        ))}
      </svg>
    </div>
  );
}

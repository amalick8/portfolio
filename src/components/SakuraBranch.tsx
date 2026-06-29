"use client";

import { motion } from "framer-motion";

const BARK = "#3a1520";
const T_EASE = [0.16, 1, 0.3, 1] as const;
const BD = { ease: [0.4, 0, 0.2, 1] as const };

const PINK = {
  light: "#fce4ef",
  soft:  "#f5b8d0",
  mid:   "#e8709a",
  deep:  "#d44a7a",
};

interface BlossomProps {
  cx: number; cy: number; r: number; color: string; delay?: number;
}

function Blossom({ cx, cy, r, color, delay = 0 }: BlossomProps) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
      transition={{ duration: 0.65, delay, ease: T_EASE }}
    >
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx={cx}
          cy={cy - r * 0.70}
          rx={r * 0.42}
          ry={r * 0.62}
          fill={color}
          opacity={0.92}
          transform={`rotate(${a}, ${cx}, ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.20} fill="#f9f0b0" opacity={0.95} />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <circle
          key={a}
          cx={cx + Math.cos((a * Math.PI) / 180) * r * 0.40}
          cy={cy + Math.sin((a * Math.PI) / 180) * r * 0.40}
          r={r * 0.065}
          fill="#c8902a"
          opacity={0.80}
        />
      ))}
    </motion.g>
  );
}

export default function SakuraBranch() {
  return (
    <div className="w-full h-full">
      <svg
        viewBox="0 0 620 820"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        overflow="visible"
        aria-hidden
      >
        {/* ── MAIN TRUNK — enters from upper-right edge, sweeps to lower-left ── */}
        <motion.path
          d="M 624,28
             C 568,68 488,152 400,254
             C 314,356 222,460 148,570
             C 110,626 78,676 52,726"
          stroke={BARK}
          strokeWidth={26}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...BD, duration: 2.4, delay: 0.0 }}
        />

        {/* ── SECONDARY lower continuation ── */}
        <motion.path
          d="M 52,726 C 34,758 22,790 18,820"
          stroke={BARK}
          strokeWidth={20}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...BD, duration: 0.8, delay: 0.55 }}
        />

        {/* ── SUB-BRANCH A — from mid-main (~400,254), upper-left ── */}
        <motion.path
          d="M 400,254
             C 344,202 270,152 194,106
             C 158,83 120,62 90,40"
          stroke={BARK}
          strokeWidth={14}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...BD, duration: 1.6, delay: 0.32 }}
        />

        {/* ── SUB-BRANCH B — from upper-main (~500,160), upper-right ── */}
        <motion.path
          d="M 500,160 C 542,122 576,90 604,66"
          stroke={BARK}
          strokeWidth={11}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...BD, duration: 1.1, delay: 0.44 }}
        />

        {/* ── SUB-BRANCH C — from ~(338,358), right ── */}
        <motion.path
          d="M 338,358 C 394,330 454,308 506,292"
          stroke={BARK}
          strokeWidth={10}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...BD, duration: 1.0, delay: 0.50 }}
        />

        {/* ── SUB-BRANCH D — from ~(238,464), lower-left ── */}
        <motion.path
          d="M 238,464 C 183,482 126,494 74,498"
          stroke={BARK}
          strokeWidth={9}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...BD, duration: 0.9, delay: 0.58 }}
        />

        {/* ── SUB-BRANCH E — from lower-main (~148,570), right ── */}
        <motion.path
          d="M 148,570 C 202,550 264,538 316,530"
          stroke={BARK}
          strokeWidth={8}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...BD, duration: 0.9, delay: 0.54 }}
        />

        {/* ── TWIG A1 — from A near-tip (~194,106), upper-left ── */}
        <motion.path
          d="M 194,106 C 168,76 140,50 114,26"
          stroke={BARK}
          strokeWidth={6.5}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...BD, duration: 0.9, delay: 0.68 }}
        />

        {/* ── TWIG A2 — from A tip (90,40), left ── */}
        <motion.path
          d="M 90,40 C 64,20 36,6 10,4"
          stroke={BARK}
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...BD, duration: 0.8, delay: 0.76 }}
        />

        {/* ── TWIG B1 — from B tip (604,66), up ── */}
        <motion.path
          d="M 604,66 C 614,44 620,22 618,4"
          stroke={BARK}
          strokeWidth={5.5}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...BD, duration: 0.7, delay: 0.78 }}
        />

        {/* ── TWIG C1 — from C tip (506,292), up-right ── */}
        <motion.path
          d="M 506,292 C 528,264 548,238 558,212"
          stroke={BARK}
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...BD, duration: 0.8, delay: 0.76 }}
        />

        {/* ── TWIG C2 — from C mid (~450,312), down-right ── */}
        <motion.path
          d="M 450,312 C 470,330 492,346 508,358"
          stroke={BARK}
          strokeWidth={4}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...BD, duration: 0.6, delay: 0.86 }}
        />

        {/* ── TWIG D1 — from D tip (74,498), lower-left ── */}
        <motion.path
          d="M 74,498 C 48,514 24,528 4,538"
          stroke={BARK}
          strokeWidth={4.5}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...BD, duration: 0.7, delay: 0.84 }}
        />

        {/* ── TWIG E1 — from E tip (316,530), up-right ── */}
        <motion.path
          d="M 316,530 C 348,514 380,500 404,488"
          stroke={BARK}
          strokeWidth={4}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...BD, duration: 0.7, delay: 0.82 }}
        />

        {/* ── BLOSSOMS ── */}

        {/* Cluster: A2 tip (10,4) */}
        <Blossom cx={8}   cy={2}   r={26} color={PINK.soft}  delay={1.18} />
        <Blossom cx={26}  cy={14}  r={20} color={PINK.light} delay={1.28} />
        <Blossom cx={-4}  cy={16}  r={17} color={PINK.mid}   delay={1.38} />

        {/* Cluster: A tip (90,40) */}
        <Blossom cx={88}  cy={36}  r={30} color={PINK.soft}  delay={1.20} />
        <Blossom cx={110} cy={52}  r={24} color={PINK.light} delay={1.30} />
        <Blossom cx={70}  cy={54}  r={20} color={PINK.mid}   delay={1.40} />
        <Blossom cx={98}  cy={18}  r={17} color={PINK.deep}  delay={1.48} />
        <Blossom cx={74}  cy={28}  r={14} color={PINK.light} delay={1.54} />

        {/* Cluster: A1 twig tip (114,26) */}
        <Blossom cx={112} cy={22}  r={24} color={PINK.soft}  delay={1.24} />
        <Blossom cx={130} cy={36}  r={18} color={PINK.light} delay={1.36} />
        <Blossom cx={100} cy={36}  r={16} color={PINK.mid}   delay={1.44} />

        {/* Cluster: B1 tip (618,4) */}
        <Blossom cx={618} cy={4}   r={24} color={PINK.soft}  delay={1.22} />
        <Blossom cx={602} cy={16}  r={19} color={PINK.light} delay={1.34} />
        <Blossom cx={630} cy={18}  r={16} color={PINK.mid}   delay={1.44} />

        {/* Cluster: B tip (604,66) */}
        <Blossom cx={602} cy={62}  r={28} color={PINK.mid}   delay={1.20} />
        <Blossom cx={584} cy={78}  r={22} color={PINK.light} delay={1.34} />
        <Blossom cx={618} cy={80}  r={19} color={PINK.soft}  delay={1.46} />
        <Blossom cx={594} cy={44}  r={16} color={PINK.deep}  delay={1.52} />

        {/* Cluster: C1 tip (558,212) */}
        <Blossom cx={556} cy={208} r={24} color={PINK.soft}  delay={1.26} />
        <Blossom cx={572} cy={224} r={19} color={PINK.light} delay={1.38} />
        <Blossom cx={542} cy={224} r={16} color={PINK.mid}   delay={1.50} />

        {/* Cluster: C2 twig tip (508,358) */}
        <Blossom cx={506} cy={354} r={20} color={PINK.light} delay={1.30} />
        <Blossom cx={520} cy={368} r={16} color={PINK.mid}   delay={1.44} />

        {/* Cluster: D1 twig tip (4,538) */}
        <Blossom cx={4}   cy={534} r={24} color={PINK.soft}  delay={1.28} />
        <Blossom cx={20}  cy={548} r={18} color={PINK.light} delay={1.42} />
        <Blossom cx={-8}  cy={548} r={15} color={PINK.mid}   delay={1.52} />

        {/* Cluster: E1 twig tip (404,488) */}
        <Blossom cx={402} cy={484} r={22} color={PINK.mid}   delay={1.32} />
        <Blossom cx={418} cy={498} r={17} color={PINK.light} delay={1.46} />
        <Blossom cx={392} cy={498} r={14} color={PINK.soft}  delay={1.56} />

        {/* Scattered singles along main trunk */}
        <Blossom cx={572} cy={118} r={19} color={PINK.light} delay={1.36} />
        <Blossom cx={478} cy={214} r={17} color={PINK.soft}  delay={1.43} />
        <Blossom cx={384} cy={310} r={19} color={PINK.mid}   delay={1.50} />
        <Blossom cx={292} cy={408} r={17} color={PINK.light} delay={1.54} />
        <Blossom cx={200} cy={500} r={19} color={PINK.soft}  delay={1.58} />

        {/* Along sub-branch A */}
        <Blossom cx={292} cy={128} r={18} color={PINK.deep}  delay={1.40} />
        <Blossom cx={150} cy={82}  r={16} color={PINK.light} delay={1.48} />

      </svg>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experience } from "@/lib/data";
import SplitText from "@/components/SplitText";
import TiltCard from "@/components/TiltCard";
import SakuraBranchDecor from "@/components/SakuraBranchDecor";

function TimelineSVG() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 10%"],
  });
  const pathLen = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="absolute left-0 top-0 h-full hidden lg:block" style={{ width: 24 }}>
    <svg
      className="absolute left-0 top-0 h-full"
      width="24"
      style={{ overflow: "visible" }}
      preserveAspectRatio="none"
    >
      {/* Track line */}
      <line x1="12" y1="0" x2="12" y2="100%" stroke="rgba(20,18,14,0.1)" strokeWidth="1" />
      {/* Animated progress line */}
      <motion.line
        x1="12"
        y1="0"
        x2="12"
        y2="100%"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        style={{ pathLength: pathLen, scaleY: pathLen, transformOrigin: "top" }}
      />
      {/* Dots per entry */}
      {experience.map((_, i) => (
        <motion.circle
          key={i}
          cx="12"
          cy={`${(i / (experience.length - 1)) * 100}%`}
          r="4"
          fill="var(--color-paper)"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      ))}
    </svg>
    </div>
  );
}

export default function Journey() {
  return (
    <section
      id="journey"
      className="relative overflow-hidden bg-paper text-paper-ink px-5 sm:px-8 py-20 sm:py-28 border-t border-paper-ink/10"
    >
      <SakuraBranchDecor side="left" />
      {/* Ghost kanji — 道 (michi): the path, the way */}
      <span
        aria-hidden="true"
        className="absolute top-8 right-[5%] font-serif leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(12rem, 24vw, 22rem)", color: "rgba(28,15,11,0.035)" }}
      >
        道
      </span>
      <div className="mx-auto max-w-6xl relative z-[5]">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-ink/40 mb-6"
        >
          02 — Experience
        </motion.p>

        <div className="font-display text-[2.8rem] sm:text-[4.5rem] lg:text-[6rem] leading-[0.92] tracking-tight mb-16 pb-3">
          <SplitText
            text="selected"
            as="h2"
            delay={0}
            stagger={0.06}
            className="block text-paper-ink"
          />
          <SplitText
            text="engineering"
            as="h2"
            delay={0.1}
            stagger={0.06}
            className="block"
            colorWords={{ engineering: "var(--color-accent)" }}
          />
          <SplitText
            text="work."
            as="h2"
            delay={0.22}
            stagger={0.08}
            className="block text-paper-ink"
          />
        </div>

        {/* Timeline + entries */}
        <div className="relative lg:pl-10">
          <TimelineSVG />

          <div>
            {experience.map((e, i) => (
              <motion.div
                key={e.index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.55, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="group py-8 lg:px-5 lg:-mx-5 border-t border-paper-ink/10 last:border-b rounded-lg transition-colors duration-300 hover:bg-[rgba(201,80,122,0.03)]"
              >
                <TiltCard intensity={4} className="w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-6">
                    {/* Left */}
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                        <span className="font-mono text-[10px] text-paper-ink/30">{e.index}</span>
                        <span className="font-display text-xl sm:text-2xl text-paper-ink group-hover:text-accent-deep transition-colors duration-300">
                          {e.org}
                        </span>
                        <span
                          className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border text-paper-ink/50"
                          style={{ borderColor: "rgba(20,18,14,0.15)" }}
                        >
                          {e.role}
                        </span>
                      </div>
                      <p className="font-mono text-[11px] text-paper-ink/35 mb-4">
                        {e.location} · {e.dates}
                      </p>
                      <ul className="space-y-1.5">
                        {e.bullets.map((b, bi) => (
                          <li key={bi} className="text-sm text-paper-ink/55 leading-relaxed flex gap-2.5">
                            <span className="shrink-0 mt-[3px]" style={{ color: "var(--color-accent)" }}>
                              →
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: big stat */}
                    {e.stat && (
                      <div className="lg:text-right flex lg:flex-col items-baseline lg:items-end gap-3 lg:gap-1 pt-1">
                        <motion.span
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="font-display text-3xl sm:text-4xl lg:text-5xl text-paper-ink leading-none"
                          style={{}}
                          whileHover={{
                            filter: "drop-shadow(0 0 12px var(--color-accent))",
                            color: "var(--color-accent-deep)",
                          }}
                        >
                          {e.stat}
                        </motion.span>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-paper-ink/35 lg:mt-1">
                          {e.statLabel}
                        </span>
                      </div>
                    )}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

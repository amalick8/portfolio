"use client";

import { motion } from "framer-motion";
import { profile, skills } from "@/lib/data";
import SplitText from "@/components/SplitText";
import TextScramble from "@/components/TextScramble";
import BrushstrokeUnderline from "@/components/BrushstrokeUnderline";
import SakuraBranchDecor from "@/components/SakuraBranchDecor";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-paper text-paper-ink px-5 sm:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
      <SakuraBranchDecor side="right" />
      {/* Ghost kanji — 心 (kokoro): heart, mindset */}
      <span
        aria-hidden="true"
        className="absolute top-4 right-[8%] font-serif leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(12rem, 24vw, 22rem)", color: "rgba(28,15,11,0.035)" }}
      >
        心
      </span>
      <div className="mx-auto max-w-6xl relative z-[5]">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-ink/40 mb-10"
        >
          <TextScramble text="01 — About" />
        </motion.p>

        <div className="font-display text-[3.5rem] sm:text-[5.5rem] lg:text-[7.5rem] leading-[0.92] tracking-tight mb-6 pb-3">
          <SplitText text="technical depth," as="h2" delay={0} stagger={0.07} className="block text-paper-ink" />
          <SplitText text="commercial" as="h2" delay={0.18} stagger={0.07} className="block" colorWords={{ commercial: "var(--color-accent)" }} />
          <SplitText text="instinct." as="h2" delay={0.36} stagger={0.07} className="block text-paper-ink" />
        </div>
        <BrushstrokeUnderline delay={0.7} className="mb-14 max-w-2xl" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {[
            profile.bio,
            "My edge is the overlap — I can whiteboard the architecture with the engineering team in the morning and present the business case to the VP by afternoon. At EY, Intel, and the Recording Academy I wasn't just building pipelines; I was translating technical output into decisions stakeholders could act on.",
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
              whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-paper-ink/60 leading-relaxed"
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Skills grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-paper-ink/10 pt-10"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-ink/30 mb-8">
            Technical toolkit
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {skills.map((s, si) => (
              <motion.div
                key={s.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.5, delay: 0.05 * si }}
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-paper-ink/40 mb-3">
                  {s.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((item, ii) => (
                    <motion.span
                      key={item}
                      data-cursor="link"
                      initial={{ opacity: 0, scale: 0.85, rotate: ii % 2 === 0 ? -3 : 3 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true, margin: "-8% 0px" }}
                      transition={{ duration: 0.4, delay: 0.04 * si + 0.03 * ii, type: "spring", stiffness: 300, damping: 20 }}
                      whileHover={{
                        boxShadow: "0 0 18px rgba(201,80,122,0.3)",
                        borderColor: "rgba(201,80,122,0.55)",
                        color: "var(--color-accent-deep)",
                        scale: 1.06,
                        y: -2,
                      }}
                      className="text-xs border border-paper-ink/15 rounded-full px-3 py-1 text-paper-ink/65 transition-colors"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { focusAreas, results } from "@/lib/data";
import AnimatedStat from "@/components/AnimatedStat";
import ParallaxBlob from "@/components/ParallaxBlob";
import TiltCard from "@/components/TiltCard";
import SplitText from "@/components/SplitText";
import TextScramble from "@/components/TextScramble";

export default function Impact() {
  return (
    <section
      id="impact"
      className="relative px-5 sm:px-8 py-20 sm:py-28 border-t border-line bg-bg-soft/40 overflow-hidden dot-grid"
    >
      <ParallaxBlob
        className="absolute top-1/3 left-1/2 w-[34rem] h-[34rem] -translate-x-1/2 rounded-full bg-accent-deep/[0.04] blur-[130px]"
        range={70}
      />
      <div className="mx-auto max-w-6xl relative z-[5]">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft mb-3"
        >
          <TextScramble text="05 — Impact" />
        </motion.p>
        <div className="font-display text-4xl sm:text-5xl mb-12 max-w-2xl leading-tight">
          <SplitText text="numbers that show" as="h2" delay={0} stagger={0.06} className="block" />
          <SplitText text="traction." as="h2" delay={0.2} stagger={0.07} className="block" colorWords={{ "traction.": "var(--color-accent)" }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
          {results.map((r, idx) => (
            <motion.div
              key={r.index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <TiltCard intensity={8} className="h-full">
                <div className="h-full rounded-2xl border border-line-strong bg-surface/60 p-6 hover:border-accent/40 transition-colors">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-ink-faint mb-2">
                    {r.org} · {r.domain}
                  </p>
                  <h3 className="font-display text-xl mb-5">{r.title}</h3>
                  <div className="grid grid-cols-3 gap-2 mb-5 pb-5 border-b border-line">
                    {r.stats.map((s) => (
                      <div key={s.label}>
                        <motion.div
                          className="text-accent-soft font-display text-lg sm:text-xl leading-tight"
                          whileInView={{
                            textShadow: ["0 0 0px transparent", "0 0 16px rgba(235,180,200,0.5)", "0 0 0px transparent"],
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: idx * 0.1 + 0.3 }}
                        >
                          <AnimatedStat value={s.value} />
                        </motion.div>
                        <div className="text-[11px] text-ink-faint mt-1 leading-snug">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-ink-muted leading-relaxed">{r.description}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl border border-line-strong p-6"
        >
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-faint mb-5">
            Current quarter — where my reps are going
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {focusAreas.map((f) => (
              <motion.div
                key={f.tag}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="font-display italic text-2xl text-accent mb-1.5">{f.tag}</div>
                <div className="text-sm text-ink-muted">{f.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

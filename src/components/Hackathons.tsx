"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hackathons } from "@/lib/data";
import SplitText from "@/components/SplitText";
import TiltCard from "@/components/TiltCard";

export default function Hackathons() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="hackathons" className="px-5 sm:px-8 py-20 sm:py-28 bg-stage dot-grid">
      <div className="mx-auto max-w-6xl relative z-[5]">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/30 mb-6"
        >
          04 — Hackathons
        </motion.p>

        <div className="font-display text-[2.8rem] sm:text-[4.5rem] lg:text-[6rem] leading-[0.92] tracking-tight mb-4 pb-3">
          <SplitText
            text="built under"
            as="h2"
            delay={0}
            stagger={0.07}
            className="block text-ink"
          />
          <SplitText
            text="pressure."
            as="h2"
            delay={0.18}
            stagger={0.08}
            className="block"
            colorWords={{ "pressure.": "var(--color-accent)" }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono text-xs text-ink/30 uppercase tracking-widest mb-16"
        >
          competitive builds · tight deadlines · real results
        </motion.p>

        {/* Interactive shard grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {hackathons.map((h, i) => (
            <motion.div
              key={h.index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <TiltCard intensity={8}>
                <motion.button
                  onClick={() => setActive(active === h.index ? null : h.index)}
                  data-cursor="link"
                  className="relative w-full bg-surface text-left p-8 sm:p-10 rounded-2xl border border-line overflow-hidden group"
                  whileHover={{
                    boxShadow: "0 0 40px rgba(201,80,122,0.15), 0 0 80px rgba(201,80,122,0.06)",
                    borderColor: "rgba(201,80,122,0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated accent top border */}
                  <motion.div
                    className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: "var(--color-accent)" }}
                  />

                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink/25 mb-6">
                    {h.index}
                  </p>
                  <motion.p
                    className="font-mono text-[10px] uppercase tracking-widest mb-3"
                    style={{ color: "var(--color-accent)" }}
                    whileHover={{ letterSpacing: "0.35em" }}
                    transition={{ duration: 0.3 }}
                  >
                    {h.placement}
                  </motion.p>
                  <h3 className="font-display text-2xl sm:text-3xl text-ink mb-2 leading-tight group-hover:text-accent-soft transition-colors duration-300">
                    {h.name}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink/30 mb-6">
                    {h.domain}
                  </p>

                  <AnimatePresence initial={false}>
                    {active === h.index && (
                      <motion.div
                        initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                        animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
                        exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="text-sm text-ink/55 leading-relaxed mb-4">
                          {h.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink/20 group-hover:text-ink/40 transition-colors duration-300">
                    {active === h.index ? "Close ↑" : "Details ↓"}
                  </p>
                </motion.button>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-mono text-[10px] uppercase tracking-widest text-ink/20 text-center mt-8"
        >
          Each entry is a real competition build. Content subject to update.
        </motion.p>
      </div>
    </section>
  );
}

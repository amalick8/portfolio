"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="px-5 sm:px-8 py-20 sm:py-28 border-t border-line bg-bg-soft/40">
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft mb-3">
          03 — Skills
        </p>
        <h2 className="font-display text-4xl sm:text-5xl mb-12">
          Tools and tech I use to <span className="italic text-accent">ship.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
            >
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-ink-faint mb-4 pb-3 border-b border-line">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, ii) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.3, delay: gi * 0.1 + ii * 0.03 }}
                    className="rounded-full border border-line-strong px-3.5 py-1.5 text-sm text-ink-muted hover:border-accent/60 hover:text-accent-soft hover:-translate-y-0.5 transition-all"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

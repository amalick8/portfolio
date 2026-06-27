"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { projects } from "@/lib/data";

export default function Work() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(projects.length - 1) * 100}vw`]);
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(projects.length - 1, Math.max(0, Math.round(v * (projects.length - 1))));
    setActive(idx);
  });

  return (
    <section id="work" ref={targetRef} data-cursor="drag" className="relative h-[600vh] bg-stage text-ink">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

        {/* Section header — top bar */}
        <div className="px-5 sm:px-8 pt-8 pb-4 flex items-center justify-between border-b border-line shrink-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/30">
            03 — Projects
          </p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-xs text-ink/30 hidden sm:inline">
              Solo · Research · Prod
            </span>
            <span className="font-mono text-xs text-ink/30">
              {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Scrolling card track */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex">
            {projects.map((p, i) => (
              <div
                key={p.name}
                className="w-screen shrink-0 px-5 sm:px-8 flex items-center"
              >
                <div className="mx-auto max-w-6xl w-full relative z-[5] grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-16 items-center">

                  {/* LEFT: Ghost numeral + title */}
                  <div className="relative">
                    <span className="absolute -top-20 -left-4 font-display text-[10rem] sm:text-[16rem] leading-none text-ink/[0.04] select-none pointer-events-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <motion.p
                      key={`label-${p.name}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0 }}
                      className="relative font-mono text-[9px] uppercase tracking-[0.25em] text-ink/25 mb-3"
                    >
                      Selected System
                    </motion.p>
                    <motion.h3
                      key={`h3-${p.name}`}
                      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                      animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="relative font-display leading-none tracking-tight mb-4 text-ink"
                      style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
                    >
                      {p.name}
                    </motion.h3>
                    <motion.p
                      key={`desc-${p.name}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                      className="relative text-sm sm:text-base text-ink-muted leading-relaxed max-w-sm mb-6"
                    >
                      {p.description}
                    </motion.p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.split(" · ").map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] uppercase tracking-widest rounded-full px-3 py-1.5 border border-line text-ink/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT: Glassmorphic detail card */}
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl border border-line p-7 sm:p-8 flex flex-col gap-6"
                    style={{
                      background: "rgba(26,24,20,0.7)",
                      backdropFilter: "blur(24px)",
                    }}
                  >
                    {/* Description */}
                    <p className="text-sm sm:text-base text-ink/65 leading-relaxed">
                      {p.description}
                    </p>

                    {/* Metadata grid */}
                    <div className="grid grid-cols-2 gap-4 border-t border-line pt-5">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-widest text-ink/25 mb-1">
                          Role
                        </p>
                        <p className="font-mono text-xs text-ink/65">Solo builder</p>
                      </div>
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-widest text-ink/25 mb-1">
                          Access
                        </p>
                        <p className="font-mono text-xs text-ink/65">
                          {p.repo ? "Public GitHub" : "Private — on request"}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-widest text-ink/25 mb-1">
                          Stack
                        </p>
                        <p className="font-mono text-xs text-ink/65">{p.tags}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-widest text-ink/25 mb-1">
                          Status
                        </p>
                        <p className="font-mono text-xs text-ink/65">
                          {p.repo ? "Active" : "Stealth"}
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div>
                      {p.repo ? (
                        <motion.a
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer"
                          data-cursor="link"
                          whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(201,80,122,0.4)" }}
                          whileTap={{ scale: 0.97 }}
                          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
                          style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}
                        >
                          {p.accessLabel} <ArrowUpRight size={14} />
                        </motion.a>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink-faint">
                          <Lock size={13} /> {p.accessLabel}
                        </span>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom progress bar */}
        <div className="px-5 sm:px-8 pb-6 sm:pb-8 shrink-0">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-ink/25 shrink-0">01</span>
            <div className="flex-1 h-px bg-line relative overflow-hidden rounded-full">
              <motion.div
                style={{ width: barWidth, background: "var(--color-accent)" }}
                className="absolute inset-y-0 left-0 rounded-full"
              />
            </div>
            <span className="font-mono text-[10px] text-ink/25 shrink-0">
              {String(projects.length).padStart(2, "0")}
            </span>
            <span className="font-mono text-[10px] text-ink/20 hidden sm:inline ml-4 uppercase tracking-widest">
              Scroll to explore →
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

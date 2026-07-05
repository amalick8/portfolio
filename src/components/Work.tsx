"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, GitFork, Lock } from "lucide-react";
import { projects } from "@/lib/data";
import TextScramble from "@/components/TextScramble";

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
            <TextScramble text="03 — Projects" />
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
                      FIG. {String(i + 1).padStart(2, "0")} — Selected System
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

                  {/* RIGHT: Terminal-style spec card — echoes the ⌘K terminal */}
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-xl overflow-hidden"
                    style={{
                      background: "#0e0608",
                      boxShadow: "0 30px 70px -30px rgba(28,15,11,0.45), 0 0 0 1px rgba(201,80,122,0.14)",
                    }}
                  >
                    {/* Title bar */}
                    <div
                      className="flex items-center gap-2 px-4 py-3"
                      style={{ background: "#1a0b0f", borderBottom: "1px solid rgba(201,80,122,0.14)" }}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
                      <span
                        className="flex-1 text-center font-mono text-[11px] tracking-wide"
                        style={{ color: "rgba(255,200,218,0.28)" }}
                      >
                        {p.repo ? `gh repo view ${p.name.toLowerCase()}` : "access — restricted"}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="px-6 py-6 font-mono text-[13px] leading-7">
                      {[
                        { k: "role", v: "Solo builder" },
                        { k: "access", v: p.repo ? "Public · GitHub" : "Private — on request" },
                        { k: "stack", v: p.tags },
                        { k: "status", v: p.repo ? "Active" : "Stealth" },
                      ].map((row) => (
                        <div key={row.k} className="flex gap-3">
                          <span style={{ color: "#c9507a" }} className="shrink-0 w-16">{row.k}</span>
                          <span style={{ color: "rgba(240,230,234,0.75)" }}>{row.v}</span>
                        </div>
                      ))}

                      <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(201,80,122,0.14)" }}>
                        {p.repo ? (
                          <motion.a
                            href={p.repo}
                            target="_blank"
                            rel="noreferrer"
                            data-cursor="link"
                            whileHover={{ background: "rgba(201,80,122,0.25)", borderColor: "rgba(201,80,122,0.6)" }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-medium transition-colors"
                            style={{
                              background: "rgba(201,80,122,0.14)",
                              border: "1px solid rgba(201,80,122,0.35)",
                              color: "#f5b8d0",
                            }}
                          >
                            <GitFork size={14} /> {p.accessLabel} <ArrowUpRight size={13} />
                          </motion.a>
                        ) : (
                          <span
                            className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-medium"
                            style={{
                              border: "1px solid rgba(240,230,234,0.15)",
                              color: "rgba(240,230,234,0.35)",
                            }}
                          >
                            <Lock size={13} /> {p.accessLabel}
                          </span>
                        )}
                      </div>
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

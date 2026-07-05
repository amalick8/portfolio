"use client";

import { motion } from "framer-motion";
import { heroStats, profile } from "@/lib/data";
import AnimatedStat from "@/components/AnimatedStat";
import ParallaxBlob from "@/components/ParallaxBlob";
import SplitText from "@/components/SplitText";
import MagneticButton from "@/components/MagneticButton";
import SakuraBranch from "@/components/SakuraBranch";

export default function Hero() {

  return (
    <section id="home" className="relative px-5 sm:px-8 pt-36 pb-20 sm:pt-48 sm:pb-28 min-h-screen flex flex-col overflow-hidden dot-grid">
      {/* Ambient glow blobs */}
      <ParallaxBlob
        className="absolute -top-32 right-[-15%] w-[36rem] h-[36rem] rounded-full bg-accent/[0.08] blur-[130px]"
        range={70}
      />
      <ParallaxBlob
        className="absolute bottom-[-10%] left-[-15%] w-[28rem] h-[28rem] rounded-full bg-accent-deep/[0.06] blur-[110px]"
        range={50}
      />

      {/* Top corner labels */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="absolute top-8 left-5 sm:left-8 flex items-center gap-3 pointer-events-none"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/30">
          00 — M. Ammar Malick
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="absolute top-8 right-5 sm:right-8 pointer-events-none"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/30">
          Vancouver, BC · Dallas, TX
        </span>
      </motion.div>

      {/* Cherry blossom branch — comes in first */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.2 }}
        className="absolute right-0 top-0 w-[62%] sm:w-[55%] h-full pointer-events-none hidden sm:block"
        style={{ zIndex: 0 }}
      >
        <SakuraBranch />
      </motion.div>

      {/* Main content */}
      <div className="relative mx-auto max-w-6xl w-full flex-1 flex items-center" style={{ zIndex: 10 }}>
        <div>
          <div
            className="font-display leading-[0.92] tracking-tight"
            style={{ fontSize: "clamp(3.1rem, 7.6vw, 5.8rem)" }}
          >
            <SplitText
              text="i'm ammar,"
              as="h1"
              delay={0.7}
              stagger={0.08}
              duration={0.95}
              className="block"
            />
            <SplitText
              text="i architect exits."
              as="h1"
              delay={0.9}
              stagger={0.09}
              duration={0.95}
              className="block"
              colorWords={{ "exits.": "var(--color-accent)" }}
              accentClassName="sakura-shimmer"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.25 }}
            className="mt-7 max-w-xl text-base sm:text-lg text-ink-muted leading-relaxed"
          >
            Software Engineering &amp; Honors student at UTA. I build the POC, run the demo,
            and field the technical objections. Most people are either builders or sellers — I'm training to be both.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.45 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton>
              <motion.a
                href="#about"
                data-cursor="link"
                whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(201,80,122,0.3)" }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full px-6 py-3 text-sm font-medium transition-colors"
                style={{ background: "var(--color-ink)", color: "var(--color-bg)" }}
              >
                About me
              </motion.a>
            </MagneticButton>
            <MagneticButton>
              <motion.a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                whileHover={{ scale: 1.04, borderColor: "rgba(201,80,122,0.6)", color: "var(--color-accent-soft)" }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-ink transition-colors"
              >
                GitHub
              </motion.a>
            </MagneticButton>
            <MagneticButton>
              <motion.a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                whileHover={{ scale: 1.04, borderColor: "rgba(201,80,122,0.6)", color: "var(--color-accent-soft)" }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-ink transition-colors"
              >
                LinkedIn
              </motion.a>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="mt-14 grid grid-cols-3 max-w-lg border-t border-line pt-6"
          >
            {heroStats.map((s, si) => (
              <div
                key={s.label}
                className={si === 0 ? "pr-4" : "pl-4 border-l border-line"}
              >
                <div className="font-display text-2xl sm:text-3xl font-medium text-accent">
                  <AnimatedStat value={s.value} />
                </div>
                <div className="mt-1 text-xs text-ink-faint leading-snug">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Vertical Japanese caption — 出口を設計する = "design the exit" */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.9 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 pointer-events-none select-none"
        style={{ zIndex: 1 }}
      >
        <span className="w-px h-14 bg-line-strong" />
        <span
          className="font-serif text-[13px] tracking-[0.4em] text-ink/30"
          style={{ writingMode: "vertical-rl" }}
        >
          出口を設計する
        </span>
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "var(--color-accent)", opacity: 0.5 }}
        />
      </motion.div>

      {/* SCROLL indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink/25">Scroll</span>
        <div className="relative w-px h-12 bg-line overflow-hidden">
          <motion.div
            className="absolute inset-x-0 top-0 h-full"
            style={{ background: "var(--color-accent)" }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

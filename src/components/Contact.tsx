"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { copyToClipboard } from "@/lib/clipboard";
import SplitText from "@/components/SplitText";
import MagneticButton from "@/components/MagneticButton";
import TextScramble from "@/components/TextScramble";
import dynamic from "next/dynamic";

const FloatingParticles = dynamic(() => import("@/components/FloatingParticles"), { ssr: false });
const SakuraPool = dynamic(() => import("@/components/SakuraPool"), { ssr: false });

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    const ok = await copyToClipboard(profile.email);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-center px-5 sm:px-8 py-20 sm:py-28 overflow-hidden"
      style={{ background: "var(--color-accent-deep)" }}
    >
      {/* Particle layer */}
      <FloatingParticles />

      {/* Sakura petal pool — static pile, repels from cursor */}
      <SakuraPool />


      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,80,122,0.25) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-5xl text-center relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[11px] uppercase tracking-[0.2em] mb-8"
          style={{ color: "rgba(245,241,232,0.45)" }}
        >
          <TextScramble text="06 — Contact" />
        </motion.p>

        <div
          className="font-display leading-[0.92] tracking-tight mb-8 pb-2"
          style={{ fontSize: "clamp(3rem, 9vw, 7rem)", color: "var(--color-paper)" }}
        >
          <SplitText
            text="let's build"
            as="h2"
            delay={0}
            stagger={0.09}
            className="block"
          />
          <SplitText
            text="together."
            as="h2"
            delay={0.2}
            stagger={0.1}
            className="block"
            colorWords={{ "together.": "rgba(245,241,232,0.55)" }}
          />
        </div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-6"
        >
          <MagneticButton>
            <motion.a
              href={`mailto:${profile.email}`}
              data-cursor="link"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,255,255,0.25)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-colors"
              style={{ background: "var(--color-paper)", color: "var(--color-accent-deep)" }}
            >
              let&apos;s talk →
            </motion.a>
          </MagneticButton>
          <MagneticButton>
            <motion.button
              onClick={copyEmail}
              data-cursor="link"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.14)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-mono border transition-colors"
              style={{ borderColor: "rgba(245,241,232,0.3)", color: "var(--color-paper)" }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy email"}
            </motion.button>
          </MagneticButton>
        </motion.div>

        {/* Icon link row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { label: "LINKEDIN", href: profile.linkedin },
            { label: "GITHUB", href: profile.github },
            { label: "EMAIL", href: `mailto:${profile.email}` },
          ].map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              data-cursor="link"
              whileHover={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "rgba(245,241,232,0.9)",
                borderColor: "rgba(245,241,232,0.4)",
              }}
              className="font-mono text-[11px] uppercase tracking-widest rounded-full px-4 py-2 border transition-colors"
              style={{
                borderColor: "rgba(245,241,232,0.2)",
                color: "rgba(245,241,232,0.55)",
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-mono text-[10px] uppercase tracking-widest mt-10"
          style={{ color: "rgba(245,241,232,0.25)" }}
        >
          © 2026 {profile.fullName} · Built with code, data, and intent.
        </motion.p>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Paintbrush, Sparkles } from "lucide-react";
import type { LogoVariant } from "@/components/LogoMark";

type MotionVariant = "base" | "sticky" | "ink" | "scale";

const logoOptions: { id: LogoVariant; label: string }[] = [
  { id: "stamp", label: "A" },
  { id: "underline", label: "B" },
  { id: "monogram", label: "C" },
];

const motionOptions: { id: MotionVariant; label: string }[] = [
  { id: "base", label: "Base" },
  { id: "sticky", label: "A" },
  { id: "ink", label: "B" },
  { id: "scale", label: "C" },
];

function setPreviewAttribute(motion: MotionVariant) {
  document.documentElement.dataset.transitionPreview = motion;
}

export default function DesignOptions() {
  const [logo, setLogo] = useState<LogoVariant>("underline");
  const [motionPreview, setMotionPreview] = useState<MotionVariant>("base");
  const [inkPulse, setInkPulse] = useState(0);

  useEffect(() => {
    const savedLogo = localStorage.getItem("am-logo-preview") as LogoVariant | null;
    const savedMotion = localStorage.getItem("am-motion-preview") as MotionVariant | null;

    if (savedLogo && logoOptions.some((option) => option.id === savedLogo)) {
      setLogo(savedLogo);
      window.dispatchEvent(new CustomEvent("am-logo-preview", { detail: savedLogo }));
    }

    if (savedMotion && motionOptions.some((option) => option.id === savedMotion)) {
      setMotionPreview(savedMotion);
      setPreviewAttribute(savedMotion);
    } else {
      setPreviewAttribute("base");
    }
  }, []);

  useEffect(() => {
    if (motionPreview !== "ink") return;

    let activeSection = "";
    const onScroll = () => {
      const sections = [...document.querySelectorAll("main > section[id]")] as HTMLElement[];
      const next = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.38 && rect.bottom > window.innerHeight * 0.38;
      });

      if (next && next.id !== activeSection) {
        activeSection = next.id;
        setInkPulse((value) => value + 1);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [motionPreview]);

  const selectLogo = (nextLogo: LogoVariant) => {
    setLogo(nextLogo);
    localStorage.setItem("am-logo-preview", nextLogo);
    window.dispatchEvent(new CustomEvent("am-logo-preview", { detail: nextLogo }));
  };

  const selectMotion = (nextMotion: MotionVariant) => {
    setMotionPreview(nextMotion);
    localStorage.setItem("am-motion-preview", nextMotion);
    setPreviewAttribute(nextMotion);
    if (nextMotion === "ink") setInkPulse((value) => value + 1);
  };

  return (
    <>
      <div className="fixed bottom-5 left-5 z-[70] hidden sm:flex flex-col gap-2 rounded-xl border border-line-strong bg-bg-soft/90 p-2 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Paintbrush size={13} className="text-accent" />
          <div className="flex rounded-lg border border-line bg-surface/60 p-0.5">
            {logoOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => selectLogo(option.id)}
                data-cursor="link"
                aria-pressed={logo === option.id}
                className="min-w-8 rounded-md px-2 py-1 font-mono text-[10px] text-ink-faint transition-colors aria-pressed:bg-accent aria-pressed:text-bg"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Sparkles size={13} className="text-accent" />
          <div className="flex rounded-lg border border-line bg-surface/60 p-0.5">
            {motionOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => selectMotion(option.id)}
                data-cursor="link"
                aria-pressed={motionPreview === option.id}
                className="min-w-8 rounded-md px-2 py-1 font-mono text-[10px] text-ink-faint transition-colors aria-pressed:bg-accent aria-pressed:text-bg"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {motionPreview === "ink" && inkPulse > 0 && (
          <motion.div
            key={inkPulse}
            className="fixed inset-0 z-[55] pointer-events-none"
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.96 }}
            animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0 0 100%)"] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.78, ease: [0.76, 0, 0.24, 1] }}
            style={{
              background:
                "radial-gradient(circle at 25% 50%, rgba(232,138,170,0.55), transparent 32%), linear-gradient(90deg, rgba(122,16,64,0.92), rgba(201,80,122,0.72), rgba(250,246,241,0.52))",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

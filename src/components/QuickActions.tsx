"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Code2, Command, Copy, Link2, MapPin } from "lucide-react";
import { profile } from "@/lib/data";
import { copyToClipboard } from "@/lib/clipboard";

export default function QuickActions() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const copyEmail = async () => {
    const ok = await copyToClipboard(profile.email);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const actions = [
    { label: profile.email, icon: copied ? Check : Copy, onClick: copyEmail },
    { label: "Open GitHub", icon: Code2, onClick: () => window.open(profile.github, "_blank") },
    { label: "Open LinkedIn", icon: Link2, onClick: () => window.open(profile.linkedin, "_blank") },
    { label: "Dallas, TX", icon: MapPin, onClick: () => {} },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-bg-soft px-3.5 py-2 font-mono text-[11px] text-ink-faint hover:text-accent-soft hover:border-accent/50 transition-colors"
      >
        <Command size={12} /> K
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="fixed z-[61] top-1/3 left-1/2 -translate-x-1/2 w-[90vw] max-w-md rounded-2xl border border-line-strong bg-bg-soft shadow-2xl overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-line font-mono text-[11px] uppercase tracking-widest text-ink-faint">
                Quick actions
              </div>
              <div className="p-2">
                {actions.map((a) => (
                  <button
                    key={a.label}
                    onClick={() => {
                      a.onClick();
                    }}
                    className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink-muted hover:bg-surface hover:text-ink transition-colors"
                  >
                    <a.icon size={15} className="text-accent-soft" />
                    {a.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

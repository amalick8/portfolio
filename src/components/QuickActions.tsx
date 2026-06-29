"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Command } from "lucide-react";
import { profile } from "@/lib/data";
import { copyToClipboard } from "@/lib/clipboard";

type Line =
  | { type: "system"; text: string }
  | { type: "prompt"; cmd: string }
  | { type: "output"; text: string }
  | { type: "link"; label: string; href: string };

const BOOT: Line[] = [
  { type: "system", text: "ammar@portfolio:~$ " },
  { type: "system", text: "" },
  { type: "output", text: "  welcome. here's what you can do:" },
  { type: "output", text: "" },
  { type: "output", text: "  github       → open github profile in new tab" },
  { type: "output", text: "  linkedin     → open linkedin in new tab" },
  { type: "output", text: "  contact      → copy email address" },
  { type: "output", text: "  location     → where i'm based" },
  { type: "output", text: "  clear        → clear terminal" },
  { type: "output", text: "" },
];

export default function QuickActions() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(BOOT);
  const [input, setInput] = useState("");
  const [blink, setBlink] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

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

  useEffect(() => {
    if (open) {
      setLines(BOOT);
      setInput("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const push = (...newLines: Line[]) =>
    setLines((l) => [...l, ...newLines]);

  const run = async (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    push({ type: "prompt", cmd: raw.trim() });
    setInput("");

    if (cmd === "github") {
      push(
        { type: "output", text: "  opening github..." },
        { type: "link", label: profile.github, href: profile.github }
      );
      setTimeout(() => window.open(profile.github, "_blank"), 300);
    } else if (cmd === "linkedin") {
      push(
        { type: "output", text: "  opening linkedin..." },
        { type: "link", label: profile.linkedin, href: profile.linkedin }
      );
      setTimeout(() => window.open(profile.linkedin, "_blank"), 300);
    } else if (cmd === "contact") {
      const ok = await copyToClipboard(profile.email);
      push(
        { type: "link", label: profile.email, href: `mailto:${profile.email}` },
        { type: "output", text: ok ? "  ✓ copied to clipboard" : "  click above to open mail" }
      );
    } else if (cmd === "location") {
      push({ type: "output", text: "  Vancouver, BC  ·  Dallas, TX" });
    } else if (cmd === "clear") {
      setLines(BOOT);
    } else if (cmd === "help") {
      push(
        { type: "output", text: "" },
        { type: "output", text: "  github       → open github profile in new tab" },
        { type: "output", text: "  linkedin     → open linkedin in new tab" },
        { type: "output", text: "  contact      → copy email address" },
        { type: "output", text: "  location     → where i'm based" },
        { type: "output", text: "  clear        → clear terminal" },
        { type: "output", text: "" }
      );
    } else {
      push(
        { type: "output", text: `  command not found: ${raw.trim()}` },
        { type: "output", text: `  type 'help' to see available commands` }
      );
    }
  };

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
              className="fixed inset-0 z-[60]"
              style={{ background: "rgba(10,4,6,0.72)", backdropFilter: "blur(6px)" }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="fixed z-[61] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-3xl rounded-xl overflow-hidden"
              style={{
                background: "#0e0608",
                boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,80,122,0.22)",
              }}
            >
              {/* Title bar */}
              <div
                className="flex items-center gap-3 px-4 py-3 select-none"
                style={{ background: "#1a0b0f", borderBottom: "1px solid rgba(201,80,122,0.14)" }}
              >
                <div className="flex gap-2">
                  <button
                    onClick={() => setOpen(false)}
                    className="w-3.5 h-3.5 rounded-full flex items-center justify-center group"
                    style={{ background: "#ff5f57" }}
                  />
                  <div className="w-3.5 h-3.5 rounded-full" style={{ background: "#ffbd2e" }} />
                  <div className="w-3.5 h-3.5 rounded-full" style={{ background: "#28c840" }} />
                </div>
                <span
                  className="flex-1 text-center font-mono text-[12px] tracking-wide"
                  style={{ color: "rgba(255,200,218,0.28)" }}
                >
                  ammar@portfolio — bash — 80×24
                </span>
              </div>

              {/* Terminal output */}
              <div
                className="px-5 py-4 font-mono text-[13px] leading-6 overflow-y-auto"
                style={{ minHeight: 280, maxHeight: 420 }}
                onClick={() => inputRef.current?.focus()}
              >
                {lines.map((line, i) => {
                  if (line.type === "system") {
                    return (
                      <div key={i} style={{ color: "#c9507a" }}>
                        {line.text}
                      </div>
                    );
                  }
                  if (line.type === "prompt") {
                    return (
                      <div key={i} className="flex gap-1.5 mt-1">
                        <span style={{ color: "#c9507a" }}>ammar@portfolio</span>
                        <span style={{ color: "rgba(255,200,218,0.3)" }}>:</span>
                        <span style={{ color: "#7ecfff" }}>~</span>
                        <span style={{ color: "rgba(255,200,218,0.4)" }}>$</span>
                        <span style={{ color: "#f0e6ea" }}>{line.cmd}</span>
                      </div>
                    );
                  }
                  if (line.type === "link") {
                    return (
                      <div key={i} className="mt-1 ml-4">
                        <a
                          href={line.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1 rounded font-mono text-[13px] transition-all"
                          style={{
                            background: "rgba(201,80,122,0.12)",
                            border: "1px solid rgba(201,80,122,0.28)",
                            color: "#f5b8d0",
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(201,80,122,0.25)";
                            e.currentTarget.style.borderColor = "rgba(201,80,122,0.55)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(201,80,122,0.12)";
                            e.currentTarget.style.borderColor = "rgba(201,80,122,0.28)";
                          }}
                        >
                          <span style={{ color: "#c9507a" }}>↗</span>
                          {line.label}
                        </a>
                      </div>
                    );
                  }
                  // output
                  return (
                    <div
                      key={i}
                      style={{
                        color: line.text === "" ? "transparent" : "rgba(240,230,234,0.65)",
                        userSelect: "text",
                      }}
                    >
                      {line.text || " "}
                    </div>
                  );
                })}

                {/* Active prompt line with live input */}
                <div className="flex gap-1.5 mt-1 items-center">
                  <span style={{ color: "#c9507a" }}>ammar@portfolio</span>
                  <span style={{ color: "rgba(255,200,218,0.3)" }}>:</span>
                  <span style={{ color: "#7ecfff" }}>~</span>
                  <span style={{ color: "rgba(255,200,218,0.4)" }}>$</span>
                  <span style={{ color: "#f0e6ea" }}>{input}</span>
                  <span
                    style={{
                      display: "inline-block",
                      width: 8,
                      height: 16,
                      background: blink ? "#c9507a" : "transparent",
                      marginLeft: 1,
                      verticalAlign: "middle",
                    }}
                  />
                </div>

                <div ref={bottomRef} />
              </div>

              {/* Hidden real input */}
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") run(input);
                }}
                className="absolute opacity-0 pointer-events-none"
                style={{ top: 0, left: 0, width: 1, height: 1 }}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoaderScreen() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Only show on first visit per session
    if (sessionStorage.getItem("am-loaded")) return;
    sessionStorage.setItem("am-loaded", "1");
    setVisible(true);

    // Count from 0 → 100 over ~1.4s
    const start = performance.now();
    const duration = 1400;
    const tick = () => {
      const elapsed = performance.now() - start;
      const p = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(p);
      if (p < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 200);
        setTimeout(() => setVisible(false), 1000);
      }
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Top panel */}
          <motion.div
            className="fixed inset-x-0 top-0 z-[10000] flex flex-col items-center justify-end pb-8"
            style={{ height: "50vh", background: "var(--color-stage)" }}
            initial={{ y: 0 }}
            animate={done ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          />

          {/* Bottom panel */}
          <motion.div
            className="fixed inset-x-0 bottom-0 z-[10000]"
            style={{ height: "50vh", background: "var(--color-stage)" }}
            initial={{ y: 0 }}
            animate={done ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          />

          {/* Center content */}
          <motion.div
            className="fixed inset-0 z-[10001] flex flex-col items-center justify-center gap-8 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={done ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display italic text-6xl sm:text-8xl tracking-tight text-ink"
            >
              AM.
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 h-px bg-line overflow-hidden">
              <motion.div
                className="h-full"
                style={{
                  width: `${progress}%`,
                  background: "var(--color-accent)",
                  transition: "width 0.05s linear",
                }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.3 }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40"
            >
              {progress.toString().padStart(3, "0")}
            </motion.p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

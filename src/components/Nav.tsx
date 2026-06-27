"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { nav } from "@/lib/data";
import TextScramble from "@/components/TextScramble";
import LogoMark, { type LogoVariant } from "@/components/LogoMark";

export default function Nav() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [logoVariant, setLogoVariant] = useState<LogoVariant>("stamp");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(250,246,241,0.72)", "rgba(250,246,241,0.92)"]);
  const navBorder = useTransform(scrollY, [0, 80], ["rgba(28,15,11,0.07)", "rgba(28,15,11,0.14)"]);

  useEffect(() => {
    setMounted(true);
    const savedLogo = localStorage.getItem("am-logo-preview") as LogoVariant | null;
    if (savedLogo) setLogoVariant(savedLogo);

    const onLogoPreview = (event: Event) => {
      setLogoVariant((event as CustomEvent<LogoVariant>).detail);
    };

    window.addEventListener("am-logo-preview", onLogoPreview);

    const sectionIds = nav.map((n) => n.href.replace("#", ""));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    sections.forEach((s) => observerRef.current!.observe(s));
    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener("am-logo-preview", onLogoPreview);
    };
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-50 border-b backdrop-blur-md"
        style={{ backgroundColor: navBg, borderColor: navBorder }}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo — stagger entrance */}
          <motion.a
            href="#home"
            data-cursor="link"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex min-w-12 items-center"
          >
            <LogoMark variant={logoVariant} />
          </motion.a>

          {/* Desktop nav — stagger cascade */}
          <nav className="hidden md:flex items-center gap-7 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            {nav.map((item, i) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  data-cursor="link"
                  initial={{ opacity: 0, y: -10 }}
                  animate={mounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                  className="relative py-0.5"
                  style={{ color: isActive ? "var(--color-accent-soft)" : undefined }}
                >
                  <TextScramble text={item.label} />
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-[1.5px]"
                      style={{ background: "var(--color-accent)" }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              data-cursor="link"
              aria-label="Toggle menu"
              className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
            >
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} className="block w-5 h-[1.5px] bg-ink" />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block w-5 h-[1.5px] bg-ink" />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} className="block w-5 h-[1.5px] bg-ink" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-bg/96 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {nav.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={close}
                data-cursor="link"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.35, delay: 0.06 * i }}
                className="font-display text-5xl sm:text-6xl text-ink hover:text-accent-soft transition-colors"
              >
                <TextScramble text={item.label} />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function NavSpacer() {
  return <div className="h-16" />;
}

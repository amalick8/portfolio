"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function TiltCard({ children, className = "", intensity = 12 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(my, { stiffness: 180, damping: 20 });
  const rotateY = useSpring(mx, { stiffness: 180, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(nx * intensity);
    my.set(-ny * intensity);

    // Specular highlight
    if (cardRef.current) {
      cardRef.current.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      cardRef.current.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    }
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div style={{ perspective: 900 }} className={className}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", position: "relative" }}
        className="h-full"
      >
        {children}
        {/* Specular highlight overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          style={{
            background:
              "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.07) 0%, transparent 55%)",
          }}
        />
      </motion.div>
    </div>
  );
}

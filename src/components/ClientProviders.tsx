"use client";

import dynamic from "next/dynamic";

const SmoothScroll    = dynamic(() => import("@/components/SmoothScroll"),    { ssr: false });
const Cursor          = dynamic(() => import("@/components/Cursor"),          { ssr: false });
const GrainOverlay    = dynamic(() => import("@/components/GrainOverlay"),    { ssr: false });
const SakuraPetals    = dynamic(() => import("@/components/SakuraPetals"),    { ssr: false });
const ScrollProgress  = dynamic(() => import("@/components/ScrollProgress"),  { ssr: false });
const QuickActions    = dynamic(() => import("@/components/QuickActions"),    { ssr: false });

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <GrainOverlay />
      <SakuraPetals />
      {children}
      <Cursor />
      <QuickActions />
    </SmoothScroll>
  );
}

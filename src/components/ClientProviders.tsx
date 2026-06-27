"use client";

import dynamic from "next/dynamic";

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });
const Cursor = dynamic(() => import("@/components/Cursor"), { ssr: false });
const GrainOverlay = dynamic(() => import("@/components/GrainOverlay"), { ssr: false });
const LoaderScreen = dynamic(() => import("@/components/LoaderScreen"), { ssr: false });
const SakuraPetals = dynamic(() => import("@/components/SakuraPetals"), { ssr: false });

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <LoaderScreen />
      <GrainOverlay />
      <SakuraPetals />
      {children}
      <Cursor />
    </SmoothScroll>
  );
}

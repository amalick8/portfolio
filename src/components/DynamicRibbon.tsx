"use client";

import dynamic from "next/dynamic";

const RibbonScene = dynamic(() => import("@/components/RibbonScene"), {
  ssr: false,
  loading: () => <div className="w-full h-[50vh] -my-16" />,
});

export default function DynamicRibbon() {
  return <RibbonScene />;
}

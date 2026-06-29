"use client";

import { useEffect } from "react";

export default function SiteGuard() {
  useEffect(() => {
    // Disable right-click
    const noContext = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", noContext);

    // Disable text selection via keyboard shortcuts
    const noSelect = (e: KeyboardEvent) => {
      // F12, Ctrl+U, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+S
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.key === "u") ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c", "k"].includes(e.key.toLowerCase())) ||
        (e.ctrlKey && e.key === "s") ||
        (e.metaKey && e.key === "u") ||
        (e.metaKey && e.shiftKey && ["i", "j", "c"].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener("keydown", noSelect);

    // Detect devtools open via size difference
    const devtoolsCheck = () => {
      const threshold = 160;
      if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
      ) {
        document.body.style.display = "none";
      } else {
        document.body.style.display = "";
      }
    };
    window.addEventListener("resize", devtoolsCheck);

    return () => {
      document.removeEventListener("contextmenu", noContext);
      document.removeEventListener("keydown", noSelect);
      window.removeEventListener("resize", devtoolsCheck);
    };
  }, []);

  return null;
}

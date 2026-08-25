"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CursorPosition {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: -40, y: -40 });
  const [isInteractive, setIsInteractive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      const target = event.target;
      setIsInteractive(target instanceof Element && Boolean(target.closest("a, button, input, select, textarea, [role='button']")));
    };

    const handlePointerLeave = () => setEnabled(false);
    const handlePointerEnter = () => setEnabled(true);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    document.documentElement.addEventListener("mouseenter", handlePointerEnter);
    document.documentElement.classList.add("custom-cursor-active");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- enable the cursor only after confirming a fine pointer
    setEnabled(true);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      document.documentElement.removeEventListener("mouseenter", handlePointerEnter);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[300] rounded-full border border-white/80 mix-blend-difference"
      animate={{
        x: position.x - (isInteractive ? 20 : 12),
        y: position.y - (isInteractive ? 20 : 12),
        width: isInteractive ? 40 : 24,
        height: isInteractive ? 40 : 24,
        opacity: enabled ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 650, damping: 38, mass: 0.18 }}
    />
  );
}

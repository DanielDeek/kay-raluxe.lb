"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-40);
  const cursorY = useMotionValue(-40);
  const springX = useSpring(cursorX, { stiffness: 650, damping: 38, mass: 0.18 });
  const springY = useSpring(cursorY, { stiffness: 650, damping: 38, mass: 0.18 });
  const [isInteractive, setIsInteractive] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const interactiveRef = useRef(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      cursorX.set(event.clientX - 12);
      cursorY.set(event.clientY - 12);
      const target = event.target;
      const nextInteractive = target instanceof Element && Boolean(target.closest("a, button, input, select, textarea, [role='button']"));
      if (nextInteractive !== interactiveRef.current) {
        interactiveRef.current = nextInteractive;
        setIsInteractive(nextInteractive);
      }
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
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[300] h-6 w-6 rounded-full border border-white/80 mix-blend-difference"
      style={{ x: springX, y: springY }}
      animate={{ scale: isInteractive ? 1.65 : 1, opacity: enabled ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 650, damping: 38, mass: 0.18 }}
    />
  );
}

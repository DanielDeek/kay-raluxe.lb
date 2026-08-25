"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LETTERS = "KAY RELUXE".split("");

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("kr-loaded")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time check on mount
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("kr-loaded", "1");
    }, 1900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-charcoal"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1], delay: 0.15 },
          }}
        >
          <div className="flex overflow-hidden">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                className="font-display text-3xl tracking-[0.35em] text-ivory sm:text-5xl"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.045,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
          <motion.div
            className="absolute bottom-16 h-px bg-champagne"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

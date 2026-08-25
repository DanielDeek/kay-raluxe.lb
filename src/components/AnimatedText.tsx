"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  once?: boolean;
  align?: "left" | "center";
  id?: string;
  animateOnMount?: boolean;
}

export default function AnimatedText({
  text,
  as = "h2",
  className,
  delay = 0,
  once = true,
  align = "left",
  id,
  animateOnMount = false,
}: AnimatedTextProps) {
  const words = text.split(" ");
  const Tag = as;

  return (
    <Tag id={id} className={cn("overflow-hidden", align === "center" && "text-center", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-1 pr-[0.28em]">
            <motion.span
              className="inline-block"
              initial={{ y: "115%" }}
              animate={animateOnMount ? { y: "0%" } : undefined}
              whileInView={animateOnMount ? undefined : { y: "0%" }}
              viewport={animateOnMount ? undefined : { once, margin: "-10% 0px" }}
              transition={{
                duration: 0.8,
                delay: delay + i * 0.045,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

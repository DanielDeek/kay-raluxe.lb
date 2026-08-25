"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(align === "center" ? "text-center" : "text-left", className)}
    >
      {eyebrow && (
        <span
          className={cn(
            "mb-3 block font-sans text-xs font-semibold uppercase tracking-[0.25em]",
            light ? "text-champagne" : "text-mutedBrown"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-3xl leading-[1.05] sm:text-4xl lg:text-5xl",
          light ? "text-ivory" : "text-charcoal"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-xl font-sans text-sm leading-relaxed sm:text-base",
            align === "center" && "mx-auto",
            light ? "text-ivory/75" : "text-charcoal/60"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedText from "./AnimatedText";
import { editorialImage } from "@/lib/data/images";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative min-h-[620px] h-[calc(100svh-32px)] max-h-[900px] w-full overflow-hidden bg-charcoal">
      <motion.div style={{ scale: imageScale, y: imageY }} className="absolute inset-0">
        <Image
          src={editorialImage("kr-hero-main", 1800, 1500, 1)}
          alt="Woman wearing a refined Kay Reluxe evening look"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_24%] sm:object-[center_24%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-charcoal/10 to-charcoal/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-charcoal/15" />
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col items-start justify-end px-5 pb-32 text-left sm:px-10 sm:pb-20 lg:px-16 lg:pb-24"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-champagne"
        >
          The new season
        </motion.span>
        <AnimatedText
          text="Dress for the way you feel."
          as="h1"
          id="hero-title"
          delay={0.45}
          animateOnMount
          className="max-w-[300px] font-display text-[2.75rem] leading-[0.95] text-white drop-shadow-sm sm:max-w-3xl sm:text-7xl lg:text-[clamp(5rem,8vw,8.5rem)]"
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-md font-sans text-sm leading-relaxed text-ivory/80 sm:text-base"
        >
          Curated silhouettes for days that become nights, and the version of you that owns the room.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
        >
          <Link
            href="/collections/new-arrivals"
            className="inline-flex min-h-12 items-center justify-center bg-ivory px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-charcoal transition-colors hover:bg-champagne"
          >
            Shop New Collection
          </Link>
          <Link
            href="/collections/best-sellers"
            className="inline-flex min-h-12 items-center justify-center border border-ivory/70 px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-ivory transition-colors hover:bg-ivory hover:text-charcoal"
          >
            Explore Best Sellers
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex flex-col items-center gap-2 text-ivory/70 sm:bottom-8"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-ivory/50"
        />
      </motion.div>
    </section>
  );
}

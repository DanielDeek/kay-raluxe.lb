"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const next = () => setActive((i) => (i + 1) % images.length);
  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);

  return (
    <div data-gsap-reveal>
      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <div className="flex shrink-0 gap-3 overflow-x-auto sm:w-20 sm:flex-col sm:overflow-visible">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={active === i}
              className={cn(
                "relative h-16 w-14 shrink-0 overflow-hidden border-2 sm:h-20 sm:w-20",
                active === i ? "border-charcoal" : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="80px" quality={70} />
            </button>
          ))}
        </div>

        <div className="relative flex-1">
          <button
            onClick={() => setFullscreen(true)}
            className="group relative block aspect-[4/5] w-full overflow-hidden bg-beige"
            aria-label="Open fullscreen gallery"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[active]}
                  alt={`${name} — view ${active + 1}`}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  quality={75}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            </AnimatePresence>
            <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 text-charcoal">
              <ZoomIn className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-charcoal/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${name} fullscreen gallery`}
          >
            <button
              onClick={() => setFullscreen(false)}
              aria-label="Close fullscreen gallery"
              className="absolute right-5 top-5 text-ivory hover:text-champagne"
            >
              <X className="h-7 w-7" />
            </button>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory hover:text-champagne sm:left-8"
            >
              <ChevronLeft className="h-9 w-9" />
            </button>
            <div className="relative h-[75vh] w-[90vw] sm:w-[70vw]">
              <Image src={images[active]} alt={`${name} — view ${active + 1}`} fill className="object-contain" sizes="90vw" quality={75} />
            </div>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory hover:text-champagne sm:right-8"
            >
              <ChevronRight className="h-9 w-9" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

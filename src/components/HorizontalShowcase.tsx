"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { displayPrice, formatPrice } from "@/lib/utils";

export default function HorizontalShowcase({ products }: { products: Product[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (reduceMotion || !isDesktop || !sectionRef.current || !trackRef.current) return;

    let ctx: gsap.Context | undefined;
    let mounted = true;

    (async () => {
      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);
      if (!mounted || !sectionRef.current || !trackRef.current) return;

      ctx = gsap.context(() => {
        const track = trackRef.current!;
        const distance = track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${distance}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }, sectionRef);
    })();

    return () => {
      mounted = false;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-charcoal py-20 lg:h-screen lg:py-0">
      <div className="lg:flex lg:h-full lg:items-center">
        <div ref={trackRef} className="flex flex-col gap-10 px-6 sm:px-10 lg:flex-row lg:items-center lg:gap-8 lg:px-16">
          <div className="shrink-0 lg:w-[380px]">
            <span className="mb-3 block font-sans text-xs font-semibold uppercase tracking-[0.25em] text-champagne">
              The Edit
            </span>
            <h2 className="font-display text-4xl leading-[1.05] text-ivory sm:text-5xl">
              Pieces worth pausing for.
            </h2>
            <p className="mt-4 max-w-sm font-sans text-sm text-ivory/65">
              A slower look at what defines this season — scroll to explore.
            </p>
          </div>
          {products.map((product) => {
            const { current, original } = displayPrice(product);
            return (
              <Link
                key={product.id}
                href={`/shop/${product.slug}`}
                className="group relative w-[240px] shrink-0 sm:w-[300px]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-beige">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="300px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-sans text-sm text-ivory">{product.name}</span>
                  <span className="font-sans text-sm text-ivory/70">{formatPrice(current)}</span>
                </div>
                {original && (
                  <span className="font-sans text-xs text-ivory/40 line-through">{formatPrice(original)}</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { editorialImage } from "@/lib/data/images";
import { useSiteContent } from "@/context/SiteContentContext";

export default function FeaturedCollection() {
  const { getContent } = useSiteContent();
  const image = getContent("home_featured_image", editorialImage("kr-featured-collection", 1200, 1440, 7));
  return (
    <section className="bg-white py-12 text-ivory md:py-16 lg:py-20">
      <div className="container">
        <div className="grid overflow-hidden md:grid-cols-[1.08fr_0.92fr]">
          <div data-gsap-reveal className="relative min-h-[430px] md:min-h-[560px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt="Editorial portrait from the Luxe Avenue evening edit"
              className="absolute inset-0 h-full w-full object-cover object-[center_28%]"
            />
          </div>
          <div data-gsap-reveal className="flex flex-col justify-center bg-beige px-7 py-12 text-charcoal sm:px-12 md:px-14 lg:px-20">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-mutedBrown">{getContent("home_featured_eyebrow", "The evening edit")}</span>
            <h2 className="mt-4 max-w-md font-display text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">{getContent("home_featured_title", "The room changes when you arrive.")}</h2>
            <p className="mt-5 max-w-sm font-sans text-sm leading-relaxed text-charcoal/65 sm:text-base">
              {getContent("home_featured_description", "Fluid dresses, confident tailoring, and the finishing details for plans that start late and stay out longer.")}
            </p>
            <Link
              href="/collections/dresses"
              className="mt-8 inline-flex w-fit items-center gap-3 border-b border-charcoal/40 pb-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition-colors hover:border-charcoal"
            >
              Explore the edit
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

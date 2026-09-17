"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { editorialImage } from "@/lib/data/images";
import { useSiteContent } from "@/context/SiteContentContext";

export default function PromoBanner() {
  const { getContent } = useSiteContent();
  const image = getContent("home_promo_image", editorialImage("kr-seasonal-banner", 1400, 700, 12));
  return (
    <section className="bg-beige py-12 md:py-16 lg:py-20">
      <div className="container">
        <div data-gsap-reveal className="relative min-h-[300px] overflow-hidden bg-mutedBrown sm:min-h-[360px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt="Luxe Avenue seasonal collection campaign"
            className="absolute inset-0 h-full w-full object-cover object-[center_38%]"
          />
          <div className="absolute inset-0 bg-charcoal/45" />
          <div className="relative flex min-h-[300px] max-w-lg flex-col justify-center px-7 py-10 sm:min-h-[360px] sm:px-12">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-champagne">{getContent("home_promo_eyebrow", "A new season, softly")}</span>
            <h2 className="mt-4 font-display text-4xl leading-none text-ivory sm:text-5xl">{getContent("home_promo_title", "Pieces for the plans ahead.")}</h2>
            <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-ivory/80">
              {getContent("home_promo_description", "Light layers and occasion-ready silhouettes, selected for the warmer days in between.")}
            </p>
            <Link
              href={getContent("home_promo_link", "/collections/summer-collection")}
              className="mt-7 inline-flex w-fit items-center gap-2 border-b border-ivory/60 pb-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-ivory hover:border-champagne hover:text-champagne"
            >
              {getContent("home_promo_label", "Shop the seasonal edit")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

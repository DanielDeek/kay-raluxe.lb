"use client";

import AnimatedText from "@/components/AnimatedText";
import Reveal from "@/components/Reveal";
import { editorialImage } from "@/lib/data/images";
import { useSiteContent } from "@/context/SiteContentContext";

export default function AboutHero() {
  const { getContent } = useSiteContent();
  const image = getContent("page_about_image", editorialImage("kr-about-hero", 1800, 1400));

  return (
    <section className="relative flex h-[55vh] min-h-[380px] items-end overflow-hidden sm:h-[70vh]">
      <Reveal className="absolute inset-0" y={0}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="Luxe Avenue brand imagery" className="absolute inset-0 h-full w-full object-cover" />
      </Reveal>
      <div className="absolute inset-0 bg-gradient-to-t from-ivory/55 via-ivory/10 to-transparent" />
      <div className="container relative z-10 pb-12">
        <span className="mb-3 block font-sans text-xs font-semibold uppercase tracking-[0.25em] text-mutedBrown">{getContent("page_about_eyebrow", "Our Story")}</span>
        <AnimatedText text={getContent("page_about_title", "Fashion, made personal.")} as="h1" animateOnMount className="font-display text-4xl text-charcoal sm:text-6xl" />
      </div>
    </section>
  );
}

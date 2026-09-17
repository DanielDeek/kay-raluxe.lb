"use client";

import AnimatedText from "@/components/AnimatedText";
import { useSiteContent } from "@/context/SiteContentContext";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  contentPrefix?: string;
}

export default function PageIntro({ eyebrow, title, description, image, imageAlt, contentPrefix }: PageIntroProps) {
  const { getContent } = useSiteContent();
  const contentKey = (field: string) => contentPrefix ? `${contentPrefix}_${field}` : field;
  const resolvedEyebrow = contentPrefix ? getContent(contentKey("eyebrow"), eyebrow) : eyebrow;
  const resolvedTitle = contentPrefix ? getContent(contentKey("title"), title) : title;
  const resolvedDescription = contentPrefix ? getContent(contentKey("description"), description || "") : description;
  const resolvedImage = contentPrefix ? getContent(contentKey("image"), image) : image;
  return (
    <section aria-labelledby="page-hero-title" className="relative min-h-[440px] overflow-hidden bg-charcoal sm:min-h-[520px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolvedImage}
        alt={imageAlt}
        data-gsap-parallax
        className="absolute inset-0 h-full w-full object-cover object-[center_32%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ivory/85 via-ivory/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ivory/65 via-transparent to-ivory/10" />
      <div className="container relative z-10 flex min-h-[440px] items-end pb-12 pt-32 sm:min-h-[520px] sm:pb-16 lg:pb-20">
        <div className="max-w-3xl text-charcoal">
          <span className="mb-4 block font-sans text-xs font-semibold uppercase tracking-[0.3em] text-mutedBrown">
            {resolvedEyebrow}
          </span>
          <AnimatedText
            text={resolvedTitle}
            as="h1"
            id="page-hero-title"
            animateOnMount
            className="font-display text-5xl leading-[0.96] text-charcoal sm:text-7xl lg:text-8xl"
          />
          {resolvedDescription && (
            <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-charcoal/70 sm:text-base">
              {resolvedDescription}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

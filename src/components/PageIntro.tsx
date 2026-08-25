import AnimatedText from "@/components/AnimatedText";
import Image from "next/image";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
}

export default function PageIntro({ eyebrow, title, description, image, imageAlt }: PageIntroProps) {
  return (
    <section aria-labelledby="page-hero-title" className="relative min-h-[440px] overflow-hidden bg-charcoal sm:min-h-[520px]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        unoptimized
        sizes="100vw"
        data-gsap-parallax
        className="object-cover object-[center_32%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ivory/70 via-ivory/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ivory/55 via-transparent to-ivory/10" />
      <div className="container relative z-10 flex min-h-[440px] items-end pb-12 pt-32 sm:min-h-[520px] sm:pb-16 lg:pb-20">
        <div className="max-w-3xl text-charcoal">
          <span className="mb-4 block font-sans text-xs font-semibold uppercase tracking-[0.3em] text-mutedBrown">
            {eyebrow}
          </span>
          <AnimatedText
            text={title}
            as="h1"
            id="page-hero-title"
            animateOnMount
            className="font-display text-5xl leading-[0.96] text-charcoal sm:text-7xl lg:text-8xl"
          />
          {description && (
            <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-white drop-shadow-sm sm:text-base">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

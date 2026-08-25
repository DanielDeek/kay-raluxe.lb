import type { Metadata } from "next";
import Image from "next/image";
import AnimatedText from "@/components/AnimatedText";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/config";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { editorialImage } from "@/lib/data/images";

export const metadata: Metadata = {
  title: "About",
  description: "The story, mission and values behind Kay Reluxe.",
};

const VALUES = [
  {
    title: "Considered Design",
    body: "Every piece is chosen with intention â€” for fit, for feel, and for how it makes you move through your day.",
  },
  {
    title: "Confidence First",
    body: "Fashion should meet you where you are. We style for real bodies, real moments, real confidence.",
  },
  {
    title: "Made Accessible",
    body: "Elevated fashion shouldn't mean out of reach. We keep our edit focused so quality stays in every piece.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-28">
      <section className="relative flex h-[55vh] min-h-[380px] items-end overflow-hidden sm:h-[70vh]">
        <Reveal className="absolute inset-0" y={0}>
          <Image
            src={editorialImage("kr-about-hero", 1800, 1400)}
            alt="Kay Reluxe brand imagery"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </Reveal>
        <div className="absolute inset-0 bg-gradient-to-t from-ivory/55 via-ivory/10 to-transparent" />
        <div className="container relative z-10 pb-12">
          <span className="mb-3 block font-sans text-xs font-semibold uppercase tracking-[0.25em] text-mutedBrown">
            Our Story
          </span>
          <AnimatedText text="Fashion, made personal." as="h1" animateOnMount className="font-display text-4xl text-charcoal sm:text-6xl" />
        </div>
      </section>

      <section className="container py-20 sm:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal x={-24} className="flex flex-col justify-center">
            <SectionHeading
              eyebrow="Who We Are"
              title="Curated for every version of you."
              description="Kay Reluxe began with a simple idea: that getting dressed should feel like an act of confidence, not compromise. We curate pieces that move easily between your everyday and your evenings â€” considered fabrics, flattering cuts, and details that hold up to a second look."
            />
            <p className="mt-5 font-sans text-sm leading-relaxed text-charcoal/65">
              Kay Reluxe brings Turkish outfits and trendy pieces together in one considered edit, with delivery all over Lebanon and size swaps available when you need a different fit.
            </p>
          </Reveal>
          <Reveal x={32}
            className="relative aspect-[4/5] w-full overflow-hidden"
          >
            <Image
              src={editorialImage("kr-about-1", 1000, 1250)}
              alt="Kay Reluxe styling detail"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="grain bg-beige py-20 sm:py-28">
        <div className="container">
          <SectionHeading eyebrow="What We Stand For" title="Mission & Values" align="center" className="mb-14" />
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {VALUES.map((value, index) => (
              <Reveal
                key={value.title}
                delay={index * 0.1}
                className="text-center"
              >
                <h3 className="font-display text-2xl text-charcoal">{value.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal/65">{value.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-20 sm:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal x={-32}
            className="relative aspect-[4/5] w-full overflow-hidden lg:order-2"
          >
            <Image
              src={editorialImage("kr-about-2", 1000, 1250)}
              alt="Woman wearing Kay Reluxe"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal x={24} className="lg:order-1">
            <SectionHeading
              eyebrow="Our Purpose"
              title="Helping women feel like themselves."
              description="Confidence looks different on everyone. Our role isn't to define it â€” it's to give you pieces that let your own version of it come through, whatever the occasion."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton label="Chat with Us" />
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-charcoal px-6 py-3.5 font-sans text-sm text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
              >
                <InstagramIcon className="h-4 w-4" />
                {INSTAGRAM_HANDLE}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}


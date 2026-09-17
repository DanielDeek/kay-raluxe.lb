import type { Metadata } from "next";
import Image from "next/image";
import AboutHero from "@/components/AboutHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/config";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { editorialImage } from "@/lib/data/images";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
  description: "The story, mission and values behind Luxe Avenue.",
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
      <AboutHero />

      <section className="container py-20 sm:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal x={-24} className="flex flex-col justify-center">
            <SectionHeading
              eyebrow="Who We Are"
              title="Curated for every version of you."
              description="Luxe Avenue began with a simple idea: that getting dressed should feel like an act of confidence, not compromise. We curate pieces that move easily between your everyday and your evenings â€” considered fabrics, flattering cuts, and details that hold up to a second look."
            />
            <p className="mt-5 font-sans text-sm leading-relaxed text-charcoal/65">
              Luxe Avenue brings Turkish outfits and trendy pieces together in one considered edit, with delivery all over Lebanon and size swaps available when you need a different fit.
            </p>
          </Reveal>
          <Reveal x={32}
            className="relative aspect-[4/5] w-full overflow-hidden"
          >
            <Image
              src={editorialImage("kr-about-1", 1000, 1250)}
              alt="Luxe Avenue styling detail"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={75}
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
              alt="Woman wearing Luxe Avenue"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={75}
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


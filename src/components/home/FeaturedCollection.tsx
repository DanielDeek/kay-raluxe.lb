import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { editorialImage } from "@/lib/data/images";

export default function FeaturedCollection() {
  return (
    <section className="bg-white py-12 text-ivory md:py-16 lg:py-20">
      <div className="container">
        <div className="grid overflow-hidden md:grid-cols-[1.08fr_0.92fr]">
          <div data-gsap-reveal className="relative min-h-[430px] md:min-h-[560px]">
            <Image
              src={editorialImage("kr-featured-collection", 1500, 1800, 7)}
              alt="Editorial portrait from the Kay Reluxe evening edit"
              fill
              sizes="(max-width: 767px) 100vw, 54vw"
              className="object-cover object-[center_28%]"
            />
          </div>
          <div data-gsap-reveal className="flex flex-col justify-center bg-beige px-7 py-12 text-charcoal sm:px-12 md:px-14 lg:px-20">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-mutedBrown">The evening edit</span>
            <h2 className="mt-4 max-w-md font-display text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">The room changes when you arrive.</h2>
            <p className="mt-5 max-w-sm font-sans text-sm leading-relaxed text-charcoal/65 sm:text-base">
              Fluid dresses, confident tailoring, and the finishing details for plans that start late and stay out longer.
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

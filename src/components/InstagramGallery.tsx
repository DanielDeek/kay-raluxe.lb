import Image from "next/image";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/config";
import { products } from "@/lib/data/products";
import Reveal from "@/components/Reveal";

const tiles = products.slice(0, 6).map((p) => p.image);

export default function InstagramGallery() {
  return (
    <section className="bg-beige py-12 md:py-16 lg:py-20">
      <div className="container">
        <div data-gsap-reveal className="mb-8 flex flex-col items-center text-center md:mb-10">
          <InstagramIcon className="mb-4 h-6 w-6 text-mutedBrown" />
          <h2 className="font-display text-4xl leading-none text-charcoal sm:text-5xl">Follow Along</h2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 font-sans text-sm text-mutedBrown underline underline-offset-4 transition-colors hover:text-charcoal"
          >
            {INSTAGRAM_HANDLE}
          </a>
        </div>
        <div data-gsap-reveal className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
          {tiles.map((src, i) => (
            <Reveal
              key={src + i}
              delay={i * 0.05}
              y={0}
              className="relative aspect-square overflow-hidden bg-beige"
            >
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View Kay Reluxe look ${i + 1} on Instagram`}
                className="group absolute inset-0 block"
              >
                <Image
                  src={src}
                  alt={`Kay Reluxe fashion look ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  quality={70}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/40">
                  <InstagramIcon className="h-5 w-5 text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <a
          data-gsap-reveal
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-8 inline-flex min-h-11 items-center justify-center border border-charcoal/30 px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-ivory"
        >
          View on Instagram
        </a>
      </div>
    </section>
  );
}

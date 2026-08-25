import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { editorialImage } from "@/lib/data/images";
import { products } from "@/lib/data/products";
import { Product } from "@/types";
import { formatPrice, displayPrice } from "@/lib/utils";

const LOOK_SLUGS = ["noor-tailored-blazer", "camille-silk-cami", "isla-wide-trouser"];

export default function ShopTheLook() {
  const lookProducts = LOOK_SLUGS
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product));

  return (
    <section className="bg-ivory py-12 md:py-16 lg:py-20">
      <div className="container">
        <div data-gsap-reveal className="mb-8 flex items-end justify-between gap-6 md:mb-10">
          <div>
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-mutedBrown">Styled together</span>
            <h2 className="mt-3 font-display text-4xl leading-none text-charcoal sm:text-5xl">Shop the look</h2>
          </div>
          <p className="hidden max-w-xs pb-1 text-right font-sans text-sm leading-relaxed text-charcoal/60 sm:block">
            One outfit, three pieces, plenty of ways to make it yours.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div data-gsap-reveal className="relative aspect-[4/5] overflow-hidden bg-beige sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={editorialImage("kr-shop-the-look", 1200, 1500, 3)}
              alt="Model wearing a layered Kay Reluxe outfit"
              fill
              sizes="(max-width: 1023px) 100vw, 55vw"
              quality={75}
              className="object-cover object-[center_32%]"
            />
          </div>
          <div data-gsap-reveal className="flex flex-col justify-center">
            <p className="max-w-md font-display text-3xl leading-tight text-charcoal sm:text-4xl">
              A soft base, a sharper layer, and room to move.
            </p>
            <div className="mt-7 border-t border-charcoal/15">
              {lookProducts.map((product) => {
                const { current, original } = displayPrice(product);
                return (
                  <Link key={product.id} href={`/shop/${product.slug}`} className="group flex items-center gap-4 border-b border-charcoal/15 py-4">
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-beige">
                      <Image src={product.image} alt={product.name} fill sizes="64px" quality={70} className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-sans text-sm text-charcoal">{product.name}</h3>
                      <p className="mt-1 font-sans text-xs text-charcoal/50">{product.category}</p>
                    </div>
                    <span className="flex shrink-0 items-center gap-2 font-sans text-sm text-charcoal">
                      {formatPrice(current)}
                      {original && <span className="text-xs text-charcoal/40 line-through">{formatPrice(original)}</span>}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
            <Link href="/shop" className="mt-8 inline-flex w-fit items-center gap-2 border-b border-charcoal/30 pb-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-charcoal hover:border-charcoal">
              Browse all pieces
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

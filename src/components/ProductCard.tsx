"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { displayPrice, formatPrice } from "@/lib/utils";

export default function ProductCard({
  product,
  priority = false,
  imageSizes = "(max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw",
}: {
  product: Product;
  priority?: boolean;
  imageSizes?: string;
}) {
  const { current, original } = displayPrice(product);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-beige">
        <Link href={`/shop/${product.slug}`} className="absolute inset-0 block" aria-label={`View ${product.name}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            preload={priority}
            sizes={imageSizes}
            quality={75}
            className="object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <Image
            src={product.hoverImage}
            alt=""
            aria-hidden="true"
            fill
            sizes={imageSizes}
            quality={75}
            className="object-cover opacity-0 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
          />

          <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-charcoal px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-ivory">
                New
              </span>
            )}
            {original && (
              <span className="bg-champagne px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-charcoal">
                Sale
              </span>
            )}
            {!product.inStock && (
              <span className="bg-ivory/90 px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-charcoal">
                Sold Out
              </span>
            )}
          </div>

        </Link>

      </div>

      <Link href={`/shop/${product.slug}`} className="group block">
        <div className="mt-3.5 flex items-start justify-between gap-2">
          <div>
            <h3 className="font-sans text-sm text-charcoal">{product.name}</h3>
            <p className="mt-1 font-sans text-xs capitalize text-charcoal/50">{product.category}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-sans text-sm text-charcoal">{formatPrice(current)}</span>
            {original && (
              <span className="font-sans text-xs text-charcoal/40 line-through">{formatPrice(original)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

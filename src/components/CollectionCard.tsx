"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Collection } from "@/types";

export default function CollectionCard({ collection, size = "default" }: { collection: Collection; size?: "default" | "large" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/collections/${collection.slug}`} className="group relative block overflow-hidden">
        <div className={size === "large" ? "relative aspect-[4/3] sm:aspect-[16/9]" : "relative aspect-[3/4]"}>
          <Image
            src={collection.image}
            alt={collection.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/5 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="break-normal font-display text-2xl text-ivory sm:text-3xl">{collection.title}</h3>
                <p className="mt-1 break-normal font-sans text-xs text-ivory/75 sm:text-sm">{collection.subtitle}</p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ivory text-charcoal transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

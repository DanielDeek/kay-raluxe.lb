import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Collection } from "@/types";
import Reveal from "@/components/Reveal";

export default function CollectionCard({
  collection,
  size = "default",
  imageSizes = "(max-width: 640px) 50vw, (max-width: 1023px) 33vw, 16vw",
  headingLevel = "h3",
}: {
  collection: Collection;
  size?: "default" | "large";
  imageSizes?: string;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <Reveal y={30}>
      <Link href={`/collections/${collection.slug}`} className="group relative block overflow-hidden">
        <div className={size === "large" ? "relative aspect-[4/3] sm:aspect-[16/9]" : "relative aspect-[3/4]"}>
          <Image
            src={collection.image}
            alt={collection.title}
            fill
            sizes={imageSizes}
            quality={70}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/5 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0 flex-1">
                <Heading className="break-normal font-display text-2xl text-ivory sm:text-3xl">{collection.title}</Heading>
                <p className="mt-1 break-normal font-sans text-xs text-ivory/75 sm:text-sm">{collection.subtitle}</p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ivory text-charcoal transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

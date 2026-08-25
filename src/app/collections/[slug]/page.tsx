import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import AnimatedText from "@/components/AnimatedText";
import CollectionBrowser from "@/components/CollectionBrowser";
import EmptyState from "@/components/EmptyState";
import { getCollectionBySlug, collections } from "@/lib/data/collections";
import { products, getNewArrivals, getSaleProducts, getBestSellerProducts } from "@/lib/data/products";
import { PackageSearch } from "lucide-react";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return {};
  return { title: collection.title, description: collection.subtitle };
}

export default async function CollectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  let items = products;
  if (collection.slug === "new-arrivals") items = getNewArrivals();
  else if (collection.slug === "sale") items = getSaleProducts();
  else if (collection.slug === "best-sellers") items = getBestSellerProducts();
  else if (collection.category !== "all") items = products.filter((p) => p.category === collection.category);

  return (
    <div className="pb-28">
      <section className="relative flex h-[45vh] min-h-[320px] w-full items-end overflow-hidden sm:h-[55vh]">
        <Image src={collection.image} alt={collection.title} fill preload sizes="100vw" quality={75} className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory/55 via-ivory/10 to-transparent" />
        <div className="container relative z-10 pb-12">
          <AnimatedText text={collection.title} as="h1" animateOnMount className="font-display text-4xl text-charcoal sm:text-6xl" />
          <p className="mt-3 font-sans text-sm text-white drop-shadow-sm sm:text-base">{collection.subtitle}</p>
        </div>
      </section>

      <section className="container pt-14">
        {items.length === 0 ? (
          <EmptyState icon={<PackageSearch className="h-10 w-10" />} title="Nothing here yet" description="Check back soon for new pieces in this collection." />
        ) : (
          <CollectionBrowser products={items} />
        )}
      </section>
    </div>
  );
}


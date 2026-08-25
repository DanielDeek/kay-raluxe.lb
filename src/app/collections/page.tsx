import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import CollectionCard from "@/components/CollectionCard";
import { collections } from "@/lib/data/collections";
import { editorialImage } from "@/lib/data/images";

export const metadata: Metadata = {
  title: "Collections",
  alternates: { canonical: "/collections" },
  description: "Explore Kay Raluxe collections â€” New Arrivals, Dresses, Sets, Summer and more.",
};

export default function CollectionsPage() {
  return (
    <div className="pb-28">
      <PageIntro
        eyebrow="Discover"
        title="Collections, curated."
        description="Find the edit that fits the moment, from new arrivals to easy summer layers."
        image={editorialImage("kr-page-collections", 1100, 1000, 6)}
        imageAlt="Kay Raluxe curated fashion collection"
      />

      <section className="container grid grid-cols-1 gap-4 py-16 sm:grid-cols-2 md:py-20 lg:grid-cols-3 lg:py-24">
        {collections.map((collection) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            imageSizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            headingLevel="h2"
          />
        ))}
      </section>
    </div>
  );
}


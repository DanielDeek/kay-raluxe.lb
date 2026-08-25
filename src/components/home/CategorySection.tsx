import SectionHeading from "@/components/SectionHeading";
import CollectionCard from "@/components/CollectionCard";
import { collections } from "@/lib/data/collections";

const CATEGORY_SLUGS = ["new-arrivals", "dresses", "tops", "bottoms", "matching-sets", "accessories"];

export default function CategorySection() {
  const categories = CATEGORY_SLUGS
    .map((slug) => collections.find((collection) => collection.slug === slug))
    .filter((collection): collection is (typeof collections)[number] => Boolean(collection));

  return (
    <section className="bg-beige py-12 md:py-16 lg:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Shop by category"
          title="Start with what you are looking for."
          description="A considered edit of pieces made to move with your wardrobe."
        />
        <div data-gsap-reveal className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-10 lg:grid-cols-6 lg:gap-4">
          {categories.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  );
}

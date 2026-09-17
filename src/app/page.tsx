import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ProductSection from "@/components/home/ProductSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import PromoBanner from "@/components/home/PromoBanner";
import ShopTheLook from "@/components/home/ShopTheLook";
import BenefitsSection from "@/components/home/BenefitsSection";
import InstagramGallery from "@/components/InstagramGallery";
import { getBestSellerProducts, getNewArrivals } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Home",
  alternates: { canonical: "/" },
  description: "Luxe Avenue — curated fashion for every version of you.",
};

export default function HomePage() {
  return (
    <div className="homepage-sections">
      <Hero />
      <ProductSection
        eyebrow="Just in"
        title="New Arrivals"
        description="Fresh silhouettes, easy layers, and pieces with somewhere to go."
        products={getNewArrivals().slice(0, 4)}
        href="/collections/new-arrivals"
      />
      <CategorySection />
      <FeaturedCollection />
      <ProductSection
        eyebrow="Most loved"
        title="Best Sellers"
        description="The pieces that keep finding their way into weekend plans and late dinners."
        products={getBestSellerProducts().slice(0, 4)}
        href="/collections/best-sellers"
      />
      <PromoBanner />
      <ShopTheLook />
      <BenefitsSection />
      <InstagramGallery />
    </div>
  );
}

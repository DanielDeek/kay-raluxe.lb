import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import SectionHeading from "@/components/SectionHeading";
import { Product } from "@/types";

interface ProductSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  products: Product[];
  href: string;
}

export default function ProductSection({ eyebrow, title, description, products, href }: ProductSectionProps) {
  return (
    <section className="bg-ivory py-12 md:py-16 lg:py-20">
      <div className="container">
        <div data-gsap-reveal className="mb-8 flex items-end justify-between gap-6 md:mb-10">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <Link
            href={href}
            className="group hidden shrink-0 items-center gap-2 pb-1 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-mutedBrown transition-colors hover:text-charcoal sm:flex"
          >
            View all
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <ProductGrid products={products} />
        <Link
          href={href}
          className="mt-8 inline-flex items-center gap-2 border-b border-charcoal/30 pb-1 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-charcoal sm:hidden"
        >
          View all
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

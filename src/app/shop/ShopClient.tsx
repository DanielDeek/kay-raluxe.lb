"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { PackageSearch } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import ProductFilters, { Filters } from "@/components/ProductFilters";
import EmptyState from "@/components/EmptyState";
import PageIntro from "@/components/PageIntro";
import { products } from "@/lib/data/products";
import { editorialImage } from "@/lib/data/images";
import { displayPrice } from "@/lib/utils";

const DEFAULT_FILTERS: Filters = {
  search: "",
  categories: [],
  sizes: [],
  colors: [],
  price: "all",
  collection: "all",
  sort: "featured",
  onlyNew: false,
  onlySale: false,
};

export default function ShopClient() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const param = searchParams.get("filter");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing initial filter state from URL query params
    if (param === "new") setFilters((f) => ({ ...f, onlyNew: true }));
    if (param === "sale") setFilters((f) => ({ ...f, onlySale: true }));
    const category = searchParams.get("category");
    if (category) setFilters((f) => ({ ...f, categories: [category] }));
    const search = searchParams.get("search");
    if (search) setFilters((f) => ({ ...f, search }));
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...products];

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    if (filters.categories.length) {
      list = list.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.sizes.length) {
      list = list.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
    }
    if (filters.colors.length) {
      list = list.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)));
    }
    if (filters.onlyNew) list = list.filter((p) => p.isNew);
    if (filters.onlySale) list = list.filter((p) => p.salePrice);
    if (filters.collection === "new-arrivals") list = list.filter((p) => p.isNew);
    if (filters.collection === "best-sellers") list = list.filter((p) => p.isBestSeller ?? p.isFeatured);
    if (filters.collection === "sale") list = list.filter((p) => p.salePrice);
    if (filters.price !== "all") {
      list = list.filter((p) => {
        const price = displayPrice(p).current;
        return filters.price === "under-50" ? price < 50 : filters.price === "50-80" ? price >= 50 && price <= 80 : price > 80;
      });
    }

    switch (filters.sort) {
      case "price-asc":
        list.sort((a, b) => displayPrice(a).current - displayPrice(b).current);
        break;
      case "price-desc":
        list.sort((a, b) => displayPrice(b).current - displayPrice(a).current);
        break;
      case "newest":
        list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      default:
        list.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }

    return list;
  }, [filters]);

  return (
    <div>
      <PageIntro
        eyebrow="The Shop"
        title="Every piece, one place."
        description="Explore the full edit by category, size, color, price, and collection."
        image={editorialImage("kr-page-shop", 1100, 1000, 2)}
        imageAlt="Kay Reluxe fashion collection"
      />

      <section className="container py-16 md:py-20 lg:py-24">
        <ProductFilters filters={filters} onChange={setFilters} resultCount={filtered.length} view={view} onViewChange={setView} />

        {filtered.length === 0 ? (
          <EmptyState
            icon={<PackageSearch className="h-10 w-10" />}
            title="No pieces match yet"
            description="Try adjusting your filters or search for something else."
            action={
              <button
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="border border-charcoal px-6 py-3 font-sans text-sm text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
              >
                Reset Filters
              </button>
            }
          />
        ) : (
          <motion.div layout className="mt-8">
            <ProductGrid products={filtered} view={view} />
          </motion.div>
        )}
      </section>
    </div>
  );
}


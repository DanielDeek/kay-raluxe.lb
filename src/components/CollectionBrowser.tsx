"use client";

import { useMemo, useState } from "react";
import ProductGrid from "./ProductGrid";
import ProductFilters, { Filters } from "./ProductFilters";
import EmptyState from "./EmptyState";
import { Product } from "@/types";
import { displayPrice } from "@/lib/utils";

const initialFilters: Filters = { search: "", categories: [], sizes: [], colors: [], price: "all", collection: "all", sort: "featured", onlyNew: false, onlySale: false };

export default function CollectionBrowser({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const filtered = useMemo(() => {
    let result = products.filter((product) => {
      const query = filters.search.toLowerCase().trim();
      const price = displayPrice(product).current;
      return (!query || product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)) &&
        (!filters.sizes.length || product.sizes.some((size) => filters.sizes.includes(size))) &&
        (!filters.colors.length || product.colors.some((color) => filters.colors.includes(color.name))) &&
        (filters.price === "all" || (filters.price === "under-50" ? price < 50 : filters.price === "50-80" ? price >= 50 && price <= 80 : price > 80));
    });
    result = [...result].sort((a, b) => filters.sort === "price-asc" ? displayPrice(a).current - displayPrice(b).current : filters.sort === "price-desc" ? displayPrice(b).current - displayPrice(a).current : Number(b.isFeatured) - Number(a.isFeatured));
    return result;
  }, [filters, products]);

  return <>
    <ProductFilters filters={filters} onChange={setFilters} resultCount={filtered.length} view="grid" onViewChange={() => undefined} />
    {filtered.length ? <div className="mt-8"><ProductGrid products={filtered} /></div> : <EmptyState title="Nothing here yet" description="Try adjusting the filters or check back soon for new pieces." />}
  </>;
}

"use client";

import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  view?: "grid" | "list";
  priorityFirst?: boolean;
}

export default function ProductGrid({ products, view = "grid", priorityFirst = false }: ProductGridProps) {
  return (
    <div
      data-gsap-reveal
      className={cn(
        "grid gap-x-4 gap-y-10 sm:gap-x-6",
        view === "grid" ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1 sm:grid-cols-2"
      )}
    >
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={priorityFirst && i === 0}
          imageSizes={view === "grid" ? "(max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw" : "(max-width: 640px) 100vw, 50vw"}
        />
      ))}
    </div>
  );
}

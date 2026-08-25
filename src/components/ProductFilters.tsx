"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Filters {
  search: string;
  categories: string[];
  sizes: string[];
  colors: string[];
  price: "all" | "under-50" | "50-80" | "over-80";
  collection: "all" | "new-arrivals" | "best-sellers" | "sale";
  sort: "featured" | "price-asc" | "price-desc" | "newest";
  onlyNew: boolean;
  onlySale: boolean;
}

export const ALL_CATEGORIES = ["dresses", "tops", "sets", "bottoms", "accessories", "summer"];
export const ALL_SIZES = ["XS", "S", "M", "L", "XL"];
export const ALL_COLORS = [
  { name: "Charcoal", hex: "#171717" },
  { name: "Champagne", hex: "#C8A97E" },
  { name: "Ivory", hex: "#F7F3ED" },
  { name: "Muted Brown", hex: "#8A7162" },
  { name: "Soft Beige", hex: "#E8DED2" },
  { name: "Black", hex: "#171717" },
];

interface ProductFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  resultCount: number;
  view: "grid" | "list";
  onViewChange: (v: "grid" | "list") => void;
}

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function ProductFilters({ filters, onChange, resultCount, view, onViewChange }: ProductFiltersProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeChips: { label: string; onRemove: () => void }[] = [
    ...filters.categories.map((c) => ({
      label: c,
      onRemove: () => onChange({ ...filters, categories: toggleValue(filters.categories, c) }),
    })),
    ...filters.sizes.map((s) => ({
      label: `Size ${s}`,
      onRemove: () => onChange({ ...filters, sizes: toggleValue(filters.sizes, s) }),
    })),
    ...filters.colors.map((c) => ({
      label: c,
      onRemove: () => onChange({ ...filters, colors: toggleValue(filters.colors, c) }),
    })),
    ...(filters.price !== "all" ? [{ label: filters.price === "under-50" ? "Under $50" : filters.price === "50-80" ? "$50–$80" : "Over $80", onRemove: () => onChange({ ...filters, price: "all" }) }] : []),
    ...(filters.collection !== "all" ? [{ label: filters.collection.replace("-", " "), onRemove: () => onChange({ ...filters, collection: "all" }) }] : []),
    ...(filters.onlyNew ? [{ label: "New Arrivals", onRemove: () => onChange({ ...filters, onlyNew: false }) }] : []),
    ...(filters.onlySale ? [{ label: "Sale", onRemove: () => onChange({ ...filters, onlySale: false }) }] : []),
  ];

  const FilterBody = (
    <div className="grid gap-8 lg:grid-cols-3 lg:gap-x-10">
      <div>
        <h2 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-charcoal">Collection</h2>
        <div className="flex flex-wrap gap-2">
          {([["all", "All pieces"], ["new-arrivals", "New arrivals"], ["best-sellers", "Best sellers"], ["sale", "Sale"]] as const).map(([value, label]) => <button key={value} onClick={() => onChange({ ...filters, collection: value })} className={cn("rounded-full border px-3.5 py-1.5 font-sans text-xs transition-colors", filters.collection === value ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/25 text-charcoal hover:border-charcoal")}>{label}</button>)}
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-charcoal">Price</h2>
        <div className="flex flex-wrap gap-2">
          {([["all", "Any price"], ["under-50", "Under $50"], ["50-80", "$50–$80"], ["over-80", "Over $80"]] as const).map(([value, label]) => (
            <button key={value} onClick={() => onChange({ ...filters, price: value })} className={cn("rounded-full border px-3.5 py-1.5 font-sans text-xs transition-colors", filters.price === value ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/25 text-charcoal hover:border-charcoal")}>{label}</button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-charcoal">Category</h2>
        <div className="flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onChange({ ...filters, categories: toggleValue(filters.categories, cat) })}
              className={cn(
                "rounded-full border px-3.5 py-1.5 font-sans text-xs capitalize transition-colors",
                filters.categories.includes(cat)
                  ? "border-charcoal bg-charcoal text-ivory"
                  : "border-charcoal/25 text-charcoal hover:border-charcoal"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-charcoal">Size</h2>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => onChange({ ...filters, sizes: toggleValue(filters.sizes, size) })}
              className={cn(
                "flex h-9 w-9 items-center justify-center border font-sans text-xs transition-colors",
                filters.sizes.includes(size)
                  ? "border-charcoal bg-charcoal text-ivory"
                  : "border-charcoal/25 text-charcoal hover:border-charcoal"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-charcoal">Color</h2>
        <div className="flex flex-wrap gap-3">
          {ALL_COLORS.map((color) => (
            <button
              key={color.name}
              title={color.name}
              onClick={() => onChange({ ...filters, colors: toggleValue(filters.colors, color.name) })}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all",
                filters.colors.includes(color.name) ? "border-charcoal scale-110" : "border-transparent"
              )}
            >
              <span className="h-7 w-7 rounded-full border border-charcoal/15" style={{ backgroundColor: color.hex }} />
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-charcoal">Show only</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onChange({ ...filters, onlyNew: !filters.onlyNew })}
            className={cn(
              "rounded-full border px-3.5 py-1.5 font-sans text-xs transition-colors",
              filters.onlyNew ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/25 text-charcoal"
            )}
          >
            New Arrivals
          </button>
          <button
            onClick={() => onChange({ ...filters, onlySale: !filters.onlySale })}
            className={cn(
              "rounded-full border px-3.5 py-1.5 font-sans text-xs transition-colors",
              filters.onlySale ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/25 text-charcoal"
            )}
          >
            Sale
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div data-gsap-reveal>
      <div className="flex flex-col gap-4 border-b border-charcoal/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
          <input
            type="search"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Search products…"
            aria-label="Search products"
            className="w-full border border-charcoal/20 bg-transparent py-2.5 pl-10 pr-3 font-sans text-sm text-charcoal placeholder:text-charcoal/40 focus:border-charcoal"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDrawerOpen((open) => !open)}
            aria-expanded={drawerOpen}
            className={cn(
              "flex items-center gap-2 border px-4 py-2.5 font-sans text-xs uppercase tracking-wider transition-colors",
              drawerOpen ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/25 text-charcoal hover:border-charcoal"
            )}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            {drawerOpen ? "Hide filters" : "Filters"}
          </button>

          <select
            value={filters.sort}
            onChange={(e) => onChange({ ...filters, sort: e.target.value as Filters["sort"] })}
            aria-label="Sort products"
            className="border border-charcoal/20 bg-transparent px-3 py-2.5 font-sans text-xs text-charcoal focus:border-charcoal"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          <div className="hidden items-center gap-1 border border-charcoal/20 sm:flex">
            <button
              onClick={() => onViewChange("grid")}
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              className={cn("px-3 py-2.5 font-sans text-xs", view === "grid" ? "bg-charcoal text-ivory" : "text-charcoal")}
            >
              Grid
            </button>
            <button
              onClick={() => onViewChange("list")}
              aria-label="List view"
              aria-pressed={view === "list"}
              className={cn("px-3 py-2.5 font-sans text-xs", view === "list" ? "bg-charcoal text-ivory" : "text-charcoal")}
            >
              List
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-5 overflow-hidden border-y border-charcoal/10 bg-beige/35 px-5 py-6 sm:px-7 sm:py-7"
          >
            {FilterBody}
            <div className="mt-8 flex flex-col gap-3 border-t border-charcoal/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-sans text-xs text-charcoal/55">Filters update the collection as you choose.</p>
              <button
                onClick={() => setDrawerOpen(false)}
                className="inline-flex min-h-11 items-center justify-center bg-charcoal px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-mutedBrown"
              >
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4">
        <FilterMeta resultCount={resultCount} activeChips={activeChips} onClearAll={() =>
          onChange({ ...filters, categories: [], sizes: [], colors: [], price: "all", onlyNew: false, onlySale: false })
        } />
      </div>
    </div>
  );
}

function FilterMeta({
  resultCount,
  activeChips,
  onClearAll,
}: {
  resultCount: number;
  activeChips: { label: string; onRemove: () => void }[];
  onClearAll: () => void;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <span className="font-sans text-xs text-charcoal/55">
        {resultCount} {resultCount === 1 ? "result" : "results"}
      </span>
      {activeChips.map((chip) => (
        <button
          key={chip.label}
          onClick={chip.onRemove}
          className="flex items-center gap-1.5 rounded-full bg-beige px-3 py-1 font-sans text-xs capitalize text-charcoal"
        >
          {chip.label}
          <X className="h-3 w-3" />
        </button>
      ))}
      {activeChips.length > 0 && (
        <button onClick={onClearAll} className="font-sans text-xs text-mutedBrown underline underline-offset-2">
          Clear all
        </button>
      )}
    </div>
  );
}

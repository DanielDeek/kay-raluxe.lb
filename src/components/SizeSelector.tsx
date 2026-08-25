"use client";

import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  sizes: string[];
  selected: string | null;
  onSelect: (size: string) => void;
  showError?: boolean;
  onOpenGuide?: () => void;
}

export default function SizeSelector({ sizes, selected, onSelect, showError, onOpenGuide }: SizeSelectorProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-charcoal">
          Size {selected && <span className="font-normal text-charcoal/50">— {selected}</span>}
        </span>
        {onOpenGuide && (
          <button
            type="button"
            onClick={onOpenGuide}
            className="font-sans text-xs text-mutedBrown underline underline-offset-2 hover:text-champagne"
          >
            Size guide
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Select a size">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            role="radio"
            aria-checked={selected === size}
            onClick={() => onSelect(size)}
            className={cn(
              "flex h-11 min-w-11 items-center justify-center border px-3 font-sans text-sm transition-colors",
              selected === size
                ? "border-charcoal bg-charcoal text-ivory"
                : "border-charcoal/25 text-charcoal hover:border-charcoal"
            )}
          >
            {size}
          </button>
        ))}
      </div>
      {showError && (
        <p className="mt-2 font-sans text-xs text-red-700" role="alert">
          Please select a size to continue.
        </p>
      )}
    </div>
  );
}

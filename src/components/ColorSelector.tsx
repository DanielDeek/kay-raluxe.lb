"use client";

import { ProductColor } from "@/types";
import { cn } from "@/lib/utils";

interface ColorSelectorProps {
  colors: ProductColor[];
  selected: string | null;
  onSelect: (color: string) => void;
  showError?: boolean;
}

export default function ColorSelector({ colors, selected, onSelect, showError }: ColorSelectorProps) {
  return (
    <div>
      <div className="mb-3">
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-charcoal">
          Color {selected && <span className="font-normal text-charcoal/50">— {selected}</span>}
        </span>
      </div>
      <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Select a color">
        {colors.map((color) => (
          <button
            key={color.name}
            type="button"
            role="radio"
            aria-checked={selected === color.name}
            aria-label={color.name}
            title={color.name}
            onClick={() => onSelect(color.name)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
              selected === color.name ? "border-charcoal scale-110" : "border-transparent hover:scale-105"
            )}
          >
            <span
              className="h-8 w-8 rounded-full border border-charcoal/15"
              style={{ backgroundColor: color.hex }}
            />
          </button>
        ))}
      </div>
      {showError && (
        <p className="mt-2 font-sans text-xs text-red-700" role="alert">
          Please select a color to continue.
        </p>
      )}
    </div>
  );
}

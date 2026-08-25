import { Product } from "@/types";
import { CURRENCY } from "./config";

export function formatPrice(value: number): string {
  return `${CURRENCY}${value.toFixed(0)}`;
}

export function displayPrice(product: Product) {
  return {
    current: product.salePrice ?? product.price,
    original: product.salePrice ? product.price : undefined,
  };
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

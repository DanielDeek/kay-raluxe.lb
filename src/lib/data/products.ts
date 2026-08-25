import { Product } from "@/types";
import { editorialImage } from "./images";

/**
 * ─────────────────────────────────────────────────────────────
 * DEMO PRODUCT DATA — NOT REAL STORE DATA
 *
 * These 14 products, their names, prices, sizes, colors and stock
 * status are placeholders created for development purposes only.
 * Every field must be replaced with verified Kay Raluxe data
 * (real photography, real prices, real stock) before this site
 * goes live. Image URLs point to generic stock placeholders and
 * must be swapped for official product photography.
 * ─────────────────────────────────────────────────────────────
 */

const PRODUCT_IMAGE_INDEX: Record<string, number> = {
  amara: 0,
  lune: 1,
  soleil: 2,
  noor: 3,
  camille: 4,
  rosa: 5,
  isla: 6,
  everly: 7,
  mira: 8,
  vera: 9,
  odette: 10,
  sana: 11,
  juno: 12,
  thea: 13,
};

const img = (seed: string, w = 700, h = 875) => {
  const match = seed.match(/^kr-([a-z]+)-(\d+)$/);
  const productKey = match?.[1] ?? seed;
  const view = match ? Number(match[2]) - 1 : 0;
  const baseIndex = PRODUCT_IMAGE_INDEX[productKey] ?? 0;
  return editorialImage(seed, w, h, baseIndex + view);
};

export const products: Product[] = [
  {
    id: "1",
    slug: "amara-wrap-dress",
    name: "Amara Wrap Dress",
    category: "dresses",
    description:
      "A fluid wrap silhouette cut from a soft crepe blend. Falls just below the knee with a self-tie waist that shapes every figure with ease.",
    care: "Hand wash cold. Do not bleach. Hang dry in shade. Cool iron if needed.",
    price: 68,
    salePrice: undefined,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", hex: "#171717" },
      { name: "Champagne", hex: "#C8A97E" },
      { name: "Ivory", hex: "#F7F3ED" },
    ],
    image: img("kr-amara-1"),
    hoverImage: img("kr-amara-2"),
    gallery: [img("kr-amara-1"), img("kr-amara-2"), img("kr-amara-3"), img("kr-amara-4")],
    isNew: true,
    isFeatured: true,
    inStock: true,
  },
  {
    id: "2",
    slug: "lune-satin-slip",
    name: "Lune Satin Slip Dress",
    category: "dresses",
    description:
      "Bias-cut satin that skims the body in a single fluid line. Adjustable straps, a low back, and just enough weight to move beautifully.",
    care: "Dry clean recommended. Store on a padded hanger.",
    price: 74,
    salePrice: 58,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Muted Brown", hex: "#8A7162" },
      { name: "Black", hex: "#171717" },
    ],
    image: img("kr-lune-1"),
    hoverImage: img("kr-lune-2"),
    gallery: [img("kr-lune-1"), img("kr-lune-2"), img("kr-lune-3")],
    isNew: false,
    isFeatured: true,
    inStock: true,
  },
  {
    id: "3",
    slug: "soleil-linen-set",
    name: "Soleil Linen Two-Piece Set",
    category: "sets",
    description:
      "A relaxed linen-blend co-ord: cropped shirt and wide-leg trouser. Breathable, unlined, made for long warm days.",
    care: "Machine wash cold, gentle cycle. Line dry.",
    price: 82,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Soft Beige", hex: "#E8DED2" },
      { name: "Ivory", hex: "#F7F3ED" },
    ],
    image: img("kr-soleil-1"),
    hoverImage: img("kr-soleil-2"),
    gallery: [img("kr-soleil-1"), img("kr-soleil-2"), img("kr-soleil-3")],
    isNew: true,
    isFeatured: false,
    inStock: true,
  },
  {
    id: "4",
    slug: "noor-tailored-blazer",
    name: "Noor Tailored Blazer",
    category: "tops",
    description:
      "A sharply tailored single-button blazer with soft shoulders. Wear open over a slip dress or buttoned as a statement piece.",
    care: "Dry clean only.",
    price: 96,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Charcoal", hex: "#171717" },
      { name: "Muted Brown", hex: "#8A7162" },
    ],
    image: img("kr-noor-1"),
    hoverImage: img("kr-noor-2"),
    gallery: [img("kr-noor-1"), img("kr-noor-2"), img("kr-noor-3")],
    isNew: false,
    isFeatured: true,
    inStock: true,
  },
  {
    id: "5",
    slug: "camille-silk-cami",
    name: "Camille Silk Cami",
    category: "tops",
    description:
      "A featherlight silk-blend camisole with a fitted bodice. The essential layering piece for evenings and everyday alike.",
    care: "Hand wash cold. Reshape and dry flat.",
    price: 42,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ivory", hex: "#F7F3ED" },
      { name: "Champagne", hex: "#C8A97E" },
      { name: "Black", hex: "#171717" },
    ],
    image: img("kr-camille-1"),
    hoverImage: img("kr-camille-2"),
    gallery: [img("kr-camille-1"), img("kr-camille-2"), img("kr-camille-3")],
    isNew: true,
    isFeatured: false,
    inStock: true,
  },
  {
    id: "6",
    slug: "rosa-pleated-midi",
    name: "Rosa Pleated Midi Skirt",
    category: "bottoms",
    description:
      "Fine knife pleats that hold their shape and catch the light in motion. High-waisted with a concealed side zip.",
    care: "Dry clean recommended.",
    price: 58,
    salePrice: 44,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Soft Beige", hex: "#E8DED2" },
      { name: "Charcoal", hex: "#171717" },
    ],
    image: img("kr-rosa-1"),
    hoverImage: img("kr-rosa-2"),
    gallery: [img("kr-rosa-1"), img("kr-rosa-2"), img("kr-rosa-3")],
    isNew: false,
    isFeatured: false,
    inStock: true,
  },
  {
    id: "7",
    slug: "isla-wide-trouser",
    name: "Isla Wide-Leg Trouser",
    category: "bottoms",
    description:
      "Flowing wide-leg trousers with a fitted waistband and a clean, uninterrupted drape from hip to hem.",
    care: "Machine wash cold. Hang to dry.",
    price: 64,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Muted Brown", hex: "#8A7162" },
      { name: "Ivory", hex: "#F7F3ED" },
    ],
    image: img("kr-isla-1"),
    hoverImage: img("kr-isla-2"),
    gallery: [img("kr-isla-1"), img("kr-isla-2"), img("kr-isla-3")],
    isNew: false,
    isFeatured: false,
    inStock: true,
  },
  {
    id: "8",
    slug: "everly-sundress",
    name: "Everly Sundress",
    category: "summer",
    description:
      "A breezy cotton-blend sundress with a fitted bodice and a full skirt that moves with every step. Thin adjustable straps.",
    care: "Machine wash cold. Tumble dry low.",
    price: 56,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Champagne", hex: "#C8A97E" },
      { name: "Ivory", hex: "#F7F3ED" },
    ],
    image: img("kr-everly-1"),
    hoverImage: img("kr-everly-2"),
    gallery: [img("kr-everly-1"), img("kr-everly-2"), img("kr-everly-3")],
    isNew: true,
    isFeatured: true,
    inStock: true,
  },
  {
    id: "9",
    slug: "mira-crochet-set",
    name: "Mira Crochet Set",
    category: "summer",
    description:
      "Hand-look crochet crop top and matching skirt. Made for beach days, golden hour, and everything after.",
    care: "Hand wash cold. Lay flat to dry.",
    price: 78,
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Ivory", hex: "#F7F3ED" }, { name: "Champagne", hex: "#C8A97E" }],
    image: img("kr-mira-1"),
    hoverImage: img("kr-mira-2"),
    gallery: [img("kr-mira-1"), img("kr-mira-2"), img("kr-mira-3")],
    isNew: true,
    isFeatured: false,
    inStock: false,
  },
  {
    id: "10",
    slug: "vera-corset-top",
    name: "Vera Corset Top",
    category: "tops",
    description:
      "A structured corset-inspired top with boning detail and an adjustable back lace. Pairs beautifully with tailored trousers.",
    care: "Spot clean or dry clean only.",
    price: 52,
    salePrice: 39,
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Black", hex: "#171717" }, { name: "Muted Brown", hex: "#8A7162" }],
    image: img("kr-vera-1"),
    hoverImage: img("kr-vera-2"),
    gallery: [img("kr-vera-1"), img("kr-vera-2"), img("kr-vera-3")],
    isNew: false,
    isFeatured: false,
    inStock: true,
  },
  {
    id: "11",
    slug: "odette-evening-gown",
    name: "Odette Evening Gown",
    category: "dresses",
    description:
      "A floor-length column gown with a delicate side slit and a draped neckline. Reserved for the nights that matter.",
    care: "Dry clean only. Store hanging in a garment bag.",
    price: 128,
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Charcoal", hex: "#171717" }, { name: "Champagne", hex: "#C8A97E" }],
    image: img("kr-odette-1"),
    hoverImage: img("kr-odette-2"),
    gallery: [img("kr-odette-1"), img("kr-odette-2"), img("kr-odette-3"), img("kr-odette-4")],
    isNew: false,
    isFeatured: true,
    inStock: true,
  },
  {
    id: "12",
    slug: "sana-denim-set",
    name: "Sana Denim Set",
    category: "sets",
    description:
      "A cropped denim jacket and matching mini skirt with soft whiskering and a lived-in wash.",
    care: "Machine wash cold, inside out. Line dry.",
    price: 88,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Ivory", hex: "#F7F3ED" }],
    image: img("kr-sana-1"),
    hoverImage: img("kr-sana-2"),
    gallery: [img("kr-sana-1"), img("kr-sana-2"), img("kr-sana-3")],
    isNew: false,
    isFeatured: false,
    inStock: true,
  },
  {
    id: "13",
    slug: "juno-off-shoulder-top",
    name: "Juno Off-Shoulder Top",
    category: "tops",
    description:
      "An off-shoulder top in a soft ribbed knit with long fitted sleeves and a subtle stretch.",
    care: "Machine wash cold. Reshape and dry flat.",
    price: 38,
    salePrice: 28,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#171717" },
      { name: "Soft Beige", hex: "#E8DED2" },
    ],
    image: img("kr-juno-1"),
    hoverImage: img("kr-juno-2"),
    gallery: [img("kr-juno-1"), img("kr-juno-2"), img("kr-juno-3")],
    isNew: false,
    isFeatured: false,
    inStock: true,
  },
  {
    id: "14",
    slug: "thea-pleated-dress",
    name: "Thea Pleated Maxi Dress",
    category: "dresses",
    description:
      "An accordion-pleated maxi dress with a square neckline and thin straps. Packs small, moves beautifully, travels well.",
    care: "Hand wash cold. Drip dry.",
    price: 72,
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Champagne", hex: "#C8A97E" }, { name: "Muted Brown", hex: "#8A7162" }],
    image: img("kr-thea-1"),
    hoverImage: img("kr-thea-2"),
    gallery: [img("kr-thea-1"), img("kr-thea-2"), img("kr-thea-3")],
    isNew: true,
    isFeatured: false,
    inStock: true,
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getRelatedProducts = (product: Product, count = 4) =>
  products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, count);

export const getFeaturedProducts = () => products.filter((p) => p.isFeatured);
export const getNewArrivals = () => products.filter((p) => p.isNew);
export const getSaleProducts = () => products.filter((p) => p.salePrice);
export const getBestSellerProducts = () => products.filter((p) => p.isBestSeller ?? p.isFeatured);

export type ProductCategory =
  | "dresses"
  | "tops"
  | "sets"
  | "bottoms"
  | "summer"
  | "sale";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  collection?: string;
  description: string;
  care: string;
  price: number;
  salePrice?: number;
  sizes: string[];
  colors: ProductColor[];
  image: string;
  hoverImage: string;
  gallery: string[];
  isNew: boolean;
  isFeatured: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description?: string;
  image: string;
  category: ProductCategory | "all";
}

export interface BagItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "success" | "error";
}

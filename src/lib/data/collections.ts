import { Collection } from "@/types";
import { editorialImage } from "./images";

const img = (seed: string, w = 1000, h = 1250) => editorialImage(seed, w, h);

export const collections: Collection[] = [
  {
    id: "c1",
    slug: "new-arrivals",
    title: "New Arrivals",
    subtitle: "The latest additions, fresh from the studio.",
    image: img("kr-col-new"),
    category: "all",
  },
  {
    id: "c2",
    slug: "dresses",
    title: "Dresses",
    subtitle: "Silhouettes for every occasion.",
    image: img("kr-col-dresses"),
    category: "dresses",
  },
  {
    id: "c3",
    slug: "tops",
    title: "Tops",
    subtitle: "Layer, mix, and make it yours.",
    image: img("kr-col-tops"),
    category: "tops",
  },
  {
    id: "c4",
    slug: "sets",
    title: "Sets",
    subtitle: "Considered pairings, ready to wear.",
    image: img("kr-col-sets"),
    category: "sets",
  },
  {
    id: "c5",
    slug: "bottoms",
    title: "Bottoms",
    subtitle: "From tailored to fluid.",
    image: img("kr-col-bottoms"),
    category: "bottoms",
  },
  {
    id: "c6",
    slug: "summer-collection",
    title: "Summer Collection",
    subtitle: "Light fabrics, longer days.",
    image: img("kr-col-summer"),
    category: "summer",
  },
  {
    id: "c7",
    slug: "sale",
    title: "Sale",
    subtitle: "Favorites, now for less.",
    image: img("kr-col-sale"),
    category: "sale",
  },
  {
    id: "c8",
    slug: "matching-sets",
    title: "Matching Sets",
    subtitle: "The complete look, considered.",
    image: img("kr-col-matching-sets"),
    category: "sets",
  },
  {
    id: "c9",
    slug: "accessories",
    title: "Accessories",
    subtitle: "The finishing details.",
    image: img("kr-col-accessories"),
    category: "accessories",
  },
  {
    id: "c10",
    slug: "best-sellers",
    title: "Best Sellers",
    subtitle: "Pieces customers return to.",
    image: img("kr-col-best-sellers"),
    category: "all",
  },
];

export const getCollectionBySlug = (slug: string) =>
  collections.find((c) => c.slug === slug);

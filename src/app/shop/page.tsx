import type { Metadata } from "next";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop",
  alternates: { canonical: "/shop" },
  description: "Browse the full Kay Raluxe collection — dresses, tops, sets, bottoms and more.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; filter?: string; category?: string }>;
}) {
  const params = await searchParams;

  return (
    <ShopClient
      initialSearch={params.search}
      initialFilter={params.filter}
      initialCategory={params.category}
    />
  );
}

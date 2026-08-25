import { Suspense } from "react";
import type { Metadata } from "next";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse the full Kay Reluxe collection — dresses, tops, sets, bottoms and more.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-32 sm:pt-40" />}>
      <ShopClient />
    </Suspense>
  );
}

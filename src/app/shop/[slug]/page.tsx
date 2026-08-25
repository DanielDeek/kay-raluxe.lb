import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/data/products";
import { displayPrice } from "@/lib/utils";
import ProductDetailClient from "@/app/product/[slug]/ProductDetailClient";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const { current } = displayPrice(product);
  return { title: product.name, description: product.description, openGraph: { title: product.name, description: product.description, images: [{ url: product.image }] }, other: { "product:price:amount": String(current) } };
}

export default async function ShopProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetailClient product={product} related={getRelatedProducts(product)} />;
}

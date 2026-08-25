"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, ShoppingBag, Truck, RotateCcw } from "lucide-react";
import { Product } from "@/types";
import ImageGallery from "@/components/ImageGallery";
import SizeSelector from "@/components/SizeSelector";
import ColorSelector from "@/components/ColorSelector";
import QuantitySelector from "@/components/QuantitySelector";
import Accordion from "@/components/Accordion";
import Modal from "@/components/Modal";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductGrid from "@/components/ProductGrid";
import SectionHeading from "@/components/SectionHeading";
import { displayPrice, formatPrice } from "@/lib/utils";
import { buildOrderMessage } from "@/lib/whatsapp";
import { products as allProducts } from "@/lib/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

const RECENTLY_VIEWED_KEY = "kay-reluxe-recently-viewed";

export default function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showErrors, setShowErrors] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const { addItem, openBag } = useCart();
  const { showToast } = useToast();

  const { current, original } = displayPrice(product);
  const canOrder = Boolean(size && color) && product.inStock;

  const handleAddToBag = () => {
    if (!size || !color || !product.inStock) {
      setShowErrors(true);
      return;
    }

    addItem({
      productId: product.id,
      slug: product.slug,
      image: product.image,
      name: product.name,
      size,
      color,
      quantity,
      price: current,
    });
    openBag();
    showToast({
      title: "Added to bag",
      description: `${product.name} · ${color} / ${size}`,
      variant: "success",
    });
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
      const ids: string[] = raw ? JSON.parse(raw) : [];
      const updated = [product.id, ...ids.filter((id) => id !== product.id)].slice(0, 6);
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync of "recently viewed" from localStorage per product visit
      setRecentlyViewed(
        updated
          .map((id) => allProducts.find((p) => p.id === id))
          .filter((p): p is Product => p !== undefined && p.id !== product.id)
      );
    } catch {
      // ignore
    }
  }, [product.id]);

  const whatsappMessage = buildOrderMessage({
    items: [
      {
        productId: product.id,
        slug: product.slug,
        image: product.image,
        name: product.name,
        size: size ?? "",
        color: color ?? "",
        quantity,
        price: current,
      },
    ],
  });

  return (
    <div data-gsap-reveal className="pb-24 pt-28 sm:pt-32">
      <div className="container">
        <nav aria-label="Breadcrumb" className="mb-6 font-sans text-xs text-charcoal/50">
          <Link href="/shop" className="hover:text-charcoal">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="capitalize text-charcoal/70">{product.category}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <ImageGallery images={product.gallery} name={product.name} />

          <div className="lg:max-w-md">
            {!product.inStock && (
              <span className="mb-3 inline-block bg-charcoal px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-ivory">
                Sold Out
              </span>
            )}
            <h1 className="font-display text-3xl text-charcoal sm:text-4xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3">
              <span className="font-sans text-xl text-charcoal">{formatPrice(current)}</span>
              {original && <span className="font-sans text-base text-charcoal/40 line-through">{formatPrice(original)}</span>}
            </div>

            <p className="mt-5 font-sans text-sm leading-relaxed text-charcoal/70">{product.description}</p>

            <div className="mt-8 space-y-6">
              <ColorSelector
                colors={product.colors}
                selected={color}
                onSelect={(c) => {
                  setColor(c);
                  setShowErrors(false);
                }}
                showError={showErrors && !color}
              />
              <SizeSelector
                sizes={product.sizes}
                selected={size}
                onSelect={(s) => {
                  setSize(s);
                  setShowErrors(false);
                }}
                showError={showErrors && !size}
                onOpenGuide={() => setSizeGuideOpen(true)}
              />
              <div>
                <span className="mb-3 block font-sans text-xs font-semibold uppercase tracking-[0.15em] text-charcoal">
                  Quantity
                </span>
                <QuantitySelector quantity={quantity} onChange={setQuantity} />
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleAddToBag}
                disabled={!product.inStock}
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-charcoal px-6 py-3.5 text-sm font-medium tracking-wide text-charcoal transition-all duration-300 hover:bg-charcoal hover:text-ivory disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Bag
              </button>
              <WhatsAppButton
                message={whatsappMessage}
                label={canOrder ? "Order on WhatsApp" : "Select size & color to order"}
                disabled={!canOrder}
                className="w-full"
              />
              {!canOrder && product.inStock && (
                <p className="sm:col-span-2 font-sans text-xs text-charcoal/50">
                  Choose a size and color above to enable WhatsApp ordering.
                </p>
              )}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 border-t border-charcoal/10 pt-6 font-sans text-xs text-charcoal/60 sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-mutedBrown" /> Delivery all over Lebanon
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-mutedBrown" /> Quality checked
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-mutedBrown" /> Easy exchange
              </div>
            </div>

            <div className="mt-10">
              <Accordion
                items={[
                  { question: "Care Instructions", answer: product.care },
                  {
                    question: "Delivery Information",
                    answer:
                      "Orders are confirmed and priced for delivery via WhatsApp. Delivery typically takes 2â€“5 business days depending on your area.",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container mt-24">
          <SectionHeading eyebrow="Complete the Look" title="You May Also Like" className="mb-10" />
          <ProductGrid products={related} />
        </section>
      )}

      {recentlyViewed.length > 0 && (
        <section className="container mt-24">
          <SectionHeading eyebrow="Your History" title="Recently Viewed" className="mb-10" />
          <ProductGrid products={recentlyViewed} />
        </section>
      )}

      <Modal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} title="Size Guide">
        <table className="w-full border-collapse font-sans text-sm">
          <thead>
            <tr className="border-b border-charcoal/15 text-left text-xs uppercase tracking-wider text-charcoal/50">
              <th className="py-2">Size</th>
              <th className="py-2">Bust (cm)</th>
              <th className="py-2">Waist (cm)</th>
              <th className="py-2">Hip (cm)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/10">
            {[
              ["XS", "80", "62", "88"],
              ["S", "84", "66", "92"],
              ["M", "88", "70", "96"],
              ["L", "94", "76", "102"],
              ["XL", "100", "82", "108"],
            ].map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) => (
                  <td key={i} className="py-2.5 text-charcoal/75">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 font-sans text-xs text-charcoal/50">
          Measurements are approximate. Contact us on WhatsApp for personalized fit guidance.
        </p>
      </Modal>

    </div>
  );
}


"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { MAX_CART_QUANTITY, useCart } from "@/context/CartContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import { buildOrderMessage } from "@/lib/whatsapp";
import { displayPrice, formatPrice } from "@/lib/utils";
import { products } from "@/lib/data/products";

export default function CartDrawer() {
  const { items, isOpen, closeBag, removeItem, updateQuantity } = useCart();
  const drawerRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const orderableItems = items.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.productId && candidate.slug === item.slug);
    if (!product || !product.inStock || !product.sizes.includes(item.size) || !product.colors.some((color) => color.name === item.color)) return [];
    return [{ ...item, price: displayPrice(product).current }];
  });
  const unavailableCount = items.length - orderableItems.length;
  const orderSubtotal = orderableItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const message = buildOrderMessage({ items: orderableItems });

  useEffect(() => {
    if (!isOpen) return;

    restoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeBag();
        return;
      }
      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus();
      restoreFocusRef.current = null;
    };
  }, [closeBag, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close shopping bag"
            onClick={closeBag}
            className="fixed inset-0 z-[80] bg-charcoal/35 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            ref={drawerRef}
            aria-label="Shopping bag"
            role="dialog"
            aria-modal="true"
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col bg-ivory shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 px-5 py-5 sm:px-7">
              <div>
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-mutedBrown">Your selection</span>
                <h2 className="mt-1 font-display text-3xl text-charcoal">Shopping bag</h2>
              </div>
              <button ref={closeRef} type="button" onClick={closeBag} aria-label="Close shopping bag" className="flex h-11 w-11 items-center justify-center text-charcoal/60 transition-colors hover:text-charcoal">
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <ShoppingBag className="h-10 w-10 text-mutedBrown" strokeWidth={1.2} />
                <h3 className="mt-5 font-display text-2xl text-charcoal">Your bag is empty</h3>
                <p className="mt-2 max-w-xs font-sans text-sm leading-relaxed text-charcoal/60">Add pieces with your preferred size and color, then review them here before ordering on WhatsApp.</p>
                <Link href="/shop" onClick={closeBag} className="mt-7 border-b border-charcoal pb-1 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-charcoal">Browse the shop</Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 sm:px-7">
                  <div className="divide-y divide-charcoal/10">
                    {items.map((item) => (
                      <article key={`${item.productId}-${item.size}-${item.color}`} className="grid grid-cols-[76px_1fr] gap-4 py-5">
                        <Link href={`/shop/${item.slug}`} onClick={closeBag} className="relative aspect-[3/4] overflow-hidden bg-beige">
                          <Image src={item.image} alt={item.name} fill sizes="76px" quality={70} className="object-cover" />
                        </Link>
                        <div className="min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <Link href={`/shop/${item.slug}`} onClick={closeBag} className="font-display text-xl text-charcoal hover:text-mutedBrown">{item.name}</Link>
                              <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.12em] text-charcoal/50">{item.color} · {item.size}</p>
                            </div>
                            <button type="button" onClick={() => removeItem(item.productId, item.size, item.color)} aria-label={`Remove ${item.name}`} className="flex h-11 w-11 items-center justify-center text-charcoal/40 hover:text-charcoal"><Trash2 className="h-3.5 w-3.5" /></button>
                          </div>
                          <div className="mt-5 flex items-center justify-between gap-3">
                            <div className="flex items-center border border-charcoal/15">
                              <button type="button" disabled={item.quantity <= 1} onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`} className="flex h-11 w-11 items-center justify-center text-charcoal/60 hover:text-charcoal disabled:opacity-30"><Minus className="h-3 w-3" /></button>
                              <span className="w-7 text-center font-sans text-xs">{item.quantity}</span>
                              <button type="button" disabled={item.quantity >= MAX_CART_QUANTITY} onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`} className="flex h-11 w-11 items-center justify-center text-charcoal/60 hover:text-charcoal disabled:opacity-30"><Plus className="h-3 w-3" /></button>
                            </div>
                            <span className="font-sans text-sm font-semibold text-charcoal">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
                <div className="border-t border-charcoal/10 px-5 py-5 sm:px-7 sm:py-6">
                  {unavailableCount > 0 && (
                    <p className="mb-4 border border-champagne/50 bg-champagne/10 px-3 py-3 font-sans text-xs leading-relaxed text-charcoal/70" role="alert">
                      {unavailableCount === 1 ? "One item" : `${unavailableCount} items`} need{unavailableCount === 1 ? "s" : ""} to be removed or updated before ordering.
                    </p>
                  )}
                  <div className="flex items-center justify-between font-sans text-sm">
                    <span className="text-charcoal/60">Subtotal</span>
                    <span className="font-semibold text-charcoal">{formatPrice(orderSubtotal)}</span>
                  </div>
                  <p className="mt-2 font-sans text-xs leading-relaxed text-charcoal/50">Delivery and final details will be confirmed with you on WhatsApp.</p>
                  <WhatsAppButton message={message} label="Order on WhatsApp" disabled={orderableItems.length === 0 || unavailableCount > 0} className="mt-5 w-full" />
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

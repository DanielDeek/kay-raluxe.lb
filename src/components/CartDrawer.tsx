"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import { buildOrderMessage } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { items, subtotal, isOpen, closeBag, removeItem, updateQuantity } = useCart();
  const message = buildOrderMessage({ items });

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
              <button type="button" onClick={closeBag} aria-label="Close shopping bag" className="flex h-10 w-10 items-center justify-center text-charcoal/60 transition-colors hover:text-charcoal">
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
                            <button type="button" onClick={() => removeItem(item.productId, item.size, item.color)} aria-label={`Remove ${item.name}`} className="p-1 text-charcoal/40 hover:text-charcoal"><Trash2 className="h-3.5 w-3.5" /></button>
                          </div>
                          <div className="mt-5 flex items-center justify-between gap-3">
                            <div className="flex items-center border border-charcoal/15">
                              <button type="button" onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`} className="flex h-8 w-8 items-center justify-center text-charcoal/60 hover:text-charcoal"><Minus className="h-3 w-3" /></button>
                              <span className="w-7 text-center font-sans text-xs">{item.quantity}</span>
                              <button type="button" onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`} className="flex h-8 w-8 items-center justify-center text-charcoal/60 hover:text-charcoal"><Plus className="h-3 w-3" /></button>
                            </div>
                            <span className="font-sans text-sm font-semibold text-charcoal">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
                <div className="border-t border-charcoal/10 px-5 py-5 sm:px-7 sm:py-6">
                  <div className="flex items-center justify-between font-sans text-sm">
                    <span className="text-charcoal/60">Subtotal</span>
                    <span className="font-semibold text-charcoal">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-2 font-sans text-xs leading-relaxed text-charcoal/50">Delivery and final details will be confirmed with you on WhatsApp.</p>
                  <WhatsAppButton message={message} label="Order on WhatsApp" className="mt-5 w-full" />
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

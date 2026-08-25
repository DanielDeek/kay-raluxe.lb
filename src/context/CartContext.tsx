"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { BagItem } from "@/types";

interface CartContextValue {
  items: BagItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openBag: () => void;
  closeBag: () => void;
  addItem: (item: BagItem) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "kay-raluxe-bag";
const LEGACY_STORAGE_KEY = "kay-reluxe-bag";
export const MAX_CART_QUANTITY = 10;

function normalizeItem(value: unknown): BagItem | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Partial<BagItem>;
  if (
    typeof item.productId !== "string" ||
    typeof item.slug !== "string" ||
    typeof item.name !== "string" ||
    typeof item.image !== "string" ||
    typeof item.size !== "string" ||
    typeof item.color !== "string" ||
    typeof item.price !== "number"
  ) return null;

  return {
    productId: item.productId,
    slug: item.slug,
    name: item.name,
    image: item.image,
    size: item.size,
    color: item.color,
    quantity: Math.min(MAX_CART_QUANTITY, Math.max(1, Number(item.quantity) || 1)),
    price: item.price,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const skipInitialPersist = useRef(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      if (!localStorage.getItem(STORAGE_KEY) && stored) localStorage.setItem(STORAGE_KEY, stored);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate persisted bag once after mount
      setItems(Array.isArray(parsed) ? parsed.map(normalizeItem).filter((item): item is BagItem => Boolean(item)) : []);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (skipInitialPersist.current) {
      skipInitialPersist.current = false;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: BagItem) => {
    const normalized = normalizeItem(item);
    if (!normalized) return;

    setItems((currentItems) => {
      const existing = currentItems.find(
        (currentItem) =>
          currentItem.productId === normalized.productId &&
          currentItem.size === normalized.size &&
          currentItem.color === normalized.color
      );

      if (!existing) return [...currentItems, normalized];

      return currentItems.map((currentItem) =>
        currentItem === existing
          ? { ...currentItem, quantity: Math.min(MAX_CART_QUANTITY, currentItem.quantity + normalized.quantity) }
          : currentItem
      );
    });
  }, []);

  const openBag = useCallback(() => setIsOpen(true), []);
  const closeBag = useCallback(() => setIsOpen(false), []);

  const removeItem = useCallback((productId: string, size: string, color: string) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => !(item.productId === productId && item.size === size && item.color === color)
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: string, color: string, quantity: number) => {
      if (quantity < 1) {
        removeItem(productId, size, color);
        return;
      }

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.productId === productId && item.size === size && item.color === color
          ? { ...item, quantity: Math.min(MAX_CART_QUANTITY, Math.max(1, quantity)) }
            : item
        )
      );
    },
    [removeItem]
  );

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0),
      isOpen,
      openBag,
      closeBag,
      addItem,
      removeItem,
      updateQuantity,
    }),
    [addItem, closeBag, isOpen, items, openBag, removeItem, updateQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}

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
const STORAGE_KEY = "kay-reluxe-bag";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const skipInitialPersist = useRef(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate persisted bag once after mount
      setItems(Array.isArray(parsed) ? parsed : []);
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
    setItems((currentItems) => {
      const existing = currentItems.find(
        (currentItem) =>
          currentItem.productId === item.productId &&
          currentItem.size === item.size &&
          currentItem.color === item.color
      );

      if (!existing) return [...currentItems, item];

      return currentItems.map((currentItem) =>
        currentItem === existing
          ? { ...currentItem, quantity: currentItem.quantity + item.quantity }
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
            ? { ...item, quantity }
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

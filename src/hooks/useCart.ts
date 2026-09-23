import { useEffect, useState } from "react";
import type { CartItem } from "../types";

const STORAGE_KEY = "warenkorb";

function loadCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addToCart(item: CartItem) {
    setItems((prev) => {
      const index = prev.findIndex(
        (p) =>
          p.productId === item.productId &&
          p.variant.label === item.variant.label &&
          p.text === item.text &&
          p.motif === item.motif,
      );

      if (index !== -1) {
        return prev.map((p, i) =>
          i === index ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }

      return [...prev, item];
    });
  }

  function removeFromCart(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function clearCart() {
    setItems([]);
  }

  return { items, addToCart, removeFromCart, clearCart };
}

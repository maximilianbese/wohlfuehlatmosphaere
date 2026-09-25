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

  function addToCart(item: Omit<CartItem, "id">) {
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

      return [...prev, { ...item, id: crypto.randomUUID() }];
    });
  }

  function removeFromCart(id: string) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  function increaseQuantity(id: string) {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p)),
    );
  }

  function decreaseQuantity(id: string) {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p,
      ),
    );
  }

  function clearCart() {
    setItems([]);
  }

  return {
    items,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };
}

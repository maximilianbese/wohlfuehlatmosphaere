import { useState } from "react";
import type { CartItem } from "../types";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(item: CartItem) {
    setItems((prev) => [...prev, item]);
  }

  function removeFromCart(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  return { items, addToCart, removeFromCart };
}

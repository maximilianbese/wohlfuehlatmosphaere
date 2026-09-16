import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useCart } from "../hooks/useCart";

type CartContextValue = ReturnType<typeof useCart>;

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error(
      "useCartContext muss innerhalb von <CartProvider> genutzt werden",
    );
  }
  return context;
}

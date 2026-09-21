import type { Variant } from "./variant";

export type CartItem = {
  productId: number;
  productName: string;
  variant: Variant;
  text: string;
  motif: number | null;
};

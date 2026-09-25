import type { Variant } from "./variant";

export type CartItem = {
  id: string;
  productId: number;
  productName: string;
  variant: Variant;
  text: string;
  motif: number | null;
  quantity: number;
};

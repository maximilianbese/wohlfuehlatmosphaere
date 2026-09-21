import type { Variant } from "./variant";

export type Product = {
  id: number;
  name: string;
  category: string;
  occasions?: string[];
  description?: string;
  image?: string;
  variants: Variant[];
  hasMotif?: boolean;
};

export const ALL = "Alle";

export type SortValue = "standard" | "price-asc" | "price-desc";

export const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: "standard", label: "Sortieren: Standard" },
  { value: "price-asc", label: "Preis aufsteigend" },
  { value: "price-desc", label: "Preis absteigend" },
];

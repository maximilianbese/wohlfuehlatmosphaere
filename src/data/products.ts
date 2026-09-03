import type { Product } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "Kindersegnung",
    description: "Personalisierte Kindersegnungskerze — Text frei wählbar.",
    sizes: [
      { label: "S", heightCm: 15, price: 8 },
      { label: "M", heightCm: 20, price: 15 },
      { label: "L", heightCm: 27, price: 25 },
    ],
  },
  {
    id: 2,
    name: "Geburtskerze",
    description: "Personalisierte Geburtskerze mit Name, Datum und Uhrzeit.",
    sizes: [
      { label: "XS", heightCm: 9, price: 4.5 },
      { label: "S", heightCm: 15, price: 8 },
      { label: "M", heightCm: 20, price: 15 },
      { label: "L", heightCm: 27, price: 25 },
    ],
  },
];

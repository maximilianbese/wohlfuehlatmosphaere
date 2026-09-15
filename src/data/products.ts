import type { Product } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "Kindersegnung",
    category: "Taufe & Segnung",
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
    category: "Geburt",
    description: "Personalisierte Geburtskerze mit Name, Datum und Uhrzeit.",
    sizes: [
      { label: "XS", heightCm: 9, price: 4.5 },
      { label: "S", heightCm: 15, price: 8 },
      { label: "M", heightCm: 20, price: 15 },
      { label: "L", heightCm: 27, price: 25 },
    ],
  },
  {
    id: 3,
    name: "Taufkerze",
    category: "Taufe & Segnung",
    description: "Klassische Taufkerze, individuell gestaltet.",
    sizes: [
      { label: "S", heightCm: 15, price: 8 },
      { label: "M", heightCm: 20, price: 15 },
      { label: "L", heightCm: 27, price: 25 },
    ],
  },
  {
    id: 4,
    name: "Trauerkerze",
    category: "Trauer",
    description: "Würdevolle Trauerkerze mit Name und Spruch.",
    sizes: [
      { label: "S", heightCm: 15, price: 8 },
      { label: "M", heightCm: 20, price: 15 },
      { label: "L", heightCm: 27, price: 25 },
    ],
  },
];

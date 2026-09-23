import type { Product } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "Kindersegnung",
    category: "Kerze",
    occasions: ["Taufe & Segnung"],
    description: "Personalisierte Kindersegnungskerze — Text frei wählbar.",
    image: "/produkte/kindersegnung-kerze.jpg",
    hasMotif: true,
    variants: [
      { label: "S · 15 cm", price: 8 },
      { label: "M · 20 cm", price: 15 },
      { label: "L · 27 cm", price: 25 },
    ],
  },
  {
    id: 2,
    name: "Geburtskerze",
    category: "Kerze",
    occasions: ["Geburt"],
    description:
      "Personalisierte Geburtstagskerze mit Name, Datum und Uhrzeit.",
    hasMotif: true,
    variants: [
      { label: "XS · 9 cm", price: 4.5 },
      { label: "S · 15 cm", price: 8 },
      { label: "M · 20 cm", price: 15 },
      { label: "L · 27 cm", price: 25 },
    ],
  },
  {
    id: 3,
    name: "Taufkerze",
    category: "Kerze",
    occasions: ["Taufe & Segnung"],
    description: "Klassische Taufkerze, individuell gestaltet.",
    image: "/produkte/taufkerze.jpg",
    hasMotif: true,
    variants: [
      { label: "S · 15 cm", price: 8 },
      { label: "M · 20 cm", price: 15 },
      { label: "L · 27 cm", price: 25 },
    ],
  },
  {
    id: 4,
    name: "Trauerkerze",
    category: "Kerze",
    occasions: ["Trauer"],
    description: "Würdevolle Trauerkerze mit Name und Spruch.",
    image: "/produkte/trauerkerze.jpg",
    hasMotif: true,
    variants: [
      { label: "S · 15 cm", price: 8 },
      { label: "M · 20 cm", price: 15 },
      { label: "L · 27 cm", price: 25 },
    ],
  },
  {
    id: 5,
    name: "Kerzenständer (Beispiel)",
    category: "Kerzenständer",
    description: "Handgegossener Kerzenständer aus Raysin.",
    variants: [
      { label: "klein", price: 12 },
      { label: "groß", price: 18 },
    ],
  },
];

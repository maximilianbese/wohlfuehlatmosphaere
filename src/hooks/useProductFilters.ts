import { useState } from "react";
import { products } from "../data/products";

export const productTypes = [...new Set(products.map((p) => p.category))];
export const occasionList = [
  ...new Set(products.flatMap((p) => p.occasions ?? [])),
];

export function useProductFilters() {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [activeOccasion, setActiveOccasion] = useState("Alle");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("standard");

  function resetFilters() {
    setActiveCategory("Alle");
    setActiveOccasion("Alle");
    setSearch("");
  }

  const isFiltered =
    activeCategory !== "Alle" || activeOccasion !== "Alle" || search !== "";

  const visibleProducts = products.filter((product) => {
    const matchesType =
      activeCategory === "Alle" || product.category === activeCategory;
    const matchesOccasion =
      activeOccasion === "Alle" ||
      (product.occasions ?? []).includes(activeOccasion);
    const matchesSearch = product.name
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase());
    return matchesType && matchesOccasion && matchesSearch;
  });

  const sortedProducts = [...visibleProducts].sort((a, b) => {
    const priceA = Math.min(...a.variants.map((v) => v.price));
    const priceB = Math.min(...b.variants.map((v) => v.price));
    if (sort === "price-asc") return priceA - priceB;
    if (sort === "price-desc") return priceB - priceA;
    return 0;
  });

  return {
    activeCategory,
    setActiveCategory,
    activeOccasion,
    setActiveOccasion,
    search,
    setSearch,
    sort,
    setSort,
    resetFilters,
    isFiltered,
    visibleProducts,
    sortedProducts,
  };
}

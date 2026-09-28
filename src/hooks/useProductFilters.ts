import { useState } from "react";
import { products } from "../data/products";
import { ALL } from "../constants/shop";
import type { SortValue } from "../constants/shop";

export const productTypes = [...new Set(products.map((p) => p.category))];
export const occasionList = [
  ...new Set(products.flatMap((p) => p.occasions ?? [])),
];

export function useProductFilters() {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [activeOccasion, setActiveOccasion] = useState(ALL);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortValue>("standard");

  function resetFilters() {
    setActiveCategory(ALL);
    setActiveOccasion(ALL);
    setSearch("");
  }

  const isFiltered =
    activeCategory !== ALL || activeOccasion !== ALL || search !== "";

  const visibleProducts = products.filter((product) => {
    const matchesType =
      activeCategory === ALL || product.category === activeCategory;
    const matchesOccasion =
      activeOccasion === ALL ||
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

import { useState } from "react";
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import "./App.css";

const categories = ["Alle", ...new Set(products.map((p) => p.category))];

function App() {
  const [activeCategory, setActiveCategory] = useState("Alle");

  const visibleProducts =
    activeCategory === "Alle"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <div className="app">
      <header className="site-header">
        <h1>Wohlfühlatmosphäre</h1>
        <p className="tagline">Personalisierte Kerzen für besondere Momente</p>
      </header>

      <main className="container">
        <Cart />

        <div className="filter-bar">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                category === activeCategory
                  ? "filter-button filter-button--active"
                  : "filter-button"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;

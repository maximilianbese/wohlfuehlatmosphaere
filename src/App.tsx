import { useState } from "react";
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import FilterBar from "./components/FilterBar";
import "./App.css";

const productTypes = [...new Set(products.map((p) => p.category))];
const occasionList = [...new Set(products.flatMap((p) => p.occasions ?? []))];

function App() {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [activeOccasion, setActiveOccasion] = useState("Alle");

  function resetFilters() {
    setActiveCategory("Alle");
    setActiveOccasion("Alle");
  }

  const isFiltered = activeCategory !== "Alle" || activeOccasion !== "Alle";

  const visibleProducts = products.filter((product) => {
    const matchesType =
      activeCategory === "Alle" || product.category === activeCategory;
    const matchesOccasion =
      activeOccasion === "Alle" ||
      (product.occasions ?? []).includes(activeOccasion);
    return matchesType && matchesOccasion;
  });

  return (
    <div className="app">
      <header className="site-header">
        <h1>Wohlfühlatmosphäre</h1>
        <p className="tagline">Personalisierte Kerzen für besondere Momente</p>
      </header>

      <main className="container">
        <div className="layout">
          <div className="content">
            {productTypes.length > 1 && (
              <FilterBar
                label="Art"
                options={["Alle", ...productTypes]}
                active={activeCategory}
                onChange={setActiveCategory}
              />
            )}

            {occasionList.length > 0 && (
              <FilterBar
                label="Anlass"
                options={["Alle", ...occasionList]}
                active={activeOccasion}
                onChange={setActiveOccasion}
              />
            )}

            {isFiltered && (
              <button
                type="button"
                className="reset-button"
                onClick={resetFilters}
              >
                Zurücksetzen
              </button>
            )}

            <p className="result-count">{visibleProducts.length} Produkte</p>

            {visibleProducts.length === 0 ? (
              <p className="empty-hint">
                Für diese Auswahl gibt es leider nichts.
              </p>
            ) : (
              <div className="product-grid">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

          <aside className="cart-column">
            <Cart />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;

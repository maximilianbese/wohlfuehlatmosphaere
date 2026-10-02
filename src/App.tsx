import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import FilterBar from "./components/FilterBar";
import ProductToolbar from "./components/ProductToolbar";
import {
  useProductFilters,
  productTypes,
  occasionList,
} from "./hooks/useProductFilters";
import { ALL } from "./constants/shop";
import "./App.css";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { theme, toggleTheme } = useTheme();
  const {
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
  } = useProductFilters();

  return (
    <div className="app">
      <header className="site-header">
        <h1>Wohlfühlatmosphäre</h1>
        <p className="tagline">Personalisierte Kerzen für besondere Momente</p>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Farbmodus wechseln"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </header>

      <main className="container">
        <div className="layout">
          <div className="content">
            <ProductToolbar
              search={search}
              onSearchChange={setSearch}
              sort={sort}
              onSortChange={setSort}
            />
            {productTypes.length > 1 && (
              <FilterBar
                label="Art"
                options={[ALL, ...productTypes]}
                active={activeCategory}
                onChange={setActiveCategory}
              />
            )}

            {occasionList.length > 0 && (
              <FilterBar
                label="Anlass"
                options={[ALL, ...occasionList]}
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
                {sortedProducts.map((product) => (
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

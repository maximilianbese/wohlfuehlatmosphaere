import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import FilterBar from "./components/FilterBar";
import {
  useProductFilters,
  productTypes,
  occasionList,
} from "./hooks/useProductFilters";
import "./App.css";

function App() {
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
      </header>

      <main className="container">
        <div className="layout">
          <div className="content">
            <input
              type="search"
              className="search-input"
              placeholder="Produkt suchen..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <select
              className="sort-select"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="standard">Sortieren: Standard</option>
              <option value="price-asc">Preis aufsteigend</option>
              <option value="price-desc">Preis absteigend</option>
            </select>
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

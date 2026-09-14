import { useCart } from "./hooks/useCart";
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  const { items, addToCart, removeFromCart } = useCart();

  return (
    <div className="app">
      <header className="site-header">
        <h1>Wohlfühlatmosphäre</h1>
        <p className="tagline">Personalisierte Kerzen für besondere Momente</p>
      </header>

      <main className="container">
        <Cart items={items} onRemove={removeFromCart} />

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;

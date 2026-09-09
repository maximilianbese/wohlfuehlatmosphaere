import { useState } from "react";
import type { CartItem } from "./types";
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(item: CartItem) {
    setCart((prev) => [...prev, item]);
  }

  function removeFromCart(index: number) {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <>
      <h1>Wohlfühlatmosphäre</h1>

      <Cart items={cart} onRemove={removeFromCart} />

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </>
  );
}

export default App;

import { useState } from "react";
import type { CartItem } from "./types";
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
import { formatPrice } from "./utils/format";
import "./App.css";

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(item: CartItem) {
    setCart((prev) => [...prev, item]);
  }

  const total = cart.reduce((sum, item) => sum + item.size.price, 0);

  return (
    <>
      <h1>Wohlfühlatmosphäre</h1>

      <section className="cart">
        <strong>Warenkorb ({cart.length})</strong> — {formatPrice(total)}
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.productName} · {item.size.label} —{" "}
              {formatPrice(item.size.price)}
            </li>
          ))}
        </ul>
      </section>

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

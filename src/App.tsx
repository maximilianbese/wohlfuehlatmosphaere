import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
import "./App.css";

function App() {
  return (
    <>
      <h1>Wohlfühlatmosphäre</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
export default App;

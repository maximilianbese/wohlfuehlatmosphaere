import { products } from "./data/products";

function App() {
  return (
    <>
      <h1>Wohlfühlatmosphäre</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> — {product.description} (
            {product.price} €)
          </li>
        ))}
      </ul>
    </>
  );
}
export default App;

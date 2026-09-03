import type { Product } from "../types";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <ul className="sizes">
        {product.sizes.map((size) => (
          <li key={size.label}>
            {size.label} · {size.heightCm} cm — {size.price} €
          </li>
        ))}
      </ul>
    </article>
  );
}

export default ProductCard;

import type { Product } from "../types";
import { formatPrice } from "../utils/format";

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
          <li key={size.label} className="size-row">
            <span>
              {size.label} · {size.heightCm} cm{" "}
            </span>
            <span>{formatPrice(size.price)}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default ProductCard;

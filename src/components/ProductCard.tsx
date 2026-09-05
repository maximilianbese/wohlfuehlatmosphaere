import { useState } from "react";
import type { Product } from "../types";
import { formatPrice } from "../utils/format";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <article className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>

      <ul className="sizes">
        {product.sizes.map((size) => {
          const isSelected = size.label === selectedSize.label;
          return (
            <li key={size.label}>
              <button
                type="button"
                className={
                  isSelected ? "size-row size-row--selected" : "size-row"
                }
                onClick={() => setSelectedSize(size)}
              >
                <span>
                  {size.label} · {size.heightCm} cm
                </span>
                <span>{formatPrice(size.price)}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <button type="button" className="add-button">
        In den Warenkorb — {formatPrice(selectedSize.price)}
      </button>
    </article>
  );
}

export default ProductCard;

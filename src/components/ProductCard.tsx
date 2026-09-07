import { useState } from "react";
import type { CandleSize, CartItem, Product } from "../types";
import { formatPrice } from "../utils/format";

type ProductCardProps = {
  product: Product;
  onAddToCart: (item: CartItem) => void;
};

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<CandleSize | null>(null);
  const [text, setText] = useState("");

  return (
    <article className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>

      <ul className="sizes">
        {product.sizes.map((size) => {
          const isSelected = size.label === selectedSize?.label;
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

      <textarea
        className="personalization"
        placeholder="Dein Text (Name, Datum, Spruch ...)"
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={3}
      />

      <button
        type="button"
        className="add-button"
        disabled={selectedSize === null}
        onClick={() => {
          if (selectedSize === null) return;
          onAddToCart({
            productId: product.id,
            productName: product.name,
            size: selectedSize,
            text: text,
          });
          setSelectedSize(null);
          setText("");
        }}
      >
        {selectedSize
          ? `In den Warenkorb - ${formatPrice(selectedSize.price)}`
          : "Bitte Größe wählen"}
      </button>
    </article>
  );
}

export default ProductCard;

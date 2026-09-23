import { useState } from "react";
import type { Variant, Product } from "../types";
import { formatPrice } from "../utils/format";
import { useCartContext } from "../context/CartContext";
import MotifPicker from "./MotifPicker";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartContext();
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [text, setText] = useState("");
  const [motif, setMotif] = useState<number | null>(null);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        {product.image ? (
          <img
            className={styles.image}
            src={product.image}
            alt={product.name}
          />
        ) : (
          <span className={styles.imagePlaceholder}>🕯️</span>
        )}
      </div>
      <h2>{product.name}</h2>
      {product.description && <p>{product.description}</p>}

      <ul className={styles.sizes}>
        {product.variants.map((variant) => {
          const isSelected = variant.label === selectedVariant?.label;
          return (
            <li key={variant.label}>
              <button
                type="button"
                className={
                  isSelected
                    ? `${styles.sizeRow} ${styles.sizeRowSelected}`
                    : styles.sizeRow
                }
                onClick={() => setSelectedVariant(variant)}
              >
                <span>{variant.label}</span>
                <span>{formatPrice(variant.price)}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {product.hasMotif && <MotifPicker value={motif} onChange={setMotif} />}

      <textarea
        className={styles.personalization}
        placeholder="Dein Text (Name, Datum, Spruch ...)"
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={3}
      />

      <button
        type="button"
        className={styles.addButton}
        disabled={selectedVariant === null}
        onClick={() => {
          if (selectedVariant === null) return;
          addToCart({
            productId: product.id,
            productName: product.name,
            variant: selectedVariant,
            text: text,
            motif: motif,
            quantity: 1,
          });
          setSelectedVariant(null);
          setText("");
          setMotif(null);
        }}
      >
        {selectedVariant
          ? `In den Warenkorb - ${formatPrice(selectedVariant.price)}`
          : "Bitte Größe wählen"}
      </button>
    </article>
  );
}

export default ProductCard;

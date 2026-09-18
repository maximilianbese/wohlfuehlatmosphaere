import { useState } from "react";
import { createPortal } from "react-dom";
import type { CandleSize, Product } from "../types";
import { formatPrice } from "../utils/format";
import { useCartContext } from "../context/CartContext";
import styles from "./ProductCard.module.css";

const motifNumbers = Array.from({ length: 29 }, (_, i) => i + 1);

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartContext();
  const [selectedSize, setSelectedSize] = useState<CandleSize | null>(null);
  const [text, setText] = useState("");
  const [motif, setMotif] = useState<number | null>(null);
  const [showMotifs, setShowMotifs] = useState(false);

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
      <p>{product.description}</p>

      <ul className={styles.sizes}>
        {product.sizes.map((size) => {
          const isSelected = size.label === selectedSize?.label;
          return (
            <li key={size.label}>
              <button
                type="button"
                className={
                  isSelected
                    ? `${styles.sizeRow} ${styles.sizeRowSelected}`
                    : styles.sizeRow
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

      <button
        type="button"
        className={styles.motifToggle}
        onClick={() => setShowMotifs(true)}
      >
        {motif ? `Motiv: Bild ${motif} (ändern)` : "Motiv wählen"}
      </button>

      {showMotifs &&
        createPortal(
          <div
            className={styles.motifBackdrop}
            onClick={() => setShowMotifs(false)}
          >
            <div
              className={styles.motifModal}
              onClick={(event) => event.stopPropagation()}
            >
              <div className={styles.motifModalHead}>
                <h3>Motiv wählen</h3>
                <button
                  type="button"
                  className={styles.motifClose}
                  onClick={() => setShowMotifs(false)}
                >
                  ✕
                </button>
              </div>
              <div className={styles.motifGrid}>
                {motifNumbers.map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={
                      n === motif
                        ? `${styles.motifOption} ${styles.motifOptionSelected}`
                        : styles.motifOption
                    }
                    onClick={() => {
                      setMotif(n === motif ? null : n);
                      setShowMotifs(false);
                    }}
                  >
                    <img src={`/motive/bild-${n}.png`} alt={`Bild ${n}`} />
                    <span className={styles.motifName}>Bild {n}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}

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
        disabled={selectedSize === null}
        onClick={() => {
          if (selectedSize === null) return;
          addToCart({
            productId: product.id,
            productName: product.name,
            size: selectedSize,
            text: text,
            motif: motif,
          });
          setSelectedSize(null);
          setText("");
          setMotif(null);
          setShowMotifs(false);
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

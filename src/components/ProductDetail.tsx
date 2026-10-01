import { createPortal } from "react-dom";
import type { Product } from "../types";
import { formatPrice } from "../utils/format";
import styles from "./ProductDetail.module.css";
import { useEffect } from "react";

type ProductDetailProps = {
  product: Product;
  onClose: () => void;
};

function ProductDetail({ product, onClose }: ProductDetailProps) {
  const fromPrice = Math.min(...product.variants.map((v) => v.price));

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.dialog}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose}>
          ✕
        </button>

        <div className={styles.imageWrap}>
          {product.image ? (
            <img
              className={styles.image}
              src={product.image}
              alt={product.name}
            />
          ) : (
            <span className={styles.placeholder}>🕯️</span>
          )}
        </div>

        <div className={styles.info}>
          <span className={styles.category}>{product.category}</span>
          <h2 className={styles.name}>{product.name}</h2>
          {product.description && (
            <p className={styles.text}>{product.description}</p>
          )}
          <p className={styles.price}>ab {formatPrice(fromPrice)}</p>

          <ul className={styles.sizes}>
            {product.variants.map((variant) => (
              <li key={variant.label} className={styles.sizeRow}>
                <span>{variant.label}</span>
                <span>{formatPrice(variant.price)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ProductDetail;

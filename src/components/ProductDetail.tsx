import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import type { Product, Variant } from "../types";
import { formatPrice } from "../utils/format";
import { useCartContext } from "../context/CartContext";
import VariantPicker from "./VariantPicker";
import styles from "./ProductDetail.module.css";

type ProductDetailProps = {
  product: Product;
  onClose: () => void;
};

function ProductDetail({ product, onClose }: ProductDetailProps) {
  const { addToCart } = useCartContext();
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function handleAdd() {
    if (selectedVariant === null) return;
    addToCart({
      productId: product.id,
      productName: product.name,
      variant: selectedVariant,
      text: "",
      motif: null,
      quantity: 1,
    });
    onClose();
  }

  const fromPrice = Math.min(...product.variants.map((v) => v.price));

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

          <VariantPicker
            variants={product.variants}
            selected={selectedVariant}
            onSelect={setSelectedVariant}
          />

          <button
            type="button"
            className={styles.addButton}
            disabled={selectedVariant === null}
            onClick={handleAdd}
          >
            {selectedVariant
              ? `In den Warenkorb — ${formatPrice(selectedVariant.price)}`
              : "Bitte Größe wählen"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ProductDetail;

import { useState } from "react";
import type { Variant, Product } from "../types";
import { formatPrice } from "../utils/format";
import { useCartContext } from "../context/CartContext";
import MotifPicker from "./MotifPicker";
import styles from "./ProductCard.module.css";
import VariantPicker from "./VariantPicker";
import ProductDetail from "./ProductDetail";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartContext();
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [text, setText] = useState("");
  const [motif, setMotif] = useState<number | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.imageWrap}
        onClick={() => setShowDetail(true)}
      >
        {product.image ? (
          <img
            className={styles.image}
            src={product.image}
            alt={product.name}
          />
        ) : (
          <span className={styles.imagePlaceholder}>🕯️</span>
        )}
      </button>
      <h2>{product.name}</h2>
      {product.description && <p>{product.description}</p>}

      <VariantPicker
        variants={product.variants}
        selected={selectedVariant}
        onSelect={setSelectedVariant}
      />

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

      {showDetail && (
        <ProductDetail product={product} onClose={() => setShowDetail(false)} />
      )}
    </article>
  );
}

export default ProductCard;

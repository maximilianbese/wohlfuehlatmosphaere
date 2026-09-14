import type { CartItem } from "../types";
import { formatPrice } from "../utils/format";
import styles from "./Cart.module.css";

type CartProps = {
  items: CartItem[];
  onRemove: (index: number) => void;
};

function Cart({ items, onRemove }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.size.price, 0);

  return (
    <section className={styles.cart}>
      <div className={styles.head}>
        <strong>Warenkorb ({items.length})</strong>
        <span className={styles.total}>{formatPrice(total)}</span>
      </div>

      {items.length === 0 ? (
        <p className={styles.empty}>
          Noch nichts ausgewählt — wähle eine Kerze und Größe.
        </p>
      ) : (
        <ul className={styles.list}>
          {items.map((item, index) => (
            <li key={index} className={styles.item}>
              <span className={styles.info}>
                {item.productName} · {item.size.label} · {item.size.heightCm} cm
                {item.text && <em className={styles.text}> „{item.text}"</em>}
              </span>
              <span className={styles.price}>
                {formatPrice(item.size.price)}
              </span>
              <button
                type="button"
                className={styles.remove}
                onClick={() => onRemove(index)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Cart;

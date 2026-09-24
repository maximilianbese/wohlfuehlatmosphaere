import type { CartItem } from "../types";
import { formatPrice } from "../utils/format";
import styles from "./Cart.module.css";

type CartLineProps = {
  item: CartItem;
  onRemove: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
};

function CartLine({ item, onRemove, onIncrease, onDecrease }: CartLineProps) {
  return (
    <li className={styles.item}>
      <span className={styles.info}>
        <span className={styles.name}>{item.productName}</span>
        <span className={styles.variant}>{item.variant.label}</span>
        {item.motif && <span className={styles.meta}>Motiv {item.motif}</span>}
        {item.text && <em className={styles.text}>„{item.text}"</em>}
      </span>
      <span className={styles.quantity}>
        <button type="button" className={styles.qtyButton} onClick={onDecrease}>
          −
        </button>
        <span className={styles.qtyValue}>{item.quantity}</span>
        <button type="button" className={styles.qtyButton} onClick={onIncrease}>
          +
        </button>
      </span>
      <span className={styles.price}>
        {formatPrice(item.variant.price * item.quantity)}
      </span>
      <button type="button" className={styles.remove} onClick={onRemove}>
        ✕
      </button>
    </li>
  );
}

export default CartLine;

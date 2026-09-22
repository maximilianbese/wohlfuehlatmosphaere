import type { CartItem } from "../types";
import { formatPrice } from "../utils/format";
import styles from "./Cart.module.css";

type CartLineProps = {
  item: CartItem;
  onRemove: () => void;
};

function CartLine({ item, onRemove }: CartLineProps) {
  return (
    <li className={styles.item}>
      <span className={styles.info}>
        {item.productName} · {item.variant.label}
        {item.motif && <> · Motiv {item.motif}</>}
        {item.text && <em className={styles.text}> „{item.text}"</em>}
      </span>
      <span className={styles.price}>{formatPrice(item.variant.price)}</span>
      <button type="button" className={styles.remove} onClick={onRemove}>
        ✕
      </button>
    </li>
  );
}

export default CartLine;

import type { CartItem } from "../types";
import { formatPrice } from "../utils/format";

type CartProps = {
  items: CartItem[];
  onRemove: (index: number) => void;
};

function Cart({ items, onRemove }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.size.price, 0);

  return (
    <section className="cart">
      <strong>Warenkorb ({items.length})</strong> — {formatPrice(total)}
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.productName} · {item.size.label} —{" "}
            {formatPrice(item.size.price)}
            {item.text && <em> „{item.text}"</em>}
            <button
              type="button"
              className="remove-button"
              onClick={() => onRemove(index)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Cart;

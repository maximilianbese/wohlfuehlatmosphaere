import { createPortal } from "react-dom";
import { useCartContext } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import CheckoutForm, { type Customer } from "./CheckoutForm";
import styles from "./Checkout.module.css";

type CheckoutProps = {
  total: number;
  sending: boolean;
  onSubmit: (customer: Customer) => void;
  onBack: () => void;
};

function Checkout({ total, sending, onSubmit, onBack }: CheckoutProps) {
  const { items } = useCartContext();

  return createPortal(
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Kasse</h1>

        <div className={styles.summary}>
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.id} className={styles.line}>
                <span className={styles.lineInfo}>
                  {item.productName} · {item.variant.label}
                  {item.quantity > 1 && <> · ×{item.quantity}</>}
                </span>
                <span className={styles.linePrice}>
                  {formatPrice(item.variant.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className={styles.total}>
            <span>Summe</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        <div className={styles.formCard}>
          <CheckoutForm
            total={total}
            sending={sending}
            onSubmit={onSubmit}
            onBack={onBack}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default Checkout;

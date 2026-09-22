import styles from "./Cart.module.css";

type OrderConfirmationProps = {
  onContinue: () => void;
};

function OrderConfirmation({ onContinue }: OrderConfirmationProps) {
  return (
    <section className={styles.cart}>
      <p className={styles.success}>
        ✓ Danke! Deine Bestellung ist eingegangen — wir melden uns bald.
      </p>
      <button type="button" className={styles.orderButton} onClick={onContinue}>
        Weiter einkaufen
      </button>
    </section>
  );
}

export default OrderConfirmation;

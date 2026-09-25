import { createPortal } from "react-dom";
import styles from "./Confirmation.module.css";

type OrderConfirmationProps = {
  onContinue: () => void;
};

function OrderConfirmation({ onContinue }: OrderConfirmationProps) {
  return createPortal(
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.check}>✓</div>
        <h1 className={styles.title}>Danke für deine Bestellung!</h1>
        <p className={styles.text}>
          Deine Bestellung ist bei uns eingegangen. Wir melden uns bald bei dir.
        </p>
        <button type="button" className={styles.button} onClick={onContinue}>
          Weiter einkaufen
        </button>
      </div>
    </div>,
    document.body,
  );
}

export default OrderConfirmation;

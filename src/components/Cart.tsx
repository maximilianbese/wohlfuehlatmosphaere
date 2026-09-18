import { useState } from "react";
import { formatPrice } from "../utils/format";
import { useCartContext } from "../context/CartContext";
import styles from "./Cart.module.css";

function Cart() {
  const { items, removeFromCart, clearCart } = useCartContext();
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const total = items.reduce((sum, item) => sum + item.size.price, 0);

  async function handleSubmit() {
    setStatus("sending");
    // Versand simulieren (hier käme später ein echtes Backend / eine E-Mail):
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Bestellung abgeschickt:", items);
    clearCart();
    setStatus("done");
  }

  if (status === "done") {
    return (
      <section className={styles.cart}>
        <p className={styles.success}>
          ✓ Danke! Deine Bestellung ist eingegangen — wir melden uns bald.
        </p>
        <button
          type="button"
          className={styles.orderButton}
          onClick={() => setStatus("idle")}
        >
          Weiter einkaufen
        </button>
      </section>
    );
  }

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
        <>
          <ul className={styles.list}>
            {items.map((item, index) => (
              <li key={index} className={styles.item}>
                <span className={styles.info}>
                  {item.productName} · {item.size.label} · {item.size.heightCm}{" "}
                  cm
                  {item.motif && <> · Motiv {item.motif}</>}
                  {item.text && <em className={styles.text}> „{item.text}"</em>}
                </span>
                <span className={styles.price}>
                  {formatPrice(item.size.price)}
                </span>
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => removeFromCart(index)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={styles.orderButton}
            onClick={handleSubmit}
            disabled={status === "sending"}
          >
            {status === "sending"
              ? "Wird gesendet …"
              : `Bestellen — ${formatPrice(total)}`}
          </button>
        </>
      )}
    </section>
  );
}

export default Cart;

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { formatPrice } from "../utils/format";
import { useCartContext } from "../context/CartContext";
import styles from "./Cart.module.css";

type Step = "idle" | "checkout" | "sending" | "done";

const emptyCustomer = {
  name: "",
  email: "",
  street: "",
  zip: "",
  city: "",
};

function Cart() {
  const { items, removeFromCart, clearCart } = useCartContext();
  const [step, setStep] = useState<Step>("idle");
  const [customer, setCustomer] = useState(emptyCustomer);

  const total = items.reduce((sum, item) => sum + item.size.price, 0);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStep("sending");
    const order = {
      customer,
      items,
      total,
      date: new Date().toISOString(),
    };
    // Versand simulieren (später echtes Backend):
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Bestellung:", order);
    clearCart();
    setCustomer(emptyCustomer);
    setStep("done");
  }

  if (step === "done") {
    return (
      <section className={styles.cart}>
        <p className={styles.success}>
          ✓ Danke! Deine Bestellung ist eingegangen — wir melden uns bald.
        </p>
        <button
          type="button"
          className={styles.orderButton}
          onClick={() => setStep("idle")}
        >
          Weiter einkaufen
        </button>
      </section>
    );
  }

  if (step === "checkout" || step === "sending") {
    return (
      <section className={styles.cart}>
        <div className={styles.head}>
          <strong>Kasse</strong>
          <span className={styles.total}>{formatPrice(total)}</span>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            name="name"
            placeholder="Name"
            value={customer.name}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            name="email"
            type="email"
            placeholder="E-Mail"
            value={customer.email}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            name="street"
            placeholder="Straße & Hausnummer"
            value={customer.street}
            onChange={handleChange}
            required
          />
          <div className={styles.formRow}>
            <input
              className={styles.input}
              name="zip"
              placeholder="PLZ"
              value={customer.zip}
              onChange={handleChange}
              required
            />
            <input
              className={styles.input}
              name="city"
              placeholder="Ort"
              value={customer.city}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className={styles.orderButton}
            disabled={step === "sending"}
          >
            {step === "sending"
              ? "Wird gesendet …"
              : `Kostenpflichtig bestellen — ${formatPrice(total)}`}
          </button>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => setStep("idle")}
            disabled={step === "sending"}
          >
            Zurück zum Warenkorb
          </button>
        </form>
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
            onClick={() => setStep("checkout")}
          >
            Zur Kasse — {formatPrice(total)}
          </button>
        </>
      )}
    </section>
  );
}

export default Cart;

import { useState } from "react";
import { useCartContext } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import CartLine from "./CartLine";
import Checkout from "./Checkout";
import { type Customer } from "./CheckoutForm";
import OrderConfirmation from "./OrderConfirmation";
import styles from "./Cart.module.css";

type Step = "idle" | "checkout" | "sending" | "done";

function Cart() {
  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCartContext();
  const [step, setStep] = useState<Step>("idle");

  const total = items.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0,
  );

  async function handleOrder(customer: Customer) {
    setStep("sending");
    const order = { customer, items, total, date: new Date().toISOString() };
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Bestellung:", order);
    clearCart();
    setStep("done");
  }

  if (step === "done") {
    return <OrderConfirmation onContinue={() => setStep("idle")} />;
  }

  if (step === "checkout" || step === "sending") {
    return (
      <Checkout
        total={total}
        sending={step === "sending"}
        onSubmit={handleOrder}
        onBack={() => setStep("idle")}
      />
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
            {items.map((item) => (
              <CartLine
                key={item.id}
                item={item}
                onRemove={() => removeFromCart(item.id)}
                onIncrease={() => increaseQuantity(item.id)}
                onDecrease={() => decreaseQuantity(item.id)}
              />
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

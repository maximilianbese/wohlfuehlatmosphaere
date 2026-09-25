import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { formatPrice } from "../utils/format";
import styles from "./Cart.module.css";

export type Customer = {
  name: string;
  email: string;
  street: string;
  zip: string;
  city: string;
};

const emptyCustomer: Customer = {
  name: "",
  email: "",
  street: "",
  zip: "",
  city: "",
};

type CheckoutFormProps = {
  total: number;
  sending: boolean;
  onSubmit: (customer: Customer) => void;
  onBack: () => void;
};

function CheckoutForm({ total, sending, onSubmit, onBack }: CheckoutFormProps) {
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit(customer);
  }

  return (
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
      <button type="submit" className={styles.orderButton} disabled={sending}>
        {sending
          ? "Wird gesendet …"
          : `Kostenpflichtig bestellen — ${formatPrice(total)}`}
      </button>
      <button
        type="button"
        className={styles.backButton}
        onClick={onBack}
        disabled={sending}
      >
        Zurück zum Warenkorb
      </button>
    </form>
  );
}

export default CheckoutForm;

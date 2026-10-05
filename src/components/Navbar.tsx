import { useCartContext } from "../context/CartContext";
import styles from "./Navbar.module.css";

function Navbar() {
  const { items } = useCartContext();
  const count = items.length;

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <span className={styles.brand}>Wohlfühlatmosphäre</span>

        <ul className={styles.links}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Shop</a>
          </li>
          <li>
            <a href="#">Story</a>
          </li>
          <li>
            <a href="#">Kontakt</a>
          </li>
        </ul>

        <button type="button" className={styles.cart} aria-label="Warenkorb">
          🛒
          {count > 0 && <span className={styles.badge}>{count}</span>}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

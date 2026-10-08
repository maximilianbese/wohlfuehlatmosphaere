import { useState } from "react";
import { useCartContext } from "../context/CartContext";
import styles from "./Navbar.module.css";

type NavbarProps = {
  onCartClick: () => void;
};

function Navbar({ onCartClick }: NavbarProps) {
  const { count } = useCartContext();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <span className={styles.brand}>Wohlfühlatmosphäre</span>
        <button
          type="button"
          className={styles.burger}
          aria-label="Menü"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <ul
          className={`${styles.links} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(false)}
        >
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

        <button
          type="button"
          className={styles.cart}
          aria-label="Warenkorb"
          onClick={onCartClick}
        >
          🛒
          {count > 0 && <span className={styles.badge}>{count}</span>}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <span className={styles.brand}>Wohlfühlatmosphäre</span>
          <p className={styles.text}>
            Personalisierte Kerzen & Handgemachte Deko für besondere Momente.
          </p>
        </div>

        <div className={styles.col}>
          <h3 className={styles.heading}>Kontakt</h3>
          <p className={styles.text}>hallo@wohlfuehlatmosphaere.de</p>
          <p className={styles.text}>Deutschland</p>
        </div>

        <div className={styles.col}>
          <h3 className={styles.heading}>Shop</h3>
          <ul className={styles.links}>
            <li>
              <a href="#">Kerzen</a>
            </li>
            <li>
              <a href="#">Deko</a>
            </li>
            <li>
              <a href="#">Gutscheine</a>
            </li>
          </ul>
        </div>
      </div>

      <p className={styles.copy}>
        © 2026 Wohlfühlatmosphäre · Alle Rechte vorbehalten
      </p>
    </footer>
  );
}

export default Footer;

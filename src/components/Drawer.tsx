import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./Drawer.module.css";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

function Drawer({ open, onClose, children }: DrawerProps) {
  if (!open) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <aside
        className={styles.panel}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Schließen"
        >
          ✕
        </button>
        {children}
      </aside>
    </div>,
    document.body,
  );
}

export default Drawer;

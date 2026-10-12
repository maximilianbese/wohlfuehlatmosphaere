import { useEffect } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./Drawer.module.css";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

function Drawer({ open, onClose, children }: DrawerProps) {
  useEffect(() => {
    if (!open) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return createPortal(
    <div
      className={`${styles.overlay} ${open ? styles.open : ""}`}
      onClick={onClose}
    >
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

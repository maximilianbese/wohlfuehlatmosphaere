import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./Drawer.module.css";
import { useEffect } from "react";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

function Drawer({ open, onClose, children }: DrawerProps) {
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape" && open) onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

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

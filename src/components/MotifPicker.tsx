import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./MotifPicker.module.css";

const motifNumbers = Array.from({ length: 29 }, (_, i) => i + 1);

type MotifPickerProps = {
  value: number | null;
  onChange: (motif: number | null) => void;
};

function MotifPicker({ value, onChange }: MotifPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setOpen(true)}
      >
        {value ? `Motiv: Bild ${value} (ändern)` : "Motiv wählen"}
      </button>

      {open &&
        createPortal(
          <div className={styles.backdrop} onClick={() => setOpen(false)}>
            <div
              className={styles.modal}
              onClick={(event) => event.stopPropagation()}
            >
              <div className={styles.head}>
                <h3>Motiv wählen</h3>
                <button
                  type="button"
                  className={styles.close}
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div className={styles.grid}>
                {motifNumbers.map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={
                      n === value
                        ? `${styles.option} ${styles.optionSelected}`
                        : styles.option
                    }
                    onClick={() => {
                      onChange(n === value ? null : n);
                      setOpen(false);
                    }}
                  >
                    <img src={`/motive/bild-${n}.png`} alt={`Bild ${n}`} />
                    <span className={styles.name}>Bild {n}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

export default MotifPicker;

import type { Variant } from "../types";
import { formatPrice } from "../utils/format";
import styles from "./VariantPicker.module.css";

type VariantPickerProps = {
  variants: Variant[];
  selected: Variant | null;
  onSelect: (variant: Variant) => void;
};

function VariantPicker({ variants, selected, onSelect }: VariantPickerProps) {
  return (
    <ul className={styles.sizes}>
      {variants.map((variant) => {
        const isSelected = variant.label === selected?.label;
        return (
          <li key={variant.label}>
            <button
              type="button"
              className={
                isSelected
                  ? `${styles.sizeRow} ${styles.sizeRowSelected}`
                  : styles.sizeRow
              }
              onClick={() => onSelect(variant)}
            >
              <span>{variant.label}</span>
              <span>{formatPrice(variant.price)}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default VariantPicker;

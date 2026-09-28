import { SORT_OPTIONS } from "../constants/shop";
import type { SortValue } from "../constants/shop";

type ProductToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  sort: SortValue;
  onSortChange: (value: SortValue) => void;
};

function ProductToolbar({
  search,
  onSearchChange,
  sort,
  onSortChange,
}: ProductToolbarProps) {
  return (
    <>
      <input
        type="search"
        className="search-input"
        placeholder="Produkt suchen..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <select
        className="sort-select"
        value={sort}
        onChange={(event) => onSortChange(event.target.value as SortValue)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}

export default ProductToolbar;

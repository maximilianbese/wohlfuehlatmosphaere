type FilterBarProps = {
  label?: string;
  options: string[];
  active: string;
  onChange: (value: string) => void;
};

function FilterBar({ label, options, active, onChange }: FilterBarProps) {
  return (
    <div className="filter-bar">
      {label && <span className="filter-label">{label}</span>}
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={
            option === active
              ? "filter-button filter-button--active"
              : "filter-button"
          }
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;

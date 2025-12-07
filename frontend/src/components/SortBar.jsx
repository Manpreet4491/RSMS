import React from "react";

const options = [
  { value: "CUSTOMER_NAME_ASC", label: "Customer Name (A–Z)" },
  { value: "CUSTOMER_NAME_DESC", label: "Customer Name (Z–A)" },
  { value: "DATE_DESC", label: "Date (Newest first)" },
  { value: "DATE_ASC", label: "Date (Oldest first)" },
  { value: "TOTAL_AMOUNT_DESC", label: "Total Amount (High–Low)" },
  { value: "TOTAL_AMOUNT_ASC", label: "Total Amount (Low–High)" },
];

export default function SortBar({ value, onChange }) {
  return (
    <div className="sort-bar">
      <span className="sort-label">Sort by:</span>
      <select
        className="sort-select"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

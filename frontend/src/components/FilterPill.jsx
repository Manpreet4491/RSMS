import React from "react";

export default function FilterPill({ label, value, onChange, options }) {
  return (
    <div className="filter-pill">
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}


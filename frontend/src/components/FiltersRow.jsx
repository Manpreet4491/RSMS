import React from "react";

const regions = ["North", "South", "East", "West", "Central"];
const genders = ["Male", "Female", "Other"];
const ageRanges = ["18–25", "26–35", "36–45", "46–60", "60+"];
const categories = ["Electronics", "Clothing", "Beauty", "Grocery", "Home"];
const paymentMethods = ["UPI", "Credit Card", "Debit Card", "Cash"];

export default function FiltersRow({ filters, onChange }) {
  return (
    <div className="filters-row">
      <select
        className="filter-pill"
        value={filters.customerRegion}
        onChange={e => onChange({ customerRegion: e.target.value })}
      >
        <option value="">Customer Region</option>
        {regions.map(r => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <select
        className="filter-pill"
        value={filters.gender}
        onChange={e => onChange({ gender: e.target.value })}
      >
        <option value="">Gender</option>
        {genders.map(g => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <select
        className="filter-pill"
        value={filters.ageRange}
        onChange={e => onChange({ ageRange: e.target.value })}
      >
        <option value="">Age Range</option>
        {ageRanges.map(a => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>

      <select
        className="filter-pill"
        value={filters.productCategory}
        onChange={e => onChange({ productCategory: e.target.value })}
      >
        <option value="">Product Category</option>
        {categories.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        multiple
        className="filter-pill tags-filter"
        value={filters.tags}
        onChange={e =>
          onChange({
            tags: Array.from(e.target.selectedOptions).map(o => o.value),
          })
        }
      >
        <option value="organic">Organic</option>
        <option value="skincare">Skincare</option>
        <option value="gadgets">Gadgets</option>
        <option value="wireless">Wireless</option>
        <option value="fashion">Fashion</option>
      </select>

      <select
        className="filter-pill"
        value={filters.paymentMethod}
        onChange={e => onChange({ paymentMethod: e.target.value })}
      >
        <option value="">Payment Method</option>
        {paymentMethods.map(m => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
}

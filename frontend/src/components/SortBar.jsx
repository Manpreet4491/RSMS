import React from "react";

const SortBar = ({ value, onChange }) => {
  return (
    <div className="sort-bar">
      <span className="sort-label">Sort by:</span>
      <select
        className="sort-select"
        value={value || "CUSTOMER_NAME_ASC"}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="CUSTOMER_NAME_ASC">Customer Name (A–Z)</option>
        <option value="CUSTOMER_NAME_DESC">Customer Name (Z–A)</option>
        <option value="DATE_DESC">Date (Newest first)</option>
        <option value="DATE_ASC">Date (Oldest first)</option>
        <option value="TOTAL_AMOUNT_DESC">Total Amount (High → Low)</option>
        <option value="TOTAL_AMOUNT_ASC">Total Amount (Low → High)</option>
      </select>
    </div>
  );
};

export default SortBar;

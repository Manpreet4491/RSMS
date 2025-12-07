import React from "react";

const FiltersRow = ({ filters, onChange }) => {
  const handlePatch = (patch) => onChange({ ...filters, ...patch, page: 0 });

  return (
    <div className="filters-row">
      <select
        className="filter-pill"
        value={filters.customerRegion || ""}
        onChange={(e) => handlePatch({ customerRegion: e.target.value })}
      >
        <option value="">Customer Region</option>
        <option value="North">North</option>
        <option value="South">South</option>
        <option value="East">East</option>
        <option value="West">West</option>
        <option value="Central">Central</option>
      </select>

      <select
        className="filter-pill"
        value={filters.gender || ""}
        onChange={(e) => handlePatch({ gender: e.target.value })}
      >
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <select
        className="filter-pill"
        value={filters.ageRangeLabel || ""}
        onChange={(e) => handlePatch({ ageRangeLabel: e.target.value })}
      >
        <option value="">Age Range</option>
        <option value="18-25">18–25</option>
        <option value="26-35">26–35</option>
        <option value="36-45">36–45</option>
        <option value="46-60">46–60</option>
        <option value="60+">60+</option>
      </select>

      <select
        className="filter-pill"
        value={filters.productCategory || ""}
        onChange={(e) => handlePatch({ productCategory: e.target.value })}
      >
        <option value="">Product Category</option>
        <option value="Beauty">Beauty</option>
        <option value="Clothing">Clothing</option>
        <option value="Electronics">Electronics</option>
        
      </select>

      <select
        className="filter-pill"
        value={filters.paymentMethod || ""}
        onChange={(e) => handlePatch({ paymentMethod: e.target.value })}
      >
        <option value="">Payment Method</option>
        <option value="Cash">Cash</option>
        <option value="UPI">UPI</option>
        <option value="Debit Card">Debit Card</option>
        <option value="Credit Card">Credit Card</option>
      </select>

    </div>
  );
};

export default FiltersRow;

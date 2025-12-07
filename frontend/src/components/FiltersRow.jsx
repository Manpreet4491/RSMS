export default function FiltersRow({ filters, setFilters }) {
  const update = (patch) => setFilters({ ...filters, ...patch, page: 0 });

  return (
    <div className="filter-bar">
      <div className="filter-chip">
        <select
          className="filter-select"
          value={filters.regions[0] || ""}
          onChange={(e) => update({ regions: e.target.value ? [e.target.value] : [] })}
        >
          <option value="">Customer Region</option>
          <option value="East">East</option>
          <option value="West">West</option>
          <option value="North">North</option>
          <option value="South">South</option>
        </select>
      </div>

      <div className="filter-chip">
        <select
          className="filter-select"
          value={filters.genders[0] || ""}
          onChange={(e) => update({ genders: e.target.value ? [e.target.value] : [] })}
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div className="filter-chip">
        <select
          className="filter-select"
          value={filters.productCategories[0] || ""}
          onChange={(e) =>
            update({
              productCategories: e.target.value ? [e.target.value] : [],
            })
          }
        >
          <option value="">Product Category</option>
          <option value="Clothing">Clothing</option>
          <option value="Beauty">Beauty</option>
          <option value="Grocery">Grocery</option>
        </select>
      </div>

      <div className="filter-chip">
        <select
          className="filter-select"
          value={filters.paymentMethods[0] || ""}
          onChange={(e) =>
            update({
              paymentMethods: e.target.value ? [e.target.value] : [],
            })
          }
        >
          <option value="">Payment Method</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
          <option value="Cash">Cash</option>
        </select>
      </div>

      <div className="filter-search">
        <span className="filter-search-icon">🔍</span>
        <input
          className="filter-search-input"
          placeholder="Name, Phone no."
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
        />
      </div>

      <div className="filter-chip">
        <select
          className="sort-select"
          value={filters.sortBy}
          onChange={(e) => update({ sortBy: e.target.value })}
        >
          <option value="customerName">Sort by: Customer Name (A–Z)</option>
          <option value="date">Sort by: Date</option>
          <option value="quantity">Sort by: Quantity</option>
        </select>
      </div>
    </div>
  );
}

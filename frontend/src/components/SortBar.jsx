export default function SortBar({ sortBy, sortDir, onChange, total }) {
  const handleFieldChange = e => onChange(e.target.value, sortDir);
  const handleDirChange = e => onChange(sortBy, e.target.value);

  return (
    <div className="sort-container">
      <span>Sort</span>
      <select className="sort-select" value={sortBy} onChange={handleFieldChange}>
        <option value="date">Date</option>
        <option value="quantity">Quantity</option>
        <option value="customerName">Customer name</option>
      </select>
      <select className="sort-select" value={sortDir} onChange={handleDirChange}>
        <option value="desc">Newest</option>
        <option value="asc">Oldest</option>
      </select>
      <span className="sort-meta">{total} results</span>
    </div>
  );
}

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrapper">
      <span className="search-icon">⌕</span>
      <input
        className="search-input"
        type="text"
        value={value}
        placeholder="Search by customer name or phone"
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}

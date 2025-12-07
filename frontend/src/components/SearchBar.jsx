import React from "react";

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        className="search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Name, Phone no."}
      />
    </div>
  );
};

export default SearchBar;

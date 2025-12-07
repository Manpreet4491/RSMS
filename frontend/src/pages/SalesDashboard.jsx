import React from "react";
import FiltersRow from "../components/FiltersRow";
import SearchBar from "../components/SearchBar";
import SortBar from "../components/SortBar";
import StatsCards from "../components/StatsCards";
import SalesTable from "../components/SalesTable";
import Pagination from "../components/Pagination";
import "../styles.css"; // or "./styles.css" depending on your setup

const SalesDashboard = ({
  filters,
  onFiltersChange,
  stats,
  pageData,
  onPageChange,
}) => {
  return (
    <div className="app-root">
      <div className="app-shell">
        <header className="app-header">
          <h1 className="app-title">Sales Management System</h1>
        </header>

        {/* Filters bar + search + sort */}
        <div className="toolbar">
          <div className="toolbar-left">
            <button
              className="icon-button"
              onClick={() => onFiltersChange({ reset: true })}
            >
              ⟳
            </button>
            <FiltersRow filters={filters} onChange={onFiltersChange} />
          </div>

          <div className="toolbar-right">
            <SearchBar
              value={filters.searchTerm}
              onChange={(value) =>
                onFiltersChange({ searchTerm: value, page: 0 })
              }
              placeholder="Name, Phone no."
            />
            <SortBar
              value={filters.sortBy}
              onChange={(value) => onFiltersChange({ sortBy: value, page: 0 })}
            />
          </div>
        </div>

        {/* KPI cards */}
        <StatsCards stats={stats} />

        {/* Table */}
        <div className="table-card">
          <SalesTable page={pageData} />
        </div>

        {/* Pagination */}
        <div className="pagination-wrapper">
          <Pagination
            page={pageData?.number || 0}
            totalPages={pageData?.totalPages || 1}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;

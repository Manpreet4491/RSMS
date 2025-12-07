import { useEffect, useMemo, useState } from "react";
import FiltersRow from "../components/FiltersRow";
import SearchBar from "../components/SearchBar";
import SortBar from "../components/SortBar";
import StatsCards from "../components/StatsCards";
import SalesTable from "../components/SalesTable";
import Pagination from "../components/Pagination";
import { fetchSales } from "../services/salesApi";

const AGE_RANGES = {
  "18–25": { minAge: 18, maxAge: 25 },
  "26–35": { minAge: 26, maxAge: 35 },
  "36–45": { minAge: 36, maxAge: 45 },
  "46–60": { minAge: 46, maxAge: 60 },
  "60+": { minAge: 60, maxAge: null },
};

const PAGE_SIZE = 20;

export default function SalesDashboard() {
  const [filters, setFilters] = useState({
    customerRegion: "",
    gender: "",
    ageRange: "",
    productCategory: "",
    paymentMethod: "",
    tags: [],
    startDate: "",
    endDate: "",
    searchTerm: "",
    sortBy: "CUSTOMER_NAME_ASC",
    page: 0,
    size: PAGE_SIZE,
  });

  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiParams = useMemo(() => {
    const age = AGE_RANGES[filters.ageRange] || {};
    return {
      page: filters.page,
      size: filters.size,
      customerRegion: filters.customerRegion || undefined,
      gender: filters.gender || undefined,
      minAge: age.minAge ?? undefined,
      maxAge: age.maxAge ?? undefined,
      productCategory: filters.productCategory || undefined,
      paymentMethod: filters.paymentMethod || undefined,
      tags: filters.tags.length ? filters.tags : undefined,
      startDate: filters.startDate || undefined,
      endDate: filters.endDate || undefined,
      searchTerm: filters.searchTerm || undefined,
      sortBy: filters.sortBy || undefined,
    };
  }, [filters]);

  useEffect(() => {
    let isActive = true;
    async function load() {
      setLoading(true);
      try {
        const data = await fetchSales(apiParams);
        if (isActive) {
          setPageData(data);
        }
      } finally {
        if (isActive) setLoading(false);
      }
    }
    load();
    return () => {
      isActive = false;
    };
  }, [apiParams]);

  const handleFiltersChange = patch => {
    setFilters(prev => ({
      ...prev,
      ...patch,
      page: patch.page != null ? patch.page : 0,
    }));
  };

  const handleResetFilters = () => {
    setFilters(prev => ({
      ...prev,
      customerRegion: "",
      gender: "",
      ageRange: "",
      productCategory: "",
      paymentMethod: "",
      tags: [],
      startDate: "",
      endDate: "",
      searchTerm: "",
      sortBy: "CUSTOMER_NAME_ASC",
      page: 0,
    }));
  };

  const handlePageChange = nextPage => {
    setFilters(prev => ({
      ...prev,
      page: nextPage,
    }));
  };

  const totalUnitsSold = useMemo(() => {
    if (!pageData) return 0;
    return pageData.content.reduce((sum, row) => sum + (row.quantity || 0), 0);
  }, [pageData]);

  const totalAmount = useMemo(() => {
    if (!pageData) return 0;
    return pageData.content.reduce(
      (sum, row) => sum + Number(row.totalAmount || 0),
      0
    );
  }, [pageData]);

  const totalDiscount = useMemo(() => {
    if (!pageData) return 0;
    return pageData.content.reduce(
      (sum, row) => sum + Number(row.totalAmount || 0) - Number(row.finalAmount || 0),
      0
    );
  }, [pageData]);

  return (
    <div className="page-shell">
      <header className="page-header">
        <h1 className="page-title">Sales Management System</h1>
      </header>

      <section className="filters-bar">
        <button
          type="button"
          className="refresh-button"
          onClick={() => handleFiltersChange({})}
        >
          ⟳
        </button>

        <FiltersRow
          filters={filters}
          onChange={handleFiltersChange}
        />

        <div className="filters-bar-right">
          <SearchBar
            value={filters.searchTerm}
            onChange={value => handleFiltersChange({ searchTerm: value })}
            placeholder="Name, Phone no."
          />
          <SortBar
            value={filters.sortBy}
            onChange={value => handleFiltersChange({ sortBy: value })}
          />
        </div>
      </section>

      <StatsCards
        totalUnitsSold={totalUnitsSold}
        totalAmount={totalAmount}
        totalDiscount={totalDiscount}
        loading={loading}
      />

      <SalesTable rows={pageData?.content || []} loading={loading} />

      <Pagination
        currentPage={filters.page}
        totalPages={pageData ? pageData.totalPages : 1}
        onPageChange={handlePageChange}
      />

      <div className="filters-reset-row">
        <button
          type="button"
          className="reset-button"
          onClick={handleResetFilters}
        >
          Reset filters
        </button>
      </div>
    </div>
  );
}

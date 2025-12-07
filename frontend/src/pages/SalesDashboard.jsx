import { useEffect, useState } from "react";
import { fetchSales } from "../services/salesApi";
import FiltersRow from "../components/FiltersRow";
import StatsCards from "../components/StatsCards";
import SalesTable from "../components/SalesTable";
import Pagination from "../components/Pagination";

export default function SalesDashboard() {
  const [filters, setFilters] = useState({
    search: "",
    page: 0,
    size: 10,
    sortBy: "customerName",
    sortDir: "asc",
    regions: [],
    genders: [],
    productCategories: [],
    paymentMethods: [],
    tags: [],
    customerTypes: [],
  });

  const [rows, setRows] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    async function load() {
      const res = await fetchSales(filters);
      setRows(res.content || []);
      setTotalPages(res.totalPages ?? 0);
      setTotalElements(res.totalElements ?? 0);
    }
    load();
  }, [filters]);

  return (
    <>
      <div className="header">Sales Management System</div>

      <FiltersRow filters={filters} setFilters={setFilters} />

      <StatsCards rows={rows} total={totalElements} />

      <SalesTable rows={rows} />

      <Pagination
        page={filters.page}
        totalPages={totalPages}
        onPageChange={(p) => setFilters({ ...filters, page: p })}
      />

    </>
  );
}

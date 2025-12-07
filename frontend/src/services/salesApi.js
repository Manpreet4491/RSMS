import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export async function fetchSales(filters) {
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);

  if (filters.regions?.length) filters.regions.forEach((v) => params.append("regions", v));
  if (filters.genders?.length) filters.genders.forEach((v) => params.append("genders", v));
  if (filters.productCategories?.length)
    filters.productCategories.forEach((v) => params.append("productCategories", v));
  if (filters.paymentMethods?.length)
    filters.paymentMethods.forEach((v) => params.append("paymentMethods", v));
  if (filters.tags?.length) filters.tags.forEach((v) => params.append("tags", v));
  if (filters.customerTypes?.length)
    filters.customerTypes.forEach((v) => params.append("customerTypes", v));

  if (filters.ageMin != null && filters.ageMin !== "") params.append("ageMin", filters.ageMin);
  if (filters.ageMax != null && filters.ageMax !== "") params.append("ageMax", filters.ageMax);

  if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.append("dateTo", filters.dateTo);

  params.append("sortBy", filters.sortBy || "date");
  params.append("sortDir", filters.sortDir || "desc");
  params.append("page", filters.page ?? 0);
  params.append("size", filters.size ?? 10);

  const res = await api.get(`/api/sales?${params.toString()}`);
  return res.data;
}

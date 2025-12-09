import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export async function fetchSales(params) {
  const response = await api.post("/api/sales", params);
  return response.data;
}

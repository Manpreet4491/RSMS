import React from "react";

function formatNumber(value) {
  if (!value) return "0";
  const num = Number(value);
  if (Number.isNaN(num)) return "0";
  if (num >= 10000000) return (num / 10000000).toFixed(1) + " Cr";
  if (num >= 100000) return (num / 100000).toFixed(1) + " L";
  if (num >= 1000) return (num / 1000).toFixed(1) + " K";
  return num.toFixed(0);
}

export default function StatsCards({
  totalUnitsSold = 0,
  totalAmount = 0,
  totalDiscount = 0,
  loading = false,
}) {
  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-label">Total Units Sold</div>
        <div className="stat-value">
          {loading ? "…" : formatNumber(totalUnitsSold)}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Total Sales Amount</div>
        <div className="stat-value">
          {loading ? "…" : "₹ " + formatNumber(totalAmount)}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Total Discount Given</div>
        <div className="stat-value">
          {loading ? "…" : "₹ " + formatNumber(totalDiscount)}
        </div>
      </div>
    </div>
  );
}

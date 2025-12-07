import React from "react";

const StatsCards = ({ stats }) => {
  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-label">Total units sold</div>
        <div className="stat-value">{stats.totalUnits}</div>
        <div className="stat-subtext">
          {stats.totalRecords} SRs
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Total Amount</div>
        <div className="stat-value">₹ {stats.totalAmount}</div>
        <div className="stat-subtext">
          {stats.totalRecords} SRs
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Total Discount</div>
        <div className="stat-value">₹ {stats.totalDiscount}</div>
        <div className="stat-subtext">
          {stats.discountedRecords} SRs
        </div>
      </div>
    </div>
  );
};

export default StatsCards;

export default function StatsCards({ rows, total }) {
  const totalUnits = rows.reduce((sum, r) => sum + (r.quantity || 0), 0);
  const totalAmount = rows.reduce(
    (sum, r) => sum + Number(r.finalAmount || 0),
    0
  );
  const totalDiscount = rows.reduce(
    (sum, r) => sum + Number(r.discountPercentage || 0),
    0
  );

  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-label">Total units sold</div>
        <div className="stat-value">{totalUnits}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Total Amount</div>
        <div className="stat-value">
          ₹ {totalAmount.toLocaleString("en-IN")}
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Total Discount</div>
        <div className="stat-value">
          ₹ {totalDiscount.toLocaleString("en-IN")}
        </div>
      </div>
    </div>
  );
}

import React from "react";

const SalesTable = ({ page }) => {
  const rows = page?.content || [];

  return (
    <div className="table-container">
      <table className="sales-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Customer name</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Product Category</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Customer Region</th>
            <th>Product ID</th>
            <th>Employee name</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.transactionId}>
              <td>{r.transactionId}</td>
              <td>{r.date}</td>
              <td>{r.customerId}</td>
              <td>{r.customerName}</td>
              <td>{r.phoneNumber}</td>
              <td>{r.gender}</td>
              <td>{r.age}</td>
              <td>{r.productCategory}</td>
              <td>{r.quantity}</td>
              <td>₹ {r.totalAmount}</td>
              <td>{r.customerRegion}</td>
              <td>{r.productId}</td>
              <td>{r.employeeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;

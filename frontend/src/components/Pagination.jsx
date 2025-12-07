import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const page = currentPage || 0;
  const total = totalPages || 1;

  const canPrev = page > 0;
  const canNext = page < total - 1;

  return (
    <div className="pagination">
      <button
        type="button"
        disabled={!canPrev}
        onClick={() => canPrev && onPageChange(page - 1)}
      >
        Prev
      </button>

      <span className="page-pill active">{page + 1}</span>
      <span className="page-ellipsis">…</span>
      <span className="page-total">{total}</span>

      <button
        type="button"
        disabled={!canNext}
        onClick={() => canNext && onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

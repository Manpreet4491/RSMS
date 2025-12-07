export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const maxVisible = 6;

  const buildRange = () => {
    const range = [];
    if (totalPages <= maxVisible) {
      for (let i = 0; i < totalPages; i++) range.push(i);
      return range;
    }

    range.push(0);

    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages - 2, page + 1);

    if (start > 1) range.push("...");
    for (let i = start; i <= end; i++) range.push(i);
    if (end < totalPages - 2) range.push("...");

    range.push(totalPages - 1);
    return range;
  };

  const range = buildRange();

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  return (
    <div className="pagination">
      <button
        className={`pagination-btn pagination-nav ${!canPrev ? "disabled" : ""}`}
        onClick={() => canPrev && onPageChange(page - 1)}
        disabled={!canPrev}
      >
        Prev
      </button>

      {range.map((p, idx) =>
        p === "..." ? (
          <span key={idx} className="pagination-ellipsis">
            ...
          </span>
        ) : (
          <button
            key={p}
            className={`pagination-btn ${page === p ? "active" : ""}`}
            onClick={() => onPageChange(p)}
          >
            {p + 1}
          </button>
        )
      )}

      <button
        className={`pagination-btn pagination-nav ${!canNext ? "disabled" : ""}`}
        onClick={() => canNext && onPageChange(page + 1)}
        disabled={!canNext}
      >
        Next
      </button>
    </div>
  );
}

type Props = {
  page: number;
  totalPages: number;
  setPage: (v: number | ((p: number) => number)) => void;
  showingFrom: number;
  showingTo: number;
  totalElements: number;
};

export function LeadsPagination({
  page,
  totalPages,
  setPage,
  showingFrom,
  showingTo,
  totalElements,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-3">
      <div className="flex space-x-1">
        <button onClick={() => setPage((p) => Math.max(0, p - 1))}>Prev</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={i === page ? "bg-slate-800 text-white" : ""}
            onClick={() => setPage(i)}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}>Next</button>
      </div>

      <div className="text-sm text-slate-500">
        Showing{" "}
        <b>
          {showingFrom}-{showingTo}
        </b>{" "}
        of {totalElements}
      </div>
    </div>
  );
}

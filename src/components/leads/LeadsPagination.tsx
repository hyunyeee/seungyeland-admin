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
  const isFirst = page === 0;
  const isLast = page === totalPages - 1;

  return (
    <div className="flex flex-col items-center gap-4 border-t bg-white px-6 py-4">
      {/* 페이지 버튼 */}
      <div className="flex items-center gap-2">
        <button
          disabled={isFirst}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => {
          const active = i === page;

          return (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`min-w-[36px] rounded-md px-3 py-1.5 text-sm font-medium transition ${
                active
                  ? "bg-slate-900 text-white shadow"
                  : "border border-slate-300 bg-white hover:bg-slate-100"
              }`}
            >
              {i + 1}
            </button>
          );
        })}

        <button
          disabled={isLast}
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>

      {/* 표시 정보 */}
      <div className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-medium text-slate-800">
          {showingFrom}-{showingTo}
        </span>{" "}
        of <span className="font-medium text-slate-800">{totalElements}</span>
      </div>
    </div>
  );
}

import { Lead } from "./types";

type Props = {
  data: Lead[];
  loading: boolean;
  error: string | null;
  savingIds: Set<number>;
  setDraftNotes: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  toggleContacted: (row: Lead) => void;
  saveNotes: (row: Lead) => void;
};

export function LeadsTableBody({
  data,
  loading,
  error,
  savingIds,
  setDraftNotes,
  toggleContacted,
  saveNotes,
}: Props) {
  if (loading) {
    return (
      <tr>
        <td colSpan={7} className="px-4 py-6 text-center">
          불러오는 중...
        </td>
      </tr>
    );
  }

  if (error) {
    return (
      <tr>
        <td colSpan={7} className="px-4 py-6 text-center text-rose-600">
          {error}
        </td>
      </tr>
    );
  }

  if (data.length === 0) {
    return (
      <tr>
        <td colSpan={7} className="px-4 py-6 text-center">
          데이터가 없습니다.
        </td>
      </tr>
    );
  }

  return (
    <>
      {data.map((row) => {
        const saving = savingIds.has(row.id);

        return (
          <tr key={row.id} className="hover:bg-slate-50">
            <td className="px-4 py-3 text-left">{row.siteName}</td>
            <td className="px-4 py-3 text-left">{row.customerName}</td>
            <td className="px-4 py-3 text-left">{row.customerPhone}</td>
            <td className="px-4 py-3 text-left">{row.desiredModel}</td>

            <td className="px-4 py-3 text-center">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={row.isContacted}
                  disabled={saving}
                  onChange={() => toggleContacted(row)}
                />
                <span className="text-sm">
                  {row.isContacted ? "연락완료" : "미연락"}
                </span>
              </label>
            </td>

            <td className="px-4 py-3">
              <input
                className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-slate-500 focus:outline-none"
                defaultValue={row.notes ?? ""}
                onChange={(e) =>
                  setDraftNotes((prev) => ({
                    ...prev,
                    [row.id]: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    saveNotes(row);
                  }
                }}
              />
            </td>

            <td className="px-4 py-3 text-center">
              <button
                className="rounded-md bg-slate-800 px-3 py-1.5 text-sm text-white hover:bg-slate-700 disabled:opacity-50"
                disabled={saving}
                onClick={() => saveNotes(row)}
              >
                저장
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
}

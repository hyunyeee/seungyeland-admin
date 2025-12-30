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
        <td colSpan={7} className="p-4">
          불러오는 중...
        </td>
      </tr>
    );
  }

  if (error) {
    return (
      <tr>
        <td colSpan={7} className="p-4 text-rose-600">
          {error}
        </td>
      </tr>
    );
  }

  if (data.length === 0) {
    return (
      <tr>
        <td colSpan={7} className="p-4">
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
          <tr key={row.id} className="hover:bg-slate-50/60">
            <td className="border-b p-4">{row.siteName}</td>
            <td className="border-b p-4">{row.customerName}</td>
            <td className="border-b p-4">{row.customerPhone}</td>
            <td className="border-b p-4">{row.desiredModel}</td>
            <td className="border-b p-4">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={row.isContacted}
                  disabled={saving}
                  onChange={() => toggleContacted(row)}
                />
                {row.isContacted ? "연락완료" : "미연락"}
              </label>
            </td>
            <td className="border-b p-4">
              <input
                className="w-full rounded border px-2 py-1 text-sm"
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
            <td className="border-b p-4">
              <button
                className="rounded bg-slate-800 px-3 py-1 text-sm text-white"
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

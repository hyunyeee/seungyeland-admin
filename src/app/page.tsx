"use client";

import { useEffect, useMemo, useState } from "react";

type Lead = {
  id: number;
  siteName: string;
  customerName: string;
  customerPhone: string;
  desiredModel: string;
  notes: string | null;
  isContacted: boolean;
};

type PagedResponse = {
  data: Lead[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function LeadsTable() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState<Lead[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [draftNotes, setDraftNotes] = useState<Record<number, string>>({});
  const [savingIds, setSavingIds] = useState<Set<number>>(new Set());

  async function fetchLeads(p = page, s = pageSize) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/management?page=${p}&size=${s}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const json: PagedResponse = await res.json();
      setData(json.data);
      setPage(json.page);
      setPageSize(json.pageSize);
      setTotalPages(json.totalPages);
      setTotalElements(json.totalElements);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  async function updateLead(
    id: number,
    payload: Partial<Pick<Lead, "isContacted" | "notes">>,
  ) {
    const res = await fetch(`${API_BASE}/management/${id}/admin`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Update failed: ${res.status}`);
    return res.json().catch(() => ({}));
  }

  const toggleContacted = async (row: Lead) => {
    setSavingIds((s) => new Set(s).add(row.id));
    setData((prev) =>
      prev.map((d) =>
        d.id === row.id ? { ...d, isContacted: !d.isContacted } : d,
      ),
    );
    try {
      await updateLead(row.id, { isContacted: !row.isContacted });
    } catch (e) {
      setData((prev) =>
        prev.map((d) =>
          d.id === row.id ? { ...d, isContacted: row.isContacted } : d,
        ),
      );
      console.error(e);
    } finally {
      setSavingIds((s) => {
        const n = new Set(s);
        n.delete(row.id);
        return n;
      });
    }
  };

  const saveNotes = async (row: Lead) => {
    const next = (draftNotes[row.id] ?? row.notes ?? "").trim();
    setSavingIds((s) => new Set(s).add(row.id));
    try {
      await updateLead(row.id, { notes: next });
      setData((prev) =>
        prev.map((d) => (d.id === row.id ? { ...d, notes: next } : d)),
      );
    } catch (e) {
      console.error(e);
    } finally {
      setSavingIds((s) => {
        const n = new Set(s);
        n.delete(row.id);
        return n;
      });
    }
  };

  const showingFrom = useMemo(() => page * pageSize + 1, [page, pageSize]);
  const showingTo = useMemo(
    () => page * pageSize + data.length,
    [page, pageSize, data.length],
  );

  return (
    <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
      <div className="p-6 px-0 overflow-auto">
        <div className="flex items-center justify-between px-6">
          <button
            className="rounded border px-3 py-1 text-sm hover:bg-slate-50"
            onClick={() => fetchLeads()}
          >
            새로고침
          </button>
        </div>

        <table className="w-full mt-3 text-left table-auto min-w-max">
          <thead>
            <tr>
              {[
                "사이트명",
                "고객 이름",
                "고객 연락처",
                "차종",
                "연락 여부",
                "메모",
                "저장",
              ].map((h) => (
                <th
                  key={h}
                  className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50"
                >
                  <p className="block text-sm font-normal leading-none text-blue-gray-900 opacity-70">
                    {h}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="p-4">
                  불러오는 중...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={7} className="p-4 text-rose-600">
                  {error}
                </td>
              </tr>
            )}
            {!loading && !error && data.length === 0 && (
              <tr>
                <td colSpan={7} className="p-4">
                  데이터가 없습니다.
                </td>
              </tr>
            )}
            {data.map((row) => {
              const saving = savingIds.has(row.id);
              return (
                <tr key={row.id} className="hover:bg-slate-50/60">
                  <td className="p-4 border-b border-blue-gray-50">
                    {row.siteName}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {row.customerName}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {row.customerPhone}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {row.desiredModel}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <label className="inline-flex items-center gap-2 select-none">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-slate-800"
                        checked={row.isContacted}
                        onChange={() => toggleContacted(row)}
                        disabled={saving}
                      />
                      <span className="text-sm text-slate-700">
                        {row.isContacted ? "연락완료" : "미연락"}
                      </span>
                      {saving && (
                        <span className="text-xs text-slate-400">저장중…</span>
                      )}
                    </label>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <input
                      className="w-full rounded border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
                      placeholder="메모를 입력하세요"
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
                  <td className="p-4 border-b border-blue-gray-50">
                    <button
                      className="px-3 py-1 text-sm rounded bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-50"
                      onClick={() => saveNotes(row)}
                      disabled={saving}
                    >
                      저장
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 justify-center items-center px-4 py-3">
        <div className="flex space-x-1">
          <button
            className="cursor-pointer px-3 py-1 text-sm font-normal border rounded"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`cursor-pointer px-3 py-1 text-sm font-normal border rounded ${i === page ? "bg-slate-800 text-white" : "bg-white text-slate-500"}`}
              onClick={() => setPage(i)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="cursor-pointer px-3 py-1 text-sm font-normal border rounded"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page + 1 >= totalPages}
          >
            Next
          </button>
        </div>
        <div className="text-sm text-slate-500">
          Showing{" "}
          <b>
            {showingFrom}-{showingTo}
          </b>{" "}
          of {totalElements}
        </div>
      </div>
    </div>
  );
}

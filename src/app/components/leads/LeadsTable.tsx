"use client";

import { useLeads } from "./useLeads";
import { LeadsTableBody } from "./LeadsTableBody";
import { LeadsPagination } from "./LeadsPagination";

export default function LeadsTable() {
  const leads = useLeads();

  return (
    <div className="relative flex h-full w-full flex-col rounded-xl bg-white shadow-md">
      <div className="overflow-auto p-6 px-0">
        <div className="flex justify-between px-6">
          <button className="rounded border px-3 py-1 text-sm" onClick={leads.fetchLeads}>
            새로고침
          </button>
        </div>

        <table className="mt-3 w-full table-auto">
          <thead>
            <tr>
              {["사이트명", "고객 이름", "고객 연락처", "차종", "연락 여부", "메모", "저장"].map(
                (h) => (
                  <th key={h} className="border-y p-4">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            <LeadsTableBody {...leads} />
          </tbody>
        </table>
      </div>

      <LeadsPagination {...leads} />
    </div>
  );
}

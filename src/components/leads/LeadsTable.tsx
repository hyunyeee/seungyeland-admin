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
          <button
            className="rounded border border-slate-300 px-3 py-1 text-sm hover:bg-slate-50"
            onClick={leads.fetchLeads}
          >
            새로고침
          </button>
        </div>

        <table className="mt-4 w-full table-fixed text-sm">
          <thead className="bg-slate-50 text-slate-700">
          <tr>
            <th className="w-[12%] border-y px-4 py-3 text-left font-medium">사이트명</th>
            <th className="w-[12%] border-y px-4 py-3 text-left font-medium">고객 이름</th>
            <th className="w-[16%] border-y px-4 py-3 text-left font-medium">고객 연락처</th>
            <th className="w-[12%] border-y px-4 py-3 text-left font-medium">차종</th>
            <th className="w-[14%] border-y px-4 py-3 text-center font-medium">연락 여부</th>
            <th className="w-[22%] border-y px-4 py-3 text-left font-medium">메모</th>
            <th className="w-[12%] border-y px-4 py-3 text-center font-medium">저장</th>
          </tr>
          </thead>

          <tbody className="divide-y">
          <LeadsTableBody {...leads} />
          </tbody>
        </table>
      </div>

      <LeadsPagination {...leads} />
    </div>
  );
}

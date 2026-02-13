"use client";

import { useState } from "react";
import { useLeads } from "./useLeads";
import { LeadsTableBody } from "./LeadsTableBody";
import { LeadsPagination } from "./LeadsPagination";
import { Lead } from "./types";

export default function LeadsTable() {
  const leads = useLeads();
  const [target, setTarget] = useState<Lead | null>(null);

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
          <thead className="border-b bg-slate-50 text-slate-700">
            <tr>
              <th className="w-[10%] px-4 py-3 text-left">사이트명</th>
              <th className="w-[12%] px-4 py-3 text-left">고객 이름</th>
              <th className="w-[15%] px-4 py-3 text-left">고객 연락처</th>
              <th className="w-[10%] px-4 py-3 text-left">차종</th>
              <th className="w-[13%] px-4 py-3 text-center">연락 여부</th>
              <th className="w-[22%] px-4 py-3 text-left">메모</th>
              <th className="w-[8%] px-4 py-3 text-center">저장</th>
              <th className="w-[10%] px-4 py-3 text-center">삭제</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            <LeadsTableBody {...leads} onDeleteClick={(row) => setTarget(row)} />
          </tbody>
        </table>
      </div>

      <LeadsPagination {...leads} />

      {target && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-[360px] rounded-xl bg-white p-6 shadow-xl">
            <h3 className="mb-2 text-lg font-semibold">삭제 확인</h3>
            <p className="mb-6 text-sm text-slate-600">정말 이 문의를 삭제하시겠습니까?</p>

            <div className="flex justify-end gap-3">
              <button
                className="rounded-md border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100"
                onClick={() => setTarget(null)}
              >
                취소
              </button>

              <button
                className="rounded-md bg-rose-600 px-4 py-2 text-sm text-white hover:bg-rose-700"
                onClick={() => {
                  leads.deleteLeadAction(target);
                  setTarget(null);
                }}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

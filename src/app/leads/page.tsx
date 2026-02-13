import LeadsTable from "@/components/leads/LeadsTable";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function ManagementPage() {
  return (
    <div className="p-6">
      <div className="mb-10 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900"
        >
          <ChevronLeft className="h-4 w-4" />
          관리자 홈
        </Link>
      </div>

      <h1 className="mb-4 text-xl font-semibold">고객 문의 관리</h1>
      <LeadsTable />
    </div>
  );
}

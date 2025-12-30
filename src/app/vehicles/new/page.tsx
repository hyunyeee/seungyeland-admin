import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import VehicleCreateForm from "@/components/VehicleCreateForm";

export default function VehicleCreatePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      {/* 상단 네비 */}
      <div className="mb-10 flex items-center justify-between">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900"
        >
          <ChevronLeft className="h-4 w-4" />
          관리자 홈
        </Link>
      </div>

      {/* 타이틀 */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">차량 등록</h1>
        <p className="mt-1 text-sm text-slate-500">신규 차량 정보를 입력하세요.</p>
      </div>

      {/* 폼 카드 */}
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <VehicleCreateForm />
      </div>
    </div>
  );
}

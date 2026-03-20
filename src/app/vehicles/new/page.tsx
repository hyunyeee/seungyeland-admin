import Link from "next/link";
import { ChevronLeft, ExternalLink } from "lucide-react";
import VehicleForm from "@/components/vehicles/VehicleForm";
import { Button } from "@/components/ui/button";

export default function VehicleCreatePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      {/* 상단 네비 */}
      <div className="mb-10 flex items-center justify-between">
        {/* 관리자 목록으로 */}
        <Link href="/">
          <Button
            variant="ghost"
            className="flex items-center gap-1 text-slate-600 hover:text-slate-900"
          >
            <ChevronLeft className="h-4 w-4" />
            관리자 목록
          </Button>
        </Link>

        {/* 우측 버튼 그룹 */}
        <div className="flex gap-3">
          <Link href="/vehicles">
            <Button variant="outline">차량 수정/삭제 관리</Button>
          </Link>

          {/* 승계랜드 새 탭 */}
          <a
            href="https://seungyeland.vercel.app/vehicle"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="flex items-center gap-1">
              사이트에서 차량 목록 보기
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* 타이틀 */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">차량 등록</h1>
        <p className="mt-1 text-sm text-slate-500">신규 차량 정보를 입력하세요.</p>
      </div>

      {/* 폼 카드 */}
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <VehicleForm mode="create" />
      </div>
    </div>
  );
}

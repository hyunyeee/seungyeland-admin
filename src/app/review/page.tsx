import Link from "next/link";
import { ChevronLeft, ExternalLink } from "lucide-react";
import ReviewForm from "@/components/review/ReviewForm";
import { Button } from "@/components/ui/button";

export default function ReviewCreatePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      {/* 상단 네비게이션 */}
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
          <Link href="/review-list">
            <Button variant="outline">관리자 리뷰 삭제 관리</Button>
          </Link>

          {/* 승계랜드 새 탭 */}
          <a
            href="https://seungyeland.vercel.app/reviews"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="flex items-center gap-1">
              사이트에서 리뷰 보기
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* 타이틀 영역 */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">리뷰 등록</h1>
        <p className="mt-1 text-sm text-slate-500">차량 이용 후기를 작성해주세요.</p>
      </div>

      {/* 폼 */}
      <ReviewForm />
    </div>
  );
}

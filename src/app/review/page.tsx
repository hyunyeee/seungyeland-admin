import Link from "next/link";
import { ChevronLeft, ExternalLink } from "lucide-react";
import ReviewForm from "@/components/review/ReviewForm";

export default function ReviewCreatePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      {/* 상단 네비게이션 */}
      <div className="mb-10 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-slate-900"
        >
          <ChevronLeft className="h-4 w-4" />
          뒤로가기
        </Link>

        <Link
          href="https://seungyeland.vercel.app/reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-slate-900"
        >
          작성된 리뷰 보기
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>

      {/* 타이틀 영역 */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">리뷰 등록</h1>
        <p className="mt-1 text-sm text-slate-500">차량 이용 후기를 작성해주세요.</p>
      </div>

      {/* 폼 카드 */}
      <ReviewForm />
    </div>
  );
}

import { ReviewCard } from "@/components/review/ReviewCard";
import { ReviewSummary } from "@/types/review";
import { getReviews } from "@/components/review/api";
import ReviewPagination from "@/components/review/ReviewPagination";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ReviewPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Review({ searchParams }: ReviewPageProps) {
  const { page } = await searchParams;

  const currentPage = Number(page ?? 0);

  const data = await getReviews(currentPage);

  const reviews: ReviewSummary[] = data.content;
  const totalPages = data.totalPages;

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold tracking-tight">리뷰 삭제 관리</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            등록된 리뷰를 확인하고 관리할 수 있습니다.
          </p>
        </div>

        {/* 기존 작성 버튼 유지 */}
        <div className="mb-8">
          <Link href="/review">
            <Button variant="outline">리뷰 작성</Button>
          </Link>
        </div>

        {/* 기존 리스트 그대로 유지 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* 페이지네이션 */}
        <ReviewPagination currentPage={currentPage} totalPages={totalPages} />
      </section>
    </main>
  );
}

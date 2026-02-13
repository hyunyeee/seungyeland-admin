import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ReviewPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function ReviewPagination({ currentPage, totalPages }: ReviewPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-14 flex justify-center gap-2">
      {Array.from({ length: totalPages }).map((_, idx) => (
        <Link key={idx} href={`/review-list?page=${idx}`}>
          <Button size="sm" variant={idx === currentPage ? "default" : "outline"}>
            {idx + 1}
          </Button>
        </Link>
      ))}
    </div>
  );
}

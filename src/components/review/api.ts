import { ReviewSummary } from "@/types/review";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ReviewPageResponse {
  content: ReviewSummary[];
  totalElements: number;
  totalPages: number;
  number: number;
}

export async function getReviews(page = 0): Promise<ReviewPageResponse> {
  const res = await fetch(`${BASE_URL}/reviews?page=${page}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return await res.json();
}

export async function deleteReview(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/admin/reviews/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to delete review");
  }
}

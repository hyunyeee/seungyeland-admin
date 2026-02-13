"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReviewSummary } from "@/types/review";
import { Trash2 } from "lucide-react";
import { deleteReview } from "@/components/review/api";

const DEFAULT_THUMBNAIL =
  "https://i.pinimg.com/1200x/80/05/4e/80054e1184ec8625d6a82d87f8007095.jpg";

interface Props {
  review: ReviewSummary;
}

export function ReviewCard({ review }: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const { id, title, content, thumbnail } = review;

  const resolvedThumbnail = thumbnail ?? DEFAULT_THUMBNAIL;

  const handleDelete = async () => {
    const ok = confirm("정말 삭제하시겠습니까?");
    if (!ok) return;

    try {
      setDeleting(true);
      await deleteReview(id);

      alert("삭제 성공");

      router.refresh(); // 서버 컴포넌트 재실행
    } catch (e) {
      console.error("삭제 실패:", e);
      alert("삭제 실패");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-xs">ID {id}</p>
            <h3 className="text-lg font-semibold">{title.replaceAll('"', "")}</h3>
          </div>

          <Button
            size="sm"
            variant="ghost"
            disabled={deleting}
            className="flex items-center gap-1 border border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
            {deleting ? "삭제 중..." : "삭제"}
          </Button>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">썸네일</p>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-100">
            <Image src={resolvedThumbnail} alt={title} fill className="object-cover" />
          </div>
        </div>

        <div>
          <p className="mb-1 text-sm font-medium">내용</p>
          <p className="text-muted-foreground text-sm">{content ?? "내용 없음"}</p>
        </div>

        {/*<div>*/}
        {/*  <p className="mb-2 text-sm font-medium">이미지 ({hasImages ? imageUrls!.length : 0})</p>*/}

        {/*  {hasImages ? (*/}
        {/*    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">*/}
        {/*      {imageUrls!.map((url, idx) => (*/}
        {/*        <div*/}
        {/*          key={`${url}-${idx}`}*/}
        {/*          className="relative aspect-[1/1] overflow-hidden rounded-md bg-neutral-100"*/}
        {/*        >*/}
        {/*          <Image src={url} alt={`review-image-${idx}`} fill className="object-cover" />*/}
        {/*        </div>*/}
        {/*      ))}*/}
        {/*    </div>*/}
        {/*  ) : (*/}
        {/*    <p className="text-muted-foreground text-sm">등록된 이미지 없음</p>*/}
        {/*  )}*/}
        {/*</div>*/}
      </CardContent>
    </Card>
  );
}

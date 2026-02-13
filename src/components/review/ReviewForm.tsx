"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ReviewForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ok = window.confirm(
      "리뷰를 등록하시겠습니까?\n(새로고침하면 입력한 데이터는 사라집니다)",
    );
    if (!ok) return;

    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(`${API_BASE}/reviews`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`등록 실패 (${res.status})`);
      }

      alert("리뷰가 정상적으로 등록되었습니다.");
      form.reset();
      setPreviews([]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "알 수 없는 오류");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border p-6 shadow-sm">
      {/* 제목 */}
      <div className="space-y-2">
        <Label htmlFor="title">제목</Label>
        <Input id="title" name="title" placeholder="소나타 후기" required />
      </div>

      {/* 내용 */}
      <div className="space-y-2">
        <Label htmlFor="content">내용</Label>
        <Textarea
          id="content"
          name="content"
          rows={5}
          placeholder="차 상태 좋고 만족합니다"
          required
        />
      </div>

      {/* 이미지 업로드 */}
      <div className="space-y-2">
        <Label htmlFor="images">이미지</Label>
        <Input
          id="images"
          name="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <p className="text-sm text-slate-500">여러 장 선택할 수 있습니다.</p>
      </div>

      {/* 이미지 미리보기 */}
      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {previews.map((src, idx) => (
            <div key={idx} className="overflow-hidden rounded-md border">
              <img src={src} alt={`preview-${idx}`} className="h-32 w-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-rose-600">{error}</p>}

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "등록 중..." : "리뷰 등록"}
        </Button>
      </div>
    </form>
  );
}

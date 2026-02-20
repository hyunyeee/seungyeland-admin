"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { OptionSelector } from "@/components/vehicles/OptionSelector";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function VehicleCreateForm() {
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const onImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    console.log(formData);
    e.preventDefault();

    // 🔥 옵션 배열 확인
    const options = formData.getAll("options");
    console.log("FormData options:", options);

    // 전체 payload 확인
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    setLoading(false);
    // try {
    //   const res = await fetch(`${API_BASE}/admin/vehicles`, {
    //     method: "POST",
    //     credentials: "include",
    //     body: formData,
    //   });
    //
    //   if (!res.ok) throw new Error("등록 실패");
    //
    //   alert("차량이 등록되었습니다.");
    //   e.currentTarget.reset();
    //   setPreviews([]);
    // } catch (e) {
    //   alert("차량 등록 중 오류가 발생했습니다.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* 기본 정보 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">기본 정보</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>제목</Label>
            <Input name="title" required />
          </div>

          <div>
            <Label>모델명</Label>
            <Input name="model" required />
          </div>

          <div>
            <Label>연식</Label>
            <Input name="year" />
          </div>

          <div>
            <Label>색상</Label>
            <Input name="color" />
          </div>
        </div>
      </section>

      {/* 가격 / 주행 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">주행 · 가격</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label>주행거리 (km)</Label>
            <Input type="number" name="mileage" />
          </div>
          <div>
            <Label>차량 가격</Label>
            <Input type="number" name="price" />
          </div>
          <div>
            <Label>월 렌트료</Label>
            <Input type="number" name="monthFee" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>승계 지원금</Label>
            <Input type="number" name="supportFee" />
          </div>
          <div>
            <Label>사고 이력 (회)</Label>
            <Input type="number" name="accidentHistory" />
          </div>
        </div>
      </section>

      {/* 옵션 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">옵션</h2>
        <OptionSelector />
      </section>

      {/* 이미지 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">이미지</h2>
        <Input type="file" name="images" multiple accept="image/*" onChange={onImagesChange} />

        {previews.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {previews.map((src, i) => (
              <img key={i} src={src} className="h-32 w-full rounded-lg object-cover" />
            ))}
          </div>
        )}
      </section>

      {/* 제출 */}
      <div className="flex justify-end">
        <Button type="submit" disabled={loading} className="rounded-xl px-8">
          {loading ? "등록 중..." : "차량 등록"}
        </Button>
      </div>
    </form>
  );
}

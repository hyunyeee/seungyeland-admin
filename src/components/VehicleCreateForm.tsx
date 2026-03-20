"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OptionSelector } from "@/components/vehicles/OptionSelector";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function VehicleCreateForm() {
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const leaseText = formData.get("leaseText");
    const rentText = formData.get("rentText");

    try {
      // 1️⃣ 차량 생성
      const res = await fetch(`${API_BASE}/admin/vehicles`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        alert("차량 등록 실패");
        return;
      }

      // 🔥 숫자 그대로 옴
      const vehicleId = await res.json();

      console.log("vehicleId:", vehicleId);

      // 2️⃣ 리스 등록
      if (leaseText) {
        await fetch(`${API_BASE}/lease-info`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vehicleId,
            type: "LEASE",
            data: leaseText,
          }),
        });
      }

      // 3️⃣ 렌트 등록
      if (rentText) {
        await fetch(`${API_BASE}/lease-info`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vehicleId,
            type: "RENT",
            data: rentText,
          }),
        });
      }

      alert("차량 + 리스/렌트 등록 완료");
      router.push("/");
      setPreviews([]);
    } catch (error) {
      console.error(error);
      alert("에러 발생");
    } finally {
      setLoading(false);
    }
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

          <div>
            <Label>연료 타입</Label>
            <select name="fuelType" className="w-full rounded-xl border p-2 text-sm">
              <option value="">선택</option>
              <option value="가솔린">가솔린</option>
              <option value="디젤">디젤</option>
              <option value="하이브리드">하이브리드</option>
              <option value="전기">전기</option>
            </select>
          </div>

          <div>
            <Label>변속기</Label>
            <select name="gearType" className="w-full rounded-xl border p-2 text-sm">
              <option value="">선택</option>
              <option value="오토">오토</option>
              <option value="수동">수동</option>
              <option value="세미오토">세미오토</option>
            </select>
          </div>
        </div>
      </section>

      {/* 차량 설명 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">차량 설명</h2>
        <textarea
          name="description"
          rows={6}
          className="w-full rounded-xl border p-3 text-sm"
          placeholder="차량 설명 입력"
        />
      </section>

      {/* 리스 / 렌트 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">리스 / 렌트 정보</h2>

        <div>
          <Label>리스</Label>
          <textarea
            name="leaseText"
            rows={4}
            className="w-full rounded-xl border p-3 text-sm"
            placeholder="리스 조건 입력"
          />
        </div>

        <div>
          <Label>렌트</Label>
          <textarea
            name="rentText"
            rows={4}
            className="w-full rounded-xl border p-3 text-sm"
            placeholder="렌트 조건 입력"
          />
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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OptionSelector } from "@/components/vehicles/OptionSelector";
import { createVehicle, updateVehicle } from "@/lib/api/adminVehicles";
import { VehicleDetail } from "@/types/vehicle";

type CreateProps = {
  mode: "create";
};

type EditProps = {
  mode: "edit";
  defaultValues: VehicleDetail;
  vehicleId: number;
};

type Props = CreateProps | EditProps;

export default function VehicleForm(props: Props) {
  const { mode } = props;

  const defaultValues = mode === "edit" ? props.defaultValues : undefined;
  const vehicleId = mode === "edit" ? props.vehicleId : undefined;

  const [previews, setPreviews] = useState<string[]>(defaultValues?.images ?? []);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  /** 이미지 미리보기 */
  const onImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  /** 제출 */
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      if (mode === "create") {
        await createVehicle(formData);
        alert("차량 등록 완료");
      } else {
        if (!vehicleId) throw new Error("vehicleId 없음");
        await updateVehicle(vehicleId, formData);
        alert("차량 수정 완료");
      }

      router.push("/vehicles");
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
            <Input name="title" defaultValue={defaultValues?.title} required />
          </div>

          <div>
            <Label>모델명</Label>
            <Input name="model" defaultValue={defaultValues?.model} required />
          </div>

          <div>
            <Label>연식</Label>
            <Input name="year" defaultValue={defaultValues?.year} />
          </div>

          <div>
            <Label>색상</Label>
            <Input name="color" defaultValue={defaultValues?.color} />
          </div>

          <div>
            <Label>연료 타입</Label>
            <select
              name="fuelType"
              defaultValue={defaultValues?.fuelType ?? ""}
              className="w-full rounded-xl border p-2 text-sm"
            >
              <option value="">선택</option>
              <option value="가솔린">가솔린</option>
              <option value="디젤">디젤</option>
              <option value="하이브리드">하이브리드</option>
              <option value="전기">전기</option>
            </select>
          </div>

          <div>
            <Label>변속기</Label>
            <select
              name="gearType"
              defaultValue={defaultValues?.gearType ?? ""}
              className="w-full rounded-xl border p-2 text-sm"
            >
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
          defaultValue={defaultValues?.description ?? ""}
          className="w-full rounded-xl border p-3 text-sm"
        />
      </section>

      {/* 가격 / 주행 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">주행 · 가격</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label>주행거리 (km)</Label>
            <Input type="number" name="mileage" defaultValue={defaultValues?.mileage} />
          </div>

          <div>
            <Label>차량 가격</Label>
            <Input type="number" name="price" defaultValue={defaultValues?.price} />
          </div>

          <div>
            <Label>월 렌트료</Label>
            <Input type="number" name="monthFee" defaultValue={defaultValues?.monthFee} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>승계 지원금</Label>
            <Input type="number" name="supportFee" defaultValue={defaultValues?.supportFee} />
          </div>

          <div>
            <Label>사고 이력 (회)</Label>
            <Input
              type="number"
              name="accidentHistory"
              defaultValue={defaultValues?.accidentHistory}
            />
          </div>
        </div>
      </section>

      {/* 옵션 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">옵션</h2>
        <OptionSelector defaultValues={defaultValues?.options ?? []} />
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
          {loading
            ? mode === "create"
              ? "등록 중..."
              : "수정 중..."
            : mode === "create"
              ? "차량 등록"
              : "차량 수정"}
        </Button>
      </div>
    </form>
  );
}

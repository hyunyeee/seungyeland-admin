"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteVehicle } from "@/lib/api/adminVehicles";
import { VehicleSummary } from "@/types/vehicle";
import { VehicleCard } from "@/components/vehicles/VehicleCard";

export default function AdminVehicleCard(vehicle: VehicleSummary) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/vehicles/${vehicle.id}/edit`);
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await deleteVehicle(vehicle.id);
      alert("삭제 완료");
      router.refresh(); // 🔥 핵심
    } catch (error) {
      console.error(error);
      alert("삭제 실패");
    }
  };

  return (
    <div className="space-y-2 rounded-md p-4 transition-colors hover:bg-neutral-50">
      {/* 기존 카드 그대로 */}
      <VehicleCard {...vehicle} />

      {/* 관리자 버튼 */}
      <div className="flex gap-2 pt-1">
        <Button
          size="sm"
          variant="outline"
          onClick={handleEdit}
          className="cursor-pointer border-neutral-300 text-neutral-700 hover:bg-neutral-100"
        >
          수정
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={handleDelete}
          className="cursor-pointer border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          삭제
        </Button>
      </div>
    </div>
  );
}

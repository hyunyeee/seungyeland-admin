import { getVehicleById } from "@/lib/api/adminVehicles";
import VehicleForm from "@/components/vehicles/VehicleForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPage({ params }: Params) {
  const { id } = await params;

  const numericId = Number(id);

  const vehicle = await getVehicleById(numericId);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      {/* 상단 네비 */}
      <div className="mb-10 flex items-center justify-between">
        {/* 차량 목록으로 */}
        <Link href="/vehicles">
          <Button
            variant="ghost"
            className="flex items-center gap-1 text-slate-600 hover:text-slate-900"
          >
            <ChevronLeft className="h-4 w-4" />
            기존 차량 목록
          </Button>
        </Link>
      </div>

      {/* 타이틀 */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">차량 수정</h1>
        <p className="mt-1 text-sm text-slate-500">기존 차량 정보를 수정하세요.</p>
      </div>

      {/* 폼 카드 */}
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <VehicleForm mode="edit" defaultValues={vehicle} vehicleId={numericId} />
      </div>
    </div>
  );
}

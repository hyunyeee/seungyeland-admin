import { getVehicles } from "@/lib/api/adminVehicles";
import AdminVehicleCard from "@/components/vehicles/AdminVehicleCard";
import Pagination from "@/components/ui/Pagenation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface Iparms {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminVehiclesPage({ searchParams }: Iparms) {
  let page = Number((await searchParams).page);

  if (isNaN(page) || page < 1) {
    page = 1;
  }

  const data = await getVehicles(page - 1);
  const vehicles = data.content;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/vehicles/new">
        <Button
          variant="ghost"
          className="mb-10 flex items-center gap-1 text-slate-600 hover:text-slate-900"
        >
          <ChevronLeft className="h-4 w-4" />
          차량 등록
        </Button>
      </Link>
      <section className="space-y-10">
        {/* 헤더 */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h1 className="text-2xl font-semibold">기존 차량 관리</h1>

          <p className="text-neutral-700">
            총 <span className="font-semibold text-neutral-950">{data.totalElements}</span>
            대의 차량이 있습니다.
          </p>
        </div>

        {/* 리스트 */}
        <div className="grid grid-cols-1 gap-6 text-start sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <AdminVehicleCard key={vehicle.id} {...vehicle} />
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="pt-6">
          <Pagination current={page} total={data.totalPages} />
        </div>
      </section>
    </main>
  );
}

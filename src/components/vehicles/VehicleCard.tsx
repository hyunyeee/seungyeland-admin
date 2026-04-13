import Link from "next/link";
import { VehicleSummary } from "@/types/vehicle";
import { ImageSpace } from "@/components/ui/ImageSpace";

/** 숫자 포맷: 1000 -> 1,000 */
export const formatNumber = (num: number) => num?.toLocaleString("ko-KR");

export function VehicleCard(vehicle: VehicleSummary) {
  const { id, title, thumbnail, year, price, mileage, fuelType, gearType, color } = vehicle;

  return (
    <Link
      href={`/vehicle/${id}`}
      className="flex items-center gap-3  sm:flex-col sm:items-start sm:gap-2"
    >
      {/* 이미지 */}
      <div className="size-32 shrink-0 overflow-hidden rounded-lg sm:h-60 sm:w-full">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="h-full w-full object-cover" />
        ) : (
          <ImageSpace />
        )}
      </div>

      {/* 텍스트 */}
      <div className="w-full sm:px-1 sm:pt-2">
        <p className="text-lg font-semibold">{title}</p>

        <p className="text-sm text-neutral-600 sm:text-base">
          {year}년 · {formatNumber(mileage)}km · {fuelType} · {gearType} · {color}
        </p>

        <p className="mt-3 text-xl font-bold">{formatNumber(price)}만원</p>
      </div>
    </Link>
  );
}

export type FinanceType = "rent" | "lease";

/**
 * 차량 목록 카드 (리스트 API)
 */
export interface VehicleSummary {
  id: number;
  title: string;
  thumbnail: string | null;
  year: string;
  price: number;
  mileage: number;
  fuelType: string | null;
  gearType: string | null;
  color: string;
}

/**
 * 차량 목록 페이지 응답
 */
export interface VehiclePageResponse {
  content: VehicleSummary[];
  totalElements: number;
  totalPages: number;
  number: number;
}

/**
 * 차량 상세 정보
 */
export interface VehicleDetail {
  id: number;
  title: string;
  model: string;
  year: string;
  mileage: number;
  price: number;

  monthFee: number;
  supportFee: number;

  description: string | null;

  color: string;
  fuelType: string | null;
  gearType: string | null;

  accidentHistory: number;

  images: string[];
  options: string[];
}

import { VehicleDetail, VehiclePageResponse } from "@/types/vehicle";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getVehicleById(id: number): Promise<VehicleDetail> {
  const res = await fetch(`${API_BASE}/vehicles/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch vehicle");
  }

  return res.json();
}
export async function getVehicles(page = 0): Promise<VehiclePageResponse> {
  const res = await fetch(`${API_BASE}/vehicles?page=${page}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch vehicles");
  }

  return res.json();
}

export async function createVehicle(formData: FormData) {
  const res = await fetch(`${API_BASE}/admin/vehicles`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("차량 등록 실패");
  }

  return res.json(); // vehicleId
}

export async function updateVehicle(id: number, formData: FormData) {
  const res = await fetch(`${API_BASE}/admin/vehicles/${id}`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("차량 수정 실패");
  }

  return res.json();
}

export async function deleteVehicle(id: number) {
  const res = await fetch(`${API_BASE}/admin/vehicles/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("차량 삭제 실패");
  }
}

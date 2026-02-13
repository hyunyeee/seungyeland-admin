import { PagedResponse, Lead } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchLeadsApi(page: number, size: number) {
  const res = await fetch(`${API_BASE}/management?page=${page}&size=${size}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed: ${res.status}`);
  }

  return (await res.json()) as PagedResponse;
}

export async function updateLeadApi(
  id: number,
  payload: Partial<Pick<Lead, "isContacted" | "notes">>,
) {
  const res = await fetch(`${API_BASE}/management/${id}/admin`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Update failed: ${res.status}`);
  }

  return res.json().catch(() => ({}));
}

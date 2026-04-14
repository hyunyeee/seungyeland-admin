"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Props {
  vehicleId: number;
}

export function AdminFinanceEditor({ vehicleId }: Props) {
  const [rent, setRent] = useState("");
  const [lease, setLease] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async (type: "rent" | "lease", content: string) => {
    setLoading(true);

    try {
      await fetch(`${API_BASE}/lease-info/${vehicleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleId,
          type,
          data: {
            content,
          },
        }),
      });

      alert(`${type === "rent" ? "렌트" : "리스"} 저장 완료`);
    } catch (e) {
      console.error(e);
      alert("저장 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <label className="text-sm font-medium">렌트 정보</label>
        <input
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          className="w-full rounded-md border border-neutral-200 px-3 py-2"
          placeholder="렌트 정보 입력"
        />
        <Button onClick={() => handleSave("rent", rent)} disabled={loading}>
          렌트 저장
        </Button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">리스 정보</label>
        <input
          value={lease}
          onChange={(e) => setLease(e.target.value)}
          className="w-full rounded-md border border-neutral-200 px-3 py-2"
          placeholder="리스 정보 입력"
        />
        <Button onClick={() => handleSave("lease", lease)} disabled={loading}>
          리스 저장
        </Button>
      </div>
    </div>
  );
}

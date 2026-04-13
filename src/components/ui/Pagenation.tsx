"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  current: number;
  total: number;
}

export default function Pagination({ current, total }: PaginationProps) {
  const maxVisible = 5;

  const isFirst = current === 1;
  const isLast = current === total;

  let start = Math.max(1, current - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;

  if (end > total) {
    end = total;
    start = Math.max(1, end - (maxVisible - 1));
  }

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="mt-24 flex items-center justify-center gap-2">
      {/* 첫 페이지 */}
      <Link
        href={`/vehicles?page=1`}
        className={`flex size-9 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 ${
          isFirst ? "pointer-events-none opacity-40" : ""
        }`}
      >
        <ChevronsLeft className="size-4" />
      </Link>

      {/* 이전 */}
      <Link
        href={`/vehicles?page=${Math.max(current - 1, 1)}`}
        className={`flex size-9 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 ${
          isFirst ? "pointer-events-none opacity-40" : ""
        }`}
      >
        <ChevronLeft className="size-4" />
      </Link>

      {/* 페이지 */}
      {pages.map((p) => (
        <Link
          key={p}
          href={`/vehicles?page=${p}`}
          className={`flex size-9 items-center justify-center rounded-lg border text-sm font-medium transition ${
            p === current
              ? "border-blue-600 bg-blue-600 text-white shadow-sm"
              : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100"
          }`}
        >
          {p}
        </Link>
      ))}

      {/* 다음 */}
      <Link
        href={`/vehicles?page=${Math.min(current + 1, total)}`}
        className={`flex size-9 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 ${
          isLast ? "pointer-events-none opacity-40" : ""
        }`}
      >
        <ChevronRight className="size-4" />
      </Link>

      {/* 마지막 */}
      <Link
        href={`/vehicles?page=${total}`}
        className={`flex size-9 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 ${
          isLast ? "pointer-events-none opacity-40" : ""
        }`}
      >
        <ChevronsRight className="size-4" />
      </Link>
    </div>
  );
}

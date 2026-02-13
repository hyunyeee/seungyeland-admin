import Link from "next/link";
import { MessageSquare, PenSquare, CarFront } from "lucide-react";
import { AuthButton } from "@/components/login/AuthButton";
import { getSession } from "@/lib/session";

export default async function Home() {
  const isLoggedIn = Boolean((await getSession()).id);

  return (
    <div className="mx-auto max-w-4xl p-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">관리자 메뉴</h1>
        <AuthButton isLoggedIn={isLoggedIn} />
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* 고객 문의 관리 */}
        <Link
          href="/leads"
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
            <MessageSquare className="h-6 w-6" />
          </div>

          <h2 className="mb-1 text-lg font-semibold text-slate-900">고객 문의 관리</h2>
          <p className="text-sm text-slate-500">고객 문의를 확인하고 상태를 관리합니다.</p>

          <div className="mt-4 text-sm font-medium text-slate-900 opacity-0 transition group-hover:opacity-100">
            바로가기 →
          </div>
        </Link>

        {/* 리뷰 등록 */}
        <Link
          href="/review"
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
            <PenSquare className="h-6 w-6" />
          </div>

          <h2 className="mb-1 text-lg font-semibold text-slate-900">리뷰 등록</h2>
          <p className="text-sm text-slate-500">차량 이용 후기를 등록합니다.</p>

          <div className="mt-4 text-sm font-medium text-slate-900 opacity-0 transition group-hover:opacity-100">
            바로가기 →
          </div>
        </Link>

        {/* 🚗 차량 등록 */}
        <Link
          href="/vehicles/new"
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
            <CarFront className="h-6 w-6" />
          </div>

          <h2 className="mb-1 text-lg font-semibold text-slate-900">차량 등록</h2>
          <p className="text-sm text-slate-500">신규 차량 정보를 등록합니다.</p>

          <div className="mt-4 text-sm font-medium text-slate-900 opacity-0 transition group-hover:opacity-100">
            바로가기 →
          </div>
        </Link>
      </div>
    </div>
  );
}

"use client";

import { login } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { PasswordInput } from "./PasswordInput";
import { IdInput } from "./IdInput";
import { useSearchParams } from "next/navigation";

export function LoginForm() {
  const [state, action, isPending] = useActionState(login, {});

  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") ?? "/";

  return (
    <form action={action} className="space-y-6">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight text-slate-900">관리자 로그인</h1>
      <IdInput error={<ErrorMessage text={state.id} />} />
      <PasswordInput error={<ErrorMessage text={state.password} />} />
      <input type="hidden" name="returnTo" value={returnTo} />
      <Button type="submit" disabled={isPending} className="mt-8 w-full cursor-pointer">
        {isPending ? "로딩 중..." : "로그인"}
      </Button>
    </form>
  );
}

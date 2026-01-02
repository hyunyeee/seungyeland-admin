"use client";

import { logout } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function AuthButton({ isLoggedIn }: { isLoggedIn: boolean }) {
  if (isLoggedIn) return <LogoutButton />;
  return <LoginButton />;
}

function LoginButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("/login")} variant="default" className="cursor-pointer">
      로그인
    </Button>
  );
}

function LogoutButton() {
  return (
    <Button onClick={logout} variant="outline" className="cursor-pointer">
      로그아웃
    </Button>
  );
}

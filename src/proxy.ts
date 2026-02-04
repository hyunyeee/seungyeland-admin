import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isLoggedIn = (await getSession()).id;

  // 메인 페이지는 패스
  if (pathname === "/") {
    return NextResponse.next();
  }

  // 로그인 페이지 접근
  if (pathname.startsWith("/login")) {
    // 로그인된 상태면 메인으로
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // 프라이빗 페이지
  if (!isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("returnTo", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};

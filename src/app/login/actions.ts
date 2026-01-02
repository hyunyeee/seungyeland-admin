"use server";

import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

type LoginErrors = {
  id?: string;
  password?: string;
};

const MY_ID = process.env.SEUNGYELAND_ID;
const MY_PW = process.env.SEUNGYELAND_PASSWORD;

function safeRedirect(path: string) {
  if (!path.startsWith("/")) return "/";
  if (path.startsWith("//")) return "/";
  return path;
}

/** 로그인, useActionState 전용 */
export async function login(_: LoginErrors, formdata: FormData): Promise<LoginErrors> {
  const userId = formdata.get("승계랜드_id")?.toString();
  const userPw = formdata.get("승계랜드_password")?.toString();
  const returnTo = formdata.get("returnTo")?.toString() ?? "/";

  const errors: LoginErrors = {};

  // 0.5초 로딩
  await new Promise((r) => setTimeout(r, 500));

  if (!userId) {
    errors.id = "아이디를 입력해주세요.";
  } else if (MY_ID !== userId) {
    errors.id = "아이디가 일치하지 않습니다.";
  }

  if (!userPw) {
    errors.password = "비밀번호를 입력해주세요.";
  } else if (MY_PW !== userPw) {
    errors.password = "비밀번호가 일치하지 않습니다.";
  }

  // 에러가 하나라도 있으면 그대로 반환
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  // 세션 생성
  const session = await getSession();
  session.id = "admin";
  await session.save();

  // 성공
  return redirect(safeRedirect(returnTo));
}

/** 로그아웃 */
export const logout = async () => {
  const session = await getSession();
  if (session.id) {
    session.destroy();
  }
};

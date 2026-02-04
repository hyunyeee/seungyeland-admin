import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: string;
}

const sessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "seungyeland_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60, // 하루 후 세션 만료
  },
};

export const getSession = async () => {
  return await getIronSession<SessionContent>(await cookies(), {
    ...sessionOptions,
  });
};

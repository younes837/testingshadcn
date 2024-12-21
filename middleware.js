import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
export default withAuth(
  async function middleware(request) {
    const token = await getToken({ req: request });
    const isAuth = !!token;

    if (!isAuth) {
      return NextResponse.redirect(new URL(`/`), request.url);
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};

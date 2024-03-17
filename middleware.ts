import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.headers.get("Authorization");
  // if (req.nextUrl.pathname.startsWith("/api/auth")) {
  //   //logic to check wheather admin account exists
  //   return NextResponse.next();
  // }

  if (token == null) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*"],
};

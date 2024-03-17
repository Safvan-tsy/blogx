import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.headers.get("app-key");
  // if (req.nextUrl.pathname.startsWith("/api/auth")) {
  //   //logic to check wheather admin account exists
  //   return NextResponse.next();
  // }

  if (token != null && token === process.env.NEXT_PUBLIC_APP_KEY) {
    return NextResponse.next();
  }
  return NextResponse.json(
    {
      message: "Unauthorized",
    },
    { status: 403 }
  );
}

export const config = {
  matcher: ["/api/:path*"],
};

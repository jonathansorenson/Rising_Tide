import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (process.env.COMING_SOON !== "true") {
    return NextResponse.next();
  }

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/coming-soon")) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL("/coming-soon", req.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|logo.svg|images|resources/.*\\.(?:pdf|png|jpg|jpeg|svg|webp)|robots.txt|sitemap.xml|llms.txt).*)",
  ],
};

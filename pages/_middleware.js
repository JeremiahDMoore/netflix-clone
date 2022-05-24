import { NextResponse } from "next/server";
import { verifyToken } from "../lib/utils";

export async function middleware(req, ev) {
  const token = req ? req.cookies?.token : null;
  const userId = await verifyToken(token);
  const { pathname } = req.nextUrl;

  if ((token && userId) || pathname.includes("/api/login")) {
    return new NextResponse.next();
  }

  const skippedPaths = [
    "/static/signin-bg.jpg",
    "/static/netflix.svg",
    "/favicon.ico",
  ];

  if (!token && pathname !== "/login" && !skippedPaths.includes(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

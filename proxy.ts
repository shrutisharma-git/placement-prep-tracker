import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

type UserPayload = {
  id: string;
  email: string;
  role: string;
};

export function proxy(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const pathname = req.nextUrl.pathname;

    // ✅ अगर login page hai → allow karo
  if (pathname === "/login") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next(); // ⭐ important
  }

  // ✅ बाकी protected routes
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET missing");
    }

    if (process.env.NODE_ENV === "development") {
      return NextResponse.next();
    }

    // 🔹 Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as UserPayload;

    // 🔹 Admin protection
    if (pathname.startsWith("/admin")) {
      if (decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }


    return NextResponse.next();

  }catch (error) {
    console.error("JWT Error:", error);
    return NextResponse.next(); // ❗ redirect mat karo
  }
}

export const config = {
  matcher: ["/login", "/dashboard", "/dashboard/:path*", "/admin/:path*"],
};
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // ── Admin routes ────────────────────────────────────
    if (path.startsWith("/dashboard/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // ── Vendor routes ───────────────────────────────────
    if (path.startsWith("/dashboard/vendor") && token?.role === "buyer") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Only run middleware if user has a valid token
      authorized: ({ token }) => !!token,
    },
  }
);

// Apply middleware to these paths
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/admin/:path*",
    "/api/cart/:path*",
    "/api/reviews/:path*",
    "/api/payments/:path*",
  ],
};

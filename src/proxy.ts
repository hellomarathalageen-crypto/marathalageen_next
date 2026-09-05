import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const pathname = req.nextUrl.pathname;
    const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup");
    const isAdminPage = pathname.startsWith("/admin");
    const isOnboardingPage = pathname.startsWith("/onboarding");

    // Redirect already authenticated users away from login/signup
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return null;
    }

    // Require authentication for all matched protected routes
    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }

    // Role-based protection for /admin
    if (isAdminPage && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // If user already has completed profile, redirect away from /onboarding
    if (isOnboardingPage && token?.hasProfile === true) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Require completed profile setup: If logged in but profile not setup, redirect to onboarding
    // (Admins are exempt from requiring a candidate profile)
    const isAdmin = token?.role === "ADMIN";
    if (!isOnboardingPage && !isAdmin && !token?.hasProfile) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    return null;
  },
  {
    callbacks: {
      authorized: () => true, // Handled inside middleware function
    },
  }
);

export const config = {
  matcher: [
    "/biodata/:path*",
    "/matches/:path*",
    "/shortlist/:path*",
    "/inbox/:path*",
    "/messages/:path*",
    "/interests/:path*",
    "/profile/:path*",
    "/dashboard/:path*",
    "/admin/:path*",
    "/onboarding/:path*",
    "/login",
    "/signup"
  ]
};

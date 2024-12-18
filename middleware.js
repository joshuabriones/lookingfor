import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Define role-based route protection
const protectedRoutes = {
  JOB_SEEKER: ["/appliedjobs", "/findwork"],
  EMPLOYER: ["/job", "/job-post", "/posted-jobs", "/profile"],
};

const defaultRoute = "/";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Redirect to the login page if no token is found and trying to access protected routes
  if (
    !token &&
    pathname !== "/login" &&
    pathname !== "/signup" &&
    pathname !== defaultRoute
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If the user is logged in, prevent access to the default route
  if (token && pathname === defaultRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If the user is not logged in, allow access to the default route
  if (!token) {
    return NextResponse.next();
  }

  // Role-based route protection
  if (token.role === "JOB_SEEKER") {
    if (!protectedRoutes.JOB_SEEKER.includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  if (token.role === "EMPLOYER") {
    if (!protectedRoutes.EMPLOYER.includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

// it's good???

// Apply middleware to relevant routes
export const config = {
  matcher: [
    "/", // Default route
    "/signup",
    "/appliedjobs",
    "/findwork",
    "/job",
    "/job-post",
    "/posted-jobs",
    "/profile",
  ],
};

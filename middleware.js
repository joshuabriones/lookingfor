import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const publicRoutes = ["/login", "/signup", "/"];

// Define role-based route protection
const protectedRoutes = {
  JOB_SEEKER: ["/appliedjobs", "/findwork", "/profile"],
  EMPLOYER: ["/job", "/job-post", "/posted-jobs", "/profile"],
};

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // If the user is not logged in, allow access to the default route
  if (!token) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If the user is logged in, prevent access to the default route
  if (publicRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
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
    "/login",
    "/signup",
    // "/dashboard",
    "/appliedjobs",
    "/findwork",
    "/job",
    "/job-post",
    "/posted-jobs",
    "/profile",
  ],
};

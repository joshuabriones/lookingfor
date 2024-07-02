import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Define paths that do not require authentication
  const publicPaths = ["/login", "/signup", "/api/public"];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Retrieve the token (if available)
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // console.log(token);

  const privatePaths = ["/employer", "/jobseeker", "/admin", "/dashboard"];

  // If no token, redirect to login
  if (!token && privatePaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // // Extract user role from token
  // const userRole = token?.user?.role;

  // // Role-based access control
  // const isEmployerRoute = pathname.startsWith("/employer");
  // const isJobSeekerRoute = pathname.startsWith("/jobseeker");
  // const isAdminRoute = pathname.startsWith("/admin");

  // if (isEmployerRoute && userRole !== "EMPLOYER") {
  //   return NextResponse.redirect(new URL("/unauthorized", request.url));
  // }

  // if (isJobSeekerRoute && userRole !== "JOB_SEEKER") {
  //   return NextResponse.redirect(new URL("/unauthorized", request.url));
  // }

  // if (isAdminRoute && userRole !== "ADMIN") {
  //   return NextResponse.redirect(new URL("/unauthorized", request.url));
  // }

  // // Allow the request to proceed
  // return NextResponse.next();
}

// Configuring matcher to apply middleware to relevant routes
export const config = {
  matcher: [
    "/((?!api/public|_next/static|_next/image|favicon.ico|login|signup).*)",
  ],
};

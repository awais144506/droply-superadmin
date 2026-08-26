import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define route categories
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/api/webhooks(.*)"]);
const isDashboardRoute = createRouteMatcher(["/app(.*)"]);

// Helper: Extract real client IP
function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "127.0.0.1";
}

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const clientIp = getClientIp(req);
  const isProd = process.env.NODE_ENV === "production";
  const rawAllowedIps = process.env.SUPERADMIN_ALLOWED_IPS || "";
  const allowedIps = rawAllowedIps.split(",").map((ip) => ip.trim()).filter(Boolean);

  // 1. IP Whitelisting Guard (Active on Dashboard routes in production)
  if (isDashboardRoute(req) && isProd && allowedIps.length > 0) {
    const isAllowed = allowedIps.includes(clientIp) || allowedIps.includes("*");

    if (!isAllowed) {
      return new NextResponse(
        JSON.stringify({
          error: "Forbidden",
          message: `Access denied. Your IP address (${clientIp}) is not authorized to access the Droply SuperAdmin panel.`,
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  // 2. Clerk Authentication Guard
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
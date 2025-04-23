import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"])

export default clerkMiddleware({
  publicRoutes: (req) => isPublicRoute(req.url),
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}

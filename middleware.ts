import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { ROLE_PATHS } from "./lib/constants";

function canAccessPath(roles: string[], pathname: string): boolean {
  // Check if any of user's roles allows this path
  for (const role of roles) {
    const allowedPaths = ROLE_PATHS[role] || [];
    for (const path of allowedPaths) {
      if (pathname === path || pathname.startsWith(path + "/")) {
        return true;
      }
    }
  }
  return false;
}

// export default withAuth({
//   callbacks: {
//     authorized: ({ token, req }) => {
//       const path = req.nextUrl.pathname;

//       // Public routes
//       if (path === "/login" || path === "/unauthorized") return true;

//       // User must be authenticated
//       if (!token) return false;

//       if (path === "/dashboard") return true;
      
//       // Check role-based access
//       const roles = (token as any).roles || [];
//       const hasAccess = canAccessPath(roles, path);

//       return hasAccess;
//     },
//   },
// });

export default withAuth(
  function middleware(req) {
    const path = req.nextUrl.pathname;

    // Public routes - always allow
    if (path === "/login" || path === "/unauthorized") {
      return NextResponse.next();
    }

    // Dashboard root - allow authenticated users
    if (path === "/dashboard") {
      return NextResponse.next();
    }

    // Check role-based access for subpaths
    const roles = (req.nextauth.token as any)?.roles || [];
    const hasAccess = canAccessPath(roles, path);

    if (!hasAccess) {
      // Redirect to unauthorized instead of login
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"], // protect dashboard & its children
};

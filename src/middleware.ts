import { NextRequest } from "next/server";
import nextIntlMiddleware from "@/i18n/middleware";

export function middleware(request: NextRequest) {
  return nextIntlMiddleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all pathnames except for:
     * - static files (.*\\..*)
     * - Next.js internals (_next)
     * - API routes (api)
     * - favicon.ico
     */
    "/((?!api|_next|favicon.ico|.*\\..*).*)",
  ],
};

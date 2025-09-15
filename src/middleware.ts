import { NextRequest } from "next/server";
import { i18nPipe } from "@/utils/middleware.utils";

export function middleware(request: NextRequest) {
  return i18nPipe(request);
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

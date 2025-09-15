import { NextRequest } from "next/server";
import { i18nPipe } from "@/utils/middleware.utils";

export function middleware(request: NextRequest) {
  return i18nPipe(request);
}
export const config = {
  matcher: [
    // Skip all internal paths (_next), static files, API routes
    "/((?!api|_next|favicon.ico|.*\\..*).*)",
  ],
};

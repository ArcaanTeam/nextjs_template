import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

let locales = ["fa", "en"];

export function i18nPipe(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language") || "";

  // Pass it to Negotiator
  const headers = { "accept-language": acceptLanguage };
  let languages = new Negotiator({ headers }).languages();
  let defaultLocale = "fa";

  return match(languages, locales, defaultLocale);
}

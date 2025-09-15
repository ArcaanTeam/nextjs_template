import { DEFAULT_LOCALE, LOCALES, ValidLocaleString } from "@/config/i18n";
import { Key } from "@/constants/enums";
import { SET_LOCALE_COOKIE_CONFIG } from "@/constants/frequents";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

export function i18nPipe(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ STEP 1: If URL has DEFAULT_LOCALE prefix → REWRITE to clean URL, but internally keep locale
  if (pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const newPathname = pathname.replace(`/${DEFAULT_LOCALE}`, ""); // e.g. /fa/about → /about
    const url = new URL(request.url);
    url.pathname = newPathname; // User sees this (clean URL)
    // BUT — internally, we rewrite to /fa/about so Next.js knows the locale
    return NextResponse.rewrite(
      new URL(`/${DEFAULT_LOCALE}${newPathname}`, request.url)
    );
  }

  // ✅ STEP 2: If path is exactly /{DEFAULT_LOCALE} → rewrite to / (but internally /fa/)
  if (pathname === `/${DEFAULT_LOCALE}`) {
    return NextResponse.rewrite(new URL(`/${DEFAULT_LOCALE}/`, request.url));
  }

  // ✅ STEP 3: Check if path already has any valid locale prefix
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return; // Let Next.js handle it normally
  }

  // ✅ STEP 4: No locale in path? Add user's preferred locale
  const [locale, saved] = getLocale(request);

  // 👉 If preferred locale is DEFAULT → rewrite to clean URL (but internally with /fa/...)
  if (locale === DEFAULT_LOCALE) {
    const response = NextResponse.rewrite(
      new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url)
    );

    if (!saved) {
      response.cookies.set(
        Key.CookieI18nSavedLocale,
        locale,
        SET_LOCALE_COOKIE_CONFIG
      );
    }

    return response;
  }

  // 👉 If preferred locale is NOT default → redirect to /en/... etc.
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  const response = NextResponse.redirect(newUrl);

  if (!saved) {
    response.cookies.set(
      Key.CookieI18nSavedLocale,
      locale,
      SET_LOCALE_COOKIE_CONFIG
    );
  }

  return response;
}

function getLocale(request: NextRequest): [ValidLocaleString, boolean] {
  const savedLocale = request.cookies.get(Key.CookieI18nSavedLocale)?.value;
  if (savedLocale && LOCALES.includes(savedLocale as ValidLocaleString)) {
    return [savedLocale as ValidLocaleString, true];
  }

  const acceptLanguage = request.headers.get("accept-language") || "";
  const headers = { "accept-language": acceptLanguage };
  const languages = new Negotiator({ headers }).languages();

  return [
    match(languages, LOCALES, DEFAULT_LOCALE) as ValidLocaleString,
    false,
  ];
}

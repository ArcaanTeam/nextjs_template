import { DEFAULT_LOCALE, LOCALES, ValidLocaleString } from "@/config/i18n";
import { Key } from "@/constants/enums";
import { SET_LOCALE_COOKIE_CONFIG } from "@/constants/frequents";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

export function i18nPipe(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ===================================================================
  // ✅ STEP 0: Finalize clean URL if coming from /[default_locale] redirect
  //    → Remove flag, update cookie, redirect to clean path
  // ===================================================================
  if (request.nextUrl.searchParams.has("__fromDefaultLocale")) {
    const cleanUrl = new URL(pathname, request.url);
    const response = NextResponse.redirect(cleanUrl);

    // Override cookie — user explicitly chose default locale
    response.cookies.set(
      Key.CookieI18nSavedLocale,
      DEFAULT_LOCALE,
      SET_LOCALE_COOKIE_CONFIG
    );

    return response;
  }

  // ===================================================================
  // ✅ STEP 1: If path starts with /{DEFAULT_LOCALE}/... → redirect to clean URL with flag
  // ===================================================================
  if (pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const newPathname = pathname.replace(`/${DEFAULT_LOCALE}`, "");
    const url = new URL(newPathname || "/", request.url);
    url.searchParams.set("__fromDefaultLocale", "1"); // flag for next pass
    return NextResponse.redirect(url);
  }

  // ===================================================================
  // ✅ STEP 2: If path is exactly /{DEFAULT_LOCALE} → redirect to / with flag
  // ===================================================================
  if (pathname === `/${DEFAULT_LOCALE}`) {
    const url = new URL("/", request.url);
    url.searchParams.set("__fromDefaultLocale", "1");
    return NextResponse.redirect(url);
  }

  // ===================================================================
  // ✅ STEP 3: Check if path already has any valid locale prefix
  // ===================================================================
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return; // Let Next.js handle it
  }

  // ===================================================================
  // ✅ STEP 4: No locale in path → apply user’s preferred locale
  // ===================================================================
  const [locale, saved] = getLocale(request);

  // -------------------------------------------------------------------
  // 👉 If preferred locale is DEFAULT → rewrite internally (URL stays clean)
  // -------------------------------------------------------------------
  if (locale === DEFAULT_LOCALE) {
    const response = NextResponse.rewrite(
      new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url)
    );

    // Only set cookie if not already saved
    if (!saved) {
      response.cookies.set(
        Key.CookieI18nSavedLocale,
        locale,
        SET_LOCALE_COOKIE_CONFIG
      );
    }

    return response;
  }

  // -------------------------------------------------------------------
  // 👉 If preferred locale is NOT default → redirect to /en/... etc.
  // -------------------------------------------------------------------
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

// =====================================================================
// 🧠 Helper: Get user’s preferred locale (cookie > header > default)
// =====================================================================
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

import { DEFAULT_LOCALE, isLocaleStringValid, LOCALES } from "@/config/i18n";
import { Key } from "@/constants/enums";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

// =====================================================================
// 🧠 Helper: Get user’s preferred locale (cookie > header > default)
// =====================================================================

export function resolveLocale(req: NextRequest): string {
  const cookieLocale = req.cookies.get(Key.CookieI18nSavedLocale)?.value;
  if (cookieLocale && isLocaleStringValid(cookieLocale)) {
    return cookieLocale;
  }

  const negotiator = new Negotiator({
    headers: Object.fromEntries(req.headers.entries()),
  });
  const detected = negotiator.language(Array.from(LOCALES));
  return detected || DEFAULT_LOCALE;
}

export function rewrite(
  req: NextRequest,
  internalPathname: string,
  locale: string
) {
  const url = req.nextUrl.clone();
  url.pathname = internalPathname;

  const headers = new Headers(req.headers);
  headers.set("x-locale", locale);

  return NextResponse.rewrite(url, { request: { headers } });
}

export function redirect(req: NextRequest, externalPathname: string) {
  const url = req.nextUrl.clone();
  url.pathname = externalPathname;
  return NextResponse.redirect(url);
}

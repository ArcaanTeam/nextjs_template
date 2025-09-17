import { DEFAULT_LOCALE, isLocaleStringValid } from "@/config/i18n";
import { NextRequest } from "next/server";
import { routing } from "./routing";
import { redirect, resolveLocale, rewrite } from "./utils";

export default function nextIntlMiddleware(req: NextRequest) {
  const { localePrefix } = routing;

  const { pathname } = req.nextUrl;
  const pathnameSegments = pathname.split("/").filter(Boolean);
  const pathnameLocale = isLocaleStringValid(pathnameSegments[0])
    ? pathnameSegments[0]
    : undefined;

  const resolvedLocale = resolveLocale(req);
  const isDefault = resolvedLocale === DEFAULT_LOCALE;
  const hasLocalePrefix = pathnameLocale != null;

  // Determine if routing should be unprefixed (without locale prefix)
  const isUnprefixedRouting =
    (localePrefix as string) === "never" ||
    (isDefault && localePrefix === "as-needed");

  // Get the path without locale prefix
  const unprefixedPathname = hasLocalePrefix
    ? "/" + pathnameSegments.slice(1).join("/")
    : pathname;

  // Get the internal pathname (always with locale prefix for Next.js routing)
  const internalPathname = `/${resolvedLocale}${unprefixedPathname}`;

  // Handle different routing scenarios
  if (hasLocalePrefix) {
    // User is accessing a path with locale prefix (e.g., /en/about)
    if (pathnameLocale === resolvedLocale) {
      // Locale in URL matches resolved locale
      if (isDefault && localePrefix === "as-needed") {
        // For default locale with as-needed, redirect to remove prefix
        return redirect(req, unprefixedPathname);
      } else {
        // For non-default locales or always prefix, rewrite to internal path
        return rewrite(req, internalPathname, resolvedLocale);
      }
    } else {
      // Locale in Url doesn't match resolved locale, redirect to correct locale
      const correctPathname =
        isDefault && localePrefix === "as-needed"
          ? unprefixedPathname
          : `/${resolvedLocale}${unprefixedPathname}`;
      return redirect(req, correctPathname);
    }
  } else {
    // User is accessing a path without locale prefix (e.g., /about)
    if (isUnprefixedRouting) {
      // For default locale with as-needed or never prefix, rewrite to internal path
      return rewrite(req, internalPathname, resolvedLocale);
    } else {
      // For non-default locales or always prefix, redirect to add locale prefix
      return redirect(req, `/${resolvedLocale}${unprefixedPathname}`);
    }
  }
}

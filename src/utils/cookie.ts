// lib/cookies.ts

import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextResponse } from "next/server";

// ======================
// CLIENT-SIDE UTILS
// (Use in "use client" components, browser only)
// ======================

type CookieOptions = {
  path?: string;
  maxAge?: number;
  sameSite?: "strict" | "lax" | "none";
  secure?: boolean;
  domain?: string;
  expires?: Date;
};

/**
 * Set a cookie on the client (browser)
 */
export const setCookieClient = (
  name: string,
  value: string,
  options: CookieOptions = {}
) => {
  if (typeof document === "undefined") return;

  let cookieString = `${name}=${encodeURIComponent(value)};`;

  if (options.maxAge) cookieString += ` Max-Age=${options.maxAge};`;
  if (options.path) cookieString += ` Path=${options.path};`;
  if (options.domain) cookieString += ` Domain=${options.domain};`;
  if (options.sameSite) cookieString += ` SameSite=${options.sameSite};`;
  if (options.secure) cookieString += ` Secure;`;
  if (options.expires)
    cookieString += ` Expires=${options.expires.toUTCString()};`;

  document.cookie = cookieString;
};

/**
 * Get a cookie value on the client
 */
export const getCookieClient = (name: string): string | undefined => {
  if (typeof document === "undefined") return undefined;

  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((row) => row.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : undefined;
};

/**
 * Delete a cookie on the client
 */
export const deleteCookieClient = (
  name: string,
  options: Pick<CookieOptions, "path" | "domain"> = {}
) => {
  setCookieClient(name, "", {
    ...options,
    maxAge: 0,
    expires: new Date(0),
  });
};

// ======================
// SERVER-SIDE UTILS
// (Use in middleware, server actions, API routes)
// ======================

/**
 * Set a cookie via NextResponse (server)
 */
export const setCookieServer = (
  response: NextResponse,
  name: string,
  value: string,
  options: CookieOptions = {}
) => {
  response.cookies.set(name, value, {
    path: options.path || "/",
    maxAge: options.maxAge,
    sameSite: options.sameSite || "lax",
    secure: options.secure || process.env.NODE_ENV === "production",
    domain: options.domain,
    expires: options.expires,
  });
};

/**
 * Get a cookie from NextRequest (server)
 */
export const getCookieServer = (
  cookies: ReadonlyRequestCookies,
  name: string
): string | undefined => {
  return cookies.get(name)?.value;
};

/**
 * Delete a cookie via NextResponse (server)
 */
export const deleteCookieServer = (
  response: NextResponse,
  name: string,
  options: Pick<CookieOptions, "path" | "domain"> = {}
) => {
  response.cookies.delete(name);
  // Optional: explicitly expire it too
  setCookieServer(response, name, "", {
    ...options,
    maxAge: 0,
    expires: new Date(0),
  });
};

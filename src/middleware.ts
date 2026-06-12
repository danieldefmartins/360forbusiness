import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";

// Redirect locale-less paths to the default locale so clean URLs like
// /start, /contact, /pricing work (otherwise Next matches the first segment
// as [locale] and renders the home page with an English fallback).
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Run on everything except Next internals, API routes, and static files.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

import { NextResponse, type NextRequest } from "next/server";
import {
  isLocale,
  LOCALE_COOKIE,
  selectLocale,
} from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const savedLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    savedLocale && isLocale(savedLocale)
      ? savedLocale
      : selectLocale(request.headers.get("accept-language"));

  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}

export const config = {
  matcher: "/",
};

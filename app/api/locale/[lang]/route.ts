import { NextResponse, type NextRequest } from "next/server";
import {
  isLocale,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
} from "@/lib/i18n";

type LocaleRouteContext = {
  params: Promise<{ lang: string }>;
};

export async function GET(request: NextRequest, context: LocaleRouteContext) {
  const { lang } = await context.params;

  if (!isLocale(lang)) {
    return new Response(null, { status: 404 });
  }

  const response = NextResponse.redirect(new URL(`/${lang}`, request.url));
  response.cookies.set({
    name: LOCALE_COOKIE,
    value: lang,
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: LOCALE_COOKIE_MAX_AGE,
  });

  return response;
}

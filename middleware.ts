import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "./i18n";
import { updateSession } from "./lib/supabase/middleware";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

/** Разделяет путь на локаль и остаток: "/en/cabinet" → { locale: "en", rest: "/cabinet" } */
function splitLocale(pathname: string): { locale: Locale; rest: string } {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0] as Locale | undefined;
  if (first && locales.includes(first)) {
    return { locale: first, rest: "/" + segments.slice(1).join("/") };
  }
  return { locale: defaultLocale, rest: pathname };
}

const isCabinetPath = (rest: string) => rest === "/cabinet" || rest.startsWith("/cabinet/");
const isLoginPath = (rest: string) => rest === "/cabinet/login" || rest.startsWith("/cabinet/login/");

function localePath(locale: Locale, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

export default async function middleware(request: NextRequest) {
  // Служебные маршруты (обработчик ссылки из письма) — мимо языковой маршрутизации,
  // иначе next-intl уводит их в языковую ветку, где обработчика нет.
  if (request.nextUrl.pathname.startsWith("/auth/")) {
    return NextResponse.next();
  }

  const { locale, rest } = splitLocale(request.nextUrl.pathname);

  // Обычные страницы сайта — только языковая маршрутизация, без обращения к Supabase.
  if (!isCabinetPath(rest)) {
    return intlMiddleware(request);
  }

  const response = intlMiddleware(request);
  const { user } = await updateSession(request, response);

  // Не вошёл и просит защищённый раздел — на страницу входа.
  if (!user && !isLoginPath(rest)) {
    const url = request.nextUrl.clone();
    url.pathname = localePath(locale, "/cabinet/login");
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Уже вошёл и открывает страницу входа — сразу в кабинет.
  if (user && isLoginPath(rest)) {
    const url = request.nextUrl.clone();
    url.pathname = localePath(locale, "/cabinet");
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

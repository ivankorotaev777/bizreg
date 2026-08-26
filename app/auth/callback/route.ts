import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/i18n";

/**
 * Обработчик ссылки из письма: обменивает одноразовый код на сессию
 * и отправляет клиента в кабинет.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const localeParam = searchParams.get("locale");
  const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
  const cabinetPath = locale === defaultLocale ? "/cabinet" : `/${locale}/cabinet`;
  const loginPath = locale === defaultLocale ? "/cabinet/login" : `/${locale}/cabinet/login`;

  if (!code) {
    return NextResponse.redirect(`${origin}${loginPath}?error=missing_code`);
  }

  const response = NextResponse.redirect(`${origin}${cabinetPath}`);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(`${origin}${loginPath}?error=exchange_failed`);
  }

  return response;
}

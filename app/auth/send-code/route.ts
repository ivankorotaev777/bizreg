import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/i18n";

/**
 * Первый шаг входа: отправка кода на почту.
 * Обычная отправка формы, без JavaScript — так шаг работает в любом браузере.
 */
export async function POST(request: NextRequest) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim();
  const localeValue = String(form.get("locale") ?? "");
  const locale = (locales.includes(localeValue as Locale) ? localeValue : defaultLocale) as Locale;
  const loginPath = locale === defaultLocale ? "/cabinet/login" : `/${locale}/cabinet/login`;
  const { origin } = new URL(request.url);
  const back = (params: string) => NextResponse.redirect(`${origin}${loginPath}?${params}`, 303);

  if (!email) return back("error=send");

  const response = back(`step=code&email=${encodeURIComponent(email)}`);

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

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${origin}/auth/callback?locale=${locale}`,
    },
  });

  if (error) return back(`error=send&email=${encodeURIComponent(email)}`);

  return response;
}

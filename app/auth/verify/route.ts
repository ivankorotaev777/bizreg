import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/i18n";

/**
 * Второй шаг входа: проверка кода.
 * Проверка идёт на сервере, и сессия ставится обычным заголовком ответа —
 * поэтому кабинет открывается сразу, без участия JavaScript в браузере.
 */
export async function POST(request: NextRequest) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim();
  const token = String(form.get("code") ?? "").replace(/\D/g, "");
  const localeValue = String(form.get("locale") ?? "");
  const locale = (locales.includes(localeValue as Locale) ? localeValue : defaultLocale) as Locale;
  const cabinetPath = locale === defaultLocale ? "/cabinet" : `/${locale}/cabinet`;
  const loginPath = locale === defaultLocale ? "/cabinet/login" : `/${locale}/cabinet/login`;
  const { origin } = new URL(request.url);

  const backToCode = (error: string) =>
    NextResponse.redirect(
      `${origin}${loginPath}?step=code&email=${encodeURIComponent(email)}&error=${error}`,
      303
    );

  if (!email || !token) return backToCode("code");

  const response = NextResponse.redirect(`${origin}${cabinetPath}`, 303);

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

  // Новый адрес получает код типа «подтверждение», существующий — типа «вход».
  // Общий тип "email" подходит обоим, но на всякий случай пробуем и запасной.
  let { error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
  if (error) {
    ({ error } = await supabase.auth.verifyOtp({ email, token, type: "signup" }));
  }
  if (error) return backToCode("code");

  return response;
}

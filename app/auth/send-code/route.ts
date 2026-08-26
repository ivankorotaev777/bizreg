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

  const resent = form.get("resend") === "1";
  // Время отправки нужно странице: по нему считается, когда можно просить код заново.
  const sentAt = Date.now();
  const response = back(
    `step=code&email=${encodeURIComponent(email)}&t=${sentAt}${resent ? "&sent=1" : ""}`
  );

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

  // Если отправка не прошла — остаёмся на шаге ввода кода: прежний код мог
  // дойти и всё ещё действует. Слишком частый запрос показываем отдельно:
  // почтовый сервис принимает не чаще одного письма в минуту на адрес.
  if (error) {
    const tooOften = error.status === 429 || /after \d+ seconds/i.test(error.message);
    const step = resent || tooOften ? "step=code&" : "";
    const reason = tooOften ? "too_often" : "send";
    // При слишком частом запросе снова заводим отсчёт, чтобы кнопка не звала
    // жать по кругу в заведомо закрытое окно.
    const wait = tooOften ? `&t=${sentAt}` : "";
    return back(`${step}error=${reason}&email=${encodeURIComponent(email)}${wait}`);
  }

  return response;
}

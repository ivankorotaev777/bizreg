import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Mail, KeyRound, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { LoginForm } from "@/components/cabinet/LoginForm";
import { CodeInput } from "@/components/cabinet/CodeInput";
import { ResendCode } from "@/components/cabinet/ResendCode";

export const metadata: Metadata = {
  title: "Вход в кабинет | BizReg",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

type Search = { step?: string; email?: string; error?: string; sent?: string; t?: string };

/** Почтовый сервис принимает не чаще одного письма в минуту на один адрес. */
const RESEND_DELAY_SECONDS = 60;

export default async function CabinetLoginPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: Search;
}) {
  const t = await getTranslations({ locale, namespace: "cabinet" });
  const email = searchParams.email ?? "";
  const codeStep = searchParams.step === "code" && email !== "";

  const sentAt = Number(searchParams.t ?? 0);
  const elapsed = sentAt > 0 ? Math.floor((Date.now() - sentAt) / 1000) : RESEND_DELAY_SECONDS;
  const resendLeft = Math.max(0, Math.min(RESEND_DELAY_SECONDS, RESEND_DELAY_SECONDS - elapsed));

  const errorText = (() => {
    switch (searchParams.error) {
      case "code":
        return t("loginErrorCode");
      case "too_often":
        return t("loginErrorTooOften");
      case "send":
        return t("loginErrorSend");
      case "missing_code":
      case "exchange_failed":
        return t("loginErrorLink");
      default:
        return null;
    }
  })();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 pt-32 pb-20">
      <Card className="w-full max-w-md border-border">
        <CardContent className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
              {codeStep ? (
                <KeyRound className="w-6 h-6 text-brand-600" />
              ) : (
                <Mail className="w-6 h-6 text-brand-600" />
              )}
            </div>
            <h1 className="text-2xl font-semibold text-foreground">
              {codeStep ? t("loginCodeTitle") : t("loginTitle")}
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              {codeStep ? t("loginCodeSubtitle", { email }) : t("loginSubtitle")}
            </p>
          </div>

          {codeStep ? (
            <>
              <LoginForm action="/auth/verify" submitLabel={t("loginVerify")}>
                <input type="hidden" name="email" value={email} />
                <input type="hidden" name="locale" value={locale} />
                <div className="space-y-1.5">
                  <Label htmlFor="code">{t("fieldCode")}</Label>
                  <CodeInput id="code" name="code" />
                </div>
                {errorText && <p className="text-sm text-destructive">{errorText}</p>}
              </LoginForm>
              <ResendCode
                email={email}
                locale={locale}
                justSent={searchParams.sent === "1" && !errorText}
                initialLeft={resendLeft}
                labelResend={t("loginResend")}
                labelWait={t.raw("loginResendWait") as string}
                labelSent={t("loginResent")}
              />
              <Link
                href="/cabinet/login"
                className="mt-3 w-full flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("loginChangeEmail")}
              </Link>
            </>
          ) : (
            <LoginForm action="/auth/send-code" submitLabel={t("loginSend")}>
              <input type="hidden" name="locale" value={locale} />
              <div className="space-y-1.5">
                <Label htmlFor="email">{t("fieldEmail")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  defaultValue={email}
                />
              </div>
              {errorText && <p className="text-sm text-destructive">{errorText}</p>}
            </LoginForm>
          )}

          <p className="text-xs text-muted-foreground text-center mt-6">{t("loginNote")}</p>
        </CardContent>
      </Card>
    </div>
  );
}

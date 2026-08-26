import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Mail, KeyRound, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { LoginForm } from "@/components/cabinet/LoginForm";

export const metadata: Metadata = {
  title: "Вход в кабинет | BizReg",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

type Search = { step?: string; email?: string; error?: string };

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

  const errorText = (() => {
    switch (searchParams.error) {
      case "code":
        return t("loginErrorCode");
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
                  <Input
                    id="code"
                    name="code"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    required
                    maxLength={6}
                    placeholder="123456"
                    className="text-center text-lg tracking-[0.4em]"
                    autoFocus
                  />
                </div>
                {errorText && <p className="text-sm text-destructive">{errorText}</p>}
              </LoginForm>
              <Link
                href="/cabinet/login"
                className="mt-4 w-full flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
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

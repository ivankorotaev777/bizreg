"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Mail, KeyRound, ArrowLeft, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

type Step = "email" | "code";

export default function LoginClient() {
  const t = useTranslations("cabinet");
  const locale = useLocale();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Ошибка возврата из письма приходит в адресе (в том числе после решётки).
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const code = hash.get("error_code") || query.get("error");
    if (!code) return;
    setError(code.includes("expired") ? t("loginErrorExpired") : t("loginErrorLink"));
    window.history.replaceState(null, "", window.location.pathname);
  }, [t]);

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { shouldCreateUser: true },
    });
    setLoading(false);
    if (error) {
      setError(t("loginErrorSend"));
      return;
    }
    setStep("code");
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: "email",
    });
    if (error) {
      setLoading(false);
      setError(t("loginErrorCode"));
      return;
    }
    // Полная перезагрузка, а не мягкий переход: так браузер гарантированно
    // отдаёт свежую сессию серверу, иначе проверка на сервере её не видит.
    window.location.assign(`/${locale === "ru" ? "" : locale + "/"}cabinet`.replace("//", "/"));
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md border-border">
        <CardContent className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
              {step === "email" ? (
                <Mail className="w-6 h-6 text-brand-600" />
              ) : (
                <KeyRound className="w-6 h-6 text-brand-600" />
              )}
            </div>
            <h1 className="text-2xl font-semibold text-foreground">
              {step === "email" ? t("loginTitle") : t("loginCodeTitle")}
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              {step === "email" ? t("loginSubtitle") : t("loginCodeSubtitle", { email })}
            </p>
          </div>

          {step === "email" ? (
            <form onSubmit={sendCode} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">{t("fieldEmail")}</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {t("loginSend")}
              </Button>
            </form>
          ) : (
            <form onSubmit={verifyCode} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="code">{t("fieldCode")}</Label>
                <Input
                  id="code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  required
                  maxLength={6}
                  placeholder="123456"
                  className="text-center text-lg tracking-[0.4em]"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {t("loginVerify")}
              </Button>
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setCode("");
                  setError(null);
                }}
                className="w-full flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("loginChangeEmail")}
              </button>
            </form>
          )}

          <p className="text-xs text-muted-foreground text-center mt-6">{t("loginNote")}</p>
        </CardContent>
      </Card>
    </div>
  );
}

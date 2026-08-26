"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Mail, MailCheck, ArrowLeft, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginClient() {
  const t = useTranslations("cabinet");
  const locale = useLocale();
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/callback?locale=${locale}`;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { shouldCreateUser: true, emailRedirectTo: redirectTo },
    });
    setLoading(false);
    if (error) {
      setError(t("loginErrorSend"));
      return;
    }
    setSent(true);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md border-border">
        <CardContent className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
              {sent ? (
                <MailCheck className="w-6 h-6 text-brand-600" />
              ) : (
                <Mail className="w-6 h-6 text-brand-600" />
              )}
            </div>
            <h1 className="text-2xl font-semibold text-foreground">
              {sent ? t("loginSentTitle") : t("loginTitle")}
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              {sent ? t("loginSentSubtitle", { email }) : t("loginSubtitle")}
            </p>
          </div>

          {sent ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">{t("loginSentHint")}</p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setError(null);
                }}
                className="w-full flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("loginChangeEmail")}
              </button>
            </div>
          ) : (
            <form onSubmit={sendLink} className="space-y-4">
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
          )}

          <p className="text-xs text-muted-foreground text-center mt-6">{t("loginNote")}</p>
        </CardContent>
      </Card>
    </div>
  );
}

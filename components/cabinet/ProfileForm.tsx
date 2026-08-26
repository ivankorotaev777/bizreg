"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export interface ClientProfile {
  full_name: string | null;
  phone: string | null;
  preferred_locale: string | null;
}

export function ProfileForm({
  email,
  initial,
  userId,
}: {
  email: string;
  initial: ClientProfile | null;
  /** Чью карточку правим. Пусто — свою; заполнено — карточку клиента (для сотрудника). */
  userId?: string;
}) {
  const t = useTranslations("cabinet");
  const [fullName, setFullName] = useState(initial?.full_name ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [locale, setLocale] = useState(initial?.preferred_locale ?? "ru");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const target = userId ?? user?.id;
    if (!target) {
      setSaving(false);
      setError(t("saveError"));
      return;
    }
    const { error } = await supabase.from("cabinet_clients").upsert(
      {
        user_id: target,
        email,
        full_name: fullName || null,
        phone: phone || null,
        preferred_locale: locale,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );
    setSaving(false);
    if (error) {
      setError(t("saveError"));
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <Card className="border-border">
      <CardContent className="p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-foreground mb-1">{t("profileTitle")}</h2>
        <p className="text-sm text-muted-foreground mb-5">{t("profileSubtitle")}</p>

        <form onSubmit={save} className="space-y-4 max-w-lg">
          <div className="space-y-1.5">
            <Label htmlFor="fullName">{t("fieldName")}</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t("fieldNamePlaceholder")}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="emailRO">{t("fieldEmail")}</Label>
            <Input id="emailRO" value={email} readOnly disabled />
            <p className="text-xs text-muted-foreground">{t("fieldEmailNote")}</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone">{t("fieldPhone")}</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("fieldPhonePlaceholder")}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="locale">{t("fieldLocale")}</Label>
            <Select id="locale" value={locale} onChange={(e) => setLocale(e.target.value)}>
              <option value="ru">Русский</option>
              <option value="en">English</option>
              <option value="uz">O&apos;zbek</option>
            </Select>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex items-center gap-3 pt-1">
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {t("save")}
            </Button>
            {saved && (
              <span className="flex items-center gap-1.5 text-sm text-brand-600">
                <Check className="w-4 h-4" />
                {t("saved")}
              </span>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

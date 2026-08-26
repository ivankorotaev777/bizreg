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

export interface CompanyRecord {
  id?: string;
  name: string | null;
  inn: string | null;
  legal_form: string | null;
  tax_regime: string | null;
  legal_address: string | null;
  director_name: string | null;
  registered_on: string | null;
}

export function CompanyForm({ initial }: { initial: CompanyRecord | null }) {
  const t = useTranslations("cabinet");
  const [form, setForm] = useState<CompanyRecord>({
    name: initial?.name ?? "",
    inn: initial?.inn ?? "",
    legal_form: initial?.legal_form ?? "OOO",
    tax_regime: initial?.tax_regime ?? "USN",
    legal_address: initial?.legal_address ?? "",
    director_name: initial?.director_name ?? "",
    registered_on: initial?.registered_on ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof CompanyRecord, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setSaving(false);
      setError(t("saveError"));
      return;
    }
    const payload = {
      user_id: user.id,
      name: form.name || null,
      inn: form.inn || null,
      legal_form: form.legal_form || null,
      tax_regime: form.tax_regime || null,
      legal_address: form.legal_address || null,
      director_name: form.director_name || null,
      registered_on: form.registered_on || null,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase
      .from("cabinet_companies")
      .upsert(payload, { onConflict: "user_id" });
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
        <h2 className="text-lg font-semibold text-foreground mb-1">{t("companyTitle")}</h2>
        <p className="text-sm text-muted-foreground mb-5">{t("companySubtitle")}</p>

        <form onSubmit={save} className="space-y-4 max-w-lg">
          <div className="space-y-1.5">
            <Label htmlFor="name">{t("fieldCompanyName")}</Label>
            <Input
              id="name"
              value={form.name ?? ""}
              onChange={(e) => set("name", e.target.value)}
              placeholder='ООО "Example"'
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="legal_form">{t("fieldLegalForm")}</Label>
              <Select
                id="legal_form"
                value={form.legal_form ?? "OOO"}
                onChange={(e) => set("legal_form", e.target.value)}
              >
                <option value="OOO">{t("legalFormOoo")}</option>
                <option value="IP">{t("legalFormIp")}</option>
                <option value="other">{t("legalFormOther")}</option>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="tax_regime">{t("fieldTaxRegime")}</Label>
              <Select
                id="tax_regime"
                value={form.tax_regime ?? "USN"}
                onChange={(e) => set("tax_regime", e.target.value)}
              >
                <option value="USN">{t("taxUsn")}</option>
                <option value="OSNO">{t("taxOsno")}</option>
                <option value="NDS">{t("taxNds")}</option>
                <option value="IT_PARK">{t("taxItPark")}</option>
              </Select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="inn">{t("fieldInn")}</Label>
              <Input
                id="inn"
                inputMode="numeric"
                value={form.inn ?? ""}
                onChange={(e) => set("inn", e.target.value)}
                placeholder="123456789"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="registered_on">{t("fieldRegisteredOn")}</Label>
              <Input
                id="registered_on"
                type="date"
                value={form.registered_on ?? ""}
                onChange={(e) => set("registered_on", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="legal_address">{t("fieldLegalAddress")}</Label>
            <Input
              id="legal_address"
              value={form.legal_address ?? ""}
              onChange={(e) => set("legal_address", e.target.value)}
              placeholder={t("fieldLegalAddressPlaceholder")}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="director_name">{t("fieldDirector")}</Label>
            <Input
              id="director_name"
              value={form.director_name ?? ""}
              onChange={(e) => set("director_name", e.target.value)}
              placeholder={t("fieldDirectorPlaceholder")}
            />
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

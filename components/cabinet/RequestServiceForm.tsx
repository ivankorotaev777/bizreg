"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2, Plus, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { SERVICE_KINDS, type ServiceKind } from "@/lib/cabinet/constants";

/**
 * Заявка на услугу прямо из кабинета: клиент выбирает услугу и пишет,
 * что нужно. Заявка сразу видна менеджеру в служебной части.
 */
export function RequestServiceForm({ userId }: { userId: string }) {
  const t = useTranslations("cabinet");
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<ServiceKind>("registration");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSending(true);

    const supabase = createClient();
    const { error: insertError } = await supabase.from("cabinet_services").insert({
      user_id: userId,
      kind,
      status: "new",
      note: note.trim() || null,
    });

    setSending(false);

    if (insertError) {
      setError(t("requestError"));
      return;
    }

    setDone(true);
    // Перезагружаем страницу, чтобы заявка появилась в списке вместе с историей.
    setTimeout(() => window.location.reload(), 900);
  };

  if (!open) {
    return (
      <Button variant="outline" onClick={() => setOpen(true)} className="mt-5">
        <Plus className="w-4 h-4" />
        {t("requestOpen")}
      </Button>
    );
  }

  return (
    <form onSubmit={submit} className="mt-5 border-t border-border/70 pt-5 space-y-4 max-w-lg">
      <div className="space-y-1.5">
        <Label htmlFor="requestKind">{t("requestKind")}</Label>
        <Select
          id="requestKind"
          value={kind}
          onChange={(event) => setKind(event.target.value as ServiceKind)}
        >
          {SERVICE_KINDS.map((value) => (
            <option key={value} value={value}>
              {t(`serviceKind_${value}`)}
            </option>
          ))}
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="requestNote">{t("requestNote")}</Label>
        <Input
          id="requestNote"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder={t("requestNotePlaceholder")}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={sending || done}>
          {sending && <Loader2 className="w-4 h-4 animate-spin" />}
          {t("requestSend")}
        </Button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {t("requestCancel")}
        </button>
        {done && (
          <span className="flex items-center gap-1.5 text-sm text-brand-600">
            <Check className="w-4 h-4" />
            {t("requestDone")}
          </span>
        )}
      </div>
    </form>
  );
}

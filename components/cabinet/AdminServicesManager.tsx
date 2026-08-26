"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Loader2, Plus, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  SERVICE_KINDS,
  SERVICE_STATUSES,
  STATUS_STYLES,
  formatDate,
  type ServiceEventRow,
  type ServiceKind,
  type ServiceRow,
  type ServiceStatus,
} from "@/lib/cabinet/constants";

/**
 * Услуги клиента глазами сотрудника: добавить услугу, сменить этап
 * и оставить комментарий, который клиент увидит в своей истории.
 */
export function AdminServicesManager({
  userId,
  managerEmail,
  initialServices,
  initialEvents,
}: {
  userId: string;
  managerEmail: string;
  initialServices: ServiceRow[];
  initialEvents: ServiceEventRow[];
}) {
  const t = useTranslations("cabinet");
  const locale = useLocale();
  const [services, setServices] = useState(initialServices);
  const [events, setEvents] = useState(initialEvents);
  const [error, setError] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const [newKind, setNewKind] = useState<ServiceKind>("registration");
  const [newTitle, setNewTitle] = useState("");
  const [adding, setAdding] = useState(false);

  const addService = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setAdding(true);
    const supabase = createClient();
    const { data, error: insertError } = await supabase
      .from("cabinet_services")
      .insert({ user_id: userId, kind: newKind, title: newTitle.trim() || null, status: "new" })
      .select("id, kind, title, status, note, amount, created_at, updated_at")
      .single();

    if (!insertError && data) {
      const { data: created } = await supabase
        .from("cabinet_service_events")
        .insert({ service_id: data.id, status: "new", author_email: managerEmail })
        .select("id, service_id, status, comment, author_email, created_at")
        .single();
      setServices((prev) => [data as ServiceRow, ...prev]);
      if (created) setEvents((prev) => [created as ServiceEventRow, ...prev]);
      setNewTitle("");
    } else {
      setError(t("adminSaveError"));
    }
    setAdding(false);
  };

  const changeStatus = async (service: ServiceRow, status: ServiceStatus, comment: string) => {
    setError(null);
    setBusyId(service.id);
    const supabase = createClient();

    const { error: updateError } = await supabase
      .from("cabinet_services")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", service.id);

    if (updateError) {
      setBusyId(null);
      setError(t("adminSaveError"));
      return;
    }

    const { data: created } = await supabase
      .from("cabinet_service_events")
      .insert({
        service_id: service.id,
        status,
        comment: comment.trim() || null,
        author_email: managerEmail,
      })
      .select("id, service_id, status, comment, author_email, created_at")
      .single();

    setServices((prev) => prev.map((item) => (item.id === service.id ? { ...item, status } : item)));
    if (created) setEvents((prev) => [created as ServiceEventRow, ...prev]);
    setBusyId(null);
    setSavedId(service.id);
    setTimeout(() => setSavedId(null), 2500);
  };

  return (
    <Card className="border-border">
      <CardContent className="p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-foreground mb-1">{t("adminServicesTitle")}</h2>
        <p className="text-sm text-muted-foreground mb-5">{t("adminServicesSubtitle")}</p>

        <form onSubmit={addService} className="flex flex-wrap items-end gap-3 mb-6">
          <div className="space-y-1.5">
            <Label htmlFor="newKind">{t("adminServiceKind")}</Label>
            <Select
              id="newKind"
              value={newKind}
              onChange={(event) => setNewKind(event.target.value as ServiceKind)}
              className="w-56"
            >
              {SERVICE_KINDS.map((kind) => (
                <option key={kind} value={kind}>
                  {t(`serviceKind_${kind}`)}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-1.5 flex-1 min-w-[200px]">
            <Label htmlFor="newTitle">{t("adminServiceTitle")}</Label>
            <Input
              id="newTitle"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              placeholder={t("adminServiceTitlePlaceholder")}
            />
          </div>
          <Button type="submit" disabled={adding}>
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {t("adminServiceAdd")}
          </Button>
        </form>

        {error && <p className="text-sm text-destructive mb-4">{error}</p>}

        {services.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("adminServicesEmpty")}</p>
        ) : (
          <ul className="divide-y divide-border/70 border-t border-border/70">
            {services.map((service) => (
              <ServiceRowEditor
                key={service.id}
                service={service}
                events={events.filter((event) => event.service_id === service.id)}
                locale={locale}
                busy={busyId === service.id}
                saved={savedId === service.id}
                onChange={changeStatus}
              />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function ServiceRowEditor({
  service,
  events,
  locale,
  busy,
  saved,
  onChange,
}: {
  service: ServiceRow;
  events: ServiceEventRow[];
  locale: string;
  busy: boolean;
  saved: boolean;
  onChange: (service: ServiceRow, status: ServiceStatus, comment: string) => void;
}) {
  const t = useTranslations("cabinet");
  const [status, setStatus] = useState<ServiceStatus>(service.status);
  const [comment, setComment] = useState("");

  return (
    <li className="py-4">
      <div className="flex flex-wrap items-start gap-x-3 gap-y-2 mb-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground">
            {service.title || t(`serviceKind_${service.kind}`)}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t("servicesStarted")} {formatDate(service.created_at, locale)}
          </p>
        </div>
        <span
          className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap ${STATUS_STYLES[service.status]}`}
        >
          {t(`serviceStatus_${service.status}`)}
        </span>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <Select
          value={status}
          onChange={(event) => setStatus(event.target.value as ServiceStatus)}
          className="w-52"
          aria-label={t("adminServiceStatus")}
        >
          {SERVICE_STATUSES.map((value) => (
            <option key={value} value={value}>
              {t(`serviceStatus_${value}`)}
            </option>
          ))}
        </Select>
        <Input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder={t("adminServiceComment")}
          className="flex-1 min-w-[200px]"
        />
        <Button
          variant="outline"
          disabled={busy}
          onClick={() => {
            onChange(service, status, comment);
            setComment("");
          }}
        >
          {busy && <Loader2 className="w-4 h-4 animate-spin" />}
          {t("adminServiceApply")}
        </Button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-brand-600">
            <Check className="w-4 h-4" />
            {t("saved")}
          </span>
        )}
      </div>

      {events.length > 0 && (
        <ol className="mt-3 space-y-1.5 border-l-2 border-border pl-4">
          {events.map((event) => (
            <li key={event.id} className="text-xs">
              <span className="text-muted-foreground">{formatDate(event.created_at, locale)}</span>
              <span className="text-foreground ml-2">{t(`serviceStatus_${event.status}`)}</span>
              {event.comment && <span className="text-muted-foreground"> — {event.comment}</span>}
            </li>
          ))}
        </ol>
      )}
    </li>
  );
}

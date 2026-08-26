"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ChevronDown, History, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { RequestServiceForm } from "@/components/cabinet/RequestServiceForm";
import {
  STATUS_STYLES,
  formatDate,
  type ServiceEventRow,
  type ServiceRow,
} from "@/lib/cabinet/constants";

/**
 * Услуги клиента: что заказано и на каком этапе.
 * История раскрывается по нажатию — в свёрнутом виде она только мешает.
 */
export function ServicesList({
  userId,
  services,
  events,
}: {
  userId: string;
  services: ServiceRow[];
  events: ServiceEventRow[];
}) {
  const t = useTranslations("cabinet");
  const locale = useLocale();
  const [open, setOpen] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState<string | null>(null);

  // Отменить можно только заявку, к которой мы ещё не приступили.
  const cancel = async (service: ServiceRow) => {
    if (!window.confirm(t("requestCancelConfirm"))) return;
    setCancelling(service.id);

    const supabase = createClient();
    const { error } = await supabase
      .from("cabinet_services")
      .update({ status: "cancelled", updated_at: new Date().toISOString() })
      .eq("id", service.id);

    if (error) {
      setCancelling(null);
      window.alert(t("requestError"));
      return;
    }

    await supabase
      .from("cabinet_service_events")
      .insert({ service_id: service.id, status: "cancelled" });
    window.location.reload();
  };

  return (
    <Card className="border-border">
      <CardContent className="p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-foreground mb-1">{t("servicesTitle")}</h2>
        <p className="text-sm text-muted-foreground mb-5">{t("servicesSubtitle")}</p>

        {services.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("servicesEmpty")}</p>
        ) : (
          <ul className="divide-y divide-border/70 border-t border-border/70">
            {services.map((service) => {
              const own = events.filter((event) => event.service_id === service.id);
              const expanded = open === service.id;

              return (
                <li key={service.id} className="py-4">
                  <div className="flex flex-wrap items-start gap-x-3 gap-y-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {service.title || t(`serviceKind_${service.kind}`)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {t("servicesStarted")} {formatDate(service.created_at, locale)}
                      </p>
                      {service.note && (
                        <p className="text-sm text-muted-foreground mt-2">{service.note}</p>
                      )}
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap ${STATUS_STYLES[service.status]}`}
                    >
                      {t(`serviceStatus_${service.status}`)}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-4">
                    {own.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setOpen(expanded ? null : service.id)}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <History className="w-3.5 h-3.5" />
                        {t("servicesHistory")}
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
                        />
                      </button>
                    )}

                    {service.status === "new" && (
                      <button
                        type="button"
                        onClick={() => cancel(service)}
                        disabled={cancelling === service.id}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors disabled:opacity-60"
                      >
                        <X className="w-3.5 h-3.5" />
                        {t("requestCancelService")}
                      </button>
                    )}
                  </div>

                  {expanded && own.length > 0 && (
                    <ol className="mt-3 space-y-2 border-l-2 border-border pl-4">
                      {own.map((event) => (
                        <li key={event.id} className="text-xs">
                          <span className="text-muted-foreground">
                            {formatDate(event.created_at, locale)}
                          </span>
                          <span className="text-foreground ml-2">
                            {t(`serviceStatus_${event.status}`)}
                          </span>
                          {event.comment && (
                            <p className="text-muted-foreground mt-0.5">{event.comment}</p>
                          )}
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        <RequestServiceForm userId={userId} />
      </CardContent>
    </Card>
  );
}

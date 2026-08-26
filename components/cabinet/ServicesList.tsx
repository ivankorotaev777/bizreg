"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ChevronDown, History } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
  services,
  events,
}: {
  services: ServiceRow[];
  events: ServiceEventRow[];
}) {
  const t = useTranslations("cabinet");
  const locale = useLocale();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Card className="border-border">
      <CardContent className="p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-foreground mb-1">{t("servicesTitle")}</h2>
        <p className="text-sm text-muted-foreground mb-5">{t("servicesSubtitle")}</p>

        {services.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            <p>{t("servicesEmpty")}</p>
          </div>
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

                  {own.length > 0 && (
                    <>
                      <button
                        type="button"
                        onClick={() => setOpen(expanded ? null : service.id)}
                        className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <History className="w-3.5 h-3.5" />
                        {t("servicesHistory")}
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
                        />
                      </button>
                      {expanded && (
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
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

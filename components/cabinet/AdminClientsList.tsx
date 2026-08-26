"use client";

import { useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/cabinet/constants";

export interface AdminClientRow {
  userId: string;
  email: string | null;
  fullName: string | null;
  phone: string | null;
  createdAt: string;
  companyName: string | null;
  servicesTotal: number;
  servicesActive: number;
  documentsTotal: number;
}

/** Список всех клиентов кабинета с поиском по имени, почте, телефону и компании. */
export function AdminClientsList({ rows }: { rows: AdminClientRow[] }) {
  const t = useTranslations("cabinet");
  const locale = useLocale();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((row) =>
      [row.email, row.fullName, row.phone, row.companyName]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(needle))
    );
  }, [rows, query]);

  return (
    <Card className="border-border">
      <CardContent className="p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-foreground mb-1">{t("adminTitle")}</h2>
        <p className="text-sm text-muted-foreground mb-5">
          {t("adminSubtitle", { count: rows.length })}
        </p>

        <div className="relative mb-5 max-w-sm">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("adminSearch")}
            className="pl-9"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("adminNothingFound")}</p>
        ) : (
          <ul className="divide-y divide-border/70 border-t border-border/70">
            {filtered.map((row) => (
              <li key={row.userId}>
                <Link
                  href={`/cabinet/admin/${row.userId}`}
                  className="flex items-center gap-3 py-3 group"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground truncate">
                      {row.fullName || row.email || t("adminNoName")}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {[row.email, row.phone, row.companyName].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground text-right whitespace-nowrap hidden sm:block">
                    <p>
                      {t("adminServicesCount", {
                        active: row.servicesActive,
                        total: row.servicesTotal,
                      })}
                    </p>
                    <p>{t("adminDocumentsCount", { count: row.documentsTotal })}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap hidden md:block">
                    {formatDate(row.createdAt, locale)}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

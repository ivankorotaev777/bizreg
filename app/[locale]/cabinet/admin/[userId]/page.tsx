import { redirect, Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { type Locale } from "@/i18n";
import { getCabinetUser } from "@/lib/cabinet/access";
import { CabinetShell } from "@/components/cabinet/CabinetShell";
import { DocumentsPanel } from "@/components/cabinet/DocumentsPanel";
import { AdminServicesManager } from "@/components/cabinet/AdminServicesManager";
import { Card, CardContent } from "@/components/ui/card";
import {
  type DocumentRow,
  type ServiceEventRow,
  type ServiceRow,
} from "@/lib/cabinet/constants";

export const dynamic = "force-dynamic";

export default async function AdminClientPage({
  params: { locale, userId },
}: {
  params: { locale: string; userId: string };
}) {
  const { supabase, user, isAdmin } = await getCabinetUser();
  const t = await getTranslations({ locale, namespace: "cabinet" });

  if (!user) {
    redirect({ href: "/cabinet/login", locale: locale as Locale });
    return null;
  }
  if (!isAdmin) {
    redirect({ href: "/cabinet", locale: locale as Locale });
    return null;
  }

  const { data: client } = await supabase
    .from("cabinet_clients")
    .select("user_id, email, full_name, phone, preferred_locale, created_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (!client) {
    redirect({ href: "/cabinet/admin", locale: locale as Locale });
    return null;
  }

  const { data: company } = await supabase
    .from("cabinet_companies")
    .select("name, inn, legal_form, tax_regime, legal_address, director_name, registered_on")
    .eq("user_id", userId)
    .maybeSingle();

  const { data: services } = await supabase
    .from("cabinet_services")
    .select("id, kind, title, status, note, amount, created_at, updated_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  const ids = (services ?? []).map((service) => service.id);
  const { data: events } = ids.length
    ? await supabase
        .from("cabinet_service_events")
        .select("id, service_id, status, comment, author_email, created_at")
        .in("service_id", ids)
        .order("created_at", { ascending: false })
    : { data: [] };

  const { data: documents } = await supabase
    .from("cabinet_documents")
    .select(
      "id, title, storage_path, mime_type, size_bytes, uploaded_by, uploaded_by_email, created_at"
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  const details: [string, string | null][] = [
    [t("fieldName"), client.full_name],
    [t("fieldEmail"), client.email],
    [t("fieldPhone"), client.phone],
    [t("fieldCompanyName"), company?.name ?? null],
    [t("fieldInn"), company?.inn ?? null],
    [t("fieldLegalForm"), company?.legal_form ?? null],
    [t("fieldTaxRegime"), company?.tax_regime ?? null],
    [t("fieldLegalAddress"), company?.legal_address ?? null],
    [t("fieldDirector"), company?.director_name ?? null],
  ];

  return (
    <CabinetShell email={user.email ?? ""} isAdmin={isAdmin}>
      <div className="space-y-6">
        <Link
          href="/cabinet/admin"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("adminBack")}
        </Link>

        <Card className="border-border">
          <CardContent className="p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-foreground mb-1">
              {client.full_name || client.email || t("adminNoName")}
            </h2>
            <p className="text-sm text-muted-foreground mb-5">{t("adminClientSubtitle")}</p>
            <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {details.map(([label, value]) => (
                <div key={label} className="min-w-0">
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="text-sm text-foreground truncate">
                    {value || <span className="text-muted-foreground">—</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        <AdminServicesManager
          userId={userId}
          managerEmail={user.email ?? ""}
          initialServices={(services as ServiceRow[]) ?? []}
          initialEvents={(events as ServiceEventRow[]) ?? []}
        />

        <DocumentsPanel
          userId={userId}
          initial={(documents as DocumentRow[]) ?? []}
          asManager
        />
      </div>
    </CabinetShell>
  );
}

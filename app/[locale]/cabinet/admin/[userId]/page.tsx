import { redirect, Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { type Locale } from "@/i18n";
import { getCabinetUser } from "@/lib/cabinet/access";
import { CabinetShell } from "@/components/cabinet/CabinetShell";
import { DocumentsPanel } from "@/components/cabinet/DocumentsPanel";
import { ProfileForm, type ClientProfile } from "@/components/cabinet/ProfileForm";
import { CompanyForm, type CompanyRecord } from "@/components/cabinet/CompanyForm";
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
            <h2 className="text-lg font-semibold text-foreground">
              {client.full_name || client.email || t("adminNoName")}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">{t("adminClientSubtitle")}</p>
          </CardContent>
        </Card>

        <ProfileForm
          email={client.email ?? ""}
          initial={client as ClientProfile}
          userId={userId}
        />

        <CompanyForm initial={(company as CompanyRecord) ?? null} userId={userId} />

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

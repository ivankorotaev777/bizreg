import { redirect } from "@/i18n/navigation";
import { type Locale } from "@/i18n";
import { getCabinetUser } from "@/lib/cabinet/access";
import { CabinetShell } from "@/components/cabinet/CabinetShell";
import { ServicesList } from "@/components/cabinet/ServicesList";
import { type ServiceEventRow, type ServiceRow } from "@/lib/cabinet/constants";

export const dynamic = "force-dynamic";

export default async function CabinetServicesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { supabase, user, isAdmin } = await getCabinetUser();

  if (!user) {
    redirect({ href: "/cabinet/login", locale: locale as Locale });
    return null;
  }

  const { data: services } = await supabase
    .from("cabinet_services")
    .select("id, kind, title, status, note, amount, created_at, updated_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const ids = (services ?? []).map((service) => service.id);
  const { data: events } = ids.length
    ? await supabase
        .from("cabinet_service_events")
        .select("id, service_id, status, comment, author_email, created_at")
        .in("service_id", ids)
        .order("created_at", { ascending: false })
    : { data: [] };

  return (
    <CabinetShell email={user.email ?? ""} isAdmin={isAdmin}>
      <ServicesList
        userId={user.id}
        services={(services as ServiceRow[]) ?? []}
        events={(events as ServiceEventRow[]) ?? []}
      />
    </CabinetShell>
  );
}

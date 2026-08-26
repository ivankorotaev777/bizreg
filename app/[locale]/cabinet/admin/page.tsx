import { redirect } from "@/i18n/navigation";
import { type Locale } from "@/i18n";
import { getCabinetUser } from "@/lib/cabinet/access";
import { CabinetShell } from "@/components/cabinet/CabinetShell";
import { AdminClientsList, type AdminClientRow } from "@/components/cabinet/AdminClientsList";

export const dynamic = "force-dynamic";

export default async function CabinetAdminPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { supabase, user, isAdmin } = await getCabinetUser();

  if (!user) {
    redirect({ href: "/cabinet/login", locale: locale as Locale });
    return null;
  }
  // Не сотрудник — возвращаем в его собственный кабинет, а не показываем отказ.
  if (!isAdmin) {
    redirect({ href: "/cabinet", locale: locale as Locale });
    return null;
  }

  const { data: clients } = await supabase
    .from("cabinet_clients")
    .select("user_id, email, full_name, phone, created_at")
    .order("created_at", { ascending: false });

  const { data: companies } = await supabase
    .from("cabinet_companies")
    .select("user_id, name, inn");

  const { data: services } = await supabase
    .from("cabinet_services")
    .select("user_id, status");

  const { data: documents } = await supabase.from("cabinet_documents").select("user_id");

  const rows: AdminClientRow[] = (clients ?? []).map((client) => {
    const own = (services ?? []).filter((service) => service.user_id === client.user_id);
    return {
      userId: client.user_id,
      email: client.email,
      fullName: client.full_name,
      phone: client.phone,
      createdAt: client.created_at,
      companyName: (companies ?? []).find((c) => c.user_id === client.user_id)?.name ?? null,
      servicesTotal: own.length,
      servicesActive: own.filter((s) => s.status !== "done" && s.status !== "cancelled").length,
      servicesNew: own.filter((s) => s.status === "new").length,
      documentsTotal: (documents ?? []).filter((d) => d.user_id === client.user_id).length,
    };
  });

  // Клиенты с необработанными заявками — наверх: их легко не заметить в общем списке.
  rows.sort((a, b) => {
    if (a.servicesNew !== b.servicesNew) return b.servicesNew - a.servicesNew;
    return b.createdAt.localeCompare(a.createdAt);
  });

  return (
    <CabinetShell email={user.email ?? ""} isAdmin={isAdmin}>
      <AdminClientsList rows={rows} />
    </CabinetShell>
  );
}

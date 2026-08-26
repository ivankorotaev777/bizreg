import { redirect } from "@/i18n/navigation";
import { type Locale } from "@/i18n";
import { getCabinetUser } from "@/lib/cabinet/access";
import { CabinetShell } from "@/components/cabinet/CabinetShell";
import { CompanyForm, type CompanyRecord } from "@/components/cabinet/CompanyForm";

export const dynamic = "force-dynamic";

export default async function CabinetCompanyPage({
  params: { locale },
}: {
  params: { locale: string };
}) {

  const { supabase, user, isAdmin } = await getCabinetUser();

  if (!user) {
    redirect({ href: "/cabinet/login", locale: locale as Locale });
    return null;
  }

  const { data } = await supabase
    .from("cabinet_companies")
    .select("id, name, inn, legal_form, tax_regime, legal_address, director_name, registered_on")
    .eq("user_id", user.id)
    .maybeSingle();

  return (
    <CabinetShell email={user.email ?? ""} isAdmin={isAdmin}>
      <CompanyForm initial={(data as CompanyRecord) ?? null} />
    </CabinetShell>
  );
}

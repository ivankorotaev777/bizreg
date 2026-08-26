import { redirect } from "@/i18n/navigation";
import { type Locale } from "@/i18n";
import { createClient } from "@/lib/supabase/server";
import { CabinetShell } from "@/components/cabinet/CabinetShell";
import { CompanyForm, type CompanyRecord } from "@/components/cabinet/CompanyForm";

export const dynamic = "force-dynamic";

export default async function CabinetCompanyPage({
  params: { locale },
}: {
  params: { locale: string };
}) {

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
    <CabinetShell email={user.email ?? ""}>
      <CompanyForm initial={(data as CompanyRecord) ?? null} />
    </CabinetShell>
  );
}

import { redirect } from "@/i18n/navigation";
import { type Locale } from "@/i18n";
import { createClient } from "@/lib/supabase/server";
import { CabinetShell } from "@/components/cabinet/CabinetShell";
import { ProfileForm, type ClientProfile } from "@/components/cabinet/ProfileForm";

export const dynamic = "force-dynamic";

export default async function CabinetProfilePage({
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
    .from("cabinet_clients")
    .select("full_name, phone, preferred_locale")
    .eq("user_id", user.id)
    .maybeSingle();

  return (
    <CabinetShell email={user.email ?? ""}>
      <ProfileForm email={user.email ?? ""} initial={(data as ClientProfile) ?? null} />
    </CabinetShell>
  );
}

import { redirect } from "@/i18n/navigation";
import { type Locale } from "@/i18n";
import { getCabinetUser } from "@/lib/cabinet/access";
import { CabinetShell } from "@/components/cabinet/CabinetShell";
import { DocumentsPanel } from "@/components/cabinet/DocumentsPanel";
import { type DocumentRow } from "@/lib/cabinet/constants";

export const dynamic = "force-dynamic";

export default async function CabinetDocumentsPage({
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
    .from("cabinet_documents")
    .select(
      "id, title, storage_path, mime_type, size_bytes, uploaded_by, uploaded_by_email, created_at"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <CabinetShell email={user.email ?? ""} isAdmin={isAdmin}>
      <DocumentsPanel userId={user.id} initial={(data as DocumentRow[]) ?? []} />
    </CabinetShell>
  );
}

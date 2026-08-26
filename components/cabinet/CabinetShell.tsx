"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { User, Building2, FileText, Briefcase, Users, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function CabinetShell({
  email,
  isAdmin = false,
  children,
}: {
  email: string;
  isAdmin?: boolean;
  children: React.ReactNode;
}) {
  const t = useTranslations("cabinet");
  const pathname = usePathname();

  const items = [
    { href: "/cabinet", label: t("navProfile"), icon: User },
    { href: "/cabinet/company", label: t("navCompany"), icon: Building2 },
    { href: "/cabinet/documents", label: t("navDocuments"), icon: FileText },
    { href: "/cabinet/services", label: t("navServices"), icon: Briefcase },
  ];

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    // Полная перезагрузка — чтобы сервер точно увидел, что сессии больше нет.
    window.location.assign("/cabinet/login");
  };

  const linkClass = (active: boolean) =>
    `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap ${
      active
        ? "bg-brand-50 text-brand-700 font-medium"
        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
    }`;

  return (
    <div className="pt-32 pb-16 min-h-screen bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">{t("title")}</h1>
          <p className="text-sm text-muted-foreground mt-1">{email}</p>
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-6 items-start">
          <nav className="bg-white border border-border rounded-xl p-2 flex lg:flex-col gap-1 overflow-x-auto">
            {items.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={linkClass(pathname === href)}>
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            ))}

            {isAdmin && (
              <>
                <div className="hidden lg:block border-t border-border/70 my-1" />
                <Link
                  href="/cabinet/admin"
                  className={linkClass(pathname.startsWith("/cabinet/admin"))}
                >
                  <Users className="w-4 h-4 shrink-0" />
                  {t("navAdmin")}
                </Link>
              </>
            )}

            <button
              type="button"
              onClick={signOut}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors whitespace-nowrap lg:mt-2"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {t("navLogout")}
            </button>
          </nav>

          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

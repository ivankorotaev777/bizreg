import type { Metadata } from "next";
import { type Locale } from "@/i18n";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Вход в кабинет | BizReg",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

export default function CabinetLoginPage({ params: { locale } }: { params: { locale: string } }) {
  return <LoginClient />;
}

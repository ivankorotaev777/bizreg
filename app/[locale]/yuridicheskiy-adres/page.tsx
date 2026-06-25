import type { Metadata } from "next";
import LegalAddressLandingClient from "./LegalAddressLandingClient";

export const metadata: Metadata = {
  title: "Юридический адрес в Ташкенте для регистрации ООО | BizReg",
  description:
    "Юридический адрес в Ташкенте для регистрации ООО и постановки на учёт по НДС. Не массовый, пригоден для регистрации, полный пакет документов. Бесплатная консультация.",
  alternates: { canonical: "/yuridicheskiy-adres" },
  openGraph: {
    title: "Юридический адрес в Ташкенте для регистрации ООО | BizReg",
    description:
      "Не массовый юридический адрес, пригодный для регистрации и НДС. Полный пакет документов.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function LegalAddressPage() {
  return <LegalAddressLandingClient />;
}

import type { Metadata } from "next";
import LegalAddressLandingClient from "./LegalAddressLandingClient";

export const metadata: Metadata = {
  title: "Юридический адрес в Ташкенте для регистрации ООО | BizReg",
  description:
    "Юридический адрес в Ташкенте для регистрации ООО и постановки на учёт по НДС. Не массовый, проходит проверку, полный пакет документов. Бесплатная консультация.",
  alternates: { canonical: "/yuridicheskiy-adres" },
  openGraph: {
    title: "Юридический адрес в Ташкенте для регистрации ООО | BizReg",
    description:
      "Юридический адрес, который проходит проверку при регистрации и НДС. Не массовый, полный пакет документов.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function LegalAddressPage() {
  return <LegalAddressLandingClient />;
}

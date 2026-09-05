import type { Metadata } from "next";
import LegalAddressLandingClient from "./LegalAddressLandingClient";

const META: Record<string, Metadata> = {
  ru: {
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
  },
  en: {
    title: "Legal Address in Tashkent for Company Registration | BizReg",
    description:
      "Non-mass legal address in Tashkent with a lease agreement. Passes tax office checks, suitable for VAT registration. Mail handling included.",
    alternates: { canonical: "/en/yuridicheskiy-adres" },
    openGraph: {
      title: "Legal Address in Tashkent for Company Registration | BizReg",
      description:
        "Legal address in Tashkent with a real lease agreement. Non-mass, VAT-ready, mail handling.",
      type: "website",
      locale: "en_US",
    },
  },
};

/** Тайтл и описание — по локали; для остальных языков пока русская версия. */
export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return META[locale] ?? META.ru;
}

export default function LegalAddressPage() {
  return <LegalAddressLandingClient />;
}

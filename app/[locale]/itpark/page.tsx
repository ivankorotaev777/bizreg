import type { Metadata } from "next";
import ItParkLandingClient from "./ItParkLandingClient";

const META: Record<string, Metadata> = {
  ru: {
    title: "Открыть компанию в IT Park Узбекистан | Спецусловия BizReg",
    description:
      "Поможем открыть компанию в Узбекистане под IT Park: скидка на регистрацию, специальные условия на юридический адрес и сопровождение на старте.",
    alternates: { canonical: "/itpark" },
    openGraph: {
      title: "Открыть компанию в IT Park Узбекистан | Спецусловия BizReg",
      description:
        "Проверим, подходит ли ваш кейс под IT Park, и запустим регистрацию компании на выгодных условиях через BizReg.",
      type: "website",
      locale: "ru_RU",
    },
  },
  en: {
    title: "IT Park Uzbekistan Residency — Business Setup Support | BizReg",
    description:
      "Business setup consulting for IT Park-focused companies: company formation, residency application, tax benefits. Special terms from BizReg.",
    alternates: { canonical: "/en/itpark" },
    openGraph: {
      title: "IT Park Uzbekistan Residency — Business Setup Support | BizReg",
      description:
        "Company formation and IT Park residency support in Uzbekistan. Tax benefits for IT businesses.",
      type: "website",
      locale: "en_US",
    },
  },
};

/** Тайтл и описание — по локали; для остальных языков пока русская версия. */
export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return META[locale] ?? META.ru;
}

export default function ItParkPage() {
  return <ItParkLandingClient />;
}

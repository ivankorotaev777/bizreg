import type { Metadata } from "next";
import MarketplaceLandingClient from "./MarketplaceLandingClient";

const META: Record<string, Metadata> = {
  ru: {
    title: "Продавец на маркетплейсах Узбекистана под ключ | BizReg",
    description:
      "Откроем бизнес и счёт для выхода на Wildberries, Uzum и Ozon в Узбекистане. Для нерезидентов: ООО, документы, разрешение на работу и виза директора — за 2 дня.",
    alternates: { canonical: "/marketplace" },
    openGraph: {
      title: "Продавец на маркетплейсах Узбекистана под ключ | BizReg",
      description:
        "Выход на Wildberries, Uzum и Ozon для иностранцев: регистрация бизнеса, счёт и документы под маркетплейс через BizReg.",
      type: "website",
      locale: "ru_RU",
    },
  },
  en: {
    title: "Become a Marketplace Seller in Uzbekistan — Turnkey | BizReg",
    description:
      "Start selling on Uzum, Wildberries and other marketplaces in Uzbekistan: company setup, bank account, taxes and accounting for sellers. Done for you.",
    alternates: { canonical: "/en/marketplace" },
    openGraph: {
      title: "Become a Marketplace Seller in Uzbekistan — Turnkey | BizReg",
      description:
        "Company setup, bank account and accounting for marketplace sellers in Uzbekistan. Done for you.",
      type: "website",
      locale: "en_US",
    },
  },
};

/** Тайтл и описание — по локали; для остальных языков пока русская версия. */
export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return META[locale] ?? META.ru;
}

export default function MarketplacePage() {
  return <MarketplaceLandingClient />;
}

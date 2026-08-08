import type { Metadata } from "next";
import MarketplaceLandingClient from "./MarketplaceLandingClient";

export const metadata: Metadata = {
  title: "Продавец на маркетплейсах Узбекистана под ключ | BizReg",
  description:
    "Откроем бизнес и счёт для выхода на Wildberries, Uzum и Ozon в Узбекистане. Для нерезидентов: ООО, документы, разрешение на работу и виза директора — за 2 дня.",
  openGraph: {
    title: "Продавец на маркетплейсах Узбекистана под ключ | BizReg",
    description:
      "Выход на Wildberries, Uzum и Ozon для иностранцев: регистрация бизнеса, счёт и документы под маркетплейс через BizReg.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function MarketplacePage() {
  return <MarketplaceLandingClient />;
}

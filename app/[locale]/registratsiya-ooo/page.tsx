import type { Metadata } from "next";
import RegistrationLandingClient from "./RegistrationLandingClient";

export const metadata: Metadata = {
  title: "Помогаем зарегистрировать ООО и ИП в Узбекистане под ключ | BizReg",
  description:
    "Помогаем зарегистрировать ООО и ИП в Узбекистане под ключ: подбор формы и налогового режима, подготовка и подача документов, юридический адрес. Для резидентов и иностранцев. Работаем по Ташкенту и удалённо.",
  alternates: { canonical: "/registratsiya-ooo" },
  openGraph: {
    title: "Помогаем зарегистрировать ООО и ИП в Узбекистане под ключ | BizReg",
    description:
      "Поможем открыть компанию под ключ: документы, подача, постановка на учёт, юридический адрес. Бесплатная консультация.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RegistrationPage() {
  return <RegistrationLandingClient />;
}

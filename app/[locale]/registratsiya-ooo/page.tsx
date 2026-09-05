import type { Metadata } from "next";
import RegistrationLandingClient from "./RegistrationLandingClient";

const META: Record<string, Metadata> = {
  ru: {
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
  },
  en: {
    title: "Register an LLC in Uzbekistan — Turnkey Company Setup | BizReg",
    description:
      "We help foreign and local founders register an LLC in Uzbekistan: business form and tax regime, documents, filing, legal address. Remote-friendly, lawyer at every step.",
    alternates: { canonical: "/en/registratsiya-ooo" },
    openGraph: {
      title: "Register an LLC in Uzbekistan — Turnkey Company Setup | BizReg",
      description:
        "Turnkey company setup in Uzbekistan: documents, filing, tax registration, legal address. Free consultation.",
      type: "website",
      locale: "en_US",
    },
  },
};

/** Тайтл и описание — по локали; для остальных языков пока русская версия. */
export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return META[locale] ?? META.ru;
}

export default function RegistrationPage() {
  return <RegistrationLandingClient />;
}

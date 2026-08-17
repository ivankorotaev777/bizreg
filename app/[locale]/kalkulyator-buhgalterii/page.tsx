import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n";
import CalculatorClient from "./CalculatorClient";

const META: Record<string, { title: string; description: string }> = {
  ru: {
    title: "Калькулятор стоимости бухгалтерских услуг в Ташкенте | BizReg",
    description:
      "Рассчитайте онлайн стоимость бухгалтерского обслуживания в Узбекистане: форма бизнеса, налоговый режим, сотрудники, операции и ВЭД. Мгновенный результат, точный расчёт — у менеджера.",
  },
  en: {
    title: "Accounting Services Cost Calculator — Tashkent | BizReg",
    description:
      "Estimate your monthly accounting fee in Uzbekistan online: business form, tax regime, payroll, operations and foreign trade. Instant result, exact quote from a manager.",
  },
  kk: {
    title: "Бухгалтерлік қызмет құнының калькуляторы — Ташкент | BizReg",
    description:
      "Өзбекстандағы бухгалтерлік қызмет құнын онлайн есептеңіз: бизнес нысаны, салық режимі, қызметкерлер, операциялар және СЭҚ. Нәтиже бірден.",
  },
  uz: {
    title: "Buxgalteriya xizmatlari narxi kalkulyatori — Toshkent | BizReg",
    description:
      "O'zbekistonda buxgalteriya xizmati narxini onlayn hisoblang: biznes shakli, soliq rejimi, xodimlar, operatsiyalar va TIF. Natija bir zumda.",
  },
  zh: {
    title: "会计服务费用计算器 — 塔什干 | BizReg",
    description:
      "在线估算乌兹别克斯坦会计服务费用：企业形式、税收制度、员工、业务量和外贸。即时出结果，精确报价由经理确认。",
  },
};

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return META[locale] ?? META.ru;
}

export default function CalculatorPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale as Locale);
  return <CalculatorClient />;
}

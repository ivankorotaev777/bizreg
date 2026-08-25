"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LandingAmoForm } from "@/components/LandingAmoForm";
import { AddressPricingSection } from "@/components/AddressPricingSection";
import { PartnersSection } from "@/components/PartnersSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TrustLogos } from "@/components/TrustLogos";
import { LandingStickyCta } from "@/components/LandingStickyCta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  FileCheck,
  MapPin,
  Minus,
  Send,
  ShieldCheck,
} from "lucide-react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const TELEGRAM = "https://t.me/BizRegUz";

function trackEvent(event: string, location: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, {
      event_category: "legal_address_landing",
      event_label: location,
    });
  }
}

// строки таблицы «что входит»: text | значения по пакетам (строка = текст, true = ✓, false = —)
type CellValue = string | boolean;

const content = {
  ru: {
    badge: "Юридический адрес",
    heroTitle: "Юридический адрес в Ташкенте",
    heroDesc:
      "Не массовый адрес, пригодный для регистрации компании и постановки на учёт по НДС. Полный пакет документов: договор аренды, e-ijara, Didox.",
    ctaPrimary: "Запросить консультацию",
    telegram: "Написать в Telegram",
    trustStat: "Помогаем бизнесу в Узбекистане более 15 лет",
    chips: [
      "Подходит для ООО на УСН и НДС",
      "Не массовый адрес",
      "Оформление удалённо, для нерезидентов",
    ],
    tableTitle: "Что входит в каждый пакет",
    tableIntro: "Пакет зависит от формы бизнеса и налогового режима — таблица показывает разницу честно.",
    thFeature: "Что входит",
    packages: ["ИП", "ООО на УСН", "ООО на НДС"],
    rows: [
      ["Площадь", "3 м²", "5 м²", "18 м²"],
      ["Договор аренды и регистрация в e-ijara", true, true, true],
      ["Регистрация в Didox", true, true, true],
      ["Приём и пересылка почты", true, true, true],
      ["Выделенный представитель с 10:00 до 20:00", false, true, true],
      ["Помощь с подтверждением адреса для банка", false, true, true],
      ["Соответствие требованиям для учёта по НДС", false, false, true],
      ["Сопровождение постановки на учёт по НДС", false, false, true],
    ] as [string, CellValue, CellValue, CellValue][],
    benefitsTitle: "Почему наш юридический адрес",
    benefits: [
      ["Пригоден для регистрации", "Подходит для регистрации ООО — с НДС и без НДС, с постановкой на учёт.", ShieldCheck],
      ["Не массовый", "Используем адреса, которые не вызывают вопросов у проверяющих.", MapPin],
      ["Полный пакет документов", "Готовим документы на адрес и регистрируем в e-ijara и Didox — сразу и без задержек.", FileCheck],
      ["Для ООО и иностранного предприятия", "Подойдёт и для обычного ООО, и для предприятия со 100% иностранным капиталом.", Building2],
    ] as const,
    faqTitle: "Частые вопросы",
    faq: [
      ["Что такое юридический адрес и зачем он нужен?", "Юридический адрес — это официальный адрес компании, по которому она регистрируется и числится в налоговой. Без него нельзя зарегистрировать ООО и встать на учёт. Мы предоставляем готовый адрес с полным пакетом документов."],
      ["Подходит ли ваш адрес для регистрации ООО и постановки на учёт по НДС?", "Да. Наши адреса подходят и для регистрации ООО, и для постановки на учёт по НДС (пакет «ООО на НДС» — площадь 18 м² под требования учёта). Подберём вариант под вашу задачу."],
      ["Адрес не массовый? Не будет вопросов у налоговой?", "Мы используем не массовые адреса — на них не зарегистрированы сотни компаний, поэтому они не вызывают вопросов при проверке. Выдаём полный пакет подтверждающих документов."],
      ["Сколько стоит и на какой срок оформляется адрес?", "Цены в блоке выше указаны за месяц; договор оформляем на нужный срок — как правило, от года. Детали — на бесплатной консультации."],
      ["Какие документы я получу?", "Договор на предоставление адреса и полный пакет для подачи на регистрацию. Регистрируем адрес в государственных системах e-ijara и Didox — без задержек."],
      ["Можно ли оформить удалённо и для иностранца/нерезидента?", "Да. Адрес можно оформить удалённо, в том числе для иностранных учредителей и нерезидентов — по доверенности, без вашего приезда."],
      ["Можно ли продлить или сменить юридический адрес?", "Да. Поможем продлить договор по текущему адресу или сменить юридический адрес — подскажем порядок и подготовим документы."],
    ],
    finalTitle: "Нужен юридический адрес?",
    finalDesc: "Оставьте заявку — подберём адрес под вашу задачу и подготовим документы.",
    homePrefix: "Главная страница:",
    homeText: "перейти на основной сайт",
  },
  en: {
    badge: "Legal address",
    heroTitle: "Legal address in Tashkent",
    heroDesc:
      "A non-mass address suitable for company and VAT registration. Full document package: lease agreement, e-ijara, Didox.",
    ctaPrimary: "Request a consultation",
    telegram: "Message on Telegram",
    trustStat: "Helping businesses in Uzbekistan for 15+ years",
    chips: [
      "Suitable for LLC (simplified & VAT)",
      "Non-mass address",
      "Remote arrangement, for non-residents",
    ],
    tableTitle: "What each package includes",
    tableIntro: "The package depends on your business form and tax regime — the table shows the difference honestly.",
    thFeature: "What's included",
    packages: ["Sole proprietor", "LLC, simplified tax", "LLC with VAT"],
    rows: [
      ["Area", "3 m²", "5 m²", "18 m²"],
      ["Lease agreement and e-ijara registration", true, true, true],
      ["Didox registration", true, true, true],
      ["Mail receiving and forwarding", true, true, true],
      ["Dedicated representative from 10:00 to 20:00", false, true, true],
      ["Help confirming the address for the bank", false, true, true],
      ["Meets the requirements for VAT registration", false, false, true],
      ["Support with VAT tax registration", false, false, true],
    ] as [string, CellValue, CellValue, CellValue][],
    benefitsTitle: "Why our legal address",
    benefits: [
      ["Suitable for registration", "Suitable for registering an LLC — with and without VAT, including tax registration.", ShieldCheck],
      ["Non-mass", "We use addresses that raise no questions with inspectors.", MapPin],
      ["Full document package", "We prepare the address documents and register in e-ijara and Didox — promptly and without delays.", FileCheck],
      ["For LLC and foreign enterprise", "Works for an ordinary LLC and for an enterprise with 100% foreign capital.", Building2],
    ] as const,
    faqTitle: "FAQ",
    faq: [
      ["What is a legal address and why is it needed?", "A legal address is the company's official address used for registration and tax records. Without it you can't register an LLC or get tax-registered. We provide a ready address with a full document package."],
      ["Is your address suitable for LLC registration and VAT registration?", "Yes. Our addresses are suitable both for LLC registration and for VAT registration (the «LLC with VAT» package offers 18 m² to meet the requirements). We'll pick the right option for your case."],
      ["Is the address non-mass? Will the tax office have questions?", "We use non-mass addresses — they don't host hundreds of companies, so they raise no questions during checks. We provide a full package of supporting documents."],
      ["How much does it cost and for how long is the address arranged?", "Prices in the block above are per month; the agreement is made for the required term — usually from one year. Details on a free consultation."],
      ["What documents will I get?", "An address-provision agreement and the full package for filing the registration. We register the address in the government systems e-ijara and Didox — without delays."],
      ["Can it be arranged remotely and for a foreigner/non-resident?", "Yes. The address can be arranged remotely, including for foreign founders and non-residents — by power of attorney, without your visit."],
      ["Can the legal address be renewed or changed?", "Yes. We help renew the agreement for the current address or change the legal address — we explain the procedure and prepare the documents."],
    ],
    finalTitle: "Need a legal address?",
    finalDesc: "Leave a request — we select an address for your task and prepare the documents.",
    homePrefix: "Main page:",
    homeText: "go to the main site",
  },
} as const;

export default function LegalAddressLandingClient() {
  const locale = useLocale() as keyof typeof content;
  const c = content[locale] ?? content.ru;
  const tForm = useTranslations("requestForm");

  return (
    <main className="min-h-screen bg-background text-foreground pb-24 lg:pb-0">
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 via-background to-navy-50" />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-5 bg-brand-100 text-brand-800 hover:bg-brand-100 border-0">{c.badge}</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-gradient">{c.heroTitle}</h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{c.heroDesc}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="rounded-full bg-gradient-brand hover:opacity-90 transition-all shadow-md shadow-brand-500/20 text-white" onClick={() => trackEvent("cta_click", "hero")}>
                <a href="#form">{c.ctaPrimary} <ArrowRight className="w-4 h-4 ml-2" /></a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full" onClick={() => trackEvent("telegram_click", "hero")}>
                <a href={TELEGRAM} target="_blank" rel="noopener noreferrer"><Send className="w-4 h-4 mr-2" />{c.telegram}</a>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {c.chips.map((chip) => (
                <div key={chip} className="flex items-center gap-2 text-sm text-navy-800">
                  <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0" />
                  {chip}
                </div>
              ))}
            </div>
          </div>

          {/* Trust — внутри hero, без разделителей */}
          <div className="mt-16 text-center">
            <p className="text-sm sm:text-base font-bold text-navy-900">{c.trustStat}</p>
            <TrustLogos />
          </div>
        </div>
      </section>

      {/* Команда — сразу после hero */}
      <PartnersSection />

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-navy-900 mb-10 text-center">{c.benefitsTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.benefits.map(([title, desc, Icon]) => (
              <Card key={title} className="h-full">
                <CardHeader>
                  <div className="w-11 h-11 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground leading-relaxed">{desc}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Карточки пакетов */}
      <AddressPricingSection requestFormHref="#form" />

      {/* Таблица «что входит» — в стиле таблицы тарифов */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground text-center mb-2">{c.tableTitle}</h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-8">{c.tableIntro}</p>
            <div className="overflow-x-auto rounded-xl border border-border bg-white">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left font-medium text-muted-foreground px-4 py-3 w-[40%]">{c.thFeature}</th>
                    <th className="text-left font-medium text-foreground px-4 py-3">{c.packages[0]}</th>
                    <th className="text-left font-medium text-brand-600 px-4 py-3">{c.packages[1]}</th>
                    <th className="text-left font-medium text-foreground px-4 py-3">{c.packages[2]}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.rows.map(([feature, ...cells]) => (
                    <tr key={feature as string} className="border-b border-border last:border-b-0">
                      <td className="px-4 py-3 text-foreground">{feature}</td>
                      {(cells as CellValue[]).map((cell, i) => (
                        <td key={i} className="px-4 py-3">
                          {typeof cell === "string" ? (
                            <span className="text-foreground font-medium">{cell}</span>
                          ) : cell ? (
                            <Check className="w-4 h-4 text-brand-500" />
                          ) : (
                            <Minus className="w-4 h-4 text-muted-foreground/50" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Отзывы клиентов */}
      <TestimonialsSection />

      {/* Финальный CTA + форма */}
      <section className="py-14 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-2">{c.finalTitle}</h2>
            <p className="text-muted-foreground">{c.finalDesc}</p>
          </div>
          <div id="form" className="scroll-mt-24 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-6 text-center">{tForm("title")}</h3>
            <LandingAmoForm />
          </div>
          <p className="mt-10 text-sm text-muted-foreground text-center">
            {c.homePrefix}{" "}
            <Link href="/" className="text-brand-600 underline hover:no-underline">{c.homeText}</Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground text-center mb-8">{c.faqTitle}</h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {c.faq.map(([q, a]) => (
              <details key={q} className="group bg-white rounded-xl border border-border p-5">
                <summary className="list-none cursor-pointer font-medium text-foreground flex items-center justify-between gap-4">
                  {q}
                  <ArrowRight className="w-4 h-4 text-brand-600 shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <LandingStickyCta ctaLabel={c.ctaPrimary} />
    </main>
  );
}

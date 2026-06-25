"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LandingAmoForm } from "@/components/LandingAmoForm";
import { PartnersSection } from "@/components/PartnersSection";
import { TrustLogos } from "@/components/TrustLogos";
import { LandingStickyCta } from "@/components/LandingStickyCta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileCheck,
  MapPin,
  MessageCircle,
  Receipt,
  Send,
  ShieldCheck,
} from "lucide-react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const TELEGRAM = "https://t.me/bizreg_uradres_bot";

function trackEvent(event: string, location: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, {
      event_category: "legal_address_landing",
      event_label: location,
    });
  }
}

const content = {
  ru: {
    badge: "Юридический адрес",
    heroTitle: "Юридический адрес в Ташкенте для регистрации ООО",
    heroDesc:
      "Предоставляем юридический адрес, который проходит проверку при регистрации компании и постановке на учёт по НДС. Не массовый. Полный пакет документов на адрес.",
    ctaPrimary: "Запросить консультацию",
    telegram: "Написать в Telegram",
    trustStat: "Более 1000 компаний доверили нам за 15 лет",
    chips: [
      "Подходит для регистрации ООО",
      "Не массовый адрес",
      "Полный пакет документов",
      "Помощь юриста",
    ],
    benefitsTitle: "Почему наш юридический адрес",
    benefits: [
      ["Проходит проверку", "Адрес подходит для регистрации компании и постановки на учёт, в том числе по НДС.", ShieldCheck],
      ["Не массовый", "Используем адреса, которые не вызывают вопросов у проверяющих.", MapPin],
      ["Полный пакет документов", "Готовим все документы на адрес для подачи — сразу и без задержек.", FileCheck],
      ["Для ООО и ИП", "Подберём решение под вашу форму и задачи бизнеса.", Building2],
    ] as const,
    stepsTitle: "Как получить адрес",
    steps: [
      ["Заявка", "Оставляете заявку — уточняем форму и цель (регистрация, НДС, смена адреса)."],
      ["Подбор адреса", "Подбираем подходящий юридический адрес под ваш кейс."],
      ["Документы", "Готовим полный пакет документов на адрес."],
      ["Использование", "Используете адрес для регистрации и работы компании."],
    ],
    whoTitle: "Когда нужен",
    who: [
      ["При регистрации ООО", "Адрес для подачи документов на регистрацию новой компании.", Building2],
      ["Для постановки на НДС", "Адрес, который подходит для регистрации плательщиком НДС.", Receipt],
    ] as const,
    faqTitle: "Частые вопросы",
    faq: [
      ["Подходит ли адрес для регистрации ООО?", "Да, наш адрес подходит для регистрации компании и подачи документов."],
      ["Адрес не массовый?", "Да, мы используем не массовые адреса, чтобы не было вопросов при проверке."],
      ["Подойдёт ли для НДС?", "Да, поможем с адресом, который подходит для постановки на учёт по НДС."],
      ["Какие документы выдаёте?", "Готовим полный пакет документов на адрес для подачи. Детали — на консультации."],
      ["Можно ли для ИП?", "Да, подберём решение и для ИП. Расскажем нюансы на консультации."],
      ["Что если нужно сменить адрес?", "Поможем сменить юридический адрес — подскажем порядок и подготовим документы."],
    ],
    finalTitle: "Нужен юридический адрес?",
    finalDesc: "Оставьте заявку — подберём адрес под вашу задачу и подготовим документы.",
    homePrefix: "Главная страница:",
    homeText: "перейти на основной сайт",
  },
  en: {
    badge: "Legal address",
    heroTitle: "Legal address in Tashkent for company registration",
    heroDesc:
      "We provide a legal address that passes checks during company registration and VAT registration. Non-mass. Full document package for the address.",
    ctaPrimary: "Request a consultation",
    telegram: "Message on Telegram",
    trustStat: "Over 1000 companies have trusted us in 15 years",
    chips: [
      "Suitable for LLC registration",
      "Non-mass address",
      "Full document package",
      "Lawyer support",
    ],
    benefitsTitle: "Why our legal address",
    benefits: [
      ["Passes checks", "The address is suitable for company registration and tax registration, including VAT.", ShieldCheck],
      ["Non-mass", "We use addresses that raise no questions with inspectors.", MapPin],
      ["Full document package", "We prepare all address documents for filing — promptly and without delays.", FileCheck],
      ["For LLC and sole proprietor", "We pick a solution for your form and business needs.", Building2],
    ] as const,
    stepsTitle: "How to get the address",
    steps: [
      ["Request", "You leave a request — we clarify the form and goal (registration, VAT, address change)."],
      ["Address selection", "We select a suitable legal address for your case."],
      ["Documents", "We prepare the full address document package."],
      ["Use", "You use the address for registration and company operations."],
    ],
    whoTitle: "When you need it",
    who: [
      ["For LLC registration", "An address for filing documents to register a new company.", Building2],
      ["For VAT registration", "An address suitable for registering as a VAT payer.", Receipt],
    ] as const,
    faqTitle: "FAQ",
    faq: [
      ["Is the address suitable for LLC registration?", "Yes, our address is suitable for company registration and document filing."],
      ["Is the address non-mass?", "Yes, we use non-mass addresses to avoid questions during checks."],
      ["Will it work for VAT?", "Yes, we help with an address suitable for VAT registration."],
      ["What documents do you provide?", "We prepare the full address document package for filing. Details on a consultation."],
      ["Can it be used for a sole proprietor?", "Yes, we pick a solution for sole proprietors too. We explain the specifics on a consultation."],
      ["What if I need to change the address?", "We help change the legal address — we explain the procedure and prepare documents."],
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
      <section className="relative overflow-hidden pt-28 pb-16">
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

      {/* Steps */}
      <section className="py-16 bg-brand-50/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-navy-900 mb-10 text-center">{c.stepsTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.steps.map(([title, desc], i) => (
              <div key={title} className="relative bg-background rounded-xl border p-6">
                <div className="w-9 h-9 rounded-full bg-brand-600 text-white font-semibold flex items-center justify-center mb-4">{i + 1}</div>
                <h3 className="font-semibold text-navy-900 mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-navy-900 mb-10 text-center">{c.whoTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {c.who.map(([title, desc, Icon]) => (
              <Card key={title} className="h-full">
                <CardHeader>
                  <div className="w-11 h-11 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground leading-relaxed">{desc}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <PartnersSection />

      {/* FAQ */}
      <section className="py-16 bg-brand-50/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-navy-900 mb-10 text-center">{c.faqTitle}</h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {c.faq.map(([q, a]) => (
              <details key={q} className="group bg-background rounded-xl border p-5">
                <summary className="list-none cursor-pointer font-medium text-navy-900 flex items-center justify-between gap-4">
                  {q}
                  <ArrowRight className="w-4 h-4 text-brand-600 shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA + form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-navy-900 text-white p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold">{c.finalTitle}</h2>
            <p className="mt-3 text-navy-100 max-w-2xl mx-auto leading-relaxed">{c.finalDesc}</p>
            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              <Button asChild size="lg" className="rounded-full bg-white text-brand-700 hover:bg-white/90 shadow-md" onClick={() => trackEvent("cta_click", "final")}>
                <a href="#form">{c.ctaPrimary}</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white" onClick={() => trackEvent("telegram_click", "final")}>
                <a href={TELEGRAM} target="_blank" rel="noopener noreferrer"><MessageCircle className="w-4 h-4 mr-2" />{c.telegram}</a>
              </Button>
            </div>
          </div>

          <div id="form" className="mt-12 scroll-mt-24 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center">{tForm("title")}</h2>
            <LandingAmoForm />
          </div>

          <p className="mt-10 text-sm text-muted-foreground text-center">
            {c.homePrefix}{" "}
            <Link href="/" className="text-brand-600 underline hover:no-underline">{c.homeText}</Link>
          </p>
        </div>
      </section>

      <LandingStickyCta ctaLabel={c.ctaPrimary} telegram={TELEGRAM} />
    </main>
  );
}

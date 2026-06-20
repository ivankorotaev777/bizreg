"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LandingAmoForm } from "@/components/LandingAmoForm";
import { PartnersSection } from "@/components/PartnersSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileCheck,
  Landmark,
  MapPin,
  MessageCircle,
  Send,
  ShieldCheck,
  Users,
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
      event_category: "registration_landing",
      event_label: location,
    });
  }
}

const content = {
  ru: {
    badge: "Под ключ, с юристом",
    heroTitle: "Помогаем зарегистрировать ООО и ИП в Узбекистане под ключ",
    heroDesc:
      "Берём на себя весь процесс: подбор формы, подготовка документов, подача и постановка на учёт. Для резидентов и иностранных учредителей. Работаем по Ташкенту и удалённо.",
    ctaPrimary: "Запросить консультацию",
    telegram: "Написать в Telegram",
    trustStat: "Более 1000 компаний успешно зарегистрировано за 10 лет",
    chips: [
      "Под ключ — от заявки до готовых документов",
      "Для иностранных учредителей",
      "Помощь юриста на всех этапах",
      "Удалённо, без вашего выезда",
    ],
    benefitsTitle: "Что входит в услугу",
    benefits: [
      ["Подбор формы и налогового режима", "Поможем выбрать между ООО и ИП и подходящий налоговый режим под вашу деятельность.", Building2],
      ["Подготовка и подача документов", "Готовим полный пакет и подаём за вас — без ошибок и повторных визитов.", FileCheck],
      ["Юридический адрес", "Поможем с юридическим адресом, который проходит проверку при регистрации.", MapPin],
      ["Счёт и старт работы", "Сопровождаем открытие счёта и подсказываем первые шаги после регистрации.", Landmark],
    ] as const,
    stepsTitle: "Как мы работаем",
    steps: [
      ["Заявка", "Оставляете заявку — уточняем вид деятельности и состав учредителей."],
      ["Консультация", "Подбираем форму (ООО или ИП), налоговый режим и список документов."],
      ["Регистрация", "Готовим документы и подаём. Вы получаете готовую компанию."],
      ["Старт", "Помогаем с адресом, счётом и первыми шагами бизнеса."],
    ],
    whoTitle: "Кому подходит",
    who: [
      ["Гражданам Узбекистана", "Быстрая регистрация ООО или ИП с подбором оптимального налогового режима.", Users],
      ["Иностранным учредителям", "Сопровождаем нерезидентов: документы, удалённый формат, нюансы для иностранцев.", ShieldCheck],
    ] as const,
    faqTitle: "Частые вопросы",
    faq: [
      ["Чем отличается ООО от ИП?", "На консультации подберём форму под вашу деятельность, обороты и планы — с учётом налогов и ответственности."],
      ["Можно ли зарегистрировать компанию иностранцу?", "Да, сопровождаем иностранных учредителей. Подскажем список документов и удалённый формат."],
      ["Нужно ли приезжать?", "Большую часть можно оформить удалённо. Что именно — зависит от вашего кейса, расскажем на консультации."],
      ["Сколько занимает регистрация?", "Срок зависит от формы и готовности документов. Дадим реалистичный таймлайн под ваш случай."],
      ["Поможете с юридическим адресом?", "Да, поможем с адресом, который подходит для регистрации и проходит проверку."],
      ["Что после регистрации?", "Подскажем по счёту, налоговому учёту и первым шагам. При необходимости — бухгалтерское сопровождение."],
    ],
    finalTitle: "Готовы зарегистрировать компанию?",
    finalDesc: "Оставьте заявку — бесплатно проконсультируем, подберём форму и подготовим документы под ключ.",
    homePrefix: "Главная страница:",
    homeText: "перейти на основной сайт",
  },
  en: {
    badge: "Turnkey, with a lawyer",
    heroTitle: "We help register an LLC or sole proprietor in Uzbekistan, turnkey",
    heroDesc:
      "We handle the whole process: entity choice, document preparation, filing and tax registration. For residents and foreign founders. Tashkent and remote.",
    ctaPrimary: "Request a consultation",
    telegram: "Message on Telegram",
    trustStat: "Over 1000 companies successfully registered in 10 years",
    chips: [
      "Turnkey — from request to ready documents",
      "For foreign founders",
      "Lawyer support at every step",
      "Remote, without your visit",
    ],
    benefitsTitle: "What the service includes",
    benefits: [
      ["Entity & tax regime selection", "We help choose between an LLC and sole proprietor and the right tax regime for your activity.", Building2],
      ["Document preparation & filing", "We prepare the full package and file for you — no errors, no repeat visits.", FileCheck],
      ["Legal address", "We help with a legal address that passes checks during registration.", MapPin],
      ["Bank account & start", "We support account opening and advise on first steps after registration.", Landmark],
    ] as const,
    stepsTitle: "How we work",
    steps: [
      ["Request", "You leave a request — we clarify your activity and founder structure."],
      ["Consultation", "We choose the entity (LLC or sole proprietor), tax regime and document list."],
      ["Registration", "We prepare and file documents. You get a ready company."],
      ["Start", "We help with address, bank account and first business steps."],
    ],
    whoTitle: "Who it is for",
    who: [
      ["Uzbekistan citizens", "Fast LLC or sole proprietor registration with the optimal tax regime.", Users],
      ["Foreign founders", "We support non-residents: documents, remote format, foreigner specifics.", ShieldCheck],
    ] as const,
    faqTitle: "FAQ",
    faq: [
      ["LLC vs sole proprietor?", "On a consultation we pick the form for your activity, turnover and plans — considering taxes and liability."],
      ["Can a foreigner register a company?", "Yes, we support foreign founders. We provide the document list and a remote format."],
      ["Do I need to travel?", "Most of it can be done remotely. The exact part depends on your case — we explain on a consultation."],
      ["How long does it take?", "Timing depends on the form and document readiness. We give a realistic timeline for your case."],
      ["Do you help with a legal address?", "Yes, we help with an address suitable for registration that passes checks."],
      ["What happens after registration?", "We advise on the bank account, tax accounting and first steps. Accounting support is available if needed."],
    ],
    finalTitle: "Ready to register your company?",
    finalDesc: "Leave a request — a free consultation, entity selection and turnkey document preparation.",
    homePrefix: "Main page:",
    homeText: "go to the main site",
  },
} as const;

export default function RegistrationLandingClient() {
  const locale = useLocale() as keyof typeof content;
  const c = content[locale] ?? content.ru;
  const tForm = useTranslations("requestForm");

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden pt-14 pb-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 via-background to-navy-50" />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-5 bg-brand-100 text-brand-800 hover:bg-brand-100 border-0">{c.badge}</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-navy-900">{c.heroTitle}</h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{c.heroDesc}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700 text-white" onClick={() => trackEvent("cta_click", "hero")}>
                <a href="#form">{c.ctaPrimary} <ArrowRight className="w-4 h-4 ml-2" /></a>
              </Button>
              <Button asChild size="lg" variant="outline" onClick={() => trackEvent("telegram_click", "hero")}>
                <a href={TELEGRAM} target="_blank" rel="noopener noreferrer"><Send className="w-4 h-4 mr-2" />{c.telegram}</a>
              </Button>
            </div>
            <div className="mt-10 grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left">
              {c.chips.map((chip) => (
                <div key={chip} className="flex items-center gap-2 text-sm text-navy-800">
                  <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0" />
                  {chip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust band */}
      <section className="py-10 border-y bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl sm:text-3xl font-bold text-navy-900">{c.trustStat}</p>
          {/* TODO: скролл с логотипами брендов — добавить позже */}
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
              <Button asChild size="lg" className="bg-brand-500 hover:bg-brand-600 text-white" onClick={() => trackEvent("cta_click", "final")}>
                <a href="#form">{c.ctaPrimary}</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white" onClick={() => trackEvent("telegram_click", "final")}>
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
    </main>
  );
}

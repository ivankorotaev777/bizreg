"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LandingAmoForm } from "@/components/LandingAmoForm";
import { PartnersSection } from "@/components/PartnersSection";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
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
  Landmark,
  MapPin,
  Send,
  ShieldCheck,
  Users,
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
      event_category: "registration_landing",
      event_label: location,
    });
  }
}

const content = {
  ru: {
    badge: "Юрист на всех этапах",
    heroTitle: "Помогаем зарегистрировать ООО в Узбекистане",
    heroDesc:
      "Берём на себя весь процесс: подбор формы собственности, подготовка документов, подача и постановка на учёт. Для резидентов и иностранных учредителей. Работаем по Ташкенту и удалённо.",
    ctaPrimary: "Запросить консультацию",
    telegram: "Написать в Telegram",
    trustStat: "Помогаем бизнесу в Узбекистане более 15 лет",
    chips: [
      "Поможем с юр. адресом и счётом",
      "Для резидентов и иностранцев",
      "Удалённо, без вашего присутствия",
    ],
    benefitsTitle: "Что входит в услугу",
    benefits: [
      ["Подбор формы и налогового режима", "Поможем выбрать между ООО и ИП и подходящий налоговый режим под вашу деятельность.", Building2],
      ["Подготовка и подача документов", "Готовим полный пакет и подаём за вас — без ошибок и повторных визитов.", FileCheck],
      ["Юридический адрес", "Поможем с не массовым юридическим адресом, пригодным для регистрации.", MapPin],
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
      ["Какая форма юрлица подходит иностранцу для регистрации компании?", "Иностранный гражданин регистрирует компанию в форме ООО. Есть два варианта: «обычное ООО» — самая распространённая форма, минимальный уставный капитал не установлен, вы определяете его сами; и «иностранное предприятие» — то же ООО (со 100% иностранным капиталом) со статусом предприятия с иностранными инвестициями, для него установлен минимальный уставный капитал — от 400 млн сум. Учредителем может быть как физическое лицо, так и иностранная компания. Индивидуальным предпринимателем (ИП) иностранец может стать только при наличии регистрации по месту жительства в Узбекистане — то есть если он проживает в стране и имеет местные документы (вид на жительство/прописку). Нерезиденту, который не живёт в Узбекистане, подходит ООО."],
      ["Сколько стоит регистрация ООО и что входит в цену?", "Актуальные цены — в блоке «Цены» выше. В услугу входит подбор формы и налогового режима, подготовка и подача документов, постановка на учёт. Точную стоимость под ваш случай назовём на бесплатной консультации — без скрытых платежей."],
      ["Может ли иностранец-нерезидент открыть компанию? Нужна ли виза или ВНЖ?", "Да. Учредителем может быть иностранец-нерезидент — виза или ВНЖ для этого не нужны. ВНЖ или разрешение на работу может понадобиться, только если иностранец будет директором и работать в компании лично. Поможем с обоими сценариями."],
      ["Можно ли всё оформить удалённо, без приезда в Узбекистан?", "Да, в большинстве случаев регистрацию можно провести удалённо — по доверенности и через государственные онлайн-порталы. Приезд обычно не требуется; нюансы зависят от формы и банка."],
      ["Что нужно от меня для старта? Нужен ли уставный капитал и сколько?", "От вас — паспорта учредителей, название, виды деятельности и контакты. Для обычного ООО минимальный уставный капитал не установлен — вы определяете его сами. Весь пакет документов готовим мы."],
      ["Какие налоги платит ООО и какой режим выбрать?", "Два основных режима: налог с оборота (упрощёнка) — базовая ставка около 4% (зависит от вида деятельности), доступен при обороте до 12 000 БРВ (около 5 млрд сум) в год; при превышении — общая система: НДС 12% и налог на прибыль 15%. Для отдельных видов деятельности действуют льготы и упрощённый НДС по ставке 6%. В стране также есть особые экономические зоны с выгодными налоговыми режимами. Оптимальный режим и льготы подберём под вашу деятельность."],
      ["Нужен ли юридический адрес и входит ли он в услугу?", "Да, для регистрации компании нужен юридический адрес. Поможем с не массовым адресом, пригодным для регистрации и постановки на учёт по НДС. Условия — в блоке «Цены»."],
      ["Поможете открыть расчётный счёт? Можно ли удалённо?", "Да, сопровождаем открытие расчётного счёта и подскажем удобный банк. Часть банков допускает удалённое открытие — конкретику уточним под вашу форму и банк."],
      ["Что нужно делать после регистрации?", "Компания обязана вести учёт и сдавать налоговую отчётность по выбранному режиму. Возьмём бухгалтерию на сопровождение — от настройки до отчётности."],
      ["Сколько занимает регистрация?", "Обычно около двух рабочих дней, чтобы зарегистрировать юридическое лицо и получить банковский счёт. Точный срок зависит от готовности документов и банка."],
    ],
    finalTitle: "Готовы зарегистрировать компанию?",
    finalDesc: "Оставьте заявку — бесплатно проконсультируем, подберём форму и подготовим документы.",
    homePrefix: "Главная страница:",
    homeText: "перейти на основной сайт",
  },
  en: {
    badge: "Lawyer at every step",
    heroTitle: "We help register an LLC in Uzbekistan",
    heroDesc:
      "We handle the whole process: entity choice, document preparation, filing and tax registration. For residents and foreign founders. Tashkent and remote.",
    ctaPrimary: "Request a consultation",
    telegram: "Message on Telegram",
    trustStat: "Helping businesses in Uzbekistan for 15+ years",
    chips: [
      "Help with legal address & bank account",
      "For residents and foreigners",
      "Remote, without your presence",
    ],
    benefitsTitle: "What the service includes",
    benefits: [
      ["Entity & tax regime selection", "We help choose between an LLC and sole proprietor and the right tax regime for your activity.", Building2],
      ["Document preparation & filing", "We prepare the full package and file for you — no errors, no repeat visits.", FileCheck],
      ["Legal address", "We help with a non-mass legal address suitable for registration.", MapPin],
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
      ["Which legal form suits a foreigner for registering a company?", "A foreign national registers a company as an LLC. There are two options: an «ordinary LLC» — the most common form, with no minimum charter capital (you set it yourself); and a «foreign enterprise» — the same LLC (with 100% foreign capital) holding «enterprise with foreign investment» status, which requires a minimum charter capital of 400 million UZS. A founder can be either an individual or a foreign company. A foreigner can become a sole proprietor (ИП) only with residence registration in Uzbekistan — i.e. if they live in the country and hold local documents (residence permit/registration). A non-resident who does not live in Uzbekistan should use an LLC."],
      ["How much does LLC registration cost and what's included?", "Current prices are in the «Pricing» block above. The service includes entity & tax regime selection, document preparation and filing, and tax registration. We'll give the exact price for your case on a free consultation — no hidden fees."],
      ["Can a non-resident foreigner open a company? Is a visa or residence permit needed?", "Yes. A founder can be a non-resident foreigner — no visa or residence permit is required for that. A residence or work permit may be needed only if the foreigner will be the director and work in the company personally. We help with both scenarios."],
      ["Can everything be done remotely, without coming to Uzbekistan?", "Yes, in most cases registration can be done remotely — by power of attorney and via government online portals. A visit is usually not required; specifics depend on the entity form and bank."],
      ["What do you need from me? Is charter capital required and how much?", "From you — founders' passports, the company name, activities and contacts. For an ordinary LLC there is no minimum charter capital — you set it yourself. We prepare the full document package."],
      ["What taxes does an LLC pay and which regime to choose?", "Two main regimes: turnover tax (simplified) — base rate about 4% (depends on the activity), available for turnover up to 12,000 BRV (about 5 billion UZS) per year; above that — the general system: VAT 12% and profit tax 15%. For certain activities there are tax incentives and a simplified VAT at 6%. The country also has special economic zones with favorable tax regimes. We'll pick the optimal regime and incentives for your activity."],
      ["Is a legal address required and is it included?", "Yes, a legal address is required to register a company. We help with a non-mass address suitable for registration and VAT registration. Terms are in the «Pricing» block."],
      ["Will you help open a bank account? Can it be done remotely?", "Yes, we support opening a current account and suggest a convenient bank. Some banks allow remote opening — we'll clarify the specifics for your entity and bank."],
      ["What needs to be done after registration?", "The company must keep accounting and file tax reports under the chosen regime. We can take over accounting — from setup to reporting."],
      ["How long does registration take?", "Usually about two business days to register the legal entity and get a bank account. The exact term depends on document readiness and the bank."],
    ],
    finalTitle: "Ready to register your company?",
    finalDesc: "Leave a request — a free consultation, entity selection and document preparation.",
    homePrefix: "Main page:",
    homeText: "go to the main site",
  },
} as const;

export default function RegistrationLandingClient() {
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

      {/* Pricing */}
      <PricingSection requestFormHref="#form" showDiscounts={false} />

      {/* Отзывы клиентов — на месте команды */}
      <TestimonialsSection />

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
          <div id="form" className="scroll-mt-24 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center">{tForm("title")}</h2>
            <LandingAmoForm />
          </div>

          <p className="mt-10 text-sm text-muted-foreground text-center">
            {c.homePrefix}{" "}
            <Link href="/" className="text-brand-600 underline hover:no-underline">{c.homeText}</Link>
          </p>
        </div>
      </section>

      <LandingStickyCta ctaLabel={c.ctaPrimary} />
    </main>
  );
}

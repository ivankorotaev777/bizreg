"use client";

import { useLocale } from "next-intl";
import { CheckCircle2, Star, Trophy, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const content = {
  ru: {
    badge: "Тарифы",
    title: "Выберите подходящий пакет",
    description: "Прозрачные цены под ключ, никаких скрытых платежей. Уставный капитал оплачивается отдельно.",
    popular: "Популярный",
    vat: "сум + НДС",
    cta: "Запросить консультацию",
    standard: {
      title: "Стандарт", for: "Для ООО без НДС", price: "1 190 000",
      features: ["Регистрация ООО под ключ", "Юридический адрес для регистрации", "Постановка на учёт (e-ijara, Didox)", "Помощь юриста на всех этапах"],
    },
    business: {
      title: "Бизнес", for: "Для ООО на НДС", price: "2 390 000",
      features: ["Всё из пакета Стандарт", "Регистрация плательщиком НДС", "Юридический адрес 18 м² под НДС", "Сопровождение постановки на учёт по НДС"],
    },
    foreign: {
      title: "Премиум", for: "Иностранное предприятие", price: "от 3 500 000",
      features: ["Регистрация предприятия с иностранными инвестициями", "Для нерезидентов — удалённо, по доверенности", "Юридический адрес и постановка на учёт"],
    },
  },
  en: {
    badge: "Plans",
    title: "Choose the right package",
    description: "Transparent turnkey prices, no hidden fees. Charter capital is paid separately.",
    popular: "Popular",
    vat: "UZS + VAT",
    cta: "Request a consultation",
    standard: {
      title: "Standard", for: "For an LLC without VAT", price: "1 190 000",
      features: ["Turnkey LLC registration", "Legal address for registration", "Tax registration (e-ijara, Didox)", "Lawyer support at every step"],
    },
    business: {
      title: "Business", for: "For an LLC with VAT", price: "2 390 000",
      features: ["Everything in Standard", "Registration as a VAT payer", "18 m² legal address for VAT", "Support with VAT tax registration"],
    },
    foreign: {
      title: "Premium", for: "Foreign enterprise", price: "from 3 500 000",
      features: ["Registration of an enterprise with foreign investment", "For non-residents — remotely, by power of attorney", "Legal address and tax registration"],
    },
  },
} as const;

export const AddressPricingSection = ({ requestFormHref = "#form" }: { requestFormHref?: string }) => {
  const locale = useLocale() as keyof typeof content;
  const c = content[locale] ?? content.ru;

  return (
    <section id="pricing" className="py-10 lg:py-14 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-500/5 rounded-full blur-[100px]" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3 text-sm">{c.badge}</Badge>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-3 text-foreground">{c.title}</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">{c.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto items-start">
          {/* Стандарт */}
          <Card className="bg-white border-border relative overflow-hidden hover:border-brand-300 hover:shadow-lg transition-all">
            <CardHeader className="pb-3 pt-5">
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 mb-3 w-fit">{c.standard.title}</Badge>
              <p className="text-sm text-muted-foreground mb-2">{c.standard.for}</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-semibold text-foreground">{c.standard.price}</span>
                <span className="text-sm text-muted-foreground">{c.vat}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <ul className="space-y-2.5">
                {c.standard.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full rounded-full" asChild>
                <a href={requestFormHref}>{c.cta}</a>
              </Button>
            </CardFooter>
          </Card>

          {/* Бизнес — популярный */}
          <Card className="bg-gradient-to-b from-brand-500 to-brand-600 border-brand-400 text-white relative overflow-hidden md:scale-[1.03] shadow-xl shadow-brand-500/20">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-bl-full" />
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10">
              <Badge className="bg-yellow-400 text-yellow-900 border-0 shadow-md">
                <Star className="w-4 h-4 mr-1 fill-yellow-900" />{c.popular}
              </Badge>
            </div>
            <CardHeader className="pb-3 pt-10">
              <Badge className="bg-white/20 text-white border-white/30 mb-3 w-fit">{c.business.title}</Badge>
              <p className="text-sm text-brand-100 mb-2">{c.business.for}</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-semibold">{c.business.price}</span>
                <span className="text-sm text-brand-100">{c.vat}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <ul className="space-y-2.5">
                {c.business.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-white">{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full rounded-full bg-white text-brand-700 hover:bg-brand-50 font-medium" asChild>
                <a href={requestFormHref} className="inline-flex items-center justify-center gap-2">
                  <span className="whitespace-nowrap">{c.cta}</span>
                  <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>

          {/* Иностранное предприятие */}
          <Card className="bg-white border-border relative overflow-hidden hover:border-brand-300 hover:shadow-lg transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-bl-full" />
            <CardHeader className="pb-3 pt-5">
              <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200 mb-3 w-fit">
                <Trophy className="w-4 h-4 mr-1" />{c.foreign.title}
              </Badge>
              <p className="text-sm text-muted-foreground mb-2">{c.foreign.for}</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-semibold text-foreground">{c.foreign.price}</span>
                <span className="text-sm text-muted-foreground">{c.vat}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <ul className="space-y-2.5">
                {c.foreign.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full rounded-full" asChild>
                <a href={requestFormHref}>{c.cta}</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

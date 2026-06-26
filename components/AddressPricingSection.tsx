"use client";

import { useLocale } from "next-intl";
import { CheckCircle2, XCircle, Star, Trophy, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const content = {
  ru: {
    badge: "Тарифы",
    title: "Выберите подходящий пакет",
    description: "Прозрачные цены, никаких скрытых платежей. Скидка 10–15% при оплате за год.",
    popular: "Популярный",
    area: "м²",
    period: "сум/мес",
    cta: "Запросить консультацию",
    start: {
      title: "Старт", area: "3", price: "990 000", vat: "+ НДС",
      desc: "Для тех, кому нужен только легальный адрес для регистрации",
      features: ["Юридический адрес для ООО / ИП", "Регистрация в Didox и e-ijara", "Соответствие требованиям законодательства"],
      no: ["Без выделенного представителя", "Без приёма и пересылки почты"],
    },
    standard: {
      title: "Стандарт", area: "5", price: "1 300 000", vat: "+ НДС",
      desc: "Для ИП и фирм без НДС, которым важно физическое присутствие",
      features: ["Всё из пакета Старт", "Выделенный представитель с 10:00 до 20:00", "Приём и пересылка почты — до 10 отправлений/мес"],
    },
    business: {
      title: "Бизнес", area: "18", price: "2 600 000", vat: "без НДС",
      desc: "Для компаний с НДС и постановки на учёт в налоговой",
      features: ["Всё из пакета Стандарт", "Площадь 18 м² — для учёта по НДС", "Подходит для фирм с НДС"],
    },
  },
  en: {
    badge: "Plans",
    title: "Choose the right package",
    description: "Transparent prices, no hidden fees. 10–15% discount for annual payment.",
    popular: "Popular",
    area: "m²",
    period: "UZS/mo",
    cta: "Request a consultation",
    start: {
      title: "Start", area: "3", price: "990 000", vat: "+ VAT",
      desc: "For those who only need a legal address for registration",
      features: ["Legal address for LLC / sole proprietor", "Registration in Didox and e-ijara", "Compliance with legal requirements"],
      no: ["No dedicated representative", "No mail receiving/forwarding"],
    },
    standard: {
      title: "Standard", area: "5", price: "1 300 000", vat: "+ VAT",
      desc: "For sole proprietors and non-VAT firms that need a physical presence",
      features: ["Everything in Start", "Dedicated representative 10:00–20:00", "Mail receiving and forwarding — up to 10/mo"],
    },
    business: {
      title: "Business", area: "18", price: "2 600 000", vat: "excl. VAT",
      desc: "For VAT companies and tax registration",
      features: ["Everything in Standard", "18 m² area — for VAT registration", "Suitable for VAT-paying firms"],
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
          {/* Старт */}
          <Card className="bg-white border-border relative overflow-hidden hover:border-brand-300 hover:shadow-lg transition-all">
            <CardHeader className="pb-3 pt-5">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">{c.start.title}</Badge>
                <span className="text-sm text-muted-foreground">{c.start.area} {c.area}</span>
              </div>
              <div className="mb-1">
                <span className="text-3xl font-semibold text-foreground">{c.start.price}</span>
                <span className="text-muted-foreground ml-1">{c.period}</span>
              </div>
              <p className="text-sm text-muted-foreground">{c.start.vat}</p>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <p className="text-muted-foreground text-sm">{c.start.desc}</p>
              <ul className="space-y-2.5">
                {c.start.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{f}</span>
                  </li>
                ))}
                {c.start.no.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
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

          {/* Стандарт */}
          <Card className="bg-gradient-to-b from-brand-500 to-brand-600 border-brand-400 text-white relative overflow-hidden md:scale-[1.03] shadow-xl shadow-brand-500/20">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-bl-full" />
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10">
              <Badge className="bg-yellow-400 text-yellow-900 border-0 shadow-md">
                <Star className="w-4 h-4 mr-1 fill-yellow-900" />{c.popular}
              </Badge>
            </div>
            <CardHeader className="pb-3 pt-10">
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-white/20 text-white border-white/30">{c.standard.title}</Badge>
                <span className="text-sm text-brand-100">{c.standard.area} {c.area}</span>
              </div>
              <div className="mb-1">
                <span className="text-3xl font-semibold">{c.standard.price}</span>
                <span className="text-brand-100 ml-1">{c.period}</span>
              </div>
              <p className="text-sm text-brand-200">{c.standard.vat}</p>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <p className="text-brand-100 text-sm">{c.standard.desc}</p>
              <ul className="space-y-2.5">
                {c.standard.features.map((f, i) => (
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

          {/* Бизнес */}
          <Card className="bg-white border-border relative overflow-hidden hover:border-brand-300 hover:shadow-lg transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-bl-full" />
            <CardHeader className="pb-3 pt-5">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200">
                  <Trophy className="w-4 h-4 mr-1" />{c.business.title}
                </Badge>
                <span className="text-sm text-muted-foreground">{c.business.area} {c.area}</span>
              </div>
              <div className="mb-1">
                <span className="text-3xl font-semibold text-foreground">{c.business.price}</span>
                <span className="text-muted-foreground ml-1">{c.period}</span>
              </div>
              <p className="text-sm text-brand-600 font-medium">{c.business.vat}</p>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <p className="text-muted-foreground text-sm">{c.business.desc}</p>
              <ul className="space-y-2.5">
                {c.business.features.map((f, i) => (
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

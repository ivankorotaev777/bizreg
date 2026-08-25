"use client";

import { useLocale } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const content = {
  ru: {
    badge: "Тарифы",
    title: "Юридический адрес: выберите пакет",
    description: "Цена в месяц, зависит от формы бизнеса и налогового режима. Никаких скрытых платежей.",
    popular: "Популярный",
    per: "сум/мес",
    cta: "Оставить заявку",
    packages: [
      {
        title: "ИП",
        price: "1 000 000",
        features: [
          "Площадь 3 м²",
          "Договор аренды и регистрация в e-ijara",
          "Регистрация в Didox",
          "Приём и пересылка почты",
        ],
        highlight: false,
      },
      {
        title: "ООО на УСН",
        price: "1 272 000",
        features: [
          "Площадь 5 м²",
          "Всё из пакета ИП",
          "Выделенный представитель с 10:00 до 20:00",
          "Помощь с подтверждением адреса для банка",
        ],
        highlight: true,
      },
      {
        title: "ООО на НДС",
        price: "2 544 000",
        features: [
          "Площадь 18 м² — соответствует требованиям для учёта по НДС",
          "Всё из пакета ООО на УСН",
          "Сопровождение постановки на учёт по НДС",
          "Поддержка при запросах налоговой",
        ],
        highlight: false,
      },
    ],
  },
  en: {
    badge: "Plans",
    title: "Legal address: choose a package",
    description: "Monthly price, depends on your business form and tax regime. No hidden fees.",
    popular: "Popular",
    per: "UZS/month",
    cta: "Leave a request",
    packages: [
      {
        title: "Sole proprietor",
        price: "1,000,000",
        features: [
          "Area: 3 m²",
          "Lease agreement and e-ijara registration",
          "Didox registration",
          "Mail receiving and forwarding",
        ],
        highlight: false,
      },
      {
        title: "LLC, simplified tax",
        price: "1,272,000",
        features: [
          "Area: 5 m²",
          "Everything in the Sole proprietor package",
          "Dedicated representative from 10:00 to 20:00",
          "Help confirming the address for the bank",
        ],
        highlight: true,
      },
      {
        title: "LLC with VAT",
        price: "2,544,000",
        features: [
          "Area: 18 m² — meets the requirements for VAT registration",
          "Everything in the simplified-tax package",
          "Support with VAT tax registration",
          "Support with tax authority requests",
        ],
        highlight: false,
      },
    ],
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

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto items-stretch">
          {c.packages.map((pkg) => (
            <Card
              key={pkg.title}
              className={`bg-white relative flex flex-col transition-all hover:shadow-lg ${
                pkg.highlight
                  ? "border-2 border-brand-500 shadow-md"
                  : "border-border hover:border-brand-300"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-brand-600 text-white text-xs font-medium px-3.5 py-1.5 rounded-full whitespace-nowrap shadow">
                    {c.popular}
                  </span>
                </div>
              )}
              <CardHeader className="pb-3 pt-6">
                <h3 className="text-xl font-semibold text-foreground">{pkg.title}</h3>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-2xl font-semibold text-foreground tabular-nums">{pkg.price}</span>
                  <span className="text-sm text-muted-foreground">{c.per}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0 flex-1">
                <ul className="space-y-2.5">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-2">
                <Button className="w-full" asChild>
                  <a href={requestFormHref}>{c.cta}</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

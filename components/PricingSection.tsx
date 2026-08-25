"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CheckCircle2, MapPin, Calculator, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const SERVICES = [
  {
    icon: MapPin,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    titleKey: "crossAddressTitle",
    priceKey: "svcAddressPrice",
    descKey: "crossAddressDesc",
    features: ["crossAddressF1", "crossAddressF2"],
    fullPriceHref: "/yuridicheskiy-adres#pricing",
    highlight: false,
  },
  {
    icon: Building2,
    iconBg: "bg-brand-50",
    iconColor: "text-brand-600",
    titleKey: "svcRegTitle",
    priceKey: "svcRegPrice",
    descKey: "svcRegDesc",
    features: ["svcRegF1", "svcRegF2"],
    fullPriceHref: "/registratsiya-ooo#tarify",
    highlight: true,
  },
  {
    icon: Calculator,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    titleKey: "crossAccountingTitle",
    priceKey: "svcAccountingPrice",
    descKey: "crossAccountingDesc",
    features: ["crossAccountingF1", "crossAccountingF2"],
    fullPriceHref: "/kalkulyator-buhgalterii",
    highlight: false,
  },
] as const;

export const PricingSection = ({ requestFormHref, showDiscounts = true }: { requestFormHref: string; showDiscounts?: boolean }) => {
  const t = useTranslations("tariffs");
  const tp = useTranslations("pricing");

  return (
    <section id="pricing" className="py-10 lg:py-14 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-500/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3 text-sm">{tp("badge")}</Badge>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-3 text-foreground">
            {tp("title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {tp("description")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto items-stretch">
          {SERVICES.map((svc) => {
            const Icon = svc.icon;
            return (
              <Card
                key={svc.titleKey}
                className={`bg-white relative flex flex-col transition-all hover:shadow-lg ${
                  svc.highlight
                    ? "border-2 border-brand-500 shadow-md"
                    : "border-border hover:border-brand-300"
                }`}
              >
                <CardHeader className="pb-3 pt-6">
                  <div className={`w-11 h-11 rounded-lg ${svc.iconBg} flex items-center justify-center mb-3`}>
                    <Icon className={`w-5 h-5 ${svc.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{t(svc.titleKey)}</h3>
                  <p className="text-2xl font-semibold text-foreground tabular-nums mt-1">{t(svc.priceKey)}</p>
                </CardHeader>
                <CardContent className="pt-0 flex-1">
                  <p className="text-sm text-muted-foreground mb-3">{t(svc.descKey)}</p>
                  <ul className="space-y-2">
                    {svc.features.map((key) => (
                      <li key={key} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{t(key)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-2 flex flex-col gap-2">
                  <Button className="w-full" asChild>
                    <a href={requestFormHref}>{t("cta")}</a>
                  </Button>
                  <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground" asChild>
                    <Link href={svc.fullPriceHref}>{t("fullPrice")}</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {showDiscounts && (
          <div className="mt-10 text-center">
            <div className="inline-flex flex-wrap justify-center gap-6 p-5 rounded-xl bg-brand-50 border border-brand-100">
              <div className="flex items-center gap-2 text-sm text-brand-800">
                <CheckCircle2 className="w-5 h-5 text-brand-500" />
                <span>{tp("discount1")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-brand-800">
                <CheckCircle2 className="w-5 h-5 text-brand-500" />
                <span>{tp("discount2")}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

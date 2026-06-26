"use client";

import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export const PricingSection = ({ requestFormHref, showDiscounts = true }: { requestFormHref: string; showDiscounts?: boolean }) => {
  const t = useTranslations("pricing");

  return (
    <section id="pricing" className="py-10 lg:py-14 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-500/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3 text-sm">{t("badge")}</Badge>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-3 text-foreground">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {/* Карточка 1: Юридический адрес */}
          <Card className="bg-white border-border relative overflow-hidden hover:border-brand-300 hover:shadow-lg transition-all">
            <CardHeader className="pb-3 pt-5">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="bg-sky-50 text-sky-700 border-sky-200">
                  {t("standardTitle")}
                </Badge>
              </div>
              <div className="flex items-start gap-1.5">
                {t("standardPriceFrom") && <span className="text-sm text-muted-foreground pt-1">{t("standardPriceFrom")}</span>}
                <span className="text-3xl font-semibold text-foreground leading-none">{t("standardPriceNum")}</span>
                <span className="text-sm text-muted-foreground pt-1">{t("standardPricePeriod")}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{t("standardPriceVat")}</p>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <ul className="space-y-2.5">
                {Array.from({ length: 3 }, (_, i) => `standardInclude${i + 1}`).map((key, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{t(key)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border pt-2.5 mt-2.5">
                <p className="text-muted-foreground text-xs italic">{t("standardOooNote")}</p>
              </div>
              <ul className="space-y-2.5">
                {Array.from({ length: 4 }, (_, i) => `standardInclude${i + 4}`).map((key, i) => (
                  <li key={i + 3} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{t(key)}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground text-xs leading-relaxed pt-2">{t("standardFootnote")}</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full" asChild>
                <a href={requestFormHref}>
                  {t("cta")}
                </a>
              </Button>
            </CardFooter>
          </Card>

          {/* Карточка 2: Регистрация компании под ключ */}
          <Card className="bg-white border-border relative overflow-hidden hover:border-brand-300 hover:shadow-lg transition-all">
            <CardHeader className="pb-3 pt-5">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  {t("startTitle")}
                </Badge>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-3xl font-semibold text-foreground leading-none">{t("startPrice")}</span>
                <span className="text-sm text-muted-foreground pt-1">{t("startPeriod")}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{t("startVat")}</p>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <p className="text-muted-foreground text-sm">{t("startDesc")}</p>
              <ul className="space-y-2.5">
                {Array.from({ length: 12 }, (_, i) => `startFeature${i + 1}`).map((key, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full" asChild>
                <a href={requestFormHref}>
                  {t("cta")}
                </a>
              </Button>
            </CardFooter>
          </Card>

          {/* Карточка 3: Бухгалтерский учёт */}
          <Card className="bg-white border-border relative overflow-hidden hover:border-brand-300 hover:shadow-lg transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-bl-full" />
            <CardHeader className="pb-3 pt-5">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200">
                  {t("businessTitle")}
                </Badge>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-3xl font-semibold text-foreground leading-none">{t("businessPrice")}</span>
                <span className="text-sm text-muted-foreground pt-1">{t("startPeriod")}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{t("businessVat")}</p>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <p className="text-muted-foreground text-sm">{t("businessDesc")}</p>
              <ul className="space-y-2.5">
                {Array.from({ length: 12 }, (_, i) => `businessFeature${i + 1}`).map((key, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full" asChild>
                <a href={requestFormHref}>
                  {t("cta")}
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {showDiscounts && (
          <div className="mt-10 text-center">
            <div className="inline-flex flex-wrap justify-center gap-6 p-5 rounded-xl bg-brand-50 border border-brand-100">
              <div className="flex items-center gap-2 text-sm text-brand-800">
                <CheckCircle2 className="w-5 h-5 text-brand-500" />
                <span>{t("discount1")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-brand-800">
                <CheckCircle2 className="w-5 h-5 text-brand-500" />
                <span>{t("discount2")}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

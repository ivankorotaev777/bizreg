"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const TIERS = [
  { gameKey: "t1Game", nameKey: "t1Name", priceKey: "t1Price", features: ["t1F1", "t1F2", "t1F3", "t1F4"], highlight: false },
  { gameKey: "t2Game", nameKey: "t2Name", priceKey: "t2Price", features: ["t2F1", "t2F2", "t2F3", "t2F4", "t2F5", "t2F6", "t2F7", "t2F8"], highlight: true },
  { gameKey: "t3Game", nameKey: "t3Name", priceKey: "t3Price", features: ["t3F1", "t3F2", "t3F3", "t3F4"], highlight: false },
] as const;

export const TariffCards = ({
  requestFormHref,
  showCompareLink = true,
}: {
  requestFormHref: string;
  showCompareLink?: boolean;
}) => {
  const t = useTranslations("tariffs");

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto items-start">
        {TIERS.map((tier) => (
          <Card
            key={tier.nameKey}
            className={`bg-white relative overflow-visible transition-all hover:shadow-lg ${
              tier.highlight
                ? "border-2 border-brand-500 shadow-md md:-mt-2"
                : "border-border hover:border-brand-300"
            }`}
          >
            {tier.highlight && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                <span className="bg-brand-600 text-white text-xs font-medium px-3.5 py-1.5 rounded-full whitespace-nowrap shadow">
                  {t("t2Badge")}
                </span>
              </div>
            )}
            <CardHeader className="pb-3 pt-6">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">{t(tier.gameKey)}</p>
              <h3 className="text-xl font-semibold text-foreground">{t(tier.nameKey)}</h3>
              <div className="flex items-start gap-1.5 mt-2">
                <span className="text-3xl font-semibold text-foreground leading-none tabular-nums">{t(tier.priceKey)}</span>
                <span className="text-sm text-muted-foreground pt-1">{t("t1Per")}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2.5 pt-0">
              <ul className="space-y-2.5">
                {tier.features.map((key) => (
                  <li key={key} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant={tier.highlight ? "default" : "outline"} className="w-full" asChild>
                <a href={requestFormHref}>{t("cta")}</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="max-w-5xl mx-auto mt-6 text-center space-y-2">
        <p className="text-sm text-muted-foreground">{t("upgradeNote")}</p>
        <p className="text-xs text-muted-foreground">{t("feesNote")}</p>
        {showCompareLink && (
          <p className="pt-1">
            <Link
              href="/registratsiya-ooo#tarify"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              {t("compareLink")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

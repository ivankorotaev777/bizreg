"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PARTNERS = [
  { image: "/Ivan.png", nameKey: "name1", roleKey: "role1", descKey: "desc1" },
  { image: "/Yaroslav%202.png", nameKey: "name2", roleKey: "role2", descKey: "desc2" },
  { image: "/Karima.png", nameKey: "name3", roleKey: "role3", descKey: "desc3" },
] as const;

export function PartnersSection() {
  const t = useTranslations("partners");

  return (
    <section
      id="partners"
      className="py-10 lg:py-14 bg-muted/40 border-t border-border"
      aria-labelledby="partners-heading"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3 text-sm">
            {t("badge")}
          </Badge>
          <h2 id="partners-heading" className="text-3xl sm:text-4xl font-semibold text-foreground">
            {t("title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {PARTNERS.map((partner, index) => (
            <Card
              key={index}
              className="border border-border bg-card hover:border-brand-300 transition-all overflow-hidden p-0 flex flex-col"
            >
              <div className="relative w-full aspect-[3/4] min-h-[280px] bg-muted flex-shrink-0">
                <img
                  src={partner.image}
                  alt={t(partner.nameKey)}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-5 text-center flex-1 flex flex-col justify-start">
                <h3 className="font-semibold text-lg text-foreground">{t(partner.nameKey)}</h3>
                <p className="text-brand-600 text-sm font-medium mt-1">{t(partner.roleKey)}</p>
                <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                  {t(partner.descKey)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

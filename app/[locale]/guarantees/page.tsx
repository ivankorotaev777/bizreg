"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, FileCheck, Building2, Users, Scale, CheckCircle2, AlertTriangle } from "lucide-react";

export default function GuaranteesPage() {
  const t = useTranslations("guarantees");

  const guarantees = [
    { icon: FileCheck, titleKey: "what1Title", descKey: "what1Desc" },
    { icon: Building2, titleKey: "what2Title", descKey: "what2Desc" },
    { icon: Users, titleKey: "what3Title", descKey: "what3Desc" },
    { icon: Scale, titleKey: "what4Title", descKey: "what4Desc" },
    { icon: Shield, titleKey: "what5Title", descKey: "what5Desc" },
    { icon: CheckCircle2, titleKey: "what6Title", descKey: "what6Desc" }
  ];

  return (
    <main className="pt-20 pb-12">
      {/* Hero */}
      <section className="py-12 bg-gradient-to-b from-brand-50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 text-sm">{t("badge")}</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      {/* Основные гарантии */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-10 text-center">{t("whatTitle")}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {guarantees.map((item, index) => (
                <Card key={index} className="p-5 hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-brand-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">{t(item.titleKey)}</h3>
                        <p className="text-muted-foreground">{t(item.descKey)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Чем мы отличаемся */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-10 text-center">{t("compareTitle")}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Мы */}
              <Card className="p-6 border-brand-300 bg-brand-50/50">
                <h3 className="font-medium text-lg mb-5 text-brand-700 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  {t("usTitle")}
                </h3>
                <ul className="space-y-3">
                  {["us1", "us2", "us3", "us4", "us5", "us6"].map((key, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                      <span>{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Другие */}
              <Card className="p-6 border-red-200 bg-red-50/50">
                <h3 className="font-medium text-lg mb-5 text-red-700 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  {t("othersTitle")}
                </h3>
                <ul className="space-y-3">
                  {["others1", "others2", "others3", "others4", "others5", "others6"].map((key, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Возврат средств */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-6">{t("refundTitle")}</h2>
            <Card className="p-6">
              <p className="text-muted-foreground mb-5">
                {t("refundDesc")}
              </p>
              <div className="p-4 bg-brand-50 rounded-xl">
                <p className="text-brand-800" dangerouslySetInnerHTML={{ __html: t.raw("refundNote") }} />
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

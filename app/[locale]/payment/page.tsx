"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Building, Wallet, CheckCircle2, FileText, Clock, Bitcoin } from "lucide-react";

export default function PaymentPage() {
  const t = useTranslations("payment");

  const methods = [
    { icon: Building, titleKey: "method1Title", descKey: "method1Desc" },
    { icon: CreditCard, titleKey: "method2Title", descKey: "method2Desc" },
    { icon: Wallet, titleKey: "method3Title", descKey: "method3Desc" },
    { icon: Bitcoin, titleKey: "method4Title", descKey: "method4Desc" }
  ];

  const steps = [
    { step: "1", titleKey: "step1Title", descKey: "step1Desc" },
    { step: "2", titleKey: "step2Title", descKey: "step2Desc" },
    { step: "3", titleKey: "step3Title", descKey: "step3Desc" },
    { step: "4", titleKey: "step4Title", descKey: "step4Desc" }
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

      {/* Способы оплаты */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-10 text-center">{t("methodsTitle")}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {methods.map((method, index) => (
                <Card key={index} className="text-center">
                  <CardHeader className="pb-3 pt-6">
                    <div className="w-14 h-14 rounded-xl bg-brand-100 flex items-center justify-center mx-auto mb-4">
                      <method.icon className="w-7 h-7 text-brand-600" />
                    </div>
                    <CardTitle className="text-lg font-medium">{t(method.titleKey)}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground">
                      {t(method.descKey)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Порядок оплаты */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-10 text-center">{t("processTitle")}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-5">
                {steps.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-medium flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{t(item.titleKey)}</h3>
                      <p className="text-muted-foreground">{t(item.descKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Card className="p-6 bg-brand-50 border-brand-200">
                <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-600" />
                  {t("infoTitle")}
                </h3>
                <ul className="space-y-3">
                  {["info1", "info2", "info3", "info4"].map((key, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
                      <span>{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Скидки */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-10 text-center">{t("discountsTitle")}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-brand-200 bg-brand-50/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-500 text-white flex items-center justify-center font-semibold text-xl">
                    %
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{t("discount1Title")}</h3>
                    <p className="text-muted-foreground">{t("discount1Subtitle")}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {t("discount1Desc")}
                </p>
              </Card>

              <Card className="p-6 border-brand-200 bg-brand-50/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-500 text-white flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{t("discount2Title")}</h3>
                    <p className="text-muted-foreground">{t("discount2Subtitle")}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {t("discount2Desc")}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

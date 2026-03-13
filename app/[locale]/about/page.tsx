"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, MapPin, Shield, CheckCircle2, Award, Briefcase, Scale, Target, Heart, Zap } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("about");

  const values = [
    { icon: Shield, titleKey: "value1Title", descKey: "value1Desc" },
    { icon: Heart, titleKey: "value2Title", descKey: "value2Desc" },
    { icon: Zap, titleKey: "value3Title", descKey: "value3Desc" }
  ];

  const offers = [
    { icon: MapPin, titleKey: "offer1Title", descKey: "offer1Desc" },
    { icon: Users, titleKey: "offer2Title", descKey: "offer2Desc" },
    { icon: Briefcase, titleKey: "offer3Title", descKey: "offer3Desc" },
    { icon: Scale, titleKey: "offer4Title", descKey: "offer4Desc" },
    { icon: Building2, titleKey: "offer5Title", descKey: "offer5Desc" },
    { icon: Award, titleKey: "offer6Title", descKey: "offer6Desc" }
  ];

  const clients = [
    { icon: Target, titleKey: "client1Title", descKey: "client1Desc" },
    { icon: Building2, titleKey: "client2Title", descKey: "client2Desc" },
    { icon: Briefcase, titleKey: "client3Title", descKey: "client3Desc" }
  ];

  return (
    <main className="pt-20 pb-12">
      {/* Hero */}
      <section className="py-12 bg-gradient-to-b from-brand-50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 text-sm">{t("badge")}</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-5">
              <span className="text-gradient">{t("title")}</span> {t("titleSuffix")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="py-10 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-semibold text-brand-500 mb-2">10+</div>
              <p className="text-sm text-muted-foreground">{t("stat1")}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-semibold text-brand-500 mb-2">50+</div>
              <p className="text-sm text-muted-foreground">{t("stat2")}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-semibold text-brand-500 mb-2">500+</div>
              <p className="text-sm text-muted-foreground">{t("stat3")}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-semibold text-brand-500 mb-2">100%</div>
              <p className="text-sm text-muted-foreground">{t("stat4")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* О нас подробно */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="text-2xl font-semibold mb-5">{t("whoTitle")}</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p dangerouslySetInnerHTML={{ __html: t.raw("whoDesc1") }} />
                  <p dangerouslySetInnerHTML={{ __html: t.raw("whoDesc2") }} />
                  <p>{t("whoDesc3")}</p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-5">{t("missionTitle")}</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>{t("missionDesc1")}</p>
                  <p dangerouslySetInnerHTML={{ __html: t.raw("missionDesc2") }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Наши ценности */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-10 text-center">{t("valuesTitle")}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((item, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-brand-100 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-brand-600" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">{t(item.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(item.descKey)}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Что мы предлагаем */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-10 text-center">{t("offerTitle")}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {offers.map((item, index) => (
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

      {/* Почему выбирают нас */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-10 text-center">{t("whyTitle")}</h2>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-4">
              {["why1", "why2", "why3", "why4", "why5", "why6", "why7", "why8"].map((key, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0" />
                  <span>{t(key)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Наши клиенты */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-3 text-center">{t("clientsTitle")}</h2>
            <p className="text-center text-muted-foreground mb-10">
              {t("clientsDesc")}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {clients.map((item, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-brand-100 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-brand-600" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">{t(item.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(item.descKey)}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Реквизиты */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-6">{t("requisitesTitle")}</h2>
            <Card className="p-6 text-left">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t("requisitesName")}</p>
                  <p className="font-medium">{t("requisitesNameValue")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("requisitesCountry")}</p>
                  <p className="font-medium">{t("requisitesCountryValue")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("requisitesAddress")}</p>
                  <p className="font-medium">{t("requisitesAddressValue")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("requisitesExperience")}</p>
                  <p className="font-medium">{t("requisitesExperienceValue")}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Send, Clock, Building2 } from "lucide-react";

export default function ContactsPage() {
  const t = useTranslations("contacts");

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

      {/* Контактная информация */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Контакты */}
              <div className="space-y-5">
                <h2 className="text-2xl font-semibold mb-6">{t("infoTitle")}</h2>
                
                <Card className="p-5">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-brand-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t("phoneLabel")}</p>
                      <a 
                        href="tel:+998903478692" 
                        className="text-xl font-medium text-foreground hover:text-brand-500 transition-colors"
                      >
                        +998 90 347 86 92
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t("phoneHint")}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                      <Send className="w-6 h-6 text-brand-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t("telegramLabel")}</p>
                      <Link
                        href="/#request-form"
                        className="text-xl font-medium text-foreground hover:text-brand-500 transition-colors"
                      >
                        @Ivan_Korotaev
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t("telegramHint")}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-brand-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t("addressLabel")}</p>
                      <p className="font-medium text-foreground">
                        {t("addressValue1")}
                      </p>
                      <p className="text-foreground">
                        {t("addressValue2")}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-brand-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t("hoursLabel")}</p>
                      <p className="font-medium text-foreground">
                        {t("hoursValue1")}
                      </p>
                      <p className="text-muted-foreground">
                        {t("hoursValue2")}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-brand-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t("companyLabel")}</p>
                      <p className="font-medium text-foreground">
                        {t("companyValue1")}
                      </p>
                      <p className="text-muted-foreground">
                        {t("companyValue2")}
                      </p>
                    </div>
                  </div>
                </Card>

                <div className="flex flex-col sm:flex-row gap-4 pt-3">
                  <Button size="lg" className="bg-gradient-brand" asChild>
                    <a href="tel:+998903478692">
                      <Phone className="w-5 h-5 mr-2" />
                      {t("callButton")}
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/#request-form">
                      <Send className="w-5 h-5 mr-2" />
                      {t("telegramButton")}
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Карта */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">{t("mapTitle")}</h2>
                <Card className="overflow-hidden">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=69.251637%2C41.328928&z=17&pt=69.251637,41.328928,pm2rdm"
                    width="100%"
                    height="450"
                    frameBorder="0"
                    allowFullScreen
                    className="w-full"
                    title="Office location on map"
                  />
                </Card>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  {t("mapAddress")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

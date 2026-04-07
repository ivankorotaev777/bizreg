import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Laptop2, ShoppingCart, Briefcase, Factory, GraduationCap, Globe2, CheckCircle2, ArrowRight, BarChart3 } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n";

export default async function ClientsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: "clientsPage" });
  const clientSegments = [
    {
      title: t("segments.it.title"),
      desc: t("segments.it.desc"),
      icon: Laptop2,
    },
    {
      title: t("segments.trade.title"),
      desc: t("segments.trade.desc"),
      icon: ShoppingCart,
    },
    {
      title: t("segments.services.title"),
      desc: t("segments.services.desc"),
      icon: Briefcase,
    },
    {
      title: t("segments.production.title"),
      desc: t("segments.production.desc"),
      icon: Factory,
    },
    {
      title: t("segments.education.title"),
      desc: t("segments.education.desc"),
      icon: GraduationCap,
    },
    {
      title: t("segments.international.title"),
      desc: t("segments.international.desc"),
      icon: Globe2,
    },
  ];

  const workSteps = t.raw("workSteps") as string[];

  const keyRequests = t.raw("keyRequests") as string[];
  const resultCards = t.raw("resultCards") as { value: string; label: string }[];

  return (
    <main className="pt-20 pb-12">
      <section className="py-12 bg-gradient-to-b from-brand-50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 text-sm">
              {t("badge")}
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-8">
            <Card className="p-7 md:p-8 bg-gradient-to-br from-white to-brand-50/40 border-brand-200">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                {t("intro.title")}
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {t("intro.p1")}
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {t("intro.p2")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("intro.p3")}
              </p>
            </Card>
          </div>

          <div className="max-w-6xl mx-auto mb-10">
            <h2 className="text-2xl font-semibold text-center mb-6">{t("segmentsTitle")}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {clientSegments.map((segment) => (
                <Card key={segment.title} className="p-5">
                  <div className="w-11 h-11 rounded-xl bg-brand-100 flex items-center justify-center mb-3">
                    <segment.icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{segment.title}</h3>
                  <p className="text-sm text-muted-foreground">{segment.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 mb-10">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-brand-600" />
                <h2 className="text-xl font-semibold">{t("requestsTitle")}</h2>
              </div>
              <div className="space-y-3">
                {keyRequests.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-brand-600" />
                <h2 className="text-xl font-semibold">{t("resultsTitle")}</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {resultCards.map((card) => (
                  <div key={card.value + card.label} className="rounded-xl border p-4">
                    <p className="text-3xl font-semibold text-brand-600 mb-1">{card.value}</p>
                    <p className="text-sm text-muted-foreground">{card.label}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-6">{t("workflowTitle")}</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {workSteps.map((step, idx) => (
                <Card key={step} className="p-5 relative">
                  <p className="text-xs font-medium text-brand-700 mb-2">Шаг {idx + 1}</p>
                  <p className="text-sm text-muted-foreground">{step}</p>
                  {idx < workSteps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-400" />
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

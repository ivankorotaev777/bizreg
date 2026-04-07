import { Card } from "@/components/ui/card";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n";

export default async function PriceListFullPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: "priceListFullPage" });
  const oooPackages = ["package1", "package2", "package3"] as const;
  const accountingPackages = ["package1", "package2", "package3"] as const;
  const legalAddressPackages = ["start", "standard", "business"] as const;

  return (
    <main className="pt-20 pb-12">
      <section className="py-12 bg-gradient-to-b from-brand-50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto mb-10">
            <h2 className="text-2xl font-semibold mb-5 text-center">{t("registration.title")}</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {oooPackages.map((pkg, index) => (
                <Card key={pkg} className={`p-5 ${index === 1 ? "border-brand-300 bg-brand-50/40" : ""}`}>
                  <p className={`text-sm mb-2 ${index === 1 ? "text-brand-700" : "text-muted-foreground"}`}>
                    {t(`registration.${pkg}.name`)}
                  </p>
                  <p className="text-3xl font-semibold text-foreground mb-1">{t(`registration.${pkg}.price`)}</p>
                  <p className="text-sm text-muted-foreground mb-4">{t(`registration.${pkg}.period`)}</p>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    {(t.raw(`registration.${pkg}.items`) as string[]).map((item, i) => (
                      <li key={`${pkg}-${i}`}>{item}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto mb-10">
            <h2 className="text-2xl font-semibold mb-5 text-center">{t("accounting.title")}</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {accountingPackages.map((pkg, index) => (
                <Card key={pkg} className={`p-5 ${index === 1 ? "border-brand-300 bg-brand-50/40" : ""}`}>
                  <p className={`text-sm mb-2 ${index === 1 ? "text-brand-700" : "text-muted-foreground"}`}>
                    {t(`accounting.${pkg}.name`)}
                  </p>
                  <p className="text-3xl font-semibold text-foreground mb-1">{t(`accounting.${pkg}.price`)}</p>
                  <p className="text-sm text-muted-foreground mb-4">{t(`accounting.${pkg}.period`)}</p>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    {(t.raw(`accounting.${pkg}.items`) as string[]).map((item, i) => (
                      <li key={`${pkg}-${i}`}>{item}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-5 text-center">{t("legalAddress.title")}</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {legalAddressPackages.map((pkg, index) => (
                <Card key={pkg} className={`p-5 ${index === 1 ? "border-brand-300 bg-brand-50/40" : ""}`}>
                  <p className={`text-sm mb-2 ${index === 1 ? "text-brand-700" : "text-muted-foreground"}`}>
                    {t(`legalAddress.${pkg}.name`)}
                  </p>
                  <p className="text-3xl font-semibold text-foreground mb-1">{t(`legalAddress.${pkg}.price`)}</p>
                  <p className="text-sm text-muted-foreground mb-4">{t(`legalAddress.${pkg}.period`)}</p>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    {(t.raw(`legalAddress.${pkg}.items`) as string[]).map((item, i) => (
                      <li key={`${pkg}-${i}`}>{item}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

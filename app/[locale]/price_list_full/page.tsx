import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n";

type Group = {
  ns: "registration" | "accounting" | "legalAddress";
  packages: readonly string[];
  /** Куда ведёт второстепенная кнопка — на страницу услуги с её тарифами */
  detailsHref: string;
};

export default async function PriceListFullPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: "priceListFullPage" });
  const tt = await getTranslations({ locale, namespace: "tariffs" });
  const requestFormHref = `/${locale}#request-form`;

  const groups: Group[] = [
    {
      ns: "registration",
      packages: ["package1", "package2", "package3"],
      detailsHref: "/registratsiya-ooo#tarify",
    },
    {
      ns: "accounting",
      packages: ["package1", "package2", "package3"],
      detailsHref: "/kalkulyator-buhgalterii",
    },
    {
      ns: "legalAddress",
      packages: ["start", "standard", "business"],
      detailsHref: "/yuridicheskiy-adres#pricing",
    },
  ];

  return (
    <main className="pt-20 pb-12">
      <section className="py-12 bg-gradient-to-b from-brand-50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4">{t("title")}</h1>
            <p className="text-lg text-muted-foreground">{t("description")}</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {groups.map(({ ns, packages, detailsHref }) => (
            <div key={ns} className="max-w-6xl mx-auto mb-10 last:mb-0">
              <h2 className="text-2xl font-semibold mb-5 text-center">{t(`${ns}.title`)}</h2>
              <div className="grid md:grid-cols-3 gap-5 items-stretch">
                {packages.map((pkg, index) => (
                  <Card
                    key={pkg}
                    className={`p-5 flex flex-col ${index === 1 ? "border-brand-300 bg-brand-50/40" : ""}`}
                  >
                    <p
                      className={`text-sm mb-2 ${index === 1 ? "text-brand-700" : "text-muted-foreground"}`}
                    >
                      {t(`${ns}.${pkg}.name`)}
                    </p>
                    <p className="text-3xl font-semibold text-foreground mb-1">
                      {t(`${ns}.${pkg}.price`)}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">{t(`${ns}.${pkg}.period`)}</p>
                    <ul className="text-sm text-muted-foreground space-y-1.5 flex-1">
                      {(t.raw(`${ns}.${pkg}.items`) as string[]).map((item, i) => (
                        <li key={`${pkg}-${i}`}>{item}</li>
                      ))}
                    </ul>
                    <div className="flex flex-col gap-2 pt-5">
                      <Button className="w-full" asChild>
                        <a href={requestFormHref}>{tt("cta")}</a>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full text-muted-foreground hover:text-foreground"
                        asChild
                      >
                        <Link href={detailsHref}>{tt("fullPrice")}</Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

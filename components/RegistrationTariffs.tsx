"use client";

import { useTranslations } from "next-intl";
import { Zap, Plane, Cpu, Compass, ArrowUpRight, Check, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TariffCards } from "@/components/TariffCards";

const TABLE_GROUPS: { groupKey: string; rows: number[] }[] = [
  { groupKey: "grp1", rows: [1, 2, 3] },
  { groupKey: "grp2", rows: [4, 5] },
  { groupKey: "grp3", rows: [6, 7, 8] },
  { groupKey: "grp4", rows: [9, 10] },
];

// какие ячейки означают «делаем мы» (галочка), какие — «вы сами» (прочерк)
const WE_DO: Record<string, boolean[]> = {
  r1: [false, false, true], r2: [true, true, true], r3: [false, true, true],
  r4: [false, true, true], r5: [false, true, true], r6: [false, false, true],
  r7: [false, false, true], r8: [false, true, true], r9: [false, true, true],
  r10: [false, false, true],
};

const ADDONS = [
  { icon: Zap, tKey: "addon1" },
  { icon: Plane, tKey: "addon2" },
  { icon: Cpu, tKey: "addon3" },
  { icon: Compass, tKey: "addon4" },
] as const;

export const RegistrationTariffs = ({ requestFormHref }: { requestFormHref: string }) => {
  const t = useTranslations("tariffs");

  return (
    <section id="tarify" className="py-14 bg-gradient-to-b from-background to-muted/30 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3 text-sm">{t("badge")}</Badge>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-3 text-foreground">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <TariffCards requestFormHref={requestFormHref} showCompareLink={false} />

        {/* Таблица: кто делает каждый шаг */}
        <div className="max-w-5xl mx-auto mt-14">
          <h3 className="text-2xl sm:text-3xl font-semibold text-foreground text-center mb-2">{t("tableTitle")}</h3>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-8">{t("tableIntro")}</p>

          <div className="overflow-x-auto rounded-xl border border-border bg-white">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left font-medium text-muted-foreground px-4 py-3 w-[34%]">{t("thStep")}</th>
                  <th className="text-left font-medium text-foreground px-4 py-3">{t("t1Name")}</th>
                  <th className="text-left font-medium text-brand-600 px-4 py-3">{t("t2Name")}</th>
                  <th className="text-left font-medium text-foreground px-4 py-3">{t("t3Name")}</th>
                </tr>
              </thead>
              <tbody>
                {TABLE_GROUPS.map(({ groupKey, rows }) => (
                  <>
                    <tr key={groupKey} className="bg-muted/30">
                      <td colSpan={4} className="px-4 py-2 text-xs uppercase tracking-wide text-muted-foreground font-medium">
                        {t(groupKey)}
                      </td>
                    </tr>
                    {rows.map((n) => {
                      const rk = `r${n}`;
                      return (
                        <tr key={rk} className="border-b border-border last:border-b-0">
                          <td className="px-4 py-3 text-foreground">{t(`${rk}s`)}</td>
                          {[0, 1, 2].map((col) => (
                            <td key={col} className="px-4 py-3">
                              <span className="flex items-start gap-1.5">
                                {WE_DO[rk][col] ? (
                                  <Check className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                                ) : (
                                  <Minus className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                                )}
                                <span className={WE_DO[rk][col] ? "text-foreground" : "text-muted-foreground"}>
                                  {t(`${rk}${["a", "b", "c"][col]}`)}
                                </span>
                              </span>
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">{t("tableNote")}</p>
        </div>

        {/* Надстройки */}
        <div className="max-w-5xl mx-auto mt-14">
          <h3 className="text-2xl sm:text-3xl font-semibold text-foreground text-center mb-8">{t("addonsTitle")}</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {ADDONS.map(({ icon: Icon, tKey }) => (
              <Card key={tKey} className="bg-white border-border hover:border-brand-300 hover:shadow-md transition-all">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t(`${tKey}t`)}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{t(`${tKey}d`)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Правило апгрейда */}
        <div className="max-w-3xl mx-auto mt-14">
          <div className="rounded-xl bg-brand-50 border border-brand-100 p-6 sm:p-8 text-center">
            <ArrowUpRight className="w-8 h-8 text-brand-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-foreground mb-2">{t("upgradeTitle")}</h3>
            <p className="text-muted-foreground">{t("upgradeText")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

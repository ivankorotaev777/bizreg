// Логика калькулятора стоимости бухгалтерского обслуживания.
// Источник: Calculator/Final.xlsx (лист «Бухуслуги»). Все цены — в СУМАХ, в месяц.
//
// Структура файла: БС (F4) = 600 000 сум за 4 часа работы бухгалтера.
// Итог = SUM(F5:F34): выбранная форма бизнеса даёт БС×коэф (ИП ×1, ООО ×1,5),
// налоговый режим — БС×коэф (УСН ×0, ОСНО ×1, ИТ Парк ×1,5), дальше — тарифы
// за сотрудников/операции/счета. Сверху +4% (F36).
// Примечание: в файле формула ОСНО (F8) ссылается на строку ИП (F5) — считаем
// по смыслу подписи «БС*1» (600 000 при любой форме), иначе ООО на ОСНО
// получало бы нулевую надбавку.
// Контрольный пример файла: ИП + УСН + 1 сотрудник = 600 000 + 0 + 150 000
// = 750 000 (F35), +4% = 780 000 (F38) — сходится.

// Базовая ставка за 4 часа работы бухгалтера (F4)
export const BASE_RATE = 600_000;

export const PRICES = {
  opf: { ip: 1, ooo: 1.5 }, // БС × коэф (D5/D6)
  sno: { usn: 0, osno: 1, itpark: 1.5 }, // БС × коэф (D7/D8/D9)
  employee: 150_000, // сотрудник с ЗП/ГПХ (D10)
  foreignEmployee: 300_000, // иностранный сотрудник (D11)
  advanceReport: 30_000, // авансовые отчёты: 300 000 за каждые 10 (ход по 10, D12)
  cashOp: 30_000, // кассовые операции: 300 000 за каждые 10 (ход по 10, D14)
  vedBase: 1, // ВЭД «Да»: добавка БС×1 (F16)
  vedOp: 225_000, // операция ВЭД (D18: «до 5» = 5×225 000)
  extraAccount: 750_000, // доп. расчётный счёт (D20)
  foreignAccount: 750_000, // иностранный счёт (D21)
  loan: 300_000, // кредит/займ, за договор (D22)
  paymentOrder: 22_500, // платёжное поручение (D25)
  incoming: 45_000, // поступление (D29)
  sale: 30_000, // реализация (D32)
  serviceTax: 0.04, // +4% к итогу (F36, «УСН»)
} as const;

// Пакеты обслуживания: «Скорость ответа на запрос и уровень эксперта» (A41–F45).
// Коэффициент применяется ко ВСЕМУ итогу (включая 4%): F42..F45 = F38 × коэф.
export const PACKAGES = {
  tetris: 0.5, // Тетрис (D42)
  chess: 1, // Шахматы (D43)
  aoe: 2, // Age of Empires (D44)
  mk: 3, // Mortal Kombat (D45)
} as const;

export type PackageKey = keyof typeof PACKAGES;

export interface CalcInput {
  pkg: PackageKey;
  opf: "ip" | "ooo";
  sno: "usn" | "osno" | "itpark";
  employees: number;
  foreignEmployees: number;
  advanceReports: number; // в месяц
  cashOps: number; // в месяц
  ved: boolean;
  vedOps: number; // в месяц
  extraAccounts: number;
  foreignAccounts: number;
  loans: number; // договоров
  paymentOrders: number; // в месяц
  incomings: number; // в месяц
  sales: number; // в месяц
}

export interface CalcLine {
  key: string;
  uzs: number;
}

export interface CalcResult {
  lines: CalcLine[];
  subtotalUzs: number;
  taxUzs: number;
  preTotalUzs: number; // итог до пакета (F38)
  pkgCoef: number;
  totalUzs: number; // итог × коэффициент пакета
}

const n = (v: number) => (Number.isFinite(v) && v > 0 ? Math.floor(v) : 0);

export function calc(input: CalcInput): CalcResult {
  const lines: CalcLine[] = [];
  const add = (key: string, uzs: number) => {
    if (uzs > 0) lines.push({ key, uzs });
  };

  add("opf", BASE_RATE * PRICES.opf[input.opf]);
  add("sno", BASE_RATE * PRICES.sno[input.sno]);
  add("employees", n(input.employees) * PRICES.employee);
  add("foreignEmployees", n(input.foreignEmployees) * PRICES.foreignEmployee);

  add("advanceReports", n(input.advanceReports) * PRICES.advanceReport);
  add("cashOps", n(input.cashOps) * PRICES.cashOp);

  if (input.ved) {
    add("ved", BASE_RATE * PRICES.vedBase);
    add("vedOps", n(input.vedOps) * PRICES.vedOp);
  }

  add("extraAccounts", n(input.extraAccounts) * PRICES.extraAccount);
  add("foreignAccounts", n(input.foreignAccounts) * PRICES.foreignAccount);
  add("loans", n(input.loans) * PRICES.loan);
  add("paymentOrders", n(input.paymentOrders) * PRICES.paymentOrder);
  add("incomings", n(input.incomings) * PRICES.incoming);
  add("sales", n(input.sales) * PRICES.sale);

  const subtotalUzs = lines.reduce((s, l) => s + l.uzs, 0);
  const taxUzs = Math.round(subtotalUzs * PRICES.serviceTax);
  const preTotalUzs = subtotalUzs + taxUzs;
  const pkgCoef = PACKAGES[input.pkg];
  const totalUzs = Math.round(preTotalUzs * pkgCoef);

  return { lines, subtotalUzs, taxUzs, preTotalUzs, pkgCoef, totalUzs };
}

export const fmtUzs = (v: number) => new Intl.NumberFormat("ru-RU").format(v);

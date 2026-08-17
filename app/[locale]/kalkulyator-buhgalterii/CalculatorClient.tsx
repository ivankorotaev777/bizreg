"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Building2, Users, ListChecks, Globe, Landmark, Gamepad2, Calculator } from "lucide-react";
import { calc, fmtUzs, PACKAGES, type CalcInput, type PackageKey } from "@/lib/accounting-calc";

type Content = {
  eyebrow: string;
  h1: string;
  sub: string;
  companyTitle: string;
  opfLabel: string;
  opfIp: string;
  opfOoo: string;
  snoLabel: string;
  snoUsn: string;
  snoOsno: string;
  snoItpark: string;
  staffTitle: string;
  employees: string;
  foreignEmployees: string;
  opsTitle: string;
  opsHint: string;
  paymentOrders: string;
  incomings: string;
  sales: string;
  advanceReports: string;
  cashOps: string;
  vedTitle: string;
  vedLabel: string;
  vedOps: string;
  accountsTitle: string;
  extraAccounts: string;
  foreignAccounts: string;
  loans: string;
  pkgTitle: string;
  pkgHint: string;
  pkgSpeedLabel: string;
  pkgExpertLabel: string;
  pkgWhoLabel: string;
  pkgWhatLabel: string;
  pkgDetailsTitle: string;
  pkgBonusLabel: string;
  pkgs: Record<PackageKey, { name: string; speed: string; expert: string; who: string; what: string; bonus?: string }>;
  currency: string;
  resultTitle: string;
  perMonth: string;
  taxLine: string;
  approx: string;
  cta: string;
  disclaimer: string;
  lines: Record<string, string>;
};

const RU: Content = {
  eyebrow: "Онлайн-расчёт",
  h1: "Калькулятор стоимости бухгалтерского обслуживания",
  sub: "Ответьте на несколько вопросов о компании — и увидите ориентировочную стоимость ведения бухгалтерии в месяц. Точную цену подтвердит менеджер после короткой консультации.",
  companyTitle: "О компании",
  opfLabel: "Форма бизнеса",
  opfIp: "ИП",
  opfOoo: "ООО",
  snoLabel: "Налоговый режим",
  snoUsn: "УСН",
  snoOsno: "ОСНО",
  snoItpark: "ИТ Парк",
  staffTitle: "Сотрудники",
  employees: "Сотрудники с зарплатой или по ГПХ",
  foreignEmployees: "Из них иностранные сотрудники",
  opsTitle: "Операции в месяц",
  opsHint: "Примерные средние значения за месяц",
  paymentOrders: "Платёжные поручения",
  incomings: "Поступления на счёт",
  sales: "Реализации (продажи)",
  advanceReports: "Авансовые отчёты",
  cashOps: "Кассовые операции",
  vedTitle: "Внешнеэкономическая деятельность",
  vedLabel: "Есть ВЭД (импорт/экспорт, контракты с зарубежьем)",
  vedOps: "Операций ВЭД в месяц",
  accountsTitle: "Счета и кредиты",
  extraAccounts: "Дополнительные расчётные счета",
  foreignAccounts: "Счета в иностранных банках",
  loans: "Кредитные/заёмные договоры",
  pkgTitle: "Пакет обслуживания",
  pkgHint: "Определяет скорость ответа и уровень специалиста",
  pkgSpeedLabel: "Скорость ответа",
  pkgExpertLabel: "Уровень специалиста",
  pkgWhoLabel: "Кому подходит",
  pkgWhatLabel: "Что входит",
  pkgDetailsTitle: "Пакеты подробно",
  pkgBonusLabel: "Бонус",
  pkgs: {
    tetris: {
      name: "Тетрис",
      speed: "Ответ до 3 дней",
      expert: "Без выделенного бухгалтера",
      who: "Поток операций нужно правильно уложить.",
      what: "Полноценный бухгалтерский учёт: принимаем первичку, ведём учёт, считаем налоги, сдаём отчётность и решаем возникающие задачи.",
    },
    chess: {
      name: "Шахматы",
      speed: "Ответ в течение 1 дня",
      expert: "Выделенный бухгалтер",
      who: "Появляются сотрудники, НДС, ВЭД и нестандартные операции — нужно управлять целой системой.",
      what: "Бухгалтерия с активным сопровождением: зарплата, платёжный календарь, документооборот, контроль дебиторки, общение с налоговой и управленческая отчётность в согласованном объёме.",
    },
    aoe: {
      name: "Age of Empires",
      speed: "Ответ в течение 1 часа",
      expert: "Выделенный главный бухгалтер",
      who: "Важны стратегия и последствия решений, а не только учёт.",
      what: "CFO-уровень: налоговое планирование, финансовая модель, структура группы компаний, сделки, инвестиции, дивиденды, Ваша страна ↔ Узбекистан, сценарное моделирование.",
      bonus: "Плюс 1 час в месяц — бесплатная консультация уровня Global CFO от Елены Васюковой.",
    },
    mk: {
      name: "Mortal Kombat",
      speed: "Прямое сопровождение CFO",
      expert: "CFO",
      who: "Налоговый спор, проверка или сложное требование.",
      what: "Антикризисный режим: восстановление учёта, налоговые разбирательства, сопровождение проверки и защита ваших интересов до результата.",
    },
  },
  currency: "сум",
  resultTitle: "Ваш расчёт",
  perMonth: "в месяц",
  taxLine: "Налог 4 %",
  approx: "Расчёт предварительный",
  cta: "Получить точный расчёт",
  disclaimer:
    "Это ориентировочная стоимость. Итоговая цена зависит от специфики бизнеса и фиксируется в договоре; пересматривается раз в квартал, если объём операций меняется более чем на 20 %.",
  lines: {
    opf: "Базовая ставка (форма бизнеса)",
    sno: "Налоговый режим",
    employees: "Зарплатный учёт сотрудников",
    foreignEmployees: "Иностранные сотрудники",
    advanceReports: "Авансовые отчёты",
    cashOps: "Кассовые операции",
    ved: "Сопровождение ВЭД",
    vedOps: "Операции ВЭД",
    extraAccounts: "Доп. расчётные счета",
    foreignAccounts: "Иностранные счета",
    loans: "Кредиты и займы",
    paymentOrders: "Платёжные поручения",
    incomings: "Поступления",
    sales: "Реализации",
  },
};

const EN: Content = {
  eyebrow: "Online estimate",
  h1: "Accounting services cost calculator",
  sub: "Answer a few questions about your company to see an estimated monthly accounting fee. A manager will confirm the exact price after a short consultation.",
  companyTitle: "About the company",
  opfLabel: "Business form",
  opfIp: "Sole proprietor",
  opfOoo: "LLC",
  snoLabel: "Tax regime",
  snoUsn: "USN",
  snoOsno: "OSNO",
  snoItpark: "IT Park",
  staffTitle: "Employees",
  employees: "Employees on payroll or civil contracts",
  foreignEmployees: "Of them, foreign employees",
  opsTitle: "Operations per month",
  opsHint: "Approximate monthly averages",
  paymentOrders: "Payment orders",
  incomings: "Incoming payments",
  sales: "Sales invoices",
  advanceReports: "Expense reports",
  cashOps: "Cash operations",
  vedTitle: "Foreign trade",
  vedLabel: "Foreign trade activity (import/export, cross-border contracts)",
  vedOps: "Foreign trade operations per month",
  accountsTitle: "Accounts and loans",
  extraAccounts: "Additional bank accounts",
  foreignAccounts: "Accounts in foreign banks",
  loans: "Loan agreements",
  pkgTitle: "Service package",
  pkgHint: "Sets the response speed and specialist level",
  pkgSpeedLabel: "Response speed",
  pkgExpertLabel: "Specialist level",
  pkgWhoLabel: "Best for",
  pkgWhatLabel: "What's included",
  pkgDetailsTitle: "Packages in detail",
  pkgBonusLabel: "Bonus",
  pkgs: {
    tetris: {
      name: "Tetris",
      speed: "Reply within 3 days",
      expert: "No dedicated accountant",
      who: "A flow of operations that needs to be kept in order.",
      what: "Full bookkeeping: we take in source documents, keep the books, calculate taxes, file reports and handle arising tasks.",
    },
    chess: {
      name: "Chess",
      speed: "Reply within 1 day",
      expert: "Dedicated accountant",
      who: "Employees, VAT, foreign trade and non-standard operations — a whole system to manage.",
      what: "Accounting with active support: payroll, payment calendar, document flow, receivables control, communication with the tax office and agreed management reporting.",
    },
    aoe: {
      name: "Age of Empires",
      speed: "Reply within 1 hour",
      expert: "Dedicated chief accountant",
      who: "Strategy and the consequences of decisions matter, not just bookkeeping.",
      what: "CFO level: tax planning, financial model, group structure, deals, investments, dividends, your country ↔ Uzbekistan, scenario modelling.",
      bonus: "Plus 1 hour per month of free Global CFO-level consultation with Elena Vasyukova.",
    },
    mk: {
      name: "Mortal Kombat",
      speed: "Direct CFO support",
      expert: "CFO",
      who: "A tax dispute, an audit or a complex demand.",
      what: "Crisis mode: accounting restoration, tax proceedings, audit support and defending your interests until the result.",
    },
  },
  currency: "UZS",
  resultTitle: "Your estimate",
  perMonth: "per month",
  taxLine: "4% tax",
  approx: "Preliminary estimate",
  cta: "Get an exact quote",
  disclaimer:
    "This is an estimate. The final price depends on your business specifics and is fixed in the contract; it is reviewed quarterly if operation volumes change by more than 20%.",
  lines: {
    opf: "Base rate (business form)",
    sno: "Tax regime",
    employees: "Payroll accounting",
    foreignEmployees: "Foreign employees",
    advanceReports: "Expense reports",
    cashOps: "Cash operations",
    ved: "Foreign trade support",
    vedOps: "Foreign trade operations",
    extraAccounts: "Additional accounts",
    foreignAccounts: "Foreign bank accounts",
    loans: "Loans",
    paymentOrders: "Payment orders",
    incomings: "Incoming payments",
    sales: "Sales invoices",
  },
};


const KK: Content = {
  eyebrow: "Онлайн есептеу",
  h1: "Бухгалтерлік қызмет құнының калькуляторы",
  sub: "Компания туралы бірнеше сұраққа жауап беріңіз — айына бухгалтерия жүргізудің болжамды құнын көресіз. Нақты бағаны менеджер қысқа консультациядан кейін растайды.",
  companyTitle: "Компания туралы",
  opfLabel: "Бизнес нысаны",
  opfIp: "ЖК",
  opfOoo: "ЖШС",
  snoLabel: "Салық режимі",
  snoUsn: "УСН",
  snoOsno: "ОСНО",
  snoItpark: "IT Park",
  staffTitle: "Қызметкерлер",
  employees: "Жалақы немесе АҚШ бойынша қызметкерлер",
  foreignEmployees: "Оның ішінде шетелдік қызметкерлер",
  opsTitle: "Айына операциялар",
  opsHint: "Айына шамамен орташа мәндер",
  paymentOrders: "Төлем тапсырмалары",
  incomings: "Шотқа түсімдер",
  sales: "Сатылымдар",
  advanceReports: "Аванстық есептер",
  cashOps: "Касса операциялары",
  vedTitle: "Сыртқы экономикалық қызмет",
  vedLabel: "СЭҚ бар (импорт/экспорт, шетелмен келісімшарттар)",
  vedOps: "Айына СЭҚ операциялары",
  accountsTitle: "Шоттар мен несиелер",
  extraAccounts: "Қосымша есеп айырысу шоттары",
  foreignAccounts: "Шетелдік банктердегі шоттар",
  loans: "Несие/қарыз шарттары",
  pkgTitle: "Қызмет пакеті",
  pkgHint: "Жауап жылдамдығы мен маман деңгейін анықтайды",
  pkgSpeedLabel: "Жауап жылдамдығы",
  pkgExpertLabel: "Маман деңгейі",
  pkgWhoLabel: "Кімге лайық",
  pkgWhatLabel: "Не кіреді",
  pkgDetailsTitle: "Пакеттер туралы толығырақ",
  pkgBonusLabel: "Бонус",
  pkgs: {
    tetris: {
      name: "Тетрис",
      speed: "3 күнге дейін жауап",
      expert: "Бөлінген бухгалтерсіз",
      who: "Операциялар ағынын дұрыс реттеу қажет.",
      what: "Толық бухгалтерлік есеп: бастапқы құжаттарды қабылдаймыз, есеп жүргіземіз, салықтарды есептейміз, есептілікті тапсырамыз және туындаған мәселелерді шешеміз.",
    },
    chess: {
      name: "Шахмат",
      speed: "1 күн ішінде жауап",
      expert: "Бөлінген бухгалтер",
      who: "Қызметкерлер, ҚҚС, СЭҚ және стандартты емес операциялар — тұтас жүйені басқару қажет.",
      what: "Белсенді сүйемелдеумен бухгалтерия: жалақы, төлем күнтізбесі, құжат айналымы, дебиторлық берешекті бақылау, салық органымен байланыс және келісілген көлемдегі басқару есептілігі.",
    },
    aoe: {
      name: "Age of Empires",
      speed: "1 сағат ішінде жауап",
      expert: "Бөлінген бас бухгалтер",
      who: "Стратегия мен шешімдердің салдары маңызды.",
      what: "CFO деңгейі: салықтық жоспарлау, қаржы моделі, компаниялар тобының құрылымы, мәмілелер, инвестициялар, дивидендтер, Сіздің еліңіз ↔ Өзбекстан, сценарийлік модельдеу.",
      bonus: "Қосымша айына 1 сағат — Елена Васюкованың Global CFO деңгейіндегі тегін консультациясы.",
    },
    mk: {
      name: "Mortal Kombat",
      speed: "CFO тікелей сүйемелдеуі",
      expert: "CFO",
      who: "Салық дауы, тексеру немесе күрделі талап.",
      what: "Дағдарысқа қарсы режим: есепті қалпына келтіру, салық даулары, тексеруді сүйемелдеу және нәтижеге дейін мүдделеріңізді қорғау.",
    },
  },
  currency: "сум",
  resultTitle: "Сіздің есебіңіз",
  perMonth: "айына",
  taxLine: "Салық 4 %",
  approx: "Алдын ала есеп",
  cta: "Нақты есеп алу",
  disclaimer:
    "Бұл болжамды құн. Түпкілікті баға бизнестің ерекшелігіне байланысты және шартта бекітіледі; операциялар көлемі 20 %-дан астам өзгерсе, тоқсан сайын қайта қаралады.",
  lines: {
    opf: "Базалық мөлшерлеме (бизнес нысаны)",
    sno: "Салық режимі",
    employees: "Қызметкерлердің жалақы есебі",
    foreignEmployees: "Шетелдік қызметкерлер",
    advanceReports: "Аванстық есептер",
    cashOps: "Касса операциялары",
    ved: "СЭҚ сүйемелдеу",
    vedOps: "СЭҚ операциялары",
    extraAccounts: "Қосымша шоттар",
    foreignAccounts: "Шетелдік шоттар",
    loans: "Несиелер мен қарыздар",
    paymentOrders: "Төлем тапсырмалары",
    incomings: "Түсімдер",
    sales: "Сатылымдар",
  },
};

const UZ: Content = {
  eyebrow: "Onlayn hisob-kitob",
  h1: "Buxgalteriya xizmatlari narxi kalkulyatori",
  sub: "Kompaniya haqidagi bir nechta savolga javob bering — oyiga buxgalteriya yuritishning taxminiy narxini ko'rasiz. Aniq narxni menejer qisqa maslahatdan so'ng tasdiqlaydi.",
  companyTitle: "Kompaniya haqida",
  opfLabel: "Biznes shakli",
  opfIp: "YaTT",
  opfOoo: "MChJ",
  snoLabel: "Soliq rejimi",
  snoUsn: "Soddalashtirilgan",
  snoOsno: "Umumiy (QQS)",
  snoItpark: "IT Park",
  staffTitle: "Xodimlar",
  employees: "Ish haqi yoki shartnoma asosidagi xodimlar",
  foreignEmployees: "Shulardan xorijiy xodimlar",
  opsTitle: "Oylik operatsiyalar",
  opsHint: "Oyiga taxminiy o'rtacha qiymatlar",
  paymentOrders: "To'lov topshiriqnomalari",
  incomings: "Hisobga tushumlar",
  sales: "Sotuvlar",
  advanceReports: "Avans hisobotlari",
  cashOps: "Kassa operatsiyalari",
  vedTitle: "Tashqi iqtisodiy faoliyat",
  vedLabel: "TIF mavjud (import/eksport, xorij bilan shartnomalar)",
  vedOps: "Oyiga TIF operatsiyalari",
  accountsTitle: "Hisoblar va kreditlar",
  extraAccounts: "Qo'shimcha hisob raqamlari",
  foreignAccounts: "Xorijiy banklardagi hisoblar",
  loans: "Kredit/qarz shartnomalari",
  pkgTitle: "Xizmat paketi",
  pkgHint: "Javob tezligi va mutaxassis darajasini belgilaydi",
  pkgSpeedLabel: "Javob tezligi",
  pkgExpertLabel: "Mutaxassis darajasi",
  pkgWhoLabel: "Kimga mos",
  pkgWhatLabel: "Nimalar kiradi",
  pkgDetailsTitle: "Paketlar haqida batafsil",
  pkgBonusLabel: "Bonus",
  pkgs: {
    tetris: {
      name: "Tetris",
      speed: "3 kungacha javob",
      expert: "Ajratilgan buxgaltersiz",
      who: "Operatsiyalar oqimini to'g'ri joylashtirish kerak.",
      what: "To'liq buxgalteriya hisobi: birlamchi hujjatlarni qabul qilamiz, hisob yuritamiz, soliqlarni hisoblaymiz, hisobotlarni topshiramiz va yuzaga kelgan masalalarni hal qilamiz.",
    },
    chess: {
      name: "Shaxmat",
      speed: "1 kun ichida javob",
      expert: "Ajratilgan buxgalter",
      who: "Xodimlar, QQS, TIF va nostandart operatsiyalar — butun tizimni boshqarish kerak.",
      what: "Faol hamrohlikdagi buxgalteriya: ish haqi, to'lov taqvimi, hujjat aylanmasi, debitorlik nazorati, soliq idorasi bilan muloqot va kelishilgan hajmdagi boshqaruv hisoboti.",
    },
    aoe: {
      name: "Age of Empires",
      speed: "1 soat ichida javob",
      expert: "Ajratilgan bosh buxgalter",
      who: "Strategiya va qarorlar oqibati muhim.",
      what: "CFO darajasi: soliq rejalashtirish, moliyaviy model, kompaniyalar guruhi tuzilmasi, bitimlar, investitsiyalar, dividendlar, Sizning mamlakatingiz ↔ O'zbekiston, ssenariy modellashtirish.",
      bonus: "Qo'shimcha oyiga 1 soat — Yelena Vasyukovadan Global CFO darajasidagi bepul maslahat.",
    },
    mk: {
      name: "Mortal Kombat",
      speed: "CFO bevosita hamrohligi",
      expert: "CFO",
      who: "Soliq nizosi, tekshiruv yoki murakkab talab.",
      what: "Inqirozga qarshi rejim: hisobni tiklash, soliq nizolari, tekshiruvni kuzatib borish va natijagacha manfaatlaringizni himoya qilish.",
    },
  },
  currency: "so'm",
  resultTitle: "Sizning hisob-kitobingiz",
  perMonth: "oyiga",
  taxLine: "Soliq 4 %",
  approx: "Dastlabki hisob",
  cta: "Aniq hisob olish",
  disclaimer:
    "Bu taxminiy narx. Yakuniy narx biznes xususiyatiga bog'liq va shartnomada belgilanadi; operatsiyalar hajmi 20 % dan ortiq o'zgarsa, har chorakda qayta ko'rib chiqiladi.",
  lines: {
    opf: "Bazaviy stavka (biznes shakli)",
    sno: "Soliq rejimi",
    employees: "Xodimlar ish haqi hisobi",
    foreignEmployees: "Xorijiy xodimlar",
    advanceReports: "Avans hisobotlari",
    cashOps: "Kassa operatsiyalari",
    ved: "TIF hamrohligi",
    vedOps: "TIF operatsiyalari",
    extraAccounts: "Qo'shimcha hisoblar",
    foreignAccounts: "Xorijiy hisoblar",
    loans: "Kredit va qarzlar",
    paymentOrders: "To'lov topshiriqnomalari",
    incomings: "Tushumlar",
    sales: "Sotuvlar",
  },
};

const ZH: Content = {
  eyebrow: "在线估算",
  h1: "会计服务费用计算器",
  sub: "回答几个关于贵公司的问题，即可看到每月会计服务的预估费用。经理将在简短咨询后确认最终价格。",
  companyTitle: "公司信息",
  opfLabel: "企业形式",
  opfIp: "个体经营者",
  opfOoo: "有限责任公司",
  snoLabel: "税收制度",
  snoUsn: "简易税制",
  snoOsno: "一般税制",
  snoItpark: "IT Park",
  staffTitle: "员工",
  employees: "工资或合同制员工",
  foreignEmployees: "其中外籍员工",
  opsTitle: "每月业务量",
  opsHint: "每月大致平均值",
  paymentOrders: "付款委托书",
  incomings: "账户入账",
  sales: "销售单据",
  advanceReports: "预支报销单",
  cashOps: "现金业务",
  vedTitle: "对外经济活动",
  vedLabel: "有外贸业务（进出口、涉外合同）",
  vedOps: "每月外贸业务量",
  accountsTitle: "账户与贷款",
  extraAccounts: "附加结算账户",
  foreignAccounts: "外国银行账户",
  loans: "信贷/借款合同",
  pkgTitle: "服务套餐",
  pkgHint: "决定响应速度和专家级别",
  pkgSpeedLabel: "响应速度",
  pkgExpertLabel: "专家级别",
  pkgWhoLabel: "适合谁",
  pkgWhatLabel: "包含内容",
  pkgDetailsTitle: "套餐详情",
  pkgBonusLabel: "赠送",
  pkgs: {
    tetris: {
      name: "俄罗斯方块",
      speed: "3 天内回复",
      expert: "无专属会计",
      who: "需要把业务流理顺归位。",
      what: "完整的会计核算：接收原始凭证、记账、计算税款、提交报表并解决日常问题。",
    },
    chess: {
      name: "国际象棋",
      speed: "1 天内回复",
      expert: "专属会计",
      who: "出现员工、增值税、外贸和非标准业务——需要管理整个体系。",
      what: "全面陪伴式会计服务：工资核算、付款日历、单证流转、应收款管控、与税务机关沟通以及约定范围内的管理报表。",
    },
    aoe: {
      name: "帝国时代",
      speed: "1 小时内回复",
      expert: "专属总会计师",
      who: "战略和决策的后果至关重要。",
      what: "CFO 级别：税务筹划、财务模型、集团架构、交易、投资、分红、您的国家 ↔ 乌兹别克斯坦、情景模拟。",
      bonus: "另赠每月 1 小时 — Elena Vasyukova 的 Global CFO 级免费咨询。",
    },
    mk: {
      name: "真人快打",
      speed: "CFO 直接跟进",
      expert: "CFO",
      who: "税务纠纷、稽查或复杂要求。",
      what: "危机应对模式：恢复账务、处理税务纠纷、陪同稽查并维护您的权益直至有结果。",
    },
  },
  currency: "苏姆",
  resultTitle: "您的估算",
  perMonth: "每月",
  taxLine: "税费 4 %",
  approx: "初步估算",
  cta: "获取精确报价",
  disclaimer:
    "这是预估费用。最终价格取决于业务具体情况并在合同中确定；如业务量变化超过 20%，每季度调整一次。",
  lines: {
    opf: "基础费率（企业形式）",
    sno: "税收制度",
    employees: "员工工资核算",
    foreignEmployees: "外籍员工",
    advanceReports: "预支报销单",
    cashOps: "现金业务",
    ved: "外贸业务支持",
    vedOps: "外贸业务",
    extraAccounts: "附加账户",
    foreignAccounts: "外国账户",
    loans: "信贷与借款",
    paymentOrders: "付款委托书",
    incomings: "入账",
    sales: "销售",
  },
};

const DICT: Record<string, Content> = { ru: RU, en: EN, kk: KK, uz: UZ, zh: ZH };

function NumField({
  label,
  value,
  onChange,
  max = 500,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  max?: number;
  step?: number;
}) {
  const set = (v: number) => onChange(Math.max(0, Math.min(max, v)));
  return (
    <label className="flex items-center justify-between gap-3 py-1">
      <span className="text-sm text-slate-700">{label}</span>
      <span className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          aria-label="−"
          onClick={() => set(value - step)}
          className="h-7 w-7 rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50 font-semibold"
        >
          −
        </button>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          max={max}
          step={step}
          value={value}
          onChange={(e) => set(Number(e.target.value) || 0)}
          className="h-7 w-14 rounded-md border border-slate-300 text-center text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-300"
        />
        <button
          type="button"
          aria-label="+"
          onClick={() => set(value + step)}
          className="h-7 w-7 rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50 font-semibold"
        >
          +
        </button>
      </span>
    </label>
  );
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { v: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.v}
          type="button"
          onClick={() => onChange(o.v)}
          className={`rounded-lg border-2 px-3 py-1.5 text-sm font-semibold transition ${
            value === o.v
              ? "border-brand-600 bg-brand-50 text-brand-700"
              : "border-slate-200 text-slate-600 hover:border-slate-300"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function CalculatorClient() {
  const locale = useLocale();
  const c = DICT[locale] ?? RU;
  const formHref = `/${locale}#request-form`;

  const [input, setInput] = useState<CalcInput>({
    pkg: "chess",
    opf: "ooo",
    sno: "usn",
    employees: 1,
    foreignEmployees: 0,
    advanceReports: 0,
    cashOps: 0,
    ved: false,
    vedOps: 0,
    extraAccounts: 0,
    foreignAccounts: 0,
    loans: 0,
    paymentOrders: 10,
    incomings: 10,
    sales: 10,
  });
  const set = <K extends keyof CalcInput>(k: K, v: CalcInput[K]) =>
    setInput((s) => {
      const next = { ...s, [k]: v };
      // иностранных сотрудников не может быть больше, чем сотрудников всего
      if (next.foreignEmployees > next.employees) next.foreignEmployees = next.employees;
      return next;
    });

  const result = useMemo(() => calc(input), [input]);

  return (
    <main className="pt-20 pb-28 lg:pb-16 bg-white text-slate-900">
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-100 rounded-full px-3 py-1">
              {c.eyebrow}
            </span>
            <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
              {c.h1}
            </h1>
            <p className="mt-3 text-base text-slate-600">{c.sub}</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 mt-6">
        <div className="grid lg:grid-cols-[1fr_360px] gap-6 max-w-5xl mx-auto">
          {/* Форма */}
          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="flex items-center gap-2 font-semibold text-sm mb-2"><span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-100 text-brand-700"><Building2 className="h-3.5 w-3.5" /></span>{c.companyTitle}</h2>
              <p className="text-xs text-slate-500 mb-1.5">{c.opfLabel}</p>
              <Segmented
                options={[
                  { v: "ip" as const, label: c.opfIp },
                  { v: "ooo" as const, label: c.opfOoo },
                ]}
                value={input.opf}
                onChange={(v) => set("opf", v)}
              />
              <p className="text-xs text-slate-500 mt-3 mb-1.5">{c.snoLabel}</p>
              <Segmented
                options={[
                  { v: "usn" as const, label: c.snoUsn },
                  { v: "osno" as const, label: c.snoOsno },
                  { v: "itpark" as const, label: c.snoItpark },
                ]}
                value={input.sno}
                onChange={(v) => set("sno", v)}
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="flex items-center gap-2 font-semibold text-sm mb-1"><span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-100 text-brand-700"><Users className="h-3.5 w-3.5" /></span>{c.staffTitle}</h2>
              <NumField label={c.employees} value={input.employees} onChange={(v) => set("employees", v)} />
              <NumField
                label={c.foreignEmployees}
                value={input.foreignEmployees}
                onChange={(v) => set("foreignEmployees", v)}
                max={input.employees}
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="flex items-center gap-2 font-semibold text-sm mb-0.5"><span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-100 text-brand-700"><ListChecks className="h-3.5 w-3.5" /></span>{c.opsTitle}</h2>
              <p className="text-xs text-slate-400 mb-1">{c.opsHint}</p>
              <NumField label={c.paymentOrders} value={input.paymentOrders} onChange={(v) => set("paymentOrders", v)} step={10} />
              <NumField label={c.incomings} value={input.incomings} onChange={(v) => set("incomings", v)} step={10} />
              <NumField label={c.sales} value={input.sales} onChange={(v) => set("sales", v)} step={10} />
              <NumField label={c.advanceReports} value={input.advanceReports} onChange={(v) => set("advanceReports", v)} step={10} />
              <NumField label={c.cashOps} value={input.cashOps} onChange={(v) => set("cashOps", v)} step={10} />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="flex items-center gap-2 font-semibold text-sm mb-2"><span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-100 text-brand-700"><Globe className="h-3.5 w-3.5" /></span>{c.vedTitle}</h2>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={input.ved}
                  onChange={(e) => set("ved", e.target.checked)}
                  className="h-5 w-5 rounded border-slate-300 accent-[#009787]"
                />
                <span className="text-sm text-slate-700">{c.vedLabel}</span>
              </label>
              {input.ved && (
                <NumField label={c.vedOps} value={input.vedOps} onChange={(v) => set("vedOps", v)} step={5} />
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="flex items-center gap-2 font-semibold text-sm mb-1"><span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-100 text-brand-700"><Landmark className="h-3.5 w-3.5" /></span>{c.accountsTitle}</h2>
              <NumField label={c.extraAccounts} value={input.extraAccounts} onChange={(v) => set("extraAccounts", v)} />
              <NumField label={c.foreignAccounts} value={input.foreignAccounts} onChange={(v) => set("foreignAccounts", v)} />
              <NumField label={c.loans} value={input.loans} onChange={(v) => set("loans", v)} />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="flex items-center gap-2 font-semibold text-sm mb-0.5"><span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-100 text-brand-700"><Gamepad2 className="h-3.5 w-3.5" /></span>{c.pkgTitle}</h2>
              <p className="text-xs text-slate-400 mb-2">{c.pkgHint}</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {(Object.keys(PACKAGES) as PackageKey[]).map((k) => {
                  const pk = c.pkgs[k];
                  const active = input.pkg === k;
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => set("pkg", k)}
                      className={`rounded-lg border-2 p-3 text-left transition ${
                        active
                          ? "border-brand-600 bg-brand-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className={`text-sm font-bold ${active ? "text-brand-700" : "text-slate-800"}`}>
                          {pk.name}
                        </span>
                        <span
                          className={`text-[11px] font-bold rounded-full px-2 py-0.5 ${
                            active ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          ×{String(PACKAGES[k]).replace(".", ",")}
                        </span>
                      </span>
                      <span className="mt-1 block text-xs text-slate-500">{pk.speed}</span>
                      <span className="block text-xs text-slate-500">{pk.expert}</span>
                    </button>
                  );
                })}
              </div>
              <a href="#pkg-details" className="mt-2 inline-block text-xs font-semibold text-brand-700 hover:underline">
                {c.pkgDetailsTitle} ↓
              </a>
            </div>
          </div>

          {/* Результат */}
          <aside className="lg:sticky lg:top-24 self-start">
            <div className="rounded-2xl border-2 border-brand-300 bg-gradient-to-b from-white to-brand-50 p-5 shadow-md">
              <h2 className="flex items-center gap-2 font-semibold text-lg"><span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-100 text-brand-700"><Calculator className="h-3.5 w-3.5" /></span>{c.resultTitle}</h2>
              <div className="mt-3 space-y-3 text-sm">
                {/* те же блоки, что и в форме слева */}
                {(
                  [
                    { title: c.companyTitle, keys: ["opf", "sno"] },
                    { title: c.staffTitle, keys: ["employees", "foreignEmployees"] },
                    { title: c.opsTitle, keys: ["paymentOrders", "incomings", "sales", "advanceReports", "cashOps"] },
                    { title: c.vedTitle, keys: ["ved", "vedOps"] },
                    { title: c.accountsTitle, keys: ["extraAccounts", "foreignAccounts", "loans"] },
                  ] as { title: string; keys: string[] }[]
                ).map((g) => {
                  const glines = result.lines.filter((l) => g.keys.includes(l.key));
                  if (glines.length === 0) return null;
                  return (
                    <div key={g.title}>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-700 mb-1">
                        {g.title}
                      </p>
                      <ul className="space-y-1">
                        {glines.map((l) => (
                          <li key={l.key} className="flex justify-between gap-3">
                            <span className="text-slate-600">{c.lines[l.key] ?? l.key}</span>
                            <span className="font-medium whitespace-nowrap">{fmtUzs(l.uzs)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
                {result.taxUzs > 0 && (
                  <div className="flex justify-between gap-3 border-t border-brand-200 pt-2">
                    <span className="text-slate-600">{c.taxLine}</span>
                    <span className="font-medium whitespace-nowrap">{fmtUzs(result.taxUzs)}</span>
                  </div>
                )}
                <div className="flex justify-between gap-3">
                  <span className="text-slate-600">{c.pkgTitle}</span>
                  <span className="font-medium whitespace-nowrap">
                    {c.pkgs[input.pkg].name} ×{String(result.pkgCoef).replace(".", ",")}
                  </span>
                </div>
              </div>
              <div className="mt-5 border-t-2 border-brand-200 pt-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">{c.approx}</p>
                <p className="mt-1 text-3xl font-bold text-slate-900">
                  {fmtUzs(result.totalUzs)} <span className="text-lg font-semibold">{c.currency}</span>
                </p>
                <p className="text-sm text-slate-500">{c.perMonth}</p>
              </div>
              <a
                href={formHref}
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 font-bold text-white shadow-sm transition hover:bg-brand-700"
              >
                {c.cta} →
              </a>
              <p className="mt-4 text-xs text-slate-400">{c.disclaimer}</p>
            </div>
          </aside>
        </div>

        {/* Пакеты подробно */}
        <div id="pkg-details" className="max-w-5xl mx-auto mt-10 scroll-mt-24">
          <h2 className="text-xl font-semibold mb-4">{c.pkgDetailsTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {(Object.keys(PACKAGES) as PackageKey[]).map((k) => {
              const pk = c.pkgs[k];
              const active = input.pkg === k;
              return (
                <div
                  key={k}
                  className={`rounded-xl border-2 p-5 transition ${
                    active ? "border-brand-400 bg-brand-50/40" : "border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-bold">{pk.name}</h3>
                    <span className="text-xs font-bold rounded-full bg-slate-100 text-slate-500 px-2.5 py-1">
                      ×{String(PACKAGES[k]).replace(".", ",")}
                    </span>
                  </div>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-brand-700">{c.pkgSpeedLabel}</dt>
                      <dd className="text-slate-700">{pk.speed}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-brand-700">{c.pkgExpertLabel}</dt>
                      <dd className="text-slate-700">{pk.expert}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-brand-700">{c.pkgWhoLabel}</dt>
                      <dd className="text-slate-700">{pk.who}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-brand-700">{c.pkgWhatLabel}</dt>
                      <dd className="text-slate-700">{pk.what}</dd>
                    </div>
                  </dl>
                  {pk.bonus && (
                    <div className="mt-3 rounded-lg bg-brand-100/70 border border-brand-300 px-3 py-2">
                      <span className="text-xs font-bold uppercase tracking-wide text-brand-800">
                        🎁 {c.pkgBonusLabel}
                      </span>
                      <p className="mt-0.5 text-sm text-brand-900">{pk.bonus}</p>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => set("pkg", k)}
                    className={`mt-4 rounded-lg border-2 px-4 py-1.5 text-sm font-semibold transition ${
                      active
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-brand-600 text-brand-700 hover:bg-brand-50"
                    }`}
                  >
                    {active ? "✓" : "→"} {pk.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Мобильная плашка: итог всегда на виду */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-brand-200 bg-white/95 backdrop-blur px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wide text-slate-400">{c.approx}</p>
            <p className="text-lg font-bold text-slate-900 truncate">
              {fmtUzs(result.totalUzs)} <span className="text-sm font-semibold">{c.currency}</span>
            </p>
          </div>
          <a
            href={formHref}
            className="shrink-0 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm"
          >
            {c.cta}
          </a>
        </div>
      </div>
    </main>
  );
}

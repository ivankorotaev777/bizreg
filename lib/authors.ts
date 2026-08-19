// Реальные авторы-эксперты (партнёры BizReg) для E-E-A-T.
type Loc = { ru: string; en: string; zh?: string };

export interface Author {
  key: string;
  name: Loc;
  role: Loc;
  credentials: Loc;
  photo: string;
}

export const AUTHORS: Record<string, Author> = {
  ivan: {
    key: "ivan",
    name: { ru: "Иван Каратаев", en: "Ivan Karataev" },
    role: {
      ru: "Управляющий партнёр BizReg",
      en: "Managing Partner, BizReg",
    },
    credentials: {
      ru: "MBA, ACCA, CPA · ex-KPMG, ex-CFO компаний на NYSE · 20+ лет в бизнесе США и Узбекистана",
      en: "MBA, ACCA, CPA · ex-KPMG, ex-CFO of NYSE-listed companies · 20+ years in US & Uzbek business",
    },
    photo: "/authors/ivan.png",
  },
  elena: {
    key: "elena",
    name: { ru: "Елена Васюкова", en: "Elena Vasyukova" },
    role: {
      ru: "Партнёр учётной и налоговой практики",
      en: "Partner, Accounting & Tax practice",
    },
    credentials: {
      ru: "DipIFR, CPA Uz, ACCA Affiliate · главный бухгалтер с 15+ летним опытом в международных компаниях",
      en: "DipIFR, CPA Uz, ACCA Affiliate · chief accountant, 15+ years in international companies",
    },
    photo: "/authors/elena.png",
  },
  karima: {
    key: "karima",
    name: { ru: "Карима Тазиева", en: "Karima Tazieva" },
    role: {
      ru: "Партнёр по недвижимости",
      en: "Partner, Real Estate",
    },
    credentials: {
      ru: "CCIM, FIABCI · ex-partner CMWP Uzbekistan · эксперт рынка недвижимости Ташкента, 20+ лет",
      en: "CCIM, FIABCI · ex-partner CMWP Uzbekistan · Tashkent real-estate expert, 20+ years",
    },
    photo: "/authors/karima.png",
  },
};

export function getAuthor(key: string | undefined): Author {
  return (key && AUTHORS[key]) || AUTHORS.ivan;
}

export function pick(loc: Loc, locale: string): string {
  return loc[locale as keyof Loc] ?? loc.en ?? loc.ru;
}

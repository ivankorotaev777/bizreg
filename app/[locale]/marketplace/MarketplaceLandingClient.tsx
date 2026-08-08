"use client";

import { useLocale } from "next-intl";

type Row = { name: string; a: string; b?: string };
type QA = { q: string; a: string };
type Content = {
  eyebrow: string;
  h1a: string;
  h1accent: string;
  h1b: string;
  sub: string;
  cta: string;
  ctaMore: string;
  note: string;
  stats: { v: string; l: string }[];
  barriersTitle: string;
  barriers: { ic: string; t: string; d: string }[];
  stepsTitle: string;
  steps: { t: string; d: string }[];
  taxTitle: string;
  taxSub: string;
  taxHead: [string, string, string];
  taxRows: [string, string, string][];
  taxNote: string;
  priceTitle: string;
  priceSub: string;
  priceRows: Row[];
  totalLabel: string;
  totalSum: string;
  totalUsd: string;
  faqTitle: string;
  faq: QA[];
  finalTitle: string;
  finalSub: string;
};

const RU: Content = {
  eyebrow: "Wildberries · Uzum · Ozon — для иностранцев",
  h1a: "Стать продавцом на ",
  h1accent: "маркетплейсах",
  h1b: " Узбекистана — под ключ",
  sub: "Иностранцу нельзя торговать как частному лицу — нужен бизнес и счёт в Узбекистане. Открываем ООО и готовим документы под маркетплейс. Без личного присутствия, за 2 дня.",
  cta: "Оставить заявку",
  ctaMore: "Как это работает",
  note: "Работаем с нерезидентами из России, Казахстана, Турции и других стран.",
  stats: [
    { v: "$605 млн", l: "продаж из Узбекистана на Wildberries за 2024" },
    { v: "×2", l: "рост продаж за 2025 год" },
    { v: "2 дня", l: "выход под ключ" },
  ],
  barriersTitle: "Почему нерезиденту нельзя просто зайти и продавать",
  barriers: [
    { ic: "🏢", t: "Нужен местный бизнес", d: "Кабинет продавца открывают только ИП или юрлицу, зарегистрированному в Узбекистане. Частное лицо-иностранец не откроет." },
    { ic: "🏦", t: "Нужен счёт в банке УЗ", d: "Выручку маркетплейс перечисляет на расчётный счёт бизнеса в узбекском банке." },
    { ic: "📄", t: "Нужны документы и статус", d: "Свидетельство, ИНН, добавление площадки в комиссионеры на soliq.uz. Пропустишь шаг — расчёты пойдут неверно." },
  ],
  stepsTitle: "Как выйти на маркетплейс — 6 шагов",
  steps: [
    { t: "Открываем ООО", d: "Рекомендуем ООО: не требует прописки и ВНЖ, и только юрлицо может вести импорт товара из-за рубежа." },
    { t: "Открываем расчётный счёт", d: "В узбекском банке — на него площадка перечисляет выручку." },
    { t: "Регистрируем кабинет продавца", d: "На портале маркетплейса: WB Partners, Uzum Seller или Ozon." },
    { t: "Загружаем документы", d: "Паспорт, свидетельство о регистрации и банковские реквизиты." },
    { t: "Добавляем площадку в комиссионеры", d: "На my.soliq.uz — обязательный шаг для корректной отчётности." },
    { t: "Выбираем схему и продаём", d: "Основная схема — фулфилмент площадки: товар на складе, доставку берёт маркетплейс." },
  ],
  taxTitle: "Налоги продавца в Узбекистане",
  taxSub: "Один из самых мягких режимов в регионе. Пока оборот ниже порога — простой налог с оборота, а не сложный НДС.",
  taxHead: ["Налог", "Ставка 2026", "Когда"],
  taxRows: [
    ["Налог с оборота", "от 4%", "оборот ниже порога НДС (≈5 млрд сум)"],
    ["НДС (торговля)", "6%", "добровольно, вместо 12%"],
    ["НДС (экспорт)", "0%", "при подтверждении вывоза"],
    ["Налог на прибыль", "15%", "льгота: 0% на первый период для новых"],
    ["Дивиденды", "10%", "выплаты нерезидентам"],
  ],
  taxNote: "Ставки на 2026 год. Освобождение от налога на прибыль на первый период — для впервые перешедших плательщиков (НК РУз). Сверяйте на soliq.uz.",
  priceTitle: "Сколько стоит выход под ключ",
  priceSub: "Первая строка обязательна всем, остальное — если директор нерезидент и ему нужны разрешение на работу и виза.",
  priceRows: [
    { name: "Регистрация бизнеса (ООО)", a: "5 000 000 сум", b: "≈ $400" },
    { name: "Разрешение на работу для гендиректора", a: "4 200 000 сум", b: "≈ $336" },
    { name: "Виза для гендиректора", a: "4 000 000 сум", b: "≈ $320" },
    { name: "Госпошлина", a: "12 772 000 сум", b: "≈ $1 022" },
  ],
  totalLabel: "Итого — выход за 2 дня",
  totalSum: "25 972 000 сум",
  totalUsd: "≈ $2 078 · срок 2 дня",
  faqTitle: "Частые вопросы",
  faq: [
    { q: "Можно ли продавать без местной компании?", a: "Нет. Кабинет продавца открывают только ИП или юрлицу, зарегистрированному в Узбекистане." },
    { q: "Почему ООО, а не ИП?", a: "ООО не требует прописки и ВНЖ, и только юрлицо может ввозить товар из-за рубежа — а у селлеров товар почти всегда импортный." },
    { q: "Нужно ли лично приезжать?", a: "Для ООО — нет, оформляем дистанционно через представителя." },
    { q: "Нужны ли директору виза и разрешение на работу?", a: "Да, если гендиректор — нерезидент. Это отдельные процедуры, тоже берём на себя." },
    { q: "Можно ли выйти на Uzum и Ozon на той же компании?", a: "Да, одна компания подходит для всех маркетплейсов." },
  ],
  finalTitle: "Откроем бизнес и счёт под маркетплейс",
  finalSub: "Оставьте контакты — подберём форму бизнеса и рассчитаем сроки и стоимость.",
};

const EN: Content = {
  eyebrow: "Wildberries · Uzum · Ozon — for foreigners",
  h1a: "Become a seller on ",
  h1accent: "Uzbekistan's marketplaces",
  h1b: " — done for you",
  sub: "A foreigner cannot trade as a private individual — you need a business and a bank account in Uzbekistan. We set up an LLC and prepare documents for the marketplace. Remotely, in 2 days.",
  cta: "Request a callback",
  ctaMore: "How it works",
  note: "We work with non-residents from Russia, Kazakhstan, Turkey and other countries.",
  stats: [
    { v: "$605M", l: "sales from Uzbekistan on Wildberries in 2024" },
    { v: "×2", l: "sales growth in 2025" },
    { v: "2 days", l: "turnkey launch" },
  ],
  barriersTitle: "Why a non-resident can't just start selling",
  barriers: [
    { ic: "🏢", t: "You need a local business", d: "A seller account is opened only for a sole proprietor or a legal entity registered in Uzbekistan." },
    { ic: "🏦", t: "You need an Uzbek bank account", d: "The marketplace transfers proceeds to the business account in an Uzbek bank." },
    { ic: "📄", t: "Documents and status", d: "Certificate, taxpayer ID, adding the platform as a commission agent on soliq.uz. Skip a step and reporting breaks." },
  ],
  stepsTitle: "How to launch on a marketplace — 6 steps",
  steps: [
    { t: "Set up an LLC", d: "We recommend an LLC: no residence permit needed, and only a legal entity can import goods from abroad." },
    { t: "Open a bank account", d: "In an Uzbek bank — the platform sends your proceeds there." },
    { t: "Register a seller cabinet", d: "On the marketplace portal: WB Partners, Uzum Seller or Ozon." },
    { t: "Upload documents", d: "Passport, registration certificate and bank details." },
    { t: "Add the platform as a commission agent", d: "On my.soliq.uz — mandatory for correct reporting." },
    { t: "Choose a scheme and sell", d: "Main scheme — platform fulfillment: goods at the warehouse, delivery handled by the marketplace." },
  ],
  taxTitle: "Seller taxes in Uzbekistan",
  taxSub: "One of the mildest regimes in the region. Below the threshold — a simple turnover tax, not complex VAT.",
  taxHead: ["Tax", "2026 rate", "When"],
  taxRows: [
    ["Turnover tax", "from 4%", "turnover below the VAT threshold (≈5B soums)"],
    ["VAT (trade)", "6%", "voluntary, instead of 12%"],
    ["VAT (export)", "0%", "with proof of export"],
    ["Corporate profit tax", "15%", "relief: 0% for the first period for new payers"],
    ["Dividends", "10%", "payments to non-residents"],
  ],
  taxNote: "2026 rates. First-period profit-tax exemption applies to first-time payers (Tax Code of Uzbekistan). Verify on soliq.uz.",
  priceTitle: "Turnkey cost",
  priceSub: "The first line applies to everyone; the rest — if the director is a non-resident needing a work permit and visa.",
  priceRows: [
    { name: "Business registration (LLC)", a: "5,000,000 soums", b: "≈ $400" },
    { name: "Work permit for the director", a: "4,200,000 soums", b: "≈ $336" },
    { name: "Visa for the director", a: "4,000,000 soums", b: "≈ $320" },
    { name: "State duty", a: "12,772,000 soums", b: "≈ $1,022" },
  ],
  totalLabel: "Total — launch in 2 days",
  totalSum: "25,972,000 soums",
  totalUsd: "≈ $2,078 · 2 days",
  faqTitle: "FAQ",
  faq: [
    { q: "Can I sell without a local company?", a: "No. A seller account is opened only for a business registered in Uzbekistan." },
    { q: "Why an LLC and not a sole proprietor?", a: "An LLC needs no residence permit, and only a legal entity can import goods — sellers' goods are almost always imported." },
    { q: "Do I need to come in person?", a: "For an LLC — no, we register remotely via a representative." },
    { q: "Does the director need a visa and work permit?", a: "Yes, if the director is a non-resident. We handle these too." },
    { q: "Can I sell on Uzum and Ozon with the same company?", a: "Yes, one company works for all marketplaces." },
  ],
  finalTitle: "We'll set up your business and account for the marketplace",
  finalSub: "Leave your contacts — we'll pick the business form and estimate timing and cost.",
};

const UZ: Content = {
  eyebrow: "Wildberries · Uzum · Ozon — chet elliklar uchun",
  h1a: "O'zbekiston ",
  h1accent: "marketpleyslarida",
  h1b: " sotuvchi bo'lish — kalit topshirish tamoyilida",
  sub: "Chet ellik jismoniy shaxs sifatida savdo qila olmaydi — O'zbekistonda biznes va hisob raqam kerak. MChJ ochamiz va marketpleys uchun hujjatlarni tayyorlaymiz. Shaxsan kelmasdan, 2 kunda.",
  cta: "Ariza qoldirish",
  ctaMore: "Bu qanday ishlaydi",
  note: "Rossiya, Qozog'iston, Turkiya va boshqa davlatlardan kelgan norezidentlar bilan ishlaymiz.",
  stats: [
    { v: "$605 mln", l: "2024-yilda O'zbekistondan Wildberries'dagi savdo" },
    { v: "×2", l: "2025-yilda savdo o'sishi" },
    { v: "2 kun", l: "kalit topshirish muddati" },
  ],
  barriersTitle: "Nega norezident shunchaki kirib sota olmaydi",
  barriers: [
    { ic: "🏢", t: "Mahalliy biznes kerak", d: "Sotuvchi kabineti faqat O'zbekistonda ro'yxatdan o'tgan YaTT yoki yuridik shaxsga ochiladi." },
    { ic: "🏦", t: "O'zbek bankida hisob kerak", d: "Marketpleys tushumni biznesning O'zbek bankidagi hisob raqamiga o'tkazadi." },
    { ic: "📄", t: "Hujjatlar va maqom", d: "Guvohnoma, STIR, soliq.uz'da platformani komissioner sifatida qo'shish. Qadamni o'tkazib yuborsangiz — hisobot noto'g'ri bo'ladi." },
  ],
  stepsTitle: "Marketpleysga chiqish — 6 qadam",
  steps: [
    { t: "MChJ ochamiz", d: "MChJ tavsiya etiladi: propiska va yashash guvohnomasi talab qilinmaydi, faqat yuridik shaxs chetdan tovar import qila oladi." },
    { t: "Hisob raqam ochamiz", d: "O'zbek bankida — platforma tushumni shu yerga o'tkazadi." },
    { t: "Sotuvchi kabinetini ro'yxatdan o'tkazamiz", d: "Marketpleys portalida: WB Partners, Uzum Seller yoki Ozon." },
    { t: "Hujjatlarni yuklaymiz", d: "Pasport, ro'yxatdan o'tish guvohnomasi va bank rekvizitlari." },
    { t: "Platformani komissioner sifatida qo'shamiz", d: "my.soliq.uz'da — to'g'ri hisobot uchun majburiy qadam." },
    { t: "Sxemani tanlab, sotamiz", d: "Asosiy sxema — platforma fulfilmenti: tovar omborda, yetkazib berish marketpleys zimmasida." },
  ],
  taxTitle: "O'zbekistonda sotuvchi soliqlari",
  taxSub: "Mintaqadagi eng yengil rejimlardan biri. Aylanma chegaradan past bo'lsa — murakkab QQS emas, oddiy aylanma solig'i.",
  taxHead: ["Soliq", "2026 stavka", "Qachon"],
  taxRows: [
    ["Aylanma solig'i", "4%dan", "aylanma QQS chegarasidan past (≈5 mlrd so'm)"],
    ["QQS (savdo)", "6%", "ixtiyoriy, 12% o'rniga"],
    ["QQS (eksport)", "0%", "eksport tasdiqlansa"],
    ["Foyda solig'i", "15%", "imtiyoz: yangilar uchun birinchi davrda 0%"],
    ["Dividendlar", "10%", "norezidentlarga to'lovlar"],
  ],
  taxNote: "2026-yil stavkalari. Birinchi davrda foyda solig'idan ozod qilish — birinchi marta o'tganlar uchun (O'zR Soliq kodeksi). soliq.uz'da tekshiring.",
  priceTitle: "Kalit topshirish narxi",
  priceSub: "Birinchi qator hammaga tegishli, qolgani — direktor norezident bo'lib, ishlash uchun ruxsatnoma va viza kerak bo'lsa.",
  priceRows: [
    { name: "Biznesni ro'yxatdan o'tkazish (MChJ)", a: "5 000 000 so'm", b: "≈ $400" },
    { name: "Direktor uchun ishlash ruxsatnomasi", a: "4 200 000 so'm", b: "≈ $336" },
    { name: "Direktor uchun viza", a: "4 000 000 so'm", b: "≈ $320" },
    { name: "Davlat boji", a: "12 772 000 so'm", b: "≈ $1 022" },
  ],
  totalLabel: "Jami — 2 kunda chiqish",
  totalSum: "25 972 000 so'm",
  totalUsd: "≈ $2 078 · 2 kun",
  faqTitle: "Ko'p beriladigan savollar",
  faq: [
    { q: "Mahalliy kompaniyasiz sotish mumkinmi?", a: "Yo'q. Sotuvchi kabineti faqat O'zbekistonda ro'yxatdan o'tgan biznesga ochiladi." },
    { q: "Nega MChJ, YaTT emas?", a: "MChJ propiska talab qilmaydi, faqat yuridik shaxs tovar import qila oladi — sotuvchilarning tovari deyarli har doim importdan." },
    { q: "Shaxsan kelish kerakmi?", a: "MChJ uchun — yo'q, vakil orqali masofadan ro'yxatdan o'tkazamiz." },
    { q: "Direktorga viza va ruxsatnoma kerakmi?", a: "Ha, agar direktor norezident bo'lsa. Buni ham o'z zimmamizga olamiz." },
    { q: "Bir kompaniyada Uzum va Ozon'ga chiqish mumkinmi?", a: "Ha, bitta kompaniya barcha marketpleyslar uchun mos keladi." },
  ],
  finalTitle: "Marketpleys uchun biznes va hisob ochamiz",
  finalSub: "Kontaktlaringizni qoldiring — biznes shaklini tanlab, muddat va narxni hisoblaymiz.",
};

const ZH: Content = {
  eyebrow: "Wildberries · Uzum · Ozon — 面向外国人",
  h1a: "在乌兹别克斯坦",
  h1accent: "电商平台",
  h1b: "成为卖家 — 全程代办",
  sub: "外国人无法以个人身份销售——需要在乌兹别克斯坦拥有企业和银行账户。我们注册有限责任公司并准备平台所需文件。无需亲自到场，2 天完成。",
  cta: "预约咨询",
  ctaMore: "如何运作",
  note: "我们服务来自俄罗斯、哈萨克斯坦、土耳其等国的非居民。",
  stats: [
    { v: "$6.05 亿", l: "2024 年乌兹别克斯坦在 Wildberries 的销售额" },
    { v: "×2", l: "2025 年销售增长" },
    { v: "2 天", l: "全程代办" },
  ],
  barriersTitle: "为什么非居民不能直接开店销售",
  barriers: [
    { ic: "🏢", t: "需要本地企业", d: "卖家账户只对在乌兹别克斯坦注册的个体户或法人开放。" },
    { ic: "🏦", t: "需要乌兹别克银行账户", d: "平台将货款转入企业在乌兹别克银行的账户。" },
    { ic: "📄", t: "文件与资质", d: "注册证、税号，并在 soliq.uz 上将平台添加为佣金代理。漏一步，报税就会出错。" },
  ],
  stepsTitle: "如何入驻电商平台 — 6 步",
  steps: [
    { t: "注册有限责任公司", d: "推荐有限责任公司：无需居留许可，且只有法人才能从境外进口商品。" },
    { t: "开设银行账户", d: "在乌兹别克银行——平台将货款转入此账户。" },
    { t: "注册卖家后台", d: "在平台门户：WB Partners、Uzum Seller 或 Ozon。" },
    { t: "上传文件", d: "护照、注册证和银行信息。" },
    { t: "将平台添加为佣金代理", d: "在 my.soliq.uz 上——正确报税的必要步骤。" },
    { t: "选择模式并开始销售", d: "主要模式为平台履约：货物存放仓库，配送由平台负责。" },
  ],
  taxTitle: "乌兹别克斯坦卖家税务",
  taxSub: "本地区最宽松的税制之一。营业额低于门槛时，缴纳简单的营业额税，而非复杂的增值税。",
  taxHead: ["税种", "2026 税率", "适用情形"],
  taxRows: [
    ["营业额税", "4% 起", "营业额低于增值税门槛（约 50 亿苏姆）"],
    ["增值税（贸易）", "6%", "自愿，替代 12%"],
    ["增值税（出口）", "0%", "凭出口证明"],
    ["企业利润税", "15%", "优惠：新纳税人首期 0%"],
    ["股息", "10%", "支付给非居民"],
  ],
  taxNote: "2026 年税率。首期利润税豁免适用于首次转入的纳税人（乌兹别克斯坦税法）。请在 soliq.uz 核实。",
  priceTitle: "全程代办费用",
  priceSub: "第一项适用于所有人，其余项目仅在董事为非居民、需办理工作许可和签证时适用。",
  priceRows: [
    { name: "企业注册（有限责任公司）", a: "5 000 000 苏姆", b: "≈ $400" },
    { name: "董事工作许可", a: "4 200 000 苏姆", b: "≈ $336" },
    { name: "董事签证", a: "4 000 000 苏姆", b: "≈ $320" },
    { name: "国家规费", a: "12 772 000 苏姆", b: "≈ $1 022" },
  ],
  totalLabel: "合计 — 2 天完成",
  totalSum: "25 972 000 苏姆",
  totalUsd: "≈ $2 078 · 2 天",
  faqTitle: "常见问题",
  faq: [
    { q: "没有本地公司能销售吗？", a: "不能。卖家账户只对在乌兹别克斯坦注册的企业开放。" },
    { q: "为什么选有限责任公司而非个体户？", a: "有限责任公司无需居留许可，且只有法人能进口商品——卖家的货物几乎都是进口的。" },
    { q: "需要亲自到场吗？", a: "有限责任公司无需——我们通过代理远程注册。" },
    { q: "董事需要签证和工作许可吗？", a: "是的，若董事为非居民。我们也一并代办。" },
    { q: "同一家公司能入驻 Uzum 和 Ozon 吗？", a: "可以，一家公司适用于所有电商平台。" },
  ],
  finalTitle: "为电商平台注册企业并开户",
  finalSub: "留下您的联系方式——我们将选定企业形式并估算周期与费用。",
};

const DICT: Record<string, Content> = { ru: RU, en: EN, uz: UZ, zh: ZH, kk: RU };

export default function MarketplaceLandingClient() {
  const locale = useLocale();
  const c = DICT[locale] ?? RU;
  const formHref = `/${locale}#request-form`;

  return (
    <div className="bg-white text-slate-900">
      {/* Hero */}
      <section className="bg-gradient-to-b from-violet-50 to-white">
        <div className="container mx-auto px-4 pt-16 pb-14">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-violet-700 bg-violet-100 rounded-full px-3 py-1">
                {c.eyebrow}
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-balance">
                {c.h1a}
                <span className="text-violet-700">{c.h1accent}</span>
                {c.h1b}
              </h1>
              <p className="mt-4 text-lg text-slate-600 max-w-xl">{c.sub}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={formHref} className="inline-flex items-center rounded-xl bg-violet-600 px-6 py-3.5 font-bold text-white shadow-sm transition hover:bg-violet-700">
                  {c.cta} →
                </a>
                <a href="#steps" className="inline-flex items-center rounded-xl border-2 border-emerald-600 px-6 py-3.5 font-bold text-emerald-700 transition hover:bg-emerald-50">
                  {c.ctaMore}
                </a>
              </div>
              <p className="mt-4 text-sm text-slate-400">{c.note}</p>
            </div>
            <div className="rounded-3xl bg-white border border-slate-200 p-7 shadow-lg">
              <div className="text-5xl font-extrabold text-violet-700 tracking-tight">{c.stats[0].v}</div>
              <div className="mt-2 text-sm text-slate-500">{c.stats[0].l}</div>
              <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-2 gap-5">
                {c.stats.slice(1).map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl font-bold tabular-nums">{s.v}</div>
                    <div className="text-xs text-slate-400">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Barriers */}
      <section className="container mx-auto px-4 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance">{c.barriersTitle}</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {c.barriers.map((b, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="text-2xl">{b.ic}</div>
              <h3 className="mt-3 font-bold">{b.t}</h3>
              <p className="mt-1.5 text-sm text-slate-600">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section id="steps" className="container mx-auto px-4 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{c.stepsTitle}</h2>
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white divide-y divide-slate-100">
          {c.steps.map((s, i) => (
            <div key={i} className="flex gap-5 p-6 items-start">
              <div className="flex-none w-11 h-11 rounded-xl bg-violet-600 text-white font-bold text-xl flex items-center justify-center">{i + 1}</div>
              <div>
                <h3 className="font-bold text-lg">{s.t}</h3>
                <p className="mt-1 text-slate-600">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Taxes */}
      <section className="container mx-auto px-4 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance">{c.taxTitle}</h2>
        <p className="mt-2 text-slate-600 max-w-2xl">{c.taxSub}</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[520px]">
            <thead>
              <tr className="text-left text-slate-500 border-b-2 border-slate-200">
                {c.taxHead.map((h, i) => <th key={i} className="py-2.5 pr-4 font-semibold uppercase text-xs tracking-wide">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {c.taxRows.map((r, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="py-2.5 pr-4 font-semibold">{r[0]}</td>
                  <td className="py-2.5 pr-4 font-mono text-violet-700 whitespace-nowrap">{r[1]}</td>
                  <td className="py-2.5 pr-4 text-slate-600">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-400 max-w-2xl">{c.taxNote}</p>
      </section>

      {/* Price */}
      <section className="container mx-auto px-4 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{c.priceTitle}</h2>
        <p className="mt-2 text-slate-600 max-w-2xl">{c.priceSub}</p>
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white divide-y divide-slate-100">
          {c.priceRows.map((r, i) => (
            <div key={i} className="flex justify-between gap-4 p-5">
              <span className="font-medium">{r.name}</span>
              <span className="text-right whitespace-nowrap">
                <span className="font-mono font-bold tabular-nums">{r.a}</span>
                {r.b && <span className="block text-xs text-slate-400">{r.b}</span>}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-3xl bg-violet-600 text-white p-6 flex flex-wrap justify-between items-center gap-4">
          <div className="font-bold text-lg">{c.totalLabel}</div>
          <div className="text-right">
            <div className="text-2xl font-extrabold tabular-nums">{c.totalSum}</div>
            <div className="text-sm opacity-90">{c.totalUsd}</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{c.faqTitle}</h2>
        <div className="mt-6 space-y-3 max-w-3xl">
          {c.faq.map((f, i) => (
            <details key={i} className="rounded-2xl border border-slate-200 bg-white px-5 py-1 group">
              <summary className="cursor-pointer font-semibold py-4 list-none flex justify-between gap-3 items-center">
                {f.q}
                <span className="text-violet-600 text-xl transition group-open:rotate-45">+</span>
              </summary>
              <p className="pb-4 text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 pb-20">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance">{c.finalTitle}</h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto">{c.finalSub}</p>
          <a href={formHref} className="mt-7 inline-flex items-center rounded-xl bg-violet-600 px-8 py-4 font-bold text-white transition hover:bg-violet-700">
            {c.cta} →
          </a>
        </div>
      </section>
    </div>
  );
}

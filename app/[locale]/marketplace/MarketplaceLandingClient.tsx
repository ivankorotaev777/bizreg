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
  timelineTitle: string;
  timelineSub: string;
  day1t: string;
  day1d: string;
  day2t: string;
  day2d: string;
  otherTitle: string;
  otherText: string;
  needTitle: string;
  needSub: string;
  need: { ic: string; t: string; d: string }[];
  faqTitle: string;
  faq: QA[];
  finalTitle: string;
  finalSub: string;
};

const RU: Content = {
  eyebrow: "Wildberries · Узбекистан · для иностранцев",
  h1a: "Стать продавцом на ",
  h1accent: "Wildberries",
  h1b: " в Узбекистане — под ключ",
  sub: "Иностранцу нельзя торговать на WB как частному лицу — нужен бизнес и счёт в Узбекистане. Открываем ООО и готовим документы под маркетплейс. Без личного присутствия.",
  cta: "Открыть бизнес под WB",
  ctaMore: "Как это работает",
  note: "Работаем с нерезидентами из России, Казахстана, Турции и других стран.",
  stats: [
    { v: "$605 млн", l: "продаж товаров из Узбекистана на Wildberries за 2024 год — и рост более чем вдвое за 2025-й" },
    { v: "100 000 м²", l: "склад WB под Ташкентом к концу 2026" },
    { v: "7 500", l: "рабочих мест логоцентра" },
  ],
  barriersTitle: "Почему нерезиденту нельзя просто зайти и продавать",
  barriers: [
    { ic: "🏢", t: "Нужен местный бизнес", d: "Кабинет продавца открывают только ИП или юрлицу, зарегистрированному в Узбекистане. Частное лицо-иностранец не откроет." },
    { ic: "🏦", t: "Нужен счёт в банке УЗ", d: "Выручку Wildberries перечисляет на расчётный счёт бизнеса в узбекском банке." },
    { ic: "📄", t: "Нужны документы и статус", d: "Свидетельство, ИНН, добавление WB в комиссионеры на soliq.uz. Пропустишь шаг — расчёты пойдут неверно." },
  ],
  stepsTitle: "Как выйти на Wildberries — 6 шагов",
  steps: [
    { t: "Открываем ООО", d: "Рекомендуем ООО: не требует прописки и ВНЖ, и только юрлицо может вести импорт товара из-за рубежа (Россия, Китай и др.)." },
    { t: "Открываем расчётный счёт", d: "В узбекском банке — на него Wildberries перечисляет выручку." },
    { t: "Регистрируем кабинет на WB Partners", d: "wildberries.uz → «Для бизнеса» → «Стать продавцом»." },
    { t: "Загружаем документы", d: "Паспорт, свидетельство о регистрации и банковские реквизиты." },
    { t: "Добавляем WB в комиссионеры", d: "На my.soliq.uz — обязательный шаг для корректной отчётности." },
    { t: "Выбираем схему и продаём", d: "Основная схема — FBW: товар на складе WB, доставку берёт маркетплейс." },
  ],
  taxTitle: "Что вас ждёт дальше: налоги",
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
  timelineTitle: "Выход за 2 дня — по шагам",
  timelineSub: "Пока вы занимаетесь товаром, мы за два рабочих дня готовим всё для старта.",
  day1t: "День 1 — открываем компанию",
  day1d: "Регистрируем ООО, получаем ИНН и юридический адрес, готовим пакет документов.",
  day2t: "День 2 — счёт, виза, документы",
  day2d: "Открываем счёт, оформляем разрешение на работу и визу директору и отдаём пакет для WB Partners.",
  otherTitle: "Не только Wildberries",
  otherText: "Открытая компания подходит для всех маркетплейсов сразу. Поможем выйти и на Uzum Market, и на Ozon — на том же ООО, без открытия нового бизнеса под каждую площадку.",
  needTitle: "Что нужно от вас — всего три вещи",
  needSub: "Никаких поездок и очередей. Присылаете данные — остальное делаем мы, дистанционно.",
  need: [
    { ic: "🪪", t: "Паспорт", d: "Скан паспорта учредителя (и директора, если это разные люди)." },
    { ic: "🏷️", t: "Название и вид деятельности", d: "Как назвать компанию и чем она будет заниматься — подскажем." },
    { ic: "🛍️", t: "Что планируете продавать", d: "Категория товара — чтобы учесть маркировку и особенности площадки." },
  ],
  faqTitle: "Частые вопросы",
  faq: [
    { q: "Можно ли продавать без местной компании?", a: "Нет. Кабинет продавца открывают только ИП или юрлицу, зарегистрированному в Узбекистане." },
    { q: "Почему ООО, а не ИП?", a: "ООО не требует прописки и ВНЖ, и только юрлицо может ввозить товар из-за рубежа — а у селлеров товар почти всегда импортный." },
    { q: "Нужно ли лично приезжать?", a: "Для ООО — нет, оформляем дистанционно через представителя." },
    { q: "Нужны ли директору виза и разрешение на работу?", a: "Да, если гендиректор — нерезидент. Это отдельные процедуры, тоже берём на себя." },
    { q: "Можно ли выйти на Uzum и Ozon на той же компании?", a: "Да, одна компания подходит для всех маркетплейсов." },
  ],
  finalTitle: "Откроем бизнес и счёт под Wildberries",
  finalSub: "Оставьте контакты — подберём форму бизнеса и рассчитаем сроки и стоимость.",
};

const EN: Content = {
  eyebrow: "Wildberries · Uzbekistan · for foreigners",
  h1a: "Become a seller on ",
  h1accent: "Wildberries",
  h1b: " in Uzbekistan — done for you",
  sub: "A foreigner cannot trade on WB as a private individual — you need a business and a bank account in Uzbekistan. We set up an LLC and prepare documents for the marketplace. Remotely.",
  cta: "Set up a business for WB",
  ctaMore: "How it works",
  note: "We work with non-residents from Russia, Kazakhstan, Turkey and other countries.",
  stats: [
    { v: "$605M", l: "sales of goods from Uzbekistan on Wildberries in 2024 — more than doubled in 2025" },
    { v: "100,000 m²", l: "WB warehouse near Tashkent by end of 2026" },
    { v: "7,500", l: "jobs at the logistics center" },
  ],
  barriersTitle: "Why a non-resident can't just start selling",
  barriers: [
    { ic: "🏢", t: "You need a local business", d: "A seller account is opened only for a sole proprietor or a legal entity registered in Uzbekistan." },
    { ic: "🏦", t: "You need an Uzbek bank account", d: "Wildberries transfers proceeds to the business account in an Uzbek bank." },
    { ic: "📄", t: "Documents and status", d: "Certificate, taxpayer ID, adding WB as a commission agent on soliq.uz. Skip a step and reporting breaks." },
  ],
  stepsTitle: "How to launch on Wildberries — 6 steps",
  steps: [
    { t: "Set up an LLC", d: "We recommend an LLC: no residence permit, and only a legal entity can import goods from abroad (Russia, China, etc.)." },
    { t: "Open a bank account", d: "In an Uzbek bank — Wildberries sends your proceeds there." },
    { t: "Register on WB Partners", d: "wildberries.uz → 'For business' → 'Become a seller'." },
    { t: "Upload documents", d: "Passport, registration certificate and bank details." },
    { t: "Add WB as a commission agent", d: "On my.soliq.uz — mandatory for correct reporting." },
    { t: "Choose a scheme and sell", d: "Main scheme — FBW: goods at the WB warehouse, delivery handled by the marketplace." },
  ],
  taxTitle: "What comes next: taxes",
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
  timelineTitle: "Launch in 2 days — step by step",
  timelineSub: "While you handle the product, we prepare everything for launch in two business days.",
  day1t: "Day 1 — set up the company",
  day1d: "Register the LLC, obtain the taxpayer ID and legal address, prepare the document package.",
  day2t: "Day 2 — account, visa, documents",
  day2d: "Open the account, arrange the director's work permit and visa, hand over the package for WB Partners.",
  otherTitle: "Not only Wildberries",
  otherText: "One company works for all marketplaces. We'll help you launch on both Uzum Market and Ozon — on the same LLC, without opening a new business per platform.",
  needTitle: "What we need from you — just three things",
  needSub: "No trips and no queues. Send the details — we do the rest remotely.",
  need: [
    { ic: "🪪", t: "Passport", d: "A scan of the founder's passport (and the director's, if different)." },
    { ic: "🏷️", t: "Name and activity", d: "The company name and type of activity — we'll advise if unsure." },
    { ic: "🛍️", t: "What you'll sell", d: "The product category — to account for labeling and platform specifics." },
  ],
  faqTitle: "FAQ",
  faq: [
    { q: "Can I sell without a local company?", a: "No. A seller account is opened only for a business registered in Uzbekistan." },
    { q: "Why an LLC and not a sole proprietor?", a: "An LLC needs no residence permit, and only a legal entity can import goods — sellers' goods are almost always imported." },
    { q: "Do I need to come in person?", a: "For an LLC — no, we register remotely via a representative." },
    { q: "Does the director need a visa and work permit?", a: "Yes, if the director is a non-resident. We handle these too." },
    { q: "Can I sell on Uzum and Ozon with the same company?", a: "Yes, one company works for all marketplaces." },
  ],
  finalTitle: "We'll set up your business and account for Wildberries",
  finalSub: "Leave your contacts — we'll pick the business form and estimate timing and cost.",
};

const UZ: Content = {
  eyebrow: "Wildberries · O'zbekiston · chet elliklar uchun",
  h1a: "O'zbekistonda ",
  h1accent: "Wildberries",
  h1b: "'da sotuvchi bo'lish — kalit topshirish tamoyilida",
  sub: "Chet ellik WB'da jismoniy shaxs sifatida savdo qila olmaydi — O'zbekistonda biznes va hisob raqam kerak. MChJ ochamiz va marketpleys uchun hujjatlarni tayyorlaymiz. Shaxsan kelmasdan.",
  cta: "WB uchun biznes ochish",
  ctaMore: "Bu qanday ishlaydi",
  note: "Rossiya, Qozog'iston, Turkiya va boshqa davlatlardan kelgan norezidentlar bilan ishlaymiz.",
  stats: [
    { v: "$605 mln", l: "2024-yilda O'zbekistondan Wildberries'dagi savdo — 2025-yilda ikki baravardan ko'p o'sdi" },
    { v: "100 000 m²", l: "2026 oxiriga Toshkent yaqinidagi WB ombori" },
    { v: "7 500", l: "logistika markazidagi ish o'rinlari" },
  ],
  barriersTitle: "Nega norezident shunchaki kirib sota olmaydi",
  barriers: [
    { ic: "🏢", t: "Mahalliy biznes kerak", d: "Sotuvchi kabineti faqat O'zbekistonda ro'yxatdan o'tgan YaTT yoki yuridik shaxsga ochiladi." },
    { ic: "🏦", t: "O'zbek bankida hisob kerak", d: "Wildberries tushumni biznesning O'zbek bankidagi hisobiga o'tkazadi." },
    { ic: "📄", t: "Hujjatlar va maqom", d: "Guvohnoma, STIR, soliq.uz'da WB'ni komissioner sifatida qo'shish. Qadamni o'tkazsangiz — hisobot noto'g'ri bo'ladi." },
  ],
  stepsTitle: "Wildberries'ga chiqish — 6 qadam",
  steps: [
    { t: "MChJ ochamiz", d: "MChJ tavsiya etiladi: propiska va yashash guvohnomasi kerak emas, faqat yuridik shaxs chetdan tovar import qila oladi (Rossiya, Xitoy va b.)." },
    { t: "Hisob raqam ochamiz", d: "O'zbek bankida — Wildberries tushumni shu yerga o'tkazadi." },
    { t: "WB Partners'da ro'yxatdan o'tamiz", d: "wildberries.uz → «Biznes uchun» → «Sotuvchi bo'lish»." },
    { t: "Hujjatlarni yuklaymiz", d: "Pasport, ro'yxatdan o'tish guvohnomasi va bank rekvizitlari." },
    { t: "WB'ni komissioner sifatida qo'shamiz", d: "my.soliq.uz'da — to'g'ri hisobot uchun majburiy qadam." },
    { t: "Sxemani tanlab, sotamiz", d: "Asosiy sxema — FBW: tovar WB omborida, yetkazib berish marketpleys zimmasida." },
  ],
  taxTitle: "Keyin nima kutadi: soliqlar",
  taxSub: "Mintaqadagi eng yengil rejimlardan biri. Aylanma chegaradan past bo'lsa — murakkab QQS emas, oddiy aylanma solig'i.",
  taxHead: ["Soliq", "2026 stavka", "Qachon"],
  taxRows: [
    ["Aylanma solig'i", "4%dan", "aylanma QQS chegarasidan past (≈5 mlrd so'm)"],
    ["QQS (savdo)", "6%", "ixtiyoriy, 12% o'rniga"],
    ["QQS (eksport)", "0%", "eksport tasdiqlansa"],
    ["Foyda solig'i", "15%", "imtiyoz: yangilar uchun birinchi davrda 0%"],
    ["Dividendlar", "10%", "norezidentlarga to'lovlar"],
  ],
  taxNote: "2026-yil stavkalari. Birinchi davrda foyda solig'idan ozod qilish — birinchi marta o'tganlar uchun (O'zR SK). soliq.uz'da tekshiring.",
  priceTitle: "Kalit topshirish narxi",
  priceSub: "Birinchi qator hammaga tegishli, qolgani — direktor norezident bo'lib, ruxsatnoma va viza kerak bo'lsa.",
  priceRows: [
    { name: "Biznesni ro'yxatdan o'tkazish (MChJ)", a: "5 000 000 so'm", b: "≈ $400" },
    { name: "Direktor uchun ishlash ruxsatnomasi", a: "4 200 000 so'm", b: "≈ $336" },
    { name: "Direktor uchun viza", a: "4 000 000 so'm", b: "≈ $320" },
    { name: "Davlat boji", a: "12 772 000 so'm", b: "≈ $1 022" },
  ],
  totalLabel: "Jami — 2 kunda chiqish",
  totalSum: "25 972 000 so'm",
  totalUsd: "≈ $2 078 · 2 kun",
  timelineTitle: "2 kunda chiqish — bosqichma-bosqich",
  timelineSub: "Siz tovar bilan shug'ullanasiz, biz ikki ish kunida start uchun hammasini tayyorlaymiz.",
  day1t: "1-kun — kompaniya ochamiz",
  day1d: "MChJ ro'yxatdan o'tkazamiz, STIR va yuridik manzil olamiz, hujjatlar to'plamini tayyorlaymiz.",
  day2t: "2-kun — hisob, viza, hujjatlar",
  day2d: "Hisob ochamiz, direktorga ruxsatnoma va viza rasmiylashtiramiz, WB Partners uchun to'plamni beramiz.",
  otherTitle: "Faqat Wildberries emas",
  otherText: "Ochilgan kompaniya barcha marketpleyslar uchun mos. Uzum Market va Ozon'ga ham chiqishga yordam beramiz — o'sha MChJ'da, har biri uchun yangi biznes ochmasdan.",
  needTitle: "Sizdan faqat uch narsa kerak",
  needSub: "Safar va navbat yo'q. Ma'lumot yuborasiz — qolganini biz masofadan bajaramiz.",
  need: [
    { ic: "🪪", t: "Pasport", d: "Ta'sischi (va boshqa bo'lsa, direktor) pasporti nusxasi." },
    { ic: "🏷️", t: "Nomi va faoliyat turi", d: "Kompaniya nomi va faoliyati — kerak bo'lsa maslahat beramiz." },
    { ic: "🛍️", t: "Nima sotmoqchisiz", d: "Tovar toifasi — markirovka va platforma xususiyatlarini hisobga olish uchun." },
  ],
  faqTitle: "Ko'p beriladigan savollar",
  faq: [
    { q: "Mahalliy kompaniyasiz sotish mumkinmi?", a: "Yo'q. Sotuvchi kabineti faqat O'zbekistonda ro'yxatdan o'tgan biznesga ochiladi." },
    { q: "Nega MChJ, YaTT emas?", a: "MChJ propiska talab qilmaydi, faqat yuridik shaxs tovar import qila oladi — sotuvchilar tovari deyarli har doim importdan." },
    { q: "Shaxsan kelish kerakmi?", a: "MChJ uchun — yo'q, vakil orqali masofadan ro'yxatdan o'tkazamiz." },
    { q: "Direktorga viza va ruxsatnoma kerakmi?", a: "Ha, agar direktor norezident bo'lsa. Buni ham o'z zimmamizga olamiz." },
    { q: "Bir kompaniyada Uzum va Ozon'ga chiqish mumkinmi?", a: "Ha, bitta kompaniya barcha marketpleyslar uchun mos." },
  ],
  finalTitle: "Wildberries uchun biznes va hisob ochamiz",
  finalSub: "Kontaktlaringizni qoldiring — biznes shaklini tanlab, muddat va narxni hisoblaymiz.",
};

const ZH: Content = {
  eyebrow: "Wildberries · 乌兹别克斯坦 · 面向外国人",
  h1a: "在乌兹别克斯坦成为 ",
  h1accent: "Wildberries",
  h1b: " 卖家 — 全程代办",
  sub: "外国人无法以个人身份在 WB 销售——需要在乌兹别克斯坦拥有企业和银行账户。我们注册有限责任公司并准备平台文件。无需亲自到场。",
  cta: "为 WB 注册企业",
  ctaMore: "如何运作",
  note: "我们服务来自俄罗斯、哈萨克斯坦、土耳其等国的非居民。",
  stats: [
    { v: "$6.05 亿", l: "2024 年乌兹别克斯坦在 Wildberries 的销售额——2025 年增长逾一倍" },
    { v: "100 000 m²", l: "2026 年底塔什干附近的 WB 仓库" },
    { v: "7 500", l: "物流中心的工作岗位" },
  ],
  barriersTitle: "为什么非居民不能直接销售",
  barriers: [
    { ic: "🏢", t: "需要本地企业", d: "卖家账户只对在乌兹别克斯坦注册的个体户或法人开放。" },
    { ic: "🏦", t: "需要乌兹别克银行账户", d: "Wildberries 将货款转入企业在乌兹别克银行的账户。" },
    { ic: "📄", t: "文件与资质", d: "注册证、税号，并在 soliq.uz 上将 WB 添加为佣金代理。漏一步，报税就会出错。" },
  ],
  stepsTitle: "如何入驻 Wildberries — 6 步",
  steps: [
    { t: "注册有限责任公司", d: "推荐有限责任公司：无需居留许可，且只有法人才能从境外进口商品（俄罗斯、中国等）。" },
    { t: "开设银行账户", d: "在乌兹别克银行——Wildberries 将货款转入此账户。" },
    { t: "在 WB Partners 注册", d: "wildberries.uz →「企业」→「成为卖家」。" },
    { t: "上传文件", d: "护照、注册证和银行信息。" },
    { t: "将 WB 添加为佣金代理", d: "在 my.soliq.uz 上——正确报税的必要步骤。" },
    { t: "选择模式并销售", d: "主要模式为 FBW：货物存放 WB 仓库，配送由平台负责。" },
  ],
  taxTitle: "接下来：税务",
  taxSub: "本地区最宽松的税制之一。营业额低于门槛时，缴纳简单的营业额税，而非复杂增值税。",
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
  timelineTitle: "2 天完成 — 分步进行",
  timelineSub: "您专注于商品，我们在两个工作日内准备好一切。",
  day1t: "第 1 天 — 注册公司",
  day1d: "注册有限责任公司，获取税号和法定地址，准备文件包。",
  day2t: "第 2 天 — 账户、签证、文件",
  day2d: "开设账户，办理董事工作许可和签证，交付 WB Partners 所需文件包。",
  otherTitle: "不止 Wildberries",
  otherText: "注册的公司适用于所有电商平台。我们还能助您入驻 Uzum Market 和 Ozon——用同一家公司，无需为每个平台单独注册。",
  needTitle: "只需您提供三样",
  needSub: "无需奔波和排队。您发来资料——其余由我们远程完成。",
  need: [
    { ic: "🪪", t: "护照", d: "创始人（及董事，若不同）的护照扫描件。" },
    { ic: "🏷️", t: "名称和经营范围", d: "公司名称和经营范围——不确定我们可建议。" },
    { ic: "🛍️", t: "计划销售什么", d: "商品类别——以便考虑标识和平台要求。" },
  ],
  faqTitle: "常见问题",
  faq: [
    { q: "没有本地公司能销售吗？", a: "不能。卖家账户只对在乌兹别克斯坦注册的企业开放。" },
    { q: "为什么选有限责任公司而非个体户？", a: "有限责任公司无需居留许可，且只有法人能进口商品——卖家的货物几乎都是进口的。" },
    { q: "需要亲自到场吗？", a: "有限责任公司无需——我们通过代理远程注册。" },
    { q: "董事需要签证和工作许可吗？", a: "是的，若董事为非居民。我们也一并代办。" },
    { q: "同一家公司能入驻 Uzum 和 Ozon 吗？", a: "可以，一家公司适用于所有电商平台。" },
  ],
  finalTitle: "为 Wildberries 注册企业并开户",
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
        <div className="container mx-auto px-4 pt-28 sm:pt-32 pb-14">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 rounded-full px-3 py-1">
                {c.eyebrow}
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight text-balance">
                {c.h1a}
                <span className="text-emerald-700">{c.h1accent}</span>
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
              <div className="text-5xl font-extrabold text-emerald-700 tracking-tight">{c.stats[0].v}</div>
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
              <div className="flex-none w-11 h-11 rounded-xl bg-emerald-600 text-white font-bold text-xl flex items-center justify-center">{i + 1}</div>
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
                  <td className="py-2.5 pr-4 font-mono text-emerald-700 whitespace-nowrap">{r[1]}</td>
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
        <div className="mt-4 rounded-3xl bg-emerald-700 text-white p-6 flex flex-wrap justify-between items-center gap-4">
          <div className="font-bold text-lg">{c.totalLabel}</div>
          <div className="text-right">
            <div className="text-2xl font-extrabold tabular-nums">{c.totalSum}</div>
            <div className="text-sm opacity-90">{c.totalUsd}</div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container mx-auto px-4 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{c.timelineTitle}</h2>
        <p className="mt-2 text-slate-600 max-w-2xl">{c.timelineSub}</p>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {[[c.day1t, c.day1d], [c.day2t, c.day2d]].map(([t, d], i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6">
              <span className="inline-block text-xs font-bold uppercase tracking-wide text-emerald-800 bg-emerald-100 rounded px-2 py-0.5">{t.split(" — ")[0]}</span>
              <h3 className="mt-3 font-bold">{t.split(" — ")[1] ?? t}</h3>
              <p className="mt-1.5 text-sm text-slate-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Other marketplaces */}
      <section className="container mx-auto px-4 py-8">
        <div className="rounded-3xl bg-emerald-700 text-white p-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{c.otherTitle}</h2>
          <p className="mt-3 text-base opacity-95 max-w-3xl">{c.otherText}</p>
        </div>
      </section>

      {/* What we need */}
      <section className="container mx-auto px-4 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{c.needTitle}</h2>
        <p className="mt-2 text-slate-600 max-w-2xl">{c.needSub}</p>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {c.need.map((n, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="text-2xl">{n.ic}</div>
              <h3 className="mt-3 font-bold">{n.t}</h3>
              <p className="mt-1.5 text-sm text-slate-600">{n.d}</p>
            </div>
          ))}
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
                <span className="text-emerald-600 text-xl transition group-open:rotate-45">+</span>
              </summary>
              <p className="pb-4 text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 pb-20">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance text-white">{c.finalTitle}</h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto">{c.finalSub}</p>
          <a href={formHref} className="mt-7 inline-flex items-center rounded-xl bg-violet-600 px-8 py-4 font-bold text-white transition hover:bg-violet-700">
            {c.cta} →
          </a>
        </div>
      </section>
    </div>
  );
}

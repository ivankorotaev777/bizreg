"use client";

import { useState } from "react";
import { IBM_Plex_Sans, Press_Start_2P, Silkscreen } from "next/font/google";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  FileSpreadsheet,
  HelpCircle,
  Landmark,
  MessageCircle,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  Users,
} from "lucide-react";

const pressStart = Press_Start_2P({
  subsets: ["latin", "cyrillic"],
  weight: "400",
});
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});
const silk = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
});

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type Activity = {
  id: number;
  title: string;
  description: string;
};

type FeaturedActivity = {
  title: string;
  description: string;
};

const activities: Activity[] = [
  { id: 1, title: "Разработка и реализация программного обеспечения", description: "Создание ПО, передача прав использования, отчуждение прав, а также разработка компьютерных игр для любых платформ." },
  { id: 2, title: "Внедрение, поддержка и сопровождение ПО", description: "Услуги по внедрению программных решений, сопровождению, обучению и поддержке пользователей." },
  { id: 3, title: "Доработка и модификация ПО", description: "Развитие и адаптация действующих программных продуктов под задачи бизнеса." },
  { id: 4, title: "Создание и сопровождение баз данных", description: "Проектирование, наполнение, предоставление доступа, поддержка и развитие баз данных в информационных системах." },
  { id: 5, title: "Обработка данных с применением ПО", description: "Автоматизированная обработка данных с использованием специализированного программного обеспечения." },
  { id: 6, title: "Монетизация через собственное ПО", description: "Доход от рекламы и дополнительных функций в собственных программных продуктах." },
  { id: 7, title: "Разработка и внедрение АСУ", description: "Создание и внедрение автоматизированных систем управления для процессов компаний." },
  { id: 8, title: "Системный анализ, бизнес-анализ и IT-консалтинг", description: "Оценка IT-потребностей, оптимизация процессов и формирование технических требований." },
  { id: 9, title: "Аудит информационных систем и ПО", description: "Комплексная проверка состояния IT-систем, архитектуры и программных решений." },
  { id: 10, title: "Автоматизированные услуги на базе собственного ПО", description: "Поиск, сортировка и предоставление данных по запросам клиентов через собственные платформы." },
  { id: 11, title: "Аутсорсинг бизнес-процессов (BPO)", description: "Call center, бухгалтерия, маркетинг и другие экспортные сервисы аутсорсинга." },
  { id: 12, title: "Микро-, опто- и наноэлектроника, embedded software", description: "Разработка высокотехнологичных устройств, материалов, технологий и встроенного ПО." },
  { id: 13, title: "Передача данных, радиотехнологии и RFID", description: "Исследование, проектирование, тестирование и внедрение профильных технологических решений." },
  { id: 14, title: "Прототипирование high-tech устройств", description: "Разработка прототипов и непроизводственное изготовление программно-аппаратных комплексов." },
  { id: 15, title: "Техническая и криптографическая защита информации", description: "Решения в сфере информационной безопасности, включая применение ЭЦП." },
  { id: 16, title: "Интернет вещей (IoT)", description: "Разработка, внедрение и запуск решений для сети взаимодействующих устройств." },
  { id: 17, title: "Обучение в сфере IT", description: "IT-образование, включая онлайн-обучение и языковую подготовку в рамках требований." },
  { id: 18, title: "Экспорт информационных услуг через интернет", description: "Предоставление экспортных цифровых и консалтинговых услуг онлайн." },
  { id: 19, title: "Мультимедиа и дизайн", description: "Web, graphic, game, 3D, motion и UI/UX-дизайн в цифровых проектах." },
  { id: 20, title: "Анимационные и мультипликационные продукты", description: "Создание анимации и мультимедийных проектов с использованием ПО." },
  { id: 21, title: "Венчурное финансирование и акселерация в IT", description: "Запуск и развитие венчурных инициатив и акселерационных программ." },
  { id: 22, title: "Услуги в сфере киберспорта", description: "Организация и развитие киберспортивных сервисов и экосистем." },
  { id: 23, title: "Экспортно-ориентированные сервисные компании", description: "Компании с преобладанием экспортных услуг и деятельностью в двух и более странах." },
  { id: 24, title: "Образовательные услуги в сфере BPO-экспорта", description: "Обучающие программы в рамках экспортной BPO-деятельности через интернет." },
  { id: 25, title: "Экспорт KPO-услуг", description: "Экспорт аутсорсинга процессов знаний и экспертных интеллектуальных сервисов." },
  { id: 26, title: "Colocation и дата-центры", description: "Аренда IT-инфраструктуры, хранение и обработка данных в ЦОД." },
  { id: 27, title: "R&D: научно-исследовательская и опытно-конструкторская деятельность", description: "Разработка новых технологий, исследований и прикладных инженерных решений." },
  { id: 28, title: "Аэрокосмические технологии", description: "Технологические решения и разработки для аэрокосмической отрасли." },
  { id: 29, title: "Стартапы программы «Цифровые стартапы»", description: "Стартап-проекты, соответствующие критериям профильной программы." },
  { id: 30, title: "Digital media / интернет-СМИ", description: "Интернет-СМИ с редакционным контентом при соблюдении критериев по аудитории и деятельности." },
];

const featuredActivities: FeaturedActivity[] = [
  {
    title: "Разработка ПО",
    description:
      "SaaS, web-платформы, мобильные приложения, корпоративные системы, game development",
  },
  {
    title: "Внедрение и сопровождение IT-решений",
    description:
      "Внедрение ПО, техническая поддержка, сопровождение, обучение пользователей",
  },
  {
    title: "Data & Automation",
    description:
      "Базы данных, обработка данных, автоматизация процессов, управленческие системы",
  },
  {
    title: "IT-консалтинг и аудит",
    description:
      "Системный анализ, бизнес-анализ, IT-консалтинг, аудит информационных систем",
  },
  {
    title: "BPO / KPO / Export Services",
    description:
      "Аутсорсинг бизнес-процессов, экспорт IT-услуг, knowledge process outsourcing",
  },
  {
    title: "Дизайн и мультимедиа",
    description:
      "UI/UX, веб-дизайн, графический дизайн, motion, 3D, анимация",
  },
  {
    title: "Кибербезопасность",
    description:
      "Техническая и криптографическая защита информации, ЭЦП, security services",
  },
  {
    title: "IoT / Hardware / R&D / Startups",
    description:
      "Интернет вещей, программно-аппаратные решения, high-tech разработки, R&D, стартапы",
  },
];

const faq = [
  ["Можно ли сначала зарегистрировать компанию, а потом подаваться в IT Park?", "Да, так обычно и происходит: сначала регистрация юрлица в Узбекистане, затем подготовка и подача заявки в IT Park."],
  ["Подходит ли моя деятельность под IT Park?", "Мы проводим предварительную проверку по вашему описанию деятельности и подсказываем, как корректно оформить профиль компании."],
  ["Что делать, если я иностранный учредитель?", "Мы сопровождаем иностранных учредителей: объясняем шаги, список документов и формат удаленной работы."],
  ["Можно ли открыть компанию удаленно?", "Да, в большинстве кейсов процесс можно организовать дистанционно при корректной подготовке документов."],
  ["Помогаете ли вы с юридическим адресом?", "Да, у нас предусмотрены специальные условия на юридический адрес для клиентов этого предложения."],
  ["Что входит в пакет регистрации?", "Консультация по структуре, подготовка регистрационного пакета, регистрация юрлица и поддержка по следующим шагам."],
  ["Сколько времени занимает процесс?", "Срок зависит от кейса и готовности документов, но мы сразу даем реалистичный таймлайн и держим вас в курсе."],
  ["Обязательно ли сразу готовить бизнес-план?", "Для самой регистрации компании бизнес-план обычно не обязателен, но он нужен на этапе подачи в IT Park."],
  ["Подходит ли IT Park только для классических IT-компаний?", "Нет, кроме классического IT могут подойти BPO, консалтинг, digital services и другие экспортные направления."],
  ["Какие документы нужны на старте?", "Базовый список зависит от состава учредителей и выбранной формы, мы отправляем персональный чек-лист после заявки."],
];

const navItems = [
  ["offer", "offer"],
  ["activities", "activities"],
  ["benefits", "benefits"],
  ["services", "services"],
  ["faq", "faq"],
  ["contact", "contact"],
] as const;

const itparkText = {
  ru: {
    badge: "Специальное предложение BizReg",
    heroTitle: "Спецусловия для открытия компании в IT Park",
    heroDesc: "Получите скидку {discount} на регистрацию компании и специальные условия на юридический адрес, если открываетесь через BizReg для подачи в IT Park.",
    heroCta: "Получить спецпредложение",
    telegram: "Написать в Telegram",
    nav: { offer: "Оффер", activities: "Виды деятельности", benefits: "Преимущества IT Park", services: "Что входит", faq: "FAQ", contact: "Заявка" },
    activitiesTitle: "Какие компании могут подойти для подачи в IT Park",
    activitiesDesc: "IT Park рассматривает компании, зарегистрированные в Узбекистане и работающие по утвержденным направлениям в IT, software, outsourcing, high-tech, digital services, BPO, consulting и смежных областях.",
    fullListBtn: "Смотреть полный перечень видов деятельности",
    benefitsTitle: "Почему компании выбирают IT Park Uzbekistan",
    offerTitle: "Специальные условия для тех, кто открывает компанию под IT Park через BizReg",
    servicesTitle: "Что входит в сопровождение:",
    reviewsTitle: "Кейсы и отзывы",
    faqTitle: "FAQ",
    contactTitle: "Планируете открыть компанию под IT Park?",
    contactDesc: "Оставьте заявку — мы подскажем, подходит ли ваш бизнес под требования IT Park, и предложим выгодные условия на регистрацию и юридический адрес.",
    getOffer: "Получить предложение",
  },
  en: {
    badge: "Special Offer from BizReg",
    heroTitle: "Special terms for opening a company in IT Park",
    heroDesc: "Get a {discount} discount on company registration and special terms for a legal address when launching through BizReg for IT Park application.",
    heroCta: "Get special offer",
    telegram: "Message on Telegram",
    nav: { offer: "Offer", activities: "Activities", benefits: "IT Park benefits", services: "Scope", faq: "FAQ", contact: "Apply" },
    activitiesTitle: "Which companies can qualify for IT Park application",
    activitiesDesc: "IT Park reviews companies registered in Uzbekistan that operate in approved areas: IT, software, outsourcing, high-tech, digital services, BPO, consulting, and related fields.",
    fullListBtn: "See full list of activity types",
    benefitsTitle: "Why companies choose IT Park Uzbekistan",
    offerTitle: "Special terms for those opening a company for IT Park via BizReg",
    servicesTitle: "What is included in support:",
    reviewsTitle: "Cases and testimonials",
    faqTitle: "FAQ",
    contactTitle: "Planning to open a company for IT Park?",
    contactDesc: "Leave a request — we will assess whether your business fits IT Park requirements and offer favorable terms for registration and legal address.",
    getOffer: "Get an offer",
  },
  kk: {
    badge: "BizReg арнайы ұсынысы",
    heroTitle: "IT Park үшін компания ашуға арнайы шарттар",
    heroDesc: "BizReg арқылы IT Park-қа өтінім беру үшін компания ашсаңыз, тіркеуге {discount} жеңілдік және заңды мекенжайға арнайы шарттар алыңыз.",
    heroCta: "Арнайы ұсыныс алу",
    telegram: "Telegram-ға жазу",
    nav: { offer: "Ұсыныс", activities: "Қызметтер", benefits: "IT Park артықшылықтары", services: "Құрамы", faq: "FAQ", contact: "Өтінім" },
    activitiesTitle: "IT Park-қа өтінімге қандай компаниялар сәйкес келуі мүмкін",
    activitiesDesc: "IT Park Өзбекстанда тіркелген және IT, software, outsourcing, high-tech, digital services, BPO, consulting және аралас бағыттарда жұмыс істейтін компанияларды қарайды.",
    fullListBtn: "Қызмет түрлерінің толық тізімін көру",
    benefitsTitle: "Неліктен компаниялар IT Park Uzbekistan-ды таңдайды",
    offerTitle: "BizReg арқылы IT Park үшін компания ашатындарға арнайы шарттар",
    servicesTitle: "Сүйемелдеуге не кіреді:",
    reviewsTitle: "Кейстер мен пікірлер",
    faqTitle: "FAQ",
    contactTitle: "IT Park үшін компания ашуды жоспарлап отырсыз ба?",
    contactDesc: "Өтінім қалдырыңыз — сіздің бизнесіңіз IT Park талаптарына сәйкес келе ме, соны тексеріп, тіркеу мен заңды мекенжайға тиімді шарт ұсынамыз.",
    getOffer: "Ұсыныс алу",
  },
  uz: {
    badge: "BizReg maxsus taklifi",
    heroTitle: "IT Park uchun kompaniya ochish bo'yicha maxsus shartlar",
    heroDesc: "BizReg orqali IT Parkga topshirish uchun kompaniya ochsangiz, ro'yxatdan o'tkazishga {discount} chegirma va yuridik manzil uchun maxsus shartlarni oling.",
    heroCta: "Maxsus taklifni olish",
    telegram: "Telegramga yozish",
    nav: { offer: "Taklif", activities: "Yo'nalishlar", benefits: "IT Park afzalliklari", services: "Tarkibi", faq: "FAQ", contact: "Ariza" },
    activitiesTitle: "IT Parkga topshirish uchun qaysi kompaniyalar mos kelishi mumkin",
    activitiesDesc: "IT Park O'zbekistonda ro'yxatdan o'tgan va IT, software, outsourcing, high-tech, digital services, BPO, consulting hamda turdosh yo'nalishlarda ishlovchi kompaniyalarni ko'rib chiqadi.",
    fullListBtn: "Faoliyat turlarining to'liq ro'yxatini ko'rish",
    benefitsTitle: "Nega kompaniyalar IT Park Uzbekistan'ni tanlaydi",
    offerTitle: "BizReg orqali IT Park uchun kompaniya ochuvchilar uchun maxsus shartlar",
    servicesTitle: "Xizmat tarkibiga nimalar kiradi:",
    reviewsTitle: "Keyslar va fikrlar",
    faqTitle: "FAQ",
    contactTitle: "IT Park uchun kompaniya ochishni rejalashtiryapsizmi?",
    contactDesc: "Ariza qoldiring — biznesingiz IT Park talablariga mos kelishini tekshirib, ro'yxatdan o'tkazish va yuridik manzil uchun qulay shartlarni taklif qilamiz.",
    getOffer: "Taklif olish",
  },
  zh: {
    badge: "BizReg 特别优惠",
    heroTitle: "在 IT Park 开设公司的特别条件",
    heroDesc: "通过 BizReg 为申请 IT Park 开设公司，可获得公司注册 {discount} 折扣及法定地址特别条件。",
    heroCta: "获取特别优惠",
    telegram: "通过 Telegram 联系",
    nav: { offer: "优惠", activities: "方向", benefits: "IT Park 优势", services: "服务内容", faq: "FAQ", contact: "申请" },
    activitiesTitle: "哪些公司可能符合 IT Park 申请条件",
    activitiesDesc: "IT Park 会审核在乌兹别克斯坦注册并从事 IT、software、outsourcing、high-tech、digital services、BPO、consulting 及相关领域的公司。",
    fullListBtn: "查看完整活动类型列表",
    benefitsTitle: "为什么公司选择 IT Park Uzbekistan",
    offerTitle: "通过 BizReg 为 IT Park 开设公司的特别条件",
    servicesTitle: "服务包含内容：",
    reviewsTitle: "案例与评价",
    faqTitle: "FAQ",
    contactTitle: "计划为 IT Park 开设公司吗？",
    contactDesc: "提交申请——我们会评估您的业务是否符合 IT Park 要求，并提供公司注册和法定地址的优惠条件。",
    getOffer: "获取方案",
  },
} as const;

const itparkContent = {
  ru: {
    heroFeatures: ["Регистрация компании под ключ", "Специальные условия для IT Park", "Юридический адрес", "Поддержка на русском / английском / узбекском"],
    featuredActivities,
    activitiesHelp: "Не уверены, подходит ли ваш вид деятельности? Оставьте заявку — мы предварительно проверим ваш кейс и подскажем следующий шаг.",
    benefits: [
      ["0% по ключевым налогам", "Налоги на прибыль, соцналог, НДС на импортируемые услуги, налог на имущество и землю."],
      ["Льготная нагрузка на выплаты", "5% налог на дивиденды и 7,5% налог на доходы физических лиц."],
      ["Международный формат работы", "Возможность выплачивать дивиденды и заработную плату в иностранной валюте."],
      ["Проще для иностранных специалистов", "Для иностранных сотрудников не требуется разрешение на работу."],
      ["Softlanding-поддержка", "Юридическое и налоговое сопровождение, банковские и HR-консультации, One-Stop Shop."],
      ["Дополнительные программы", "В рамках Zero Risk возможны бесплатный офис, оборудование и компенсация зарплаты до 15%."],
    ],
    offerCards: [
      { title: "Скидка 20% на регистрацию компании", desc: "Регистрация компании под ключ.", oldPrice: "5 000 000 сум", newPrice: "3 990 000 сум" },
      { title: "Специальные условия на юридический адрес", desc: "Юридический адрес для компании.", oldPrice: "2 600 000 сум", newPrice: "1 990 000 сум" },
      { title: "Бухгалтерский учет (пакет Start-up)", desc: "Стартовый пакет учета включает сдачу всех отчетов и базовые операции.", newPrice: "2 500 000 сум" },
      { title: "Помощь в заполнении бизнес-плана", desc: "Наш 5 летний опыт поможет вам правильно заполнить бизнес план.", newPrice: "1 990 000 сум" },
    ],
    offerNote: "Предложение действует для клиентов, которые открывают компанию через BizReg для подачи в IT Park.",
    services: [
      "Консультация по открытию компании и регистрации в IT park",
      "Подготовка регистрационного пакета",
      "Регистрация юридического лица",
      "Оформление юридического адреса",
      "Сопровождение по открытию счета",
      "Консультация по подготовке к подаче в IT Park",
    ],
    reviews: [
      ["Founder, IT-сервис", "«Открыли компанию удаленно и быстро вышли на следующий этап подачи в IT Park.»"],
      ["Founder, digital agency", "«Понравилась прозрачность условий и скорость сопровождения без бюрократии.»"],
      ["Founder, BPO-команда", "«Получили удобный формат запуска под экспорт и понятный план действий.»"],
    ],
    faq,
    homeLinkPrefix: "Для главной страницы BizReg:",
    homeLinkText: "перейти на основной сайт",
    footer: "BizReg. Помогаем разобраться, подходит ли ваш кейс под IT Park, и сопровождаем запуск компании в Узбекистане.",
  },
  en: {
    heroFeatures: ["Turnkey company registration", "Special terms for IT Park", "Legal address", "Support in Russian / English / Uzbek"],
    featuredActivities: [
      { title: "Software Development", description: "SaaS, web platforms, mobile apps, enterprise systems, game development" },
      { title: "IT Solution Implementation & Support", description: "Software implementation, technical support, maintenance, user training" },
      { title: "Data & Automation", description: "Databases, data processing, process automation, management systems" },
      { title: "IT Consulting & Audit", description: "System analysis, business analysis, IT consulting, information systems audit" },
      { title: "BPO / KPO / Export Services", description: "Business process outsourcing, IT services export, knowledge process outsourcing" },
      { title: "Design & Multimedia", description: "UI/UX, web design, graphic design, motion, 3D, animation" },
      { title: "Cybersecurity", description: "Technical and cryptographic information protection, digital signature, security services" },
      { title: "IoT / Hardware / R&D / Startups", description: "IoT, hardware-software solutions, high-tech development, R&D, startups" },
    ],
    activitiesHelp: "Not sure if your business activity qualifies? Submit a request — we will pre-check your case and suggest the next step.",
    benefits: [
      ["0% on key taxes", "Corporate tax, social tax, VAT on imported services, property and land tax."],
      ["Reduced payout taxes", "5% dividend tax and 7.5% personal income tax."],
      ["International operating format", "Ability to pay dividends and salaries in foreign currency."],
      ["Easier for foreign specialists", "No work permit required for foreign employees."],
      ["Softlanding support", "Legal and tax support, banking and HR consulting, One-Stop Shop."],
      ["Additional programs", "Within Zero Risk: free office, equipment, and up to 15% salary compensation."],
    ],
    offerCards: [
      { title: "20% discount on company registration", desc: "Turnkey company registration.", oldPrice: "5 000 000 UZS", newPrice: "3 990 000 UZS" },
      { title: "Special terms for legal address", desc: "Legal address for your company.", oldPrice: "2 600 000 UZS", newPrice: "1 990 000 UZS" },
      { title: "Accounting (Start-up package)", desc: "Starter package includes all reporting and basic operations.", newPrice: "2 500 000 UZS" },
      { title: "Business plan preparation support", desc: "Our 5 years of experience helps you prepare a correct business plan.", newPrice: "1 990 000 UZS" },
    ],
    offerNote: "Offer applies to clients opening a company through BizReg for IT Park application.",
    services: [
      "Consultation on company setup and IT Park registration",
      "Registration package preparation",
      "Legal entity registration",
      "Legal address setup",
      "Bank account opening support",
      "Consultation for IT Park application preparation",
    ],
    reviews: [
      ["Founder, IT service", "\"We opened a company remotely and quickly moved to the next IT Park application stage.\""],
      ["Founder, digital agency", "\"Transparent terms and fast support with no bureaucracy.\""],
      ["Founder, BPO team", "\"We got a convenient export launch format and a clear action plan.\""],
    ],
    faq: [
      ["Can we register a company first and apply to IT Park later?", "Yes. Usually you first register a legal entity in Uzbekistan, then prepare and submit to IT Park."],
      ["Does my activity fit IT Park?", "We do a preliminary check and suggest how to position your company profile correctly."],
      ["What if I am a foreign founder?", "We support foreign founders with process guidance, documents, and remote format."],
      ["Can I open a company remotely?", "Yes, in most cases the process can be arranged remotely with proper paperwork."],
      ["Do you help with legal address?", "Yes, we provide special legal address terms within this offer."],
      ["What is included in the registration package?", "Consultation, package preparation, legal entity registration, and next-step support."],
      ["How long does the process take?", "Timing depends on case details and document readiness; we provide a realistic timeline."],
      ["Is a business plan required immediately?", "Usually not for registration itself, but required for the IT Park application stage."],
      ["Is IT Park only for classic IT companies?", "No. BPO, consulting, digital services and other export activities may also qualify."],
      ["What documents are needed to start?", "The list depends on founder structure and entity type; we provide a personalized checklist."],
    ],
    homeLinkPrefix: "Main BizReg page:",
    homeLinkText: "go to main site",
    footer: "BizReg. We help assess if your case fits IT Park and support company launch in Uzbekistan.",
  },
  kk: {
    heroFeatures: ["Компанияны тіркеу толық қызмет", "IT Park үшін арнайы шарттар", "Заңды мекенжай", "Орыс / ағылшын / өзбек тілдерінде қолдау"],
    featuredActivities: [
      { title: "Бағдарламалық жасақтама әзірлеу", description: "SaaS, web-платформалар, мобильді қосымшалар, корпоративтік жүйелер, game development" },
      { title: "IT шешімдерін енгізу және сүйемелдеу", description: "ПО енгізу, техникалық қолдау, сүйемелдеу, пайдаланушыларды оқыту" },
      { title: "Data & Automation", description: "Дерекқорлар, деректерді өңдеу, процестерді автоматтандыру, басқару жүйелері" },
      { title: "IT консалтинг және аудит", description: "Жүйелік талдау, бизнес-талдау, IT консалтинг, ақпараттық жүйелер аудиті" },
      { title: "BPO / KPO / Export Services", description: "Бизнес-процестер аутсорсингі, IT-қызмет экспорт, knowledge process outsourcing" },
      { title: "Дизайн және мультимедиа", description: "UI/UX, веб-дизайн, графикалық дизайн, motion, 3D, анимация" },
      { title: "Киберқауіпсіздік", description: "Техникалық және криптографиялық қорғау, ЭЦҚ, security services" },
      { title: "IoT / Hardware / R&D / Startups", description: "IoT, hardware/software шешімдер, high-tech әзірлемелер, R&D, стартаптар" },
    ],
    activitiesHelp: "Қызмет түріңіз сәйкес келетініне сенімді емессіз бе? Өтінім қалдырыңыз — біз алдын ала тексеріп, келесі қадамды ұсынамыз.",
    benefits: [
      ["Негізгі салықтар бойынша 0%", "Пайда салығы, әлеуметтік салық, импорттық қызметтерге ҚҚС, мүлік және жер салығы."],
      ["Төлемдерге жеңілдетілген жүктеме", "Дивидендке 5% және жеке табысқа 7,5% салық."],
      ["Халықаралық жұмыс форматы", "Дивидендтер мен жалақыны шетел валютасында төлеу мүмкіндігі."],
      ["Шетелдік мамандарға оңай", "Шетелдік қызметкерлерге жұмыс рұқсаты қажет емес."],
      ["Softlanding қолдау", "Құқықтық және салықтық сүйемелдеу, банк және HR кеңестері, One-Stop Shop."],
      ["Қосымша бағдарламалар", "Zero Risk аясында тегін кеңсе, жабдық және жалақының 15%-ына дейін өтемақы."],
    ],
    offerCards: [
      { title: "Компания тіркеуге 20% жеңілдік", desc: "Компанияны толық тіркеу.", oldPrice: "5 000 000 сум", newPrice: "3 990 000 сум" },
      { title: "Заңды мекенжайға арнайы шарттар", desc: "Компания үшін заңды мекенжай.", oldPrice: "2 600 000 сум", newPrice: "1 990 000 сум" },
      { title: "Бухгалтерия (Start-up пакеті)", desc: "Бастапқы пакет барлық есептерді тапсыру мен базалық операцияларды қамтиды.", newPrice: "2 500 000 сум" },
      { title: "Бизнес-жоспар толтыруға көмек", desc: "5 жылдық тәжірибеміз бизнес-жоспарды дұрыс толтыруға көмектеседі.", newPrice: "1 990 000 сум" },
    ],
    offerNote: "Ұсыныс IT Park-қа өтінім беру үшін BizReg арқылы компания ашатын клиенттерге арналған.",
    services: ["Компания ашу және IT Park тіркеу бойынша кеңес", "Тіркеу пакетiн дайындау", "Заңды тұлғаны тіркеу", "Заңды мекенжай рәсімдеу", "Шот ашуға сүйемелдеу", "IT Park-қа өтінім дайындау бойынша кеңес"],
    reviews: [["Founder, IT service", "«Компанияны қашықтан ашып, IT Park-қа келесі кезеңге тез шықтық.»"], ["Founder, digital agency", "«Ашық шарттар және бюрократиясыз жылдам сүйемелдеу ұнады.»"], ["Founder, BPO team", "«Экспортқа ыңғайлы формат пен анық жоспар алдық.»"]],
    faq: [
      ["Алдымен компанияны тіркеп, кейін IT Park-қа өтінім беруге бола ма?", "Иә. Әдетте алдымен Өзбекстанда заңды тұлға тіркеледі, содан кейін IT Park-қа өтінім дайындалады."],
      ["Менің қызметім IT Park-қа сәйкес келе ме?", "Біз алдын ала тексеру жасап, компания профилін қалай дұрыс көрсету керегін айтамыз."],
      ["Егер құрылтайшы шетелдік болса не істеу керек?", "Біз шетелдік құрылтайшыларға құжаттар, қадамдар және қашықтан формат бойынша толық сүйемелдеу жасаймыз."],
      ["Компанияны қашықтан ашуға бола ма?", "Иә, көп жағдайда құжаттар дұрыс дайындалса, процесті қашықтан ұйымдастыруға болады."],
      ["Заңды мекенжай бойынша көмектесесіздер ме?", "Иә, осы ұсыныс аясында заңды мекенжайға арнайы шарттар бар."],
      ["Тіркеу пакетіне не кіреді?", "Кеңес, тіркеу пакетін дайындау, заңды тұлғаны тіркеу және келесі қадамдар бойынша қолдау."],
      ["Процесс қанша уақыт алады?", "Мерзім кейстің күрделілігі мен құжаттардың дайындығына байланысты. Біз нақты таймлайн береміз."],
      ["Бизнес-жоспарды бірден дайындау міндетті ме?", "Компанияны тіркеу үшін әдетте міндетті емес, бірақ IT Park-қа өтінім беру кезеңінде қажет."],
      ["IT Park тек классикалық IT-компанияларға ғана ма?", "Жоқ. BPO, консалтинг, digital services және басқа экспорттық бағыттар да сәйкес келуі мүмкін."],
      ["Бастау үшін қандай құжаттар керек?", "Тізім құрылтайшылар құрамына және ұйымдық нысанға байланысты. Біз жеке чек-лист жібереміз."],
    ],
    homeLinkPrefix: "BizReg басты беті:",
    homeLinkText: "басты сайтқа өту",
    footer: "BizReg. IT Park талаптарына сәйкестікті тексеруге және компанияны Өзбекстанда іске қосуға көмектесеміз.",
  },
  uz: {
    heroFeatures: ["Kompaniyani kalit topshirish asosida ro'yxatdan o'tkazish", "IT Park uchun maxsus shartlar", "Yuridik manzil", "Rus / ingliz / o'zbek tillarida qo'llab-quvvatlash"],
    featuredActivities: [
      { title: "Dasturiy ta'minot ishlab chiqish", description: "SaaS, web-platformalar, mobil ilovalar, korporativ tizimlar, game development" },
      { title: "IT yechimlarini joriy etish va qo'llab-quvvatlash", description: "DT joriy etish, texnik yordam, qo'llab-quvvatlash, foydalanuvchilarni o'qitish" },
      { title: "Data & Automation", description: "Ma'lumotlar bazalari, data processing, jarayonlarni avtomatlashtirish, boshqaruv tizimlari" },
      { title: "IT konsalting va audit", description: "Tizimli tahlil, biznes tahlil, IT konsalting, axborot tizimlari auditi" },
      { title: "BPO / KPO / Export Services", description: "Biznes jarayonlar autsorsingi, IT xizmatlar eksporti, knowledge process outsourcing" },
      { title: "Dizayn va multimedia", description: "UI/UX, veb-dizayn, grafik dizayn, motion, 3D, animatsiya" },
      { title: "Kiberxavfsizlik", description: "Texnik va kriptografik himoya, E-IMZO, security services" },
      { title: "IoT / Hardware / R&D / Startups", description: "IoT, dasturiy-apparat yechimlar, high-tech ishlanmalar, R&D, startaplar" },
    ],
    activitiesHelp: "Faoliyat yo'nalishingiz mos kelishiga ishonchingiz komil emasmi? Ariza qoldiring — keysingizni oldindan tekshirib, keyingi qadamni aytamiz.",
    benefits: [
      ["Asosiy soliqlar bo'yicha 0%", "Foyda solig'i, ijtimoiy soliq, import xizmatlariga QQS, mol-mulk va yer solig'i."],
      ["To'lovlar bo'yicha imtiyozli yuklama", "Dividendlarga 5% va JShDS 7,5%."],
      ["Xalqaro ish formati", "Dividend va ish haqini xorijiy valyutada to'lash imkoniyati."],
      ["Xorijiy mutaxassislar uchun oson", "Xorijiy xodimlar uchun ish ruxsatnomasi talab qilinmaydi."],
      ["Softlanding qo'llab-quvvatlashi", "Yuridik va soliq hamrohligi, bank va HR konsultatsiyalari, One-Stop Shop."],
      ["Qo'shimcha dasturlar", "Zero Risk doirasida bepul ofis, uskunalar va ish haqining 15% gacha kompensatsiyasi."],
    ],
    offerCards: [
      { title: "Kompaniya ro'yxatidan o'tkazishga 20% chegirma", desc: "Kompaniyani kalit topshirish asosida ro'yxatdan o'tkazish.", oldPrice: "5 000 000 so'm", newPrice: "3 990 000 so'm" },
      { title: "Yuridik manzil uchun maxsus shartlar", desc: "Kompaniya uchun yuridik manzil.", oldPrice: "2 600 000 so'm", newPrice: "1 990 000 so'm" },
      { title: "Buxgalteriya (Start-up paketi)", desc: "Boshlang'ich paket barcha hisobotlar va bazaviy operatsiyalarni o'z ichiga oladi.", newPrice: "2 500 000 so'm" },
      { title: "Biznes-reja to'ldirish bo'yicha yordam", desc: "5 yillik tajribamiz biznes-rejani to'g'ri to'ldirishga yordam beradi.", newPrice: "1 990 000 so'm" },
    ],
    offerNote: "Taklif IT Parkga topshirish uchun BizReg orqali kompaniya ochadigan mijozlar uchun amal qiladi.",
    services: ["Kompaniya ochish va IT Park ro'yxatdan o'tishi bo'yicha konsultatsiya", "Ro'yxatga olish paketini tayyorlash", "Yuridik shaxsni ro'yxatdan o'tkazish", "Yuridik manzilni rasmiylashtirish", "Hisob raqami ochishga hamrohlik", "IT Parkga topshirishga tayyorgarlik konsultatsiyasi"],
    reviews: [["Founder, IT service", "«Kompaniyani masofadan ochdik va IT Parkning keyingi bosqichiga tez chiqdik.»"], ["Founder, digital agency", "«Shaffof shartlar va byurokratiyasiz tez hamrohlik yoqdi.»"], ["Founder, BPO team", "«Eksport uchun qulay format va aniq reja oldik.»"]],
    faq: [
      ["Avval kompaniyani ro'yxatdan o'tkazib, keyin IT Parkga topshirsa bo'ladimi?", "Ha. Odatda avval O'zbekistonda yuridik shaxs ro'yxatdan o'tkaziladi, keyin IT Parkga topshirish tayyorlanadi."],
      ["Mening faoliyatim IT Parkga mos keladimi?", "Biz oldindan tekshiruv o'tkazamiz va kompaniya profilingizni qanday to'g'ri rasmiylashtirishni aytamiz."],
      ["Agar ta'sischi xorijlik bo'lsa nima qilish kerak?", "Xorijiy ta'sischilar uchun hujjatlar, bosqichlar va masofaviy format bo'yicha to'liq hamrohlik qilamiz."],
      ["Kompaniyani masofadan turib ochsa bo'ladimi?", "Ha, ko'p hollarda hujjatlar to'g'ri tayyorlansa, jarayonni masofadan tashkil qilish mumkin."],
      ["Yuridik manzil bo'yicha yordam berasizmi?", "Ha, ushbu taklif doirasida yuridik manzil uchun maxsus shartlar mavjud."],
      ["Ro'yxatdan o'tkazish paketiga nimalar kiradi?", "Konsultatsiya, ro'yxatga olish paketini tayyorlash, yuridik shaxsni ro'yxatdan o'tkazish va keyingi bosqichlarda yordam."],
      ["Jarayon qancha vaqt oladi?", "Muddat case murakkabligi va hujjatlar tayyorligiga bog'liq. Biz real timeline beramiz."],
      ["Biznes-rejani darhol tayyorlash shartmi?", "Ro'yxatdan o'tkazish uchun odatda shart emas, ammo IT Parkga topshirish bosqichida kerak bo'ladi."],
      ["IT Park faqat klassik IT kompaniyalar uchunmi?", "Yo'q. BPO, konsalting, digital services va boshqa eksport yo'nalishlari ham mos kelishi mumkin."],
      ["Boshlash uchun qanday hujjatlar kerak?", "Ro'yxat ta'sischilar tarkibi va yuridik shaklga bog'liq. Biz sizga individual chek-list beramiz."],
    ],
    homeLinkPrefix: "BizReg asosiy sahifasi:",
    homeLinkText: "asosiy saytga o'tish",
    footer: "BizReg. Kasingiz IT Parkga mosligini tekshirib, O'zbekistonda kompaniya ishga tushirishda hamrohlik qilamiz.",
  },
  zh: {
    heroFeatures: ["公司注册一站式服务", "IT Park 特别条件", "法定地址", "俄语 / 英语 / 乌兹别克语支持"],
    featuredActivities: [
      { title: "软件开发", description: "SaaS、Web 平台、移动应用、企业系统、游戏开发" },
      { title: "IT 解决方案实施与支持", description: "软件实施、技术支持、维护、用户培训" },
      { title: "Data & Automation", description: "数据库、数据处理、流程自动化、管理系统" },
      { title: "IT 咨询与审计", description: "系统分析、业务分析、IT 咨询、信息系统审计" },
      { title: "BPO / KPO / Export Services", description: "业务流程外包、IT 服务出口、知识流程外包" },
      { title: "设计与多媒体", description: "UI/UX、网页设计、平面设计、动效、3D、动画" },
      { title: "网络安全", description: "技术与密码信息保护、电子签名、安全服务" },
      { title: "IoT / Hardware / R&D / Startups", description: "物联网、软硬件方案、高科技研发、R&D、初创企业" },
    ],
    activitiesHelp: "不确定您的业务是否符合条件？提交申请——我们会预审您的案例并给出下一步建议。",
    benefits: [
      ["关键税种 0%", "利润税、社会税、进口服务增值税、财产税和土地税。"],
      ["支付税负优惠", "股息税 5%，个人所得税 7.5%。"],
      ["国际化运营模式", "可使用外币发放股息和薪资。"],
      ["对外籍专家更友好", "外籍员工无需工作许可。"],
      ["Softlanding 支持", "法律税务支持、银行和 HR 咨询、One-Stop Shop。"],
      ["附加支持计划", "Zero Risk 框架下可获免费办公室、设备及最高 15% 薪资补贴。"],
    ],
    offerCards: [
      { title: "公司注册 20% 折扣", desc: "公司注册一站式服务。", oldPrice: "5 000 000 苏姆", newPrice: "3 990 000 苏姆" },
      { title: "法定地址特别条件", desc: "为公司提供法定地址。", oldPrice: "2 600 000 苏姆", newPrice: "1 990 000 苏姆" },
      { title: "会计服务（Start-up 套餐）", desc: "基础会计套餐包含全部报表提交和基础业务处理。", newPrice: "2 500 000 苏姆" },
      { title: "商业计划书填写支持", desc: "我们 5 年经验可帮助您正确完成商业计划书。", newPrice: "1 990 000 苏姆" },
    ],
    offerNote: "本优惠适用于通过 BizReg 开设公司并申请 IT Park 的客户。",
    services: ["公司开设与 IT Park 注册咨询", "注册材料包准备", "法人实体注册", "法定地址办理", "银行账户开立支持", "IT Park 申请准备咨询"],
    reviews: [["Founder, IT service", "“我们远程完成公司注册，并快速进入 IT Park 下一阶段申请。”"], ["Founder, digital agency", "“流程透明、响应很快，没有繁琐官僚。”"], ["Founder, BPO team", "“我们获得了适合出口的启动方案和清晰执行计划。”"]],
    faq: [
      ["可以先注册公司，再申请 IT Park 吗？", "可以。通常先在乌兹别克斯坦注册法人实体，然后准备并提交 IT Park 申请。"],
      ["我的业务是否符合 IT Park 要求？", "我们会进行预审，并建议如何正确定位和描述您的业务活动。"],
      ["如果我是外籍创始人怎么办？", "我们为外籍创始人提供完整流程支持，包括材料清单与远程办理方案。"],
      ["可以远程注册公司吗？", "可以。在多数情况下，只要材料准备正确，流程可远程完成。"],
      ["你们能协助法定地址吗？", "可以。本优惠包含法定地址的特别条件。"],
      ["注册套餐包含哪些内容？", "包含咨询、注册材料准备、法人注册及后续步骤支持。"],
      ["整个流程需要多久？", "时长取决于案例复杂度和材料准备情况，我们会提供清晰时间表。"],
      ["是否必须立刻准备商业计划书？", "公司注册阶段通常不强制，但在提交 IT Park 申请时需要。"],
      ["IT Park 只适用于传统 IT 公司吗？", "不是。BPO、咨询、数字服务及其他出口型业务也可能符合。"],
      ["启动阶段需要哪些文件？", "取决于股东结构与公司形式，我们会提供个性化清单。"],
    ],
    homeLinkPrefix: "BizReg 主站：",
    homeLinkText: "前往主站",
    footer: "BizReg。我们帮助评估您的案例是否符合 IT Park，并陪伴您在乌兹别克斯坦落地公司。",
  },
} as const;

function trackEvent(event: string, location: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, {
      event_category: "itpark_landing",
      event_label: location,
    });
  }
}

export default function ItParkLandingClient() {
  const locale = useLocale() as keyof typeof itparkText;
  const t = itparkText[locale] ?? itparkText.ru;
  const c = (itparkContent as any)[locale] ?? itparkContent.ru;
  const [isFullListOpen, setIsFullListOpen] = useState(false);
  const pixelCard =
    "rounded-none border-2 border-black bg-white shadow-[6px_6px_0_0_#000]";
  const pixelTitle = `${pressStart.className} leading-tight tracking-wide`;
  const pixelButtonBase =
    "rounded-full border-[6px] px-7 py-4 h-auto text-[12px] leading-none tracking-wide uppercase";
  const blockSection = "py-16 bg-[#f5f5f5]";

  return (
    <main className={`min-h-screen bg-[#efefef] text-black ${pressStart.className}`}>
      <section className="relative overflow-hidden bg-[#d9d9d9] text-black tracking-[0.01em]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.35) 1px, transparent 0)", backgroundSize: "22px 22px" }} />
        <div className="container mx-auto px-4 pt-20 pb-14 relative">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
            <div className="mt-[1cm]">
              <Badge
                className="mb-5 border-0 bg-transparent p-0 shadow-none text-[#141414] animate-retro-blink"
                style={{ WebkitTextStroke: "0.35px #000" }}
              >
                {t.badge}
              </Badge>
              <h1
                className={`${pixelTitle} mt-[1cm] text-3xl sm:text-5xl max-w-4xl text-[#1f1f1f]`}
              >
                {t.heroTitle}
              </h1>
              <div className="mt-[2cm]">
                <p
                  className={`${silk.className} mt-6 -translate-y-[0.5cm] text-base sm:text-lg text-black max-w-3xl leading-relaxed tracking-[0.01em]`}
                  style={{ WebkitTextStroke: "0.2px #000" }}
                >
                  {t.heroDesc.split("{discount}")[0]}
                  <span className="inline-block text-[2em] leading-none align-middle -translate-y-2 animate-retro-blink">
                    20%
                  </span>{" "}
                  {t.heroDesc.split("{discount}")[1]}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button
                    className={`${pixelButtonBase} border-black bg-black text-white hover:bg-[#1f1f1f] shadow-[6px_6px_0_0_#000] sm:flex-1 sm:min-w-0`}
                    asChild
                    onClick={() => trackEvent("cta_click", "hero_offer")}
                  >
                    <a href="#form" className="justify-center">
                      {t.heroCta} <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="sm:flex-1 sm:min-w-0"
                    asChild
                    onClick={() => trackEvent("telegram_click", "hero")}
                  >
                    <a
                      href="https://t.me/bizreg_uradres_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${pixelButtonBase} border-black bg-white text-black hover:bg-[#e7e7e7] shadow-[6px_6px_0_0_#000] justify-center`}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {t.telegram}
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-[1cm] border-4 border-black bg-[#d9d9d9] p-2 shadow-[8px_8px_0_0_#000]">
              <img
                src="/itpark/hero-itpark-scene.png"
                alt="Pixel IT Park scene with wizard"
                className="w-full h-auto object-cover border-2 border-black"
              />
            </div>
          </div>

          <div className="mt-10 border-2 border-black bg-[#f7f7f7] p-3 shadow-[6px_6px_0_0_#000]">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {c.heroFeatures.map((item: string) => (
                <div key={item} className="rounded-none border-2 border-black bg-white px-3 py-1.5 text-[13px] leading-tight flex items-center gap-2 min-h-[46px]">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <nav className="sticky top-16 z-20 bg-[#efefef]/95 backdrop-blur">
        <div className="container mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
          {navItems.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="text-sm whitespace-nowrap px-4 py-2 rounded-full border-4 border-black bg-white hover:bg-[#e7e7e7] transition-colors shadow-[3px_3px_0_0_#000]">
              {t.nav[label]}
            </a>
          ))}
        </div>
      </nav>

      <section id="activities" className={blockSection}>
        <div className="container mx-auto px-4">
          <h2 className={`${pixelTitle} text-2xl sm:text-3xl mb-4 text-center`}>{t.activitiesTitle}</h2>
          <p
            className={`${silk.className} mt-[1cm] text-black max-w-5xl mx-auto text-center leading-relaxed tracking-[0.01em]`}
            style={{ WebkitTextStroke: "0.2px #000" }}
          >
            {t.activitiesDesc}
          </p>
          <div className="mt-8 border-4 border-black bg-white p-2 shadow-[8px_8px_0_0_#000] w-[70%] mx-auto">
            <img
              src="/itpark/pixel-party.png"
              alt="Pixel party illustration"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.featuredActivities.map((activity: FeaturedActivity) => (
              <Card key={activity.title} className={`h-full ${pixelCard}`}>
                <CardHeader className="pb-2">
                  <div className="w-9 h-9 rounded-none border-2 border-black bg-[#e5e5e5] text-black flex items-center justify-center mb-2">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <CardTitle className="text-sm leading-5 text-black">{activity.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 mt-3">
                  <p
                    className={`${silk.className} text-xs text-black leading-relaxed tracking-[0.01em]`}
                    style={{ WebkitTextStroke: "0.2px #000" }}
                  >
                    {activity.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 mb-10 flex justify-center">
            <div className="w-full max-w-4xl">
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="rounded-full border-4 border-black bg-white text-black hover:bg-[#e7e7e7] min-w-[320px] sm:min-w-[520px]"
                  onClick={() => setIsFullListOpen(!isFullListOpen)}
                >
              {t.fullListBtn}
                  <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isFullListOpen ? "rotate-180" : ""}`} />
                </Button>
              </div>
            </div>
          </div>

          {isFullListOpen && (
            <div className="mt-6 border-2 border-black bg-white p-4 shadow-[6px_6px_0_0_#000]">
              <ol className="grid md:grid-cols-2 gap-4 list-decimal pl-5">
                {activities.map((activity) => (
                  <li key={activity.id} className="text-sm text-black">
                    <p className="font-semibold">{activity.title}</p>
                    <p className="text-xs mt-1 leading-relaxed">{activity.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="mt-7 rounded-none border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_#000]">
            <p className="text-sm text-black">
              {c.activitiesHelp}
            </p>
            <div className="mt-5 flex justify-center">
              <Button
                variant="outline"
                asChild
                onClick={() => trackEvent("telegram_click", "activities_help_block")}
                className="rounded-full border-4 border-black bg-white text-black hover:bg-[#e7e7e7]"
              >
                <a
                  href="https://t.me/bizreg_uradres_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${pixelButtonBase} border-black bg-white text-black hover:bg-[#e7e7e7] shadow-[6px_6px_0_0_#000] justify-center`}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Написать в Telegram
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className={blockSection}>
        <div className="container mx-auto px-4">
          <h2 className={`${pixelTitle} text-2xl sm:text-3xl mb-6`}>{t.benefitsTitle}</h2>
          <div className="mt-[2cm] grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              [c.benefits[0][0], c.benefits[0][1], CircleDollarSign],
              [c.benefits[1][0], c.benefits[1][1], Landmark],
              [c.benefits[2][0], c.benefits[2][1], Briefcase],
              [c.benefits[3][0], c.benefits[3][1], Users],
              [c.benefits[4][0], c.benefits[4][1], ShieldCheck],
              [c.benefits[5][0], c.benefits[5][1], Rocket],
            ].map(([title, desc, Icon], index) => (
              <Card key={String(title)} className={`${pixelCard} hover:translate-x-0.5 transition-transform`}>
                <CardHeader className="pb-1">
                  <div className={`${index === 0 || index === 1 || index === 2 || index === 3 || index === 4 || index === 5 ? "w-20 h-20" : "w-10 h-10"} rounded-none border-2 border-black bg-[#e5e5e5] flex items-center justify-center mb-3`}>
                    {index === 0 ? (
                      <img src="/itpark/coin-tax.png" alt="Tax coin icon" className="w-16 h-16 object-contain" />
                    ) : index === 1 ? (
                      <img src="/itpark/feather-payout.png" alt="Payout icon" className="w-16 h-16 object-contain" />
                    ) : index === 2 ? (
                      <img src="/itpark/globe-international.png" alt="International format icon" className="w-16 h-16 object-contain" />
                    ) : index === 3 ? (
                      <img src="/itpark/specialist-worker.png" alt="Specialist support icon" className="w-16 h-16 object-contain" />
                    ) : index === 4 ? (
                      <img src="/itpark/softlanding-pillow.png" alt="Softlanding support icon" className="w-16 h-16 object-contain" />
                    ) : index === 5 ? (
                      <img src="/itpark/additional-programs-chest.png" alt="Additional programs icon" className="w-16 h-16 object-contain" />
                    ) : (
                      <Icon className="w-5 h-5 text-black" />
                    )}
                  </div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                </CardHeader>
                <CardContent
                  className={`${index === 0 || index === 1 || index === 2 || index === 3 || index === 4 || index === 5 ? `${ibmPlexSans.className} text-xl mt-3` : "text-sm"} text-black`}
                >
                  {desc}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="offer" className={blockSection}>
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-center">
            <div className="border-4 border-black bg-white p-2 shadow-[8px_8px_0_0_#000]">
              <img
                src="/itpark/pixel-chest.png"
                alt="Pixel treasure chest"
                className="w-[220px] h-auto object-contain"
              />
            </div>
          </div>
          <h2 className={`${pixelTitle} text-2xl sm:text-3xl mb-7`}>{t.offerTitle}</h2>
          <div className="mt-[1.5cm] grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className={pixelCard}>
              <CardHeader><CardTitle className="text-lg">{c.offerCards[0].title}</CardTitle></CardHeader>
              <CardContent>
                <p className={`${ibmPlexSans.className} text-xl text-black mb-2`}>{c.offerCards[0].desc}</p>
                <div className="mt-4 mb-4">
                  <p className="text-sm line-through decoration-red-600 decoration-[3px] text-black/70 mb-2">{c.offerCards[0].oldPrice}</p>
                  <p className="text-2xl font-semibold text-black animate-retro-blink">{c.offerCards[0].newPrice}</p>
                </div>
                <Button
                  className="mt-4 rounded-full border-4 border-black bg-black px-3 py-2 h-auto text-[10px] tracking-[0.01em] text-white hover:bg-[#1f1f1f] shadow-[6px_6px_0_0_#000] w-full justify-center whitespace-nowrap"
                  asChild
                  onClick={() => trackEvent("cta_click", "offer_card_registration")}
                >
                  <a href="#form">
                      {t.heroCta} <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
            <Card className={pixelCard}>
              <CardHeader><CardTitle className="text-lg">{c.offerCards[1].title}</CardTitle></CardHeader>
              <CardContent>
                <p className={`${ibmPlexSans.className} text-xl text-black mb-2`}>{c.offerCards[1].desc}</p>
                <div className="mt-4 mb-4">
                  <p className="text-sm line-through decoration-red-600 decoration-[3px] text-black/70 mb-2">{c.offerCards[1].oldPrice}</p>
                  <p className="text-2xl font-semibold text-black animate-retro-blink">{c.offerCards[1].newPrice}</p>
                </div>
                <Button
                  className="mt-4 rounded-full border-4 border-black bg-black px-3 py-2 h-auto text-[10px] tracking-[0.01em] text-white hover:bg-[#1f1f1f] shadow-[6px_6px_0_0_#000] w-full justify-center whitespace-nowrap"
                  asChild
                  onClick={() => trackEvent("cta_click", "offer_card_legal_address")}
                >
                  <a href="#form">
                      {t.heroCta} <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
            <Card className={pixelCard}>
              <CardHeader><CardTitle className="text-lg">{c.offerCards[2].title}</CardTitle></CardHeader>
              <CardContent>
                <p className={`${ibmPlexSans.className} text-xl text-black mb-2`}>
                  {c.offerCards[2].desc}
                </p>
                <p className="text-2xl font-semibold mt-4 mb-4 animate-retro-blink">{c.offerCards[2].newPrice}</p>
                <Button
                  className="mt-4 rounded-full border-4 border-black bg-black px-3 py-2 h-auto text-[10px] tracking-[0.01em] text-white hover:bg-[#1f1f1f] shadow-[6px_6px_0_0_#000] w-full justify-center whitespace-nowrap"
                  asChild
                  onClick={() => trackEvent("cta_click", "offer_card_accounting")}
                >
                  <a href="#form">
                      {t.heroCta} <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
            <Card className={pixelCard}>
              <CardHeader><CardTitle className="text-lg">{c.offerCards[3].title}</CardTitle></CardHeader>
              <CardContent>
                <p className={`${ibmPlexSans.className} text-xl text-black mb-2`}>
                  {c.offerCards[3].desc}
                </p>
                <p className="text-2xl font-semibold mt-4 mb-4 animate-retro-blink">{c.offerCards[3].newPrice}</p>
                <Button
                  className="mt-4 rounded-full border-4 border-black bg-black px-3 py-2 h-auto text-[10px] tracking-[0.01em] text-white hover:bg-[#1f1f1f] shadow-[6px_6px_0_0_#000] w-full justify-center whitespace-nowrap"
                  asChild
                  onClick={() => trackEvent("cta_click", "offer_card_business_plan")}
                >
                  <a href="#form">
                      {t.heroCta} <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
          <p className="mt-[1cm] text-sm text-black">
            {c.offerNote}
          </p>
        </div>
      </section>

      <section id="services" className={blockSection}>
        <div className="container mx-auto px-4">
          <h2 className={`${pixelTitle} text-2xl sm:text-3xl mb-6 text-center`}>{t.servicesTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { text: c.services[0], image: "/itpark/service-consultation.png" },
              { text: c.services[1], image: "/itpark/service-registration-package.png" },
              { text: c.services[2], image: "/itpark/service-legal-entity.png" },
              { text: c.services[3], image: "/itpark/service-legal-address.png" },
              { text: c.services[4], image: "/itpark/service-account-opening.png" },
              { text: c.services[5], image: "/itpark/service-itpark-consultation.png" },
            ].map((item) => (
              <div key={item.text} className="rounded-none border-2 border-black bg-white p-4 text-sm flex items-center gap-3 shadow-[4px_4px_0_0_#000]">
                {item.image ? (
                  <div className="w-[104px] h-[104px] rounded-none border-2 border-black bg-white flex items-center justify-center shrink-0">
                    <img src={item.image} alt="" className="w-[94px] h-[94px] object-contain" />
                  </div>
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                )}
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={blockSection}>
        <div className="container mx-auto px-4">
          <h2 className={`${pixelTitle} text-2xl sm:text-3xl mb-6 text-center`}>{t.reviewsTitle}</h2>
          <div className="max-w-5xl mx-auto space-y-4">
            <div className="flex items-end gap-3">
              <div className="w-20 h-20 border-4 border-black bg-white p-1 shadow-[4px_4px_0_0_#000] shrink-0">
                <img src="/itpark/client-orc-1.png" alt="Client avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 border-4 border-black bg-white px-5 py-4 shadow-[6px_6px_0_0_#000]">
                <p className={`${pixelTitle} text-lg mb-2`}>{c.reviews[0][0]}</p>
                <p className={`${ibmPlexSans.className} text-2xl text-black leading-snug`}>
                  {c.reviews[0][1]}
                </p>
              </div>
            </div>

            <div className="flex items-end gap-3 justify-end">
              <div className="flex-1 border-4 border-black bg-white px-5 py-4 shadow-[6px_6px_0_0_#000]">
                <p className={`${pixelTitle} text-lg mb-2 text-right`}>{c.reviews[1][0]}</p>
                <p className={`${ibmPlexSans.className} text-2xl text-black leading-snug text-right`}>
                  {c.reviews[1][1]}
                </p>
              </div>
              <div className="w-20 h-20 border-4 border-black bg-white p-1 shadow-[4px_4px_0_0_#000] shrink-0">
                <img src="/itpark/client-goblin-2.png" alt="Client avatar" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="flex items-end gap-3">
              <div className="w-20 h-20 border-4 border-black bg-white p-1 shadow-[4px_4px_0_0_#000] shrink-0">
                <img src="/itpark/client-ogres-3.png" alt="Client avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 border-4 border-black bg-white px-5 py-4 shadow-[6px_6px_0_0_#000]">
                <p className={`${pixelTitle} text-lg mb-2`}>{c.reviews[2][0]}</p>
                <p className={`${ibmPlexSans.className} text-2xl text-black leading-snug`}>
                  {c.reviews[2][1]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className={blockSection}>
        <div className="container mx-auto px-4">
          <h2 className={`${pixelTitle} text-2xl sm:text-3xl mb-6 text-center`}>{t.faqTitle}</h2>
          <div className="space-y-3 max-w-4xl mx-auto">
            {c.faq.map(([question, answer]: [string, string]) => (
              <details key={question} className="rounded-none border-2 border-black bg-white p-4 group shadow-[4px_4px_0_0_#000]">
                <summary className="list-none cursor-pointer flex items-start justify-between gap-4">
                  <span className="font-medium">{question}</span>
                  <HelpCircle className="w-5 h-5 text-black shrink-0" />
                </summary>
                <p className="mt-3 text-sm text-black">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className={blockSection}>
        <div className="container mx-auto px-4">
          <div className="rounded-none border-4 border-black bg-white p-8 md:p-10 text-black shadow-[10px_10px_0_0_#000]">
            <h2 className={`${pixelTitle} text-2xl sm:text-3xl text-center`}>{t.contactTitle}</h2>
            <p className="text-black mt-3 max-w-3xl leading-relaxed text-center mx-auto">
              {t.contactDesc}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Button asChild className={`${pixelButtonBase} border-black bg-black text-white hover:bg-[#1f1f1f] shadow-[6px_6px_0_0_#000]`} onClick={() => trackEvent("cta_click", "final_offer")}>
                <a href="https://t.me/bizreg_uradres_bot" target="_blank" rel="noopener noreferrer">{t.getOffer}</a>
              </Button>
              <Button variant="outline" asChild onClick={() => trackEvent("telegram_click", "final_block")}>
                <a href="https://t.me/bizreg_uradres_bot" target="_blank" rel="noopener noreferrer" className={`${pixelButtonBase} border-black bg-white text-black hover:bg-[#e7e7e7] shadow-[6px_6px_0_0_#000]`}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t.telegram}
                </a>
              </Button>
            </div>
          </div>

          <div id="form" className="mt-8 rounded-none border-4 border-black bg-white overflow-hidden min-h-[500px] shadow-[8px_8px_0_0_#000]">
            <iframe
              src="https://form.latenode.com/t/ixaH3FnMAbus"
              width="100%"
              height="500"
              className="w-full border-0 bg-white"
              title="IT Park request form"
            />
          </div>

          <div className="mt-8 text-sm text-black">
            {c.homeLinkPrefix}{" "}
            <Link href="/" className="underline hover:no-underline">
              {c.homeLinkText}
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-6 bg-[#efefef]">
        <div className="container mx-auto px-4 text-xs text-black">
          {c.footer}
        </div>
      </footer>
    </main>
  );
}

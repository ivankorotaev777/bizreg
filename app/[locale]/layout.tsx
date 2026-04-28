import type { Metadata } from "next";
import { Onest } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import "../globals.css";
import { Header } from "@/components/Header";
import { locales, type Locale } from "@/i18n";

const onest = Onest({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isEnglishLocale = locale === "en";
  const title = isEnglishLocale
    ? "Business Setup Consulting in Uzbekistan | BizReg"
    : "BizReg — Помощь в регистрации бизнеса в Ташкенте и ведение бухучёта";
  const description = isEnglishLocale
    ? "Private consulting for business launch in Uzbekistan. Company setup support, registered address solutions, and accounting services."
    : "Помощь в регистрации ООО и ИП в Ташкенте, постановка на учёт, бухгалтерское сопровождение. Быстро, прозрачно, под ключ.";

  return {
    title,
    description,
    keywords:
      "регистрация бизнеса Ташкент, открыть ООО Узбекистан, бухучёт Ташкент, регистрация ИП, бухгалтерские услуги",
    authors: [{ name: "BizReg" }],
    openGraph: {
      title,
      description,
      type: "website",
      locale: isEnglishLocale ? "en_US" : "ru_RU",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-MDP27W7853"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MDP27W7853');
        `}
      </Script>
      <div className={`${onest.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
        </NextIntlClientProvider>
      </div>
    </>
  );
}

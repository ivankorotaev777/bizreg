"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function ThankYouPage() {
  const t = useTranslations("thankYou");

  return (
    <main className="pt-24 pb-16 min-h-screen flex flex-col items-center justify-center">
      <section className="w-full container mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          {t("description")}
        </p>
        <div className="flex flex-col gap-4 items-center">
          <Button size="lg" className="rounded-full bg-gradient-brand hover:opacity-90 transition-all shadow-md shadow-brand-500/20 min-w-[240px]" asChild>
            <a href="https://t.me/Ivan_Korotaev" target="_blank" rel="noopener noreferrer">
              <Send className="w-5 h-5 mr-2" />
              {t("telegram")}
            </a>
          </Button>
          <Link href="/" className="text-brand-600 hover:text-brand-700 font-medium text-sm underline underline-offset-2">
            {t("backHome")}
          </Link>
        </div>
      </section>
    </main>
  );
}

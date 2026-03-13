"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft, Send } from "lucide-react";

export default function ThankYouPage() {
  const t = useTranslations("thankYou");

  return (
    <main className="pt-20 pb-12 min-h-screen flex items-center">
      <section className="w-full py-12 bg-gradient-to-b from-brand-50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-brand-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 text-foreground">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t("description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="rounded-full bg-gradient-brand hover:opacity-90 transition-all shadow-md shadow-brand-500/20 w-full sm:w-auto" asChild>
                <a href="https://t.me/Ivan_Korotaev" target="_blank" rel="noopener noreferrer">
                  <Send className="w-5 h-5 mr-2" />
                  {t("telegram")}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full w-full sm:w-auto" asChild>
                <Link href="/">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  {t("backHome")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

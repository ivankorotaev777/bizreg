"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { AmoFormEmbed } from "@/components/AmoFormEmbed";
import { Link } from "@/i18n/navigation";
import { PartnersSection } from "@/components/PartnersSection";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  ShieldCheck, 
  Clock, 
  Wallet, 
  MapPin, 
  Users, 
  Mail, 
  CheckCircle2, 
  ArrowRight,
  AlertTriangle,
  XCircle,
  Banknote,
  FileX,
  Timer,
  Send,
  Building
} from "lucide-react";

const Hero = ({ requestFormHref }: { requestFormHref: string }) => {
  const t = useTranslations("hero");
  
  return (
    <section className="relative flex items-center overflow-hidden pt-10 pb-6">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-background to-navy-50" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
        <div className="absolute top-10 right-0 w-[400px] h-[400px] bg-brand-400/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 py-5 lg:py-7">
        <div className="max-w-3xl mx-auto text-center pt-[1cm]">
          <Badge variant="secondary" className="mb-2 px-4 py-2 text-sm font-medium">
            <Building2 className="w-4 h-4 mr-2 inline" />
            {t("badge")}
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-3">
            <span className="text-gradient">{t("title1")}</span>
            <br />
            <span className="text-foreground">{t("title2")}</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-3 max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
            <Button size="default" className="px-6 py-2.5 rounded-full bg-gradient-brand hover:opacity-90 transition-all shadow-md shadow-brand-500/20 min-w-[200px] sm:min-w-0" asChild>
              <a href={requestFormHref} className="inline-flex items-center justify-center gap-2">
                <span className="whitespace-nowrap">{t("cta")}</span>
                <ArrowRight className="ml-2 w-4 h-4 flex-shrink-0" />
              </a>
            </Button>
          </div>
          
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-500" />
              <span>{t("feature1")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-500" />
              <span>{t("feature2")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-500" />
              <span>{t("feature3")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PainPoints = () => {
  const t = useTranslations("painPoints");
  
  const items = [
    { icon: AlertTriangle, titleKey: "item1Title", descKey: "item1Desc" },
    { icon: XCircle, titleKey: "item2Title", descKey: "item2Desc" },
    { icon: FileX, titleKey: "item3Title", descKey: "item3Desc" },
    { icon: Banknote, titleKey: "item4Title", descKey: "item4Desc" },
    { icon: Timer, titleKey: "item5Title", descKey: "item5Desc" },
    { icon: Users, titleKey: "item6Title", descKey: "item6Desc" }
  ];
  
  return (
    <section className="py-10 lg:py-14 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <Badge variant="outline" className="mb-3 border-red-200 text-red-600 bg-red-50 text-sm">
            <AlertTriangle className="w-4 h-4 mr-1" />
            {t("badge")}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-foreground">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("description")}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <Card 
              key={index}
              className="border-red-100 bg-white hover:border-red-200 hover:shadow-md transition-all"
            >
              <CardContent className="p-5">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-base mb-1 text-foreground">{t(item.titleKey)}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{t(item.descKey)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10 max-w-2xl mx-auto p-5 rounded-xl bg-red-50 border border-red-100">
          <p className="text-base text-red-800" dangerouslySetInnerHTML={{ __html: t.raw("conclusion") }} />
        </div>
      </div>
    </section>
  );
};

const Benefits = ({ requestFormHref }: { requestFormHref: string }) => {
  const t = useTranslations("benefits");
  const tForm = useTranslations("requestForm");
  
  const items = [
    { icon: ShieldCheck, titleKey: "item1Title", descKey: "item1Desc", highlightKey: "item1Highlight" },
    { icon: Clock, titleKey: "item2Title", descKey: "item2Desc", highlightKey: "item2Highlight" },
    { icon: MapPin, titleKey: "item3Title", descKey: "item3Desc", highlightKey: "item3Highlight" }
  ];
  
  return (
    <section className="py-10 lg:py-14 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3 text-sm">{t("badge")}</Badge>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-2">
            {t("title")} <span className="text-gradient">{t("titleHighlight")}</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <Card 
              key={index} 
              className="relative overflow-hidden border hover:border-brand-300 transition-all hover:shadow-lg group"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-brand-100 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative pb-2">
                <div className="w-14 h-14 rounded-xl bg-gradient-brand flex items-center justify-center mb-4 shadow-md shadow-brand-500/20">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-lg font-medium">{t(item.titleKey)}</CardTitle>
              </CardHeader>
              <CardContent className="relative pt-0">
                <p className="text-muted-foreground text-base mb-4">{t(item.descKey)}</p>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
                  {t(item.highlightKey)}
                </div>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={requestFormHref}>
                    {tForm("title")}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};


const Product = () => {
  const t = useTranslations("product");
  
  const features = [
    { icon: Building, key: "feature1" },
    { icon: FileX, key: "feature2" },
    { icon: ShieldCheck, key: "feature3" },
    { icon: Clock, key: "feature4" },
    { icon: Mail, key: "feature5" },
    { icon: Users, key: "feature6" }
  ];
  
  return (
    <section className="py-10 lg:py-14 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="secondary" className="mb-3 text-sm">{t("badge")}</Badge>
              <h2 className="text-3xl sm:text-4xl font-semibold mb-5">
                {t("title")} <span className="text-gradient">{t("titleHighlight")}</span>?
              </h2>
              <p className="text-base text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: t.raw("description1") }} />
              <p className="text-base text-muted-foreground mb-6" dangerouslySetInnerHTML={{ __html: t.raw("description2") }} />
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-brand-50 border border-brand-200">
                <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-brand-900">{t("locationsTitle")}</p>
                  <p className="text-sm text-brand-700">{t("locationsDesc")}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {features.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border hover:border-brand-300 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <p className="text-foreground">{t(item.key)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const RequestFormSection = () => {
  const t = useTranslations("requestForm");

  return (
    <section id="request-form" className="pt-16 pb-5 lg:pt-20 lg:pb-7 bg-background scroll-mt-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-8 text-center text-foreground">
            {t("title")}
          </h2>
          <AmoFormEmbed />
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  const t = useTranslations("cta");
  
  return (
    <section className="pt-5 pb-12 md:pb-8 lg:py-7 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-background to-navy-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-brand-400/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            {t("description")}
          </p>
          
          <div className="flex justify-center">
            <Button size="lg" className="px-8 rounded-full bg-gradient-brand hover:opacity-90 transition-all shadow-md shadow-brand-500/20" asChild>
              <a href="https://t.me/BizRegUz" target="_blank" rel="noopener noreferrer">
                <Send className="mr-2 w-5 h-5" />
                {t("button")}
              </a>
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.raw("tagline") }} />
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const t = useTranslations("footer");
  
  return (
    <footer className="py-6 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {t("copyright")}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {t("company")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  const locale = useLocale();
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    setQueryString(window.location.search.replace(/^\?/, ""));
  }, []);

  const requestFormHref = `/${locale}${queryString ? `?${queryString}` : ""}#request-form`;

  return (
    <main className="min-h-screen">
      <Hero requestFormHref={requestFormHref} />
      <PartnersSection />
      <PainPoints />
      <Benefits requestFormHref={requestFormHref} />
      <TestimonialsSection />
      <Product />
      <PricingSection requestFormHref={requestFormHref} />
      <RequestFormSection />
      <CTA />
      <Footer />
    </main>
  );
}

"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
import { PartnersSection } from "@/components/PartnersSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
  Star,
  Building
} from "lucide-react";

const Hero = () => {
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
              <Link href="/#request-form" className="inline-flex items-center justify-center gap-2">
                <span className="whitespace-nowrap">{t("cta")}</span>
                <ArrowRight className="ml-2 w-4 h-4 flex-shrink-0" />
              </Link>
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

const Benefits = () => {
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
                  <Link href="/#request-form">
                    {tForm("title")}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const t = useTranslations("testimonials");
  
  const testimonials = [
    { quoteKey: "quote1", nameKey: "name1", roleKey: "role1", locationKey: "location1", image: "/asel.png" },
    { quoteKey: "quote2", nameKey: "name2", roleKey: "role2", locationKey: "location2", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
    { quoteKey: "quote3", nameKey: "name3", roleKey: "role3", locationKey: "location3", image: "/faisal.png" }
  ];
  
  return (
    <section className="py-10 lg:py-14 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3 text-sm">{t("badge")}</Badge>
          <h2 className="text-3xl sm:text-4xl font-semibold">
            {t("title")}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden">
              <div className="absolute top-5 right-5 text-5xl font-serif text-brand-200/50">&quot;</div>
              <CardHeader className="pb-2">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-base mb-5 relative z-10 leading-relaxed">
                  {t(testimonial.quoteKey)}
                </p>
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.image} 
                    alt={t(testimonial.nameKey)}
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-200"
                  />
                  <div>
                    <p className="font-medium">{t(testimonial.nameKey)}</p>
                    <p className="text-sm text-muted-foreground">
                      {t(testimonial.roleKey)}, {t(testimonial.locationKey)}
                    </p>
                  </div>
                </div>
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

const Pricing = () => {
  const t = useTranslations("pricing");
  
  return (
    <section id="pricing" className="py-10 lg:py-14 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-500/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3 text-sm">{t("badge")}</Badge>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-3 text-foreground">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {t("description")}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {/* Карточка 1: Юридический адрес */}
          <Card className="bg-white border-border relative overflow-hidden hover:border-brand-300 hover:shadow-lg transition-all">
            <CardHeader className="pb-3 pt-5">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="bg-sky-50 text-sky-700 border-sky-200">
                  {t("standardTitle")}
                </Badge>
              </div>
              <div className="flex items-start gap-1.5">
                {t("standardPriceFrom") && <span className="text-sm text-muted-foreground pt-1">{t("standardPriceFrom")}</span>}
                <span className="text-3xl font-semibold text-foreground leading-none">{t("standardPriceNum")}</span>
                <span className="text-sm text-muted-foreground pt-1">{t("standardPricePeriod")}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{t("standardPriceVat")}</p>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <ul className="space-y-2.5">
                {Array.from({ length: 3 }, (_, i) => `standardInclude${i + 1}`).map((key, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{t(key)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border pt-2.5 mt-2.5">
                <p className="text-muted-foreground text-xs italic">{t("standardOooNote")}</p>
              </div>
              <ul className="space-y-2.5">
                {Array.from({ length: 4 }, (_, i) => `standardInclude${i + 4}`).map((key, i) => (
                  <li key={i + 3} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{t(key)}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground text-xs leading-relaxed pt-2">{t("standardFootnote")}</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/#request-form">
                  {t("cta")}
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Карточка 2: Регистрация компании под ключ */}
          <Card className="bg-white border-border relative overflow-hidden hover:border-brand-300 hover:shadow-lg transition-all">
            <CardHeader className="pb-3 pt-5">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  {t("startTitle")}
                </Badge>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-3xl font-semibold text-foreground leading-none">{t("startPrice")}</span>
                <span className="text-sm text-muted-foreground pt-1">{t("startPeriod")}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{t("startVat")}</p>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <p className="text-muted-foreground text-sm">{t("startDesc")}</p>
              <ul className="space-y-2.5">
                {Array.from({ length: 12 }, (_, i) => `startFeature${i + 1}`).map((key, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/#request-form">
                  {t("cta")}
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Карточка 3: Бухгалтерский учёт */}
          <Card className="bg-white border-border relative overflow-hidden hover:border-brand-300 hover:shadow-lg transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-bl-full" />
            <CardHeader className="pb-3 pt-5">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200">
                  {t("businessTitle")}
                </Badge>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-3xl font-semibold text-foreground leading-none">{t("businessPrice")}</span>
                <span className="text-sm text-muted-foreground pt-1">{t("startPeriod")}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{t("businessVat")}</p>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <p className="text-muted-foreground text-sm">{t("businessDesc")}</p>
              <ul className="space-y-2.5">
                {Array.from({ length: 12 }, (_, i) => `businessFeature${i + 1}`).map((key, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/#request-form">
                  {t("cta")}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-10 text-center">
          <div className="inline-flex flex-wrap justify-center gap-6 p-5 rounded-xl bg-brand-50 border border-brand-100">
            <div className="flex items-center gap-2 text-sm text-brand-800">
              <CheckCircle2 className="w-5 h-5 text-brand-500" />
              <span>{t("discount1")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-brand-800">
              <CheckCircle2 className="w-5 h-5 text-brand-500" />
              <span>{t("discount2")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RequestFormSection = () => {
  const t = useTranslations("requestForm");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scriptId = "fillout-embed-script";
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://server.fillout.com/embed/v1/";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const s = document.getElementById(scriptId);
      if (s) s.remove();
    };
  }, [locale]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#request-form" && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [locale]);

  return (
    <section id="request-form" ref={sectionRef} className="py-5 lg:py-7 bg-background scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-8 text-center text-foreground">
            {t("title")}
          </h2>
          <div
            style={{ width: "100%", height: "520px" }}
            data-fillout-id="jRu4Weceruus"
            data-fillout-embed-type="standard"
            data-fillout-inherit-parameters
            data-fillout-domain="form.latenode.com"
          />
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
              <a href="https://t.me/Ivan_Korotaev" target="_blank" rel="noopener noreferrer">
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
  return (
    <main className="min-h-screen">
      <Hero />
      <PartnersSection />
      <PainPoints />
      <Benefits />
      <Testimonials />
      <Product />
      <Pricing />
      <RequestFormSection />
      <CTA />
      <Footer />
    </main>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Send, Globe, ChevronDown } from "lucide-react";
import { locales, localeNames, type Locale } from "@/i18n";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("payment"), href: "/payment" },
    { name: t("guarantees"), href: "/guarantees" },
    { name: t("contacts"), href: "/contacts" },
  ];

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setLangMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border/50">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between py-0">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png?v=3" 
              alt="BizReg" 
              width={294} 
              height={84} 
              className="h-[76px] w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Language Switcher & CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border/50 hover:bg-muted/50 transition-colors text-sm"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
              >
                <Globe className="w-4 h-4" />
                <span className="font-medium">{locale.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {langMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setLangMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-lg border shadow-lg py-1 z-20 min-w-[140px]">
                    {locales.map((loc) => (
                      <button
                        key={loc}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-muted/50 transition-colors flex items-center gap-2 ${
                          locale === loc ? "font-medium text-brand-600 bg-brand-50" : "text-foreground"
                        }`}
                        onClick={() => switchLocale(loc)}
                      >
                        {localeNames[loc]}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <a 
              href="tel:+998903478692" 
              className="text-foreground hover:text-brand-500 transition-colors text-sm hidden xl:block"
            >
              +998 90 347 86 92
            </a>
            <Button size="sm" className="bg-gradient-brand" asChild>
              <Link href="/#request-form">
                <Send className="w-4 h-4 mr-2" />
                {t("write")}
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Language Switcher */}
            <button
              type="button"
              className="flex items-center gap-1 p-2 text-muted-foreground"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium">{locale.toUpperCase()}</span>
            </button>
            
            <button
              type="button"
              className="p-2 text-muted-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Language Menu */}
        {langMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-white border-b shadow-lg">
            <div className="container mx-auto px-4 py-2">
              <div className="grid grid-cols-5 gap-1">
                {locales.map((loc) => (
                  <button
                    key={loc}
                    className={`py-2 text-sm rounded-md transition-colors ${
                      locale === loc 
                        ? "font-medium text-brand-600 bg-brand-50" 
                        : "text-foreground hover:bg-muted/50"
                    }`}
                    onClick={() => switchLocale(loc)}
                  >
                    {loc.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a 
                href="tel:+998903478692" 
                className="text-brand-500 font-medium"
              >
                +998 90 347 86 92
              </a>
              <Button size="sm" className="bg-gradient-brand w-fit" asChild>
                <Link href="/#request-form">
                  <Send className="w-4 h-4 mr-2" />
                  {t("write")}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

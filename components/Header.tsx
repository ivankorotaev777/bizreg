"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    setQueryString(window.location.search.replace(/^\?/, ""));
  }, []);

  const requestFormHref = `/${locale}${queryString ? `?${queryString}` : ""}#request-form`;

  // Сгруппированная навигация: услуги и «о нас» — выпадающие списки
  const serviceItems = [
    { name: t("registration"), href: "/registratsiya-ooo" },
    { name: t("calculator"), href: "/kalkulyator-buhgalterii" },
    { name: t("itpark"), href: "/itpark" },
    { name: t("marketplace"), href: "/marketplace" },
    { name: t("legalAddress"), href: "/yuridicheskiy-adres" },
  ];
  const aboutItems = [
    { name: t("about"), href: "/about" },
    { name: t("guarantees"), href: "/guarantees" },
    { name: t("clients"), href: "/clients" },
    { name: t("payment"), href: "/payment" },
  ];
  const flatItems = [
    { name: t("prices"), href: "/price_list_full" },
    { name: t("blog"), href: "/blog" },
    { name: t("contacts"), href: "/contacts" },
  ];

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setLangMenuOpen(false);
  };

  const dropdown = (key: string, label: string, items: { name: string; href: string }[]) => {
    const open = openDropdown === key;
    return (
      <div
        className="relative"
        onMouseEnter={() => setOpenDropdown(key)}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpenDropdown(key)}
          className={`flex items-center gap-1 transition-colors text-base whitespace-nowrap py-2 ${open ? "text-foreground" : "text-muted-foreground"} hover:text-foreground`}
        >
          {label}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="absolute left-0 top-full z-20">
            <div className="bg-white rounded-lg border shadow-lg py-1.5 min-w-[240px]">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpenDropdown(null)}
                  className={`block px-4 py-2.5 text-[15px] transition-colors hover:bg-muted/50 ${
                    pathname === item.href ? "text-brand-600 font-medium" : "text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border/50">
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

          {/* Desktop Navigation — сгруппированная */}
          <div className="hidden lg:flex items-center gap-x-6">
            {dropdown("services", t("services"), serviceItems)}
            {flatItems.slice(0, 2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-base whitespace-nowrap py-2"
              >
                {item.name}
              </Link>
            ))}
            {dropdown("about", t("aboutGroup"), aboutItems)}
            <Link
              href="/contacts"
              className="text-muted-foreground hover:text-foreground transition-colors text-base whitespace-nowrap py-2"
            >
              {t("contacts")}
            </Link>
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
              href="tel:+998770178978"
              className="text-foreground hover:text-brand-500 transition-colors text-sm hidden xl:block"
            >
              +998 77 017 89 78
            </a>
            <Button size="sm" className="bg-gradient-brand" asChild>
              <a href={requestFormHref}>
                <Send className="w-4 h-4 mr-2" />
                {t("write")}
              </a>
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

        {/* Mobile Navigation — сгруппированная */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 max-h-[70vh] overflow-y-auto">
            <div className="flex flex-col gap-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground px-1 pt-1 pb-1.5">{t("services")}</p>
              {serviceItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:text-brand-600 transition-colors py-1.5 px-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-border/50 my-2" />
              {flatItems.slice(0, 2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:text-brand-600 transition-colors py-1.5 px-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-border/50 my-2" />
              <p className="text-xs uppercase tracking-wide text-muted-foreground px-1 pb-1.5">{t("aboutGroup")}</p>
              {aboutItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:text-brand-600 transition-colors py-1.5 px-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-border/50 my-2" />
              <Link
                href="/contacts"
                className="text-foreground hover:text-brand-600 transition-colors py-1.5 px-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("contacts")}
              </Link>
              <a
                href="tel:+998770178978"
                className="text-brand-500 font-medium py-1.5 px-1"
              >
                +998 77 017 89 78
              </a>
              <Button size="sm" className="bg-gradient-brand w-fit mt-1" asChild>
                <a href={requestFormHref}>
                  <Send className="w-4 h-4 mr-2" />
                  {t("write")}
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

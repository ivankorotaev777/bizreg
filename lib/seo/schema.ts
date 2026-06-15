// Билдеры JSON-LD (schema.org) для bizreg.uz
import { SITE, localizedUrl } from "./site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    telephone: SITE.phone,
    ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    telephone: SITE.phone,
    image: `${SITE.url}/logo.png`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: SITE.address.countryCode,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      streetAddress: SITE.address.street,
    },
    openingHours: SITE.hours,
    areaServed: "UZ",
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string; // полный URL
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.name,
    areaServed: "UZ",
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  locale: string;
  authorName?: string;
  authorJobTitle?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    inLanguage: opts.locale,
    mainEntityOfPage: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: opts.authorName
      ? {
          "@type": "Person",
          name: opts.authorName,
          ...(opts.authorJobTitle ? { jobTitle: opts.authorJobTitle } : {}),
          worksFor: { "@type": "Organization", name: SITE.name, url: SITE.url },
        }
      : { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/logo.png` },
    },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function breadcrumbSchema(
  crumbs: { name: string; path: string }[],
  locale: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: localizedUrl(locale, c.path),
    })),
  };
}

const LOGOS = [
  { src: "/brands/latenode.png", alt: "Latenode" },
  { src: "/brands/versta.png", alt: "Versta" },
  { src: "/brands/ozon.png", alt: "OZON" },
  { src: "/brands/datalec.png", alt: "Datalec" },
  { src: "/brands/jana-post.png", alt: "Jana Post" },
  { src: "/brands/debexpert.png", alt: "Debexpert" },
] as const;

/** Серая строка логотипов клиентов под трастовой фразой. */
export function TrustLogos() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      {LOGOS.map((logo) => (
        <div
          key={logo.src}
          className="flex items-center justify-center h-14 px-5 rounded-lg bg-white border border-border/50"
        >
          <img
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            className="max-h-7 sm:max-h-8 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
          />
        </div>
      ))}
    </div>
  );
}

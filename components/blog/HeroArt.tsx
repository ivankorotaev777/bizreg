// Брендовая SVG-иллюстрация для статей (абстрактный Ташкент/бизнес-мотив).
// Без фото и лицензий. Цвета — бренд-палитра (teal).
export function HeroArt({ caption }: { caption?: string }) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <svg viewBox="0 0 1200 420" className="h-auto w-full" role="img"
          aria-label="Иллюстрация: регистрация бизнеса в Узбекистане">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e6f7f5" />
              <stop offset="1" stopColor="#ffffff" />
            </linearGradient>
            <linearGradient id="bld" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#00a896" />
              <stop offset="1" stopColor="#009787" />
            </linearGradient>
          </defs>

          {/* фон */}
          <rect width="1200" height="420" fill="url(#sky)" />

          {/* солнце/круг */}
          <circle cx="980" cy="120" r="70" fill="#b3e8e2" opacity="0.7" />
          <circle cx="980" cy="120" r="44" fill="#4dcabc" opacity="0.5" />

          {/* облака-bokeh */}
          <circle cx="220" cy="90" r="40" fill="#ffffff" opacity="0.7" />
          <circle cx="280" cy="100" r="30" fill="#ffffff" opacity="0.6" />

          {/* дальний слой зданий */}
          <g fill="#b3e8e2">
            <rect x="60" y="220" width="80" height="160" rx="4" />
            <rect x="160" y="180" width="70" height="200" rx="4" />
            <rect x="250" y="240" width="90" height="140" rx="4" />
            <rect x="900" y="200" width="80" height="180" rx="4" />
            <rect x="1000" y="240" width="70" height="140" rx="4" />
            <rect x="1090" y="190" width="70" height="190" rx="4" />
          </g>

          {/* ближний слой зданий */}
          <g fill="url(#bld)">
            <rect x="120" y="260" width="100" height="120" rx="6" />
            <rect x="360" y="160" width="110" height="220" rx="6" />
            <rect x="500" y="220" width="120" height="160" rx="6" />
            <rect x="650" y="120" width="120" height="260" rx="8" />
            <rect x="800" y="240" width="110" height="140" rx="6" />
          </g>

          {/* окна на высотке */}
          <g fill="#e6f7f5" opacity="0.85">
            {[150, 190, 230, 270, 310].map((y) =>
              [675, 705, 735].map((x) => (
                <rect key={`${x}-${y}`} x={x} y={y} width="14" height="18" rx="2" />
              )),
            )}
          </g>

          {/* «карточка-документ» с галочкой */}
          <g transform="translate(430,250)">
            <rect x="0" y="0" width="170" height="110" rx="12" fill="#ffffff" stroke="#80d9cf" strokeWidth="2" />
            <rect x="18" y="22" width="90" height="10" rx="5" fill="#b3e8e2" />
            <rect x="18" y="44" width="120" height="8" rx="4" fill="#e6f7f5" />
            <rect x="18" y="62" width="100" height="8" rx="4" fill="#e6f7f5" />
            <circle cx="135" cy="80" r="20" fill="#00a896" />
            <path d="M126 80 l7 7 l12 -15" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* земля */}
          <rect x="0" y="380" width="1200" height="40" fill="#009787" opacity="0.15" />
        </svg>
      </div>
      {caption && <figcaption className="mt-2 text-center text-sm text-slate-500">{caption}</figcaption>}
    </figure>
  );
}

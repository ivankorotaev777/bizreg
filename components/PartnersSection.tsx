"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Volume2, VolumeX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Partner = {
  image: string;
  nameKey: string;
  roleKey: string;
  descKey: string;
  video?: string;
  poster?: string;
};

const PARTNERS: Partner[] = [
  { image: "/Ivan.png", nameKey: "name1", roleKey: "role1", descKey: "desc1" },
  {
    image: "/founders/elena.jpg",
    video: "/founders/elena.mp4",
    poster: "/founders/elena-poster.jpg",
    nameKey: "name2",
    roleKey: "role2",
    descKey: "desc2",
  },
  { image: "/Karima_new.jpg", nameKey: "name3", roleKey: "role3", descKey: "desc3" },
];

function FounderVideo({
  src,
  poster,
  soundOnLabel,
  soundOffLabel,
}: {
  src: string;
  poster?: string;
  soundOnLabel: string;
  soundOffLabel: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    if (soundOn) {
      video.muted = true;
      setSoundOn(false);
    } else {
      video.muted = false;
      video.currentTime = 0;
      video.play().catch(() => {});
      setSoundOn(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-label={soundOn ? soundOffLabel : soundOnLabel}
      className="relative block w-full h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover object-top"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-1 right-1 md:bottom-2 md:right-2 rounded-full bg-black/50 text-white p-1 md:p-2 pointer-events-none"
      >
        {soundOn ? (
          <Volume2 className="w-3 h-3 md:w-4 md:h-4" />
        ) : (
          <VolumeX className="w-3 h-3 md:w-4 md:h-4" />
        )}
      </span>
    </button>
  );
}

export function PartnersSection() {
  const t = useTranslations("partners");

  return (
    <section
      id="partners"
      className="py-10 lg:py-14 bg-muted/40 border-t border-border"
      aria-labelledby="partners-heading"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3 text-sm">
            {t("badge")}
          </Badge>
          <h2 id="partners-heading" className="text-3xl sm:text-4xl font-semibold text-foreground">
            {t("title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {PARTNERS.map((partner, index) => (
            <Card
              key={index}
              className="border border-border bg-card hover:border-brand-300 transition-all overflow-hidden flex flex-row md:flex-col items-center md:items-stretch gap-4 md:gap-0 p-4 md:p-0 text-left md:text-center"
            >
              <div className="shrink-0 w-20 h-20 rounded-full overflow-hidden bg-muted md:w-full md:h-auto md:rounded-none md:aspect-[3/4] md:min-h-[280px]">
                {partner.video ? (
                  <FounderVideo
                    src={partner.video}
                    poster={partner.poster}
                    soundOnLabel={t("videoSoundOn")}
                    soundOffLabel={t("videoSoundOff")}
                  />
                ) : (
                  <img
                    src={partner.image}
                    alt={t(partner.nameKey)}
                    className="w-full h-full object-cover object-top"
                  />
                )}
              </div>
              <CardContent className="p-0 md:p-5 flex-1 flex flex-col justify-center md:justify-start">
                <h3 className="font-semibold text-base sm:text-lg text-foreground">{t(partner.nameKey)}</h3>
                <p className="text-brand-600 text-xs sm:text-sm font-medium mt-0.5">{t(partner.roleKey)}</p>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1 leading-relaxed">
                  {t(partner.descKey)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

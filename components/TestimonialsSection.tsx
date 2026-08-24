"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GifVideo } from "@/components/GifVideo";

type Testimonial = {
  quoteKey: string;
  nameKey: string;
  roleKey: string;
  locationKey: string;
  image?: string;
  video?: string;
  poster?: string;
};

const testimonials: Testimonial[] = [
  { quoteKey: "quote1", nameKey: "name1", roleKey: "role1", locationKey: "location1", image: "/asel.png" },
  { quoteKey: "quote2", nameKey: "name2", roleKey: "role2", locationKey: "location2", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
  {
    quoteKey: "quote3",
    nameKey: "name3",
    roleKey: "role3",
    locationKey: "location3",
    video: "/testimonials/serge.mp4",
    poster: "/testimonials/serge-poster.jpg",
  },
];

function ExpandableQuote({
  text,
  readMoreLabel,
  readLessLabel,
}: {
  text: string;
  readMoreLabel: string;
  readLessLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-5 relative z-10">
      <p
        className={`text-muted-foreground text-base leading-relaxed ${expanded ? "" : "line-clamp-4"}`}
      >
        {text}
      </p>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="mt-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
      >
        {expanded ? readLessLabel : readMoreLabel}
      </button>
    </div>
  );
}

export const TestimonialsSection = () => {
  const t = useTranslations("testimonials");

  return (
    <section className="py-10 lg:py-14 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3 text-sm">{t("badge")}</Badge>
          <h2 className="text-3xl sm:text-4xl font-semibold">
            {t("title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto md:items-start">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden">
              {testimonial.video ? (
                <>
                  <div className="aspect-[4/5] overflow-hidden bg-muted">
                    <GifVideo
                      src={testimonial.video}
                      poster={testimonial.poster}
                      soundOnLabel={t("videoSoundOn")}
                      soundOffLabel={t("videoSoundOff")}
                    />
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <ExpandableQuote
                      text={t(testimonial.quoteKey)}
                      readMoreLabel={t("readMore")}
                      readLessLabel={t("readLess")}
                    />
                    <div>
                      <p className="font-medium">{t(testimonial.nameKey)}</p>
                      <p className="text-sm text-muted-foreground">
                        {t(testimonial.roleKey)}, {t(testimonial.locationKey)}
                      </p>
                    </div>
                  </CardContent>
                </>
              ) : (
                <>
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
                </>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

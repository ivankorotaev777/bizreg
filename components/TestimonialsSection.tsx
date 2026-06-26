"use client";

import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const testimonials = [
  { quoteKey: "quote1", nameKey: "name1", roleKey: "role1", locationKey: "location1", image: "/asel.png" },
  { quoteKey: "quote2", nameKey: "name2", roleKey: "role2", locationKey: "location2", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
  { quoteKey: "quote3", nameKey: "name3", roleKey: "role3", locationKey: "location3", image: "/faisal.png" },
];

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

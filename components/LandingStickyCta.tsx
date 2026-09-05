"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

function track(event: string) {
  trackEvent(event, "sticky");
}

type Props = {
  /** Текст кнопки */
  ctaLabel: string;
};

/** Плавающая кнопка CTA внизу экрана — только мобайл/планшет, появляется после прокрутки за hero. */
export function LandingStickyCta({ ctaLabel }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 flex justify-center px-6 pb-[52px] pointer-events-none transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-[150%]"
      }`}
    >
      <Button
        asChild
        className="pointer-events-auto w-full max-w-xs h-14 rounded-full text-base font-semibold bg-gradient-brand text-white hover:opacity-90 shadow-xl shadow-brand-500/40"
        onClick={() => track("cta_click")}
      >
        <a href="#form">{ctaLabel}</a>
      </Button>
    </div>
  );
}

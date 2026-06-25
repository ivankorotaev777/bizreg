"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

function track(event: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, { location: "sticky" });
  }
}

type Props = {
  /** Текст основной кнопки */
  ctaLabel: string;
  /** Ссылка на Telegram */
  telegram: string;
};

/** Плавающая панель CTA внизу экрана — только мобайл/планшет. */
export function LandingStickyCta({ ctaLabel, telegram }: Props) {
  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border bg-background/95 backdrop-blur px-3 py-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <Button
        asChild
        className="flex-1 rounded-full bg-gradient-brand text-white hover:opacity-90 shadow-md shadow-brand-500/20"
        onClick={() => track("cta_click")}
      >
        <a href="#form">{ctaLabel}</a>
      </Button>
      <Button
        asChild
        variant="outline"
        className="rounded-full px-4"
        aria-label="Telegram"
        onClick={() => track("telegram_click")}
      >
        <a href={telegram} target="_blank" rel="noopener noreferrer">
          <Send className="w-5 h-5" />
        </a>
      </Button>
    </div>
  );
}

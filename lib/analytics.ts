/**
 * Единая точка отправки событий в аналитику: GA4 (gtag) + Яндекс Метрика (ym).
 *
 * Имя события используется как:
 *  - GA4 event name;
 *  - идентификатор JavaScript-цели в Яндекс Метрике (ym reachGoal).
 * Поэтому имена целей в интерфейсе Метрики должны совпадать с GOALS ниже.
 */

export const YM_COUNTER_ID = 109924135;

/** Идентификаторы целей. Их же заводим в Метрике как JavaScript-цели. */
export const GOALS = {
  /** Клик по любой кнопке-CTA (открывает форму заявки) */
  CTA_CLICK: "cta_click",
  /** Клик по ссылке в Telegram */
  TELEGRAM_CLICK: "telegram_click",
  /** Успешная отправка формы заявки */
  LEAD_SUBMIT: "lead_submit",
  /** Клик по телефону */
  PHONE_CLICK: "phone_click",
  /** Расчёт в калькуляторе бухгалтерии */
  CALC_COMPLETE: "calc_complete",
} as const;

export type GoalName = (typeof GOALS)[keyof typeof GOALS];

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    ym?: (counterId: number, action: string, ...args: unknown[]) => void;
  }
}

type TrackParams = Record<string, unknown>;

/**
 * Отправляет событие одновременно в GA4 и в Яндекс Метрику.
 * Безопасно вызывать на сервере и до загрузки счётчиков — просто ничего не произойдёт.
 */
export function track(event: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;

  try {
    window.gtag?.("event", event, params);
  } catch {
    /* аналитика не должна ломать интерфейс */
  }

  try {
    window.ym?.(YM_COUNTER_ID, "reachGoal", event, params);
  } catch {
    /* аналитика не должна ломать интерфейс */
  }
}

/**
 * Совместимая обёртка под текущие вызовы на лендингах: track(event, location).
 * @param event    имя события/цели
 * @param location место на странице, откуда пришёл клик (hero, sticky, final_block…)
 * @param category логическая группа страницы (registration_landing, itpark_landing…)
 */
export function trackEvent(
  event: string,
  location: string,
  category?: string
): void {
  track(event, {
    event_category: category,
    event_label: location,
    location,
  });
}

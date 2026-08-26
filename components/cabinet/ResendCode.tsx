"use client";

import { useEffect, useState } from "react";
import { Check, RotateCw } from "lucide-react";

/**
 * Повторная отправка кода. Отдельная форма — внутрь формы входа её положить
 * нельзя. Минуту после отправки кнопка ждёт: почтовый сервис принимает не
 * чаще одного письма в минуту на адрес, раньше запрашивать бессмысленно.
 */
export function ResendCode({
  email,
  locale,
  justSent,
  initialLeft,
  labelResend,
  labelWait,
  labelSent,
}: {
  email: string;
  locale: string;
  justSent: boolean;
  /** Сколько секунд осталось до момента, когда почтовый сервис примет новое письмо. */
  initialLeft: number;
  labelResend: string;
  labelWait: string;
  labelSent: string;
}) {
  const [left, setLeft] = useState(initialLeft);

  useEffect(() => {
    if (left <= 0) return;
    const id = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [left]);

  return (
    <div className="mt-4 space-y-2">
      {justSent && (
        <p className="flex items-center justify-center gap-1.5 text-sm text-brand-600">
          <Check className="w-4 h-4" />
          {labelSent}
        </p>
      )}
      <form method="post" action="/auth/send-code" className="flex justify-center">
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="resend" value="1" />
        <button
          type="submit"
          disabled={left > 0}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:hover:text-muted-foreground disabled:opacity-60"
        >
          <RotateCw className="w-4 h-4" />
          {left > 0 ? labelWait.replace("{seconds}", String(left)) : labelResend}
        </button>
      </form>
    </div>
  );
}

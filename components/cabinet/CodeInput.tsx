"use client";

import { useRef, useState } from "react";

const LENGTH = 6;

/**
 * Код из письма — шесть отдельных клеточек.
 * Курсор сам переходит к следующей, стирание возвращает к предыдущей,
 * вставка целого кода раскладывается по клеткам, а как только набраны все
 * шесть цифр — форма отправляется сама, жать «Войти» не нужно.
 * Подстановка кода айфоном приходит целиком в первую клетку и тоже раскладывается.
 */
export function CodeInput({ name }: { name: string }) {
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const boxes = useRef<(HTMLInputElement | null)[]>([]);
  const submitted = useRef(false);

  const apply = (next: string[], from: HTMLInputElement) => {
    setDigits(next);
    const filled = next.join("");
    const cursor = Math.min(filled.length, LENGTH - 1);
    boxes.current[cursor]?.focus();

    if (filled.length === LENGTH && !submitted.current) {
      submitted.current = true;
      const form = from.form;
      // Небольшая пауза, чтобы человек увидел набранный код до перехода.
      setTimeout(() => {
        if (!form) return;
        if (typeof form.requestSubmit === "function") form.requestSubmit();
        else form.submit();
      }, 150);
    }
  };

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const entered = event.target.value.replace(/\D/g, "");
    if (!entered) {
      const next = [...digits];
      next[index] = "";
      setDigits(next);
      return;
    }
    const next = [...digits];
    // Одна цифра — в свою клетку, несколько (вставка или подстановка) — по порядку дальше.
    entered.split("").forEach((digit, offset) => {
      if (index + offset < LENGTH) next[index + offset] = digit;
    });
    apply(next, event.target);
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      event.preventDefault();
      const next = [...digits];
      next[index - 1] = "";
      setDigits(next);
      boxes.current[index - 1]?.focus();
    }
    if (event.key === "ArrowLeft" && index > 0) boxes.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < LENGTH - 1) boxes.current[index + 1]?.focus();
  };

  const handlePaste = (index: number, event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    event.preventDefault();
    const next = [...digits];
    pasted.split("").forEach((digit, offset) => {
      if (offset < LENGTH) next[offset] = digit;
    });
    apply(next, event.currentTarget);
  };

  return (
    <>
      <input type="hidden" name={name} value={digits.join("")} />
      <div className="flex gap-2" dir="ltr">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              boxes.current[index] = element;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            autoFocus={index === 0}
            maxLength={LENGTH}
            value={digit}
            aria-label={`${index + 1}`}
            onChange={(event) => handleChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={(event) => handlePaste(index, event)}
            onFocus={(event) => event.target.select()}
            className="flex-1 min-w-0 h-14 rounded-lg border border-input bg-background text-center text-2xl font-medium text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          />
        ))}
      </div>
    </>
  );
}

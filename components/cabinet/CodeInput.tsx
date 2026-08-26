"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";

/**
 * Поле для кода из письма.
 * Как только набраны все шесть цифр — вручную, вставкой или подстановкой
 * из письма на айфоне — форма отправляется сама, жать «Войти» не нужно.
 */
export function CodeInput({ id, name }: { id: string; name: string }) {
  const [value, setValue] = useState("");
  const submitted = useRef(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 6);
    setValue(digits);
    if (digits.length === 6 && !submitted.current) {
      submitted.current = true;
      const form = e.target.form;
      // Небольшая пауза, чтобы браузер успел показать подставленный код.
      setTimeout(() => {
        if (!form) return;
        // requestSubmit есть не во всех старых браузерах — тогда обычная отправка.
        if (typeof form.requestSubmit === "function") form.requestSubmit();
        else form.submit();
      }, 120);
    }
  };

  return (
    <Input
      id={id}
      name={name}
      inputMode="numeric"
      pattern="[0-9]*"
      autoComplete="one-time-code"
      required
      maxLength={6}
      placeholder="123456"
      className="text-center text-lg tracking-[0.4em]"
      autoFocus
      value={value}
      onChange={handleChange}
    />
  );
}

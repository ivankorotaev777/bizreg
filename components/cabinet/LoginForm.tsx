"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Обычная форма с отправкой на сервер. JavaScript здесь нужен только ради
 * кружка ожидания на кнопке — сама отправка работает и без него.
 */
export function LoginForm({
  action,
  submitLabel,
  children,
}: {
  action: string;
  submitLabel: string;
  children: React.ReactNode;
}) {
  const [pending, setPending] = useState(false);

  return (
    <form method="post" action={action} onSubmit={() => setPending(true)} className="space-y-4">
      {children}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending && <Loader2 className="w-4 h-4 animate-spin" />}
        {submitLabel}
      </Button>
    </form>
  );
}

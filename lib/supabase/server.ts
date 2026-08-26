import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Клиент Supabase для серверных компонентов и маршрутов.
 * Сессия читается из cookie; запись cookie в серверных компонентах
 * невозможна — там ошибка глушится, обновлением сессии занимается middleware.
 */
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Серверный компонент: запись невозможна — сессию обновит middleware.
          }
        },
      },
    }
  );
}

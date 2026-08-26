import { createClient } from "@/lib/supabase/server";

/**
 * Кто открыл страницу кабинета и сотрудник ли он BizReg.
 * Признак сотрудника берётся из базы, а не из кода: список адресов лежит
 * в таблице cabinet_admins, и правила доступа опираются на ту же проверку.
 */
export async function getCabinetUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { supabase, user: null, isAdmin: false };

  const { data } = await supabase.rpc("cabinet_is_admin");
  return { supabase, user, isAdmin: data === true };
}

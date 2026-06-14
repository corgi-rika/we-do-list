import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

/**
 * 現在ログイン中のユーザーを取得する。
 * 未ログインの場合は null を返す。
 */
export async function getCurrentUser(): Promise<User | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

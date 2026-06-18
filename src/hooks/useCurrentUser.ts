import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export type CurrentUser = {
  userId: string;
  email: string;
  username: string;
};

/**
 * ログイン中のユーザー情報（id / email / username）を一度だけ取得して保持する。
 * username は profiles テーブルから取得する。
 */
export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        if (active) {
          setUser(null);
        }
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("user_id", authUser.id)
        .single();

      if (active) {
        setUser({
          userId: authUser.id,
          email: authUser.email ?? "",
          username: profile?.username ?? "",
        });
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return { user };
}

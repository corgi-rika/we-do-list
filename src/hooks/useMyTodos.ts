import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

/**
 * ログイン中ユーザーが参加する全グループの未完了 ToDo 数を取得する。
 * RLS により自分のグループの ToDo だけが返る。
 * マイページの「未完了ToDo数」表示に使う。
 */
export function useMyTodos() {
  const [incompleteCount, setIncompleteCount] = useState(0);

  useEffect(() => {
    let active = true;

    (async () => {
      const { count } = await supabase
        .from("todos")
        .select("id", { count: "exact", head: true })
        .eq("completed", false);

      if (active) {
        setIncompleteCount(count ?? 0);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return { incompleteCount };
}

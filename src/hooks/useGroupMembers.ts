import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { GroupMember } from "@/types/member";

// DB から取得した行を GroupMember 型に変換する
type MemberRow = {
  id: string;
  user_id: string;
  role: string;
  profiles:
    | { username: string; email: string | null }[]
    | { username: string; email: string | null }
    | null;
};

function toMember(row: MemberRow): GroupMember {
  const profile = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles;
  return {
    id: row.id,
    userId: row.user_id,
    username: profile?.username ?? "名前未設定",
    email: profile?.email ?? null,
    role: row.role,
    isLeader: row.role === "leader",
  };
}

export function useGroupMembers(groupId: string | undefined) {
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [error, setError] = useState("");

  // メンバー一覧を取得（RLS により同じグループのメンバーだけ返る）
  useEffect(() => {
    if (!groupId) return;
    let active = true;

    (async () => {
      const { data, error: fetchError } = await supabase
        .from("group_members")
        .select("id, user_id, role, profiles(username, email)")
        .eq("group_id", groupId)
        .order("createdAt", { ascending: true });

      if (!active) return;
      if (fetchError) {
        setError(fetchError.message);
        return;
      }
      setMembers((data as MemberRow[]).map(toMember));
    })();

    return () => {
      active = false;
    };
  }, [groupId]);

  return { members, error };
}

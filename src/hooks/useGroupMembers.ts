import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "@/lib/auth";
import type { GroupMember } from "@/types/member";

// DB から取得した行を GroupMember 型に変換する
type MemberRow = {
  id: string;
  user_id: string;
  role: string;
  profiles: { username: string }[] | { username: string } | null;
};

function toMember(row: MemberRow): GroupMember {
  const profile = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles;
  return {
    id: row.id,
    userId: row.user_id,
    username: profile?.username ?? "名前未設定",
    role: row.role,
    isLeader: row.role === "leader",
  };
}

export function useGroupMembers(groupId: string | undefined) {
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // メンバー一覧を取得（RLS により同じグループのメンバーだけ返る）
  const fetchMembers = useCallback(async () => {
    if (!groupId) {
      setMembers([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("group_members")
      .select("id, user_id, role, profiles(username)")
      .eq("group_id", groupId)
      .order("createdAt", { ascending: true });
    setLoading(false);

    if (fetchError) {
      setError(fetchError.message);
      return;
    }
    setMembers((data as MemberRow[]).map(toMember));
  }, [groupId]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // 自分がグループから退出する
  const leaveGroup = useCallback(async (): Promise<boolean> => {
    setError("");
    if (!groupId) return false;

    const user = await getCurrentUser();
    if (!user) {
      setError("ログインが必要です");
      return false;
    }

    const { error: deleteError } = await supabase
      .from("group_members")
      .delete()
      .eq("group_id", groupId)
      .eq("user_id", user.id);

    if (deleteError) {
      setError(deleteError.message);
      return false;
    }

    setMembers((prev) => prev.filter((m) => m.userId !== user.id));
    return true;
  }, [groupId]);

  return { members, loading, error, fetchMembers, leaveGroup };
}

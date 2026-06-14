import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "@/lib/auth";
import type { Group } from "@/types/group";

// DB から取得した行を Group 型に変換する
type GroupRow = {
  id: string;
  name: string;
  team_code: string;
  owner_id: string;
  createdAt: string;
  group_members: { count: number }[];
};

function toGroup(row: GroupRow): Group {
  return {
    id: row.id,
    name: row.name,
    teamCode: row.team_code,
    ownerId: row.owner_id,
    createdAt: row.createdAt,
    memberCount: row.group_members?.[0]?.count ?? 0,
  };
}

export function useGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // グループ一覧を取得（RLS により自分が参加しているものだけ返る）
  const fetchGroups = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("groups")
      .select("id, name, team_code, owner_id, createdAt, group_members(count)")
      .order("createdAt", { ascending: false });
    setLoading(false);

    if (fetchError) {
      setError(fetchError.message);
      return;
    }
    setGroups((data as GroupRow[]).map(toGroup));
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  // グループを作成し、作成者をリーダーとしてメンバー登録する
  const createGroup = useCallback(
    async (name: string, teamCode: string): Promise<boolean> => {
      setError("");

      const user = await getCurrentUser();
      if (!user) {
        setError("ログインが必要です");
        return false;
      }

      const { data, error: insertError } = await supabase
        .from("groups")
        .insert({ name, team_code: teamCode, owner_id: user.id })
        .select("id, name, team_code, owner_id, createdAt")
        .single();

      if (insertError) {
        setError(insertError.message);
        return false;
      }

      // 作成者をリーダーとして group_members に登録
      const { error: memberError } = await supabase
        .from("group_members")
        .insert({ group_id: data.id, user_id: user.id, role: "leader" });

      if (memberError) {
        setError(memberError.message);
        return false;
      }

      setGroups((prev) => [
        toGroup({
          id: data.id,
          name: data.name,
          team_code: data.team_code,
          owner_id: data.owner_id,
          createdAt: data.createdAt,
          group_members: [{ count: 1 }],
        }),
        ...prev,
      ]);
      return true;
    },
    [],
  );

  // コードでグループに参加する
  const joinGroup = useCallback(
    async (teamCode: string): Promise<boolean> => {
      setError("");

      const user = await getCurrentUser();
      if (!user) {
        setError("ログインが必要です");
        return false;
      }

      // RLS で未参加グループは直接閲覧できないため、関数でグループIDを取得
      const { data: groupId, error: rpcError } = await supabase.rpc(
        "group_id_by_code",
        { code: teamCode },
      );

      if (rpcError) {
        setError(rpcError.message);
        return false;
      }
      if (!groupId) {
        setError("グループが見つかりません");
        return false;
      }

      const { error: joinError } = await supabase
        .from("group_members")
        .insert({ group_id: groupId, user_id: user.id, role: "member" });

      if (joinError) {
        // 一意制約違反 = 既に参加済み
        setError(
          joinError.code === "23505"
            ? "すでに参加しています"
            : joinError.message,
        );
        return false;
      }

      await fetchGroups();
      return true;
    },
    [fetchGroups],
  );

  return { groups, loading, error, fetchGroups, createGroup, joinGroup };
}

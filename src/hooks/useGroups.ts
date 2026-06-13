import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { Group } from "@/types/group";

// DB から取得した行を Group 型に変換する
type GroupRow = {
  id: string;
  name: string;
  team_code: string;
  owner_id: string;
  createdAt: string;
};

function toGroup(row: GroupRow): Group {
  return {
    id: row.id,
    name: row.name,
    teamCode: row.team_code,
    ownerId: row.owner_id,
    createdAt: row.createdAt,
  };
}

export function useGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // グループ一覧を取得（RLS により自分がオーナーのものだけ返る）
  const fetchGroups = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("groups")
      .select("id, name, team_code, owner_id, createdAt")
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

  // グループを作成する
  const createGroup = useCallback(
    async (name: string, teamCode: string): Promise<boolean> => {
      setError("");

      const {
        data: { user },
      } = await supabase.auth.getUser();
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

      setGroups((prev) => [toGroup(data as GroupRow), ...prev]);
      return true;
    },
    [],
  );

  return { groups, loading, error, fetchGroups, createGroup };
}

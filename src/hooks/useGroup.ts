import { useGroups } from "@/hooks/useGroups";

/**
 * グループID から 1 件のグループを取り出すフック。
 * useGroups() の一覧から find する処理を 1 箇所にまとめたもの。
 * group 以外（deleteGroup など）も useGroups の戻り値をそのまま返すので、
 * 必要なものだけ分割代入して使う。
 */
export function useGroup(id: string | undefined) {
  const groupsApi = useGroups();
  const group = groupsApi.groups.find((g) => g.id === id);
  return { group, ...groupsApi };
}

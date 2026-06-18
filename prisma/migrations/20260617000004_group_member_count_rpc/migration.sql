-- コードからグループのメンバー数を返す関数（参加前の満員チェック用）
-- ※ group_members には RLS が掛かっており、未参加ユーザーは他グループのメンバーを数えられない。
--   SECURITY DEFINER で RLS を回避し、正確な人数を返す。
CREATE OR REPLACE FUNCTION public.group_member_count_by_code(code TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_group_id UUID;
  member_count INTEGER;
BEGIN
  SELECT id INTO target_group_id
  FROM public.groups
  WHERE team_code = code;

  IF target_group_id IS NULL THEN
    RETURN NULL;
  END IF;

  SELECT COUNT(*) INTO member_count
  FROM public.group_members
  WHERE group_id = target_group_id;

  RETURN member_count;
END;
$$;

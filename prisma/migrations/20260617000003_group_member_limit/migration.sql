-- グループのメンバー数を最大8名に制限するトリガー
-- group_members への INSERT 前に現在の人数を数え、8名以上なら例外を投げる

CREATE OR REPLACE FUNCTION public.check_group_member_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  member_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO member_count
  FROM public.group_members
  WHERE group_id = NEW.group_id;

  IF member_count >= 8 THEN
    RAISE EXCEPTION 'group_member_limit_exceeded'
      USING ERRCODE = 'check_violation';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_group_member_limit ON public.group_members;

CREATE TRIGGER enforce_group_member_limit
BEFORE INSERT ON public.group_members
FOR EACH ROW
EXECUTE FUNCTION public.check_group_member_limit();

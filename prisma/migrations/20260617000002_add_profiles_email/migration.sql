-- profiles に email 列を追加
ALTER TABLE "profiles" ADD COLUMN "email" VARCHAR(255);

-- id 列に DB レベルのデフォルト（UUID 自動生成）を設定
-- ※ Prisma の @default(uuid()) はアプリ側生成のため、トリガー経由の INSERT では id が入らず NOT NULL 違反になる
ALTER TABLE "profiles" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- 既存ユーザーのメールを auth.users からバックフィル
UPDATE "profiles" p
SET "email" = u.email
FROM auth.users u
WHERE p.user_id = u.id;

-- handle_new_user トリガー関数を更新（サインアップ時に email も保存）
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, email, "updatedAt")
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.raw_user_meta_data->>'full_name'),
    NEW.email,
    now()
  );
  RETURN NEW;
END;
$$;

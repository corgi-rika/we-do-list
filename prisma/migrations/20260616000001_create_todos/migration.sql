-- CreateTable
CREATE TABLE "todos" (
    "id"           UUID        NOT NULL DEFAULT gen_random_uuid(),
    "group_id"     UUID        NOT NULL,
    "category_id"  UUID,
    "title"        VARCHAR(50) NOT NULL,
    "completed"    BOOLEAN     NOT NULL DEFAULT false,
    "completed_by" UUID,
    "completed_at" TIMESTAMPTZ(6),
    "createdAt"    TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"    TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_group_id_fkey"
    FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_category_id_fkey"
    FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RLS を有効化
ALTER TABLE "todos" ENABLE ROW LEVEL SECURITY;

-- SELECT: 自分が所属するグループの todos のみ取得可能
CREATE POLICY "todos_select_policy" ON "todos"
    FOR SELECT USING (group_id IN (SELECT my_group_ids()));

-- INSERT: 自分が所属するグループに todos を追加可能
CREATE POLICY "todos_insert_policy" ON "todos"
    FOR INSERT WITH CHECK (group_id IN (SELECT my_group_ids()));

-- UPDATE: 自分が所属するグループの todos を更新可能（完了状態の切り替えなど）
CREATE POLICY "todos_update_policy" ON "todos"
    FOR UPDATE USING (group_id IN (SELECT my_group_ids()));

-- DELETE: 自分が所属するグループの todos を削除可能
CREATE POLICY "todos_delete_policy" ON "todos"
    FOR DELETE USING (group_id IN (SELECT my_group_ids()));

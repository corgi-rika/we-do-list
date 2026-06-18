-- Enable RLS on categories
ALTER TABLE "categories" ENABLE ROW LEVEL SECURITY;

-- SELECT: 自分が所属するグループのカテゴリーのみ取得可能
CREATE POLICY "categories_select_policy" ON "categories"
    FOR SELECT USING (group_id IN (SELECT my_group_ids()));

-- INSERT: 自分が所属するグループにカテゴリーを追加可能
CREATE POLICY "categories_insert_policy" ON "categories"
    FOR INSERT WITH CHECK (group_id IN (SELECT my_group_ids()));

-- UPDATE: 自分が所属するグループのカテゴリーを更新可能
CREATE POLICY "categories_update_policy" ON "categories"
    FOR UPDATE USING (group_id IN (SELECT my_group_ids()));

-- DELETE: 自分が所属するグループのカテゴリーを削除可能
CREATE POLICY "categories_delete_policy" ON "categories"
    FOR DELETE USING (group_id IN (SELECT my_group_ids()));

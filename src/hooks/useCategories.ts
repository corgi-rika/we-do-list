import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { categoryColors } from "@/constants/category";
import type { Category } from "@/types/category";

// DB から取得した行を Category 型に変換する。
// 色は配列 categoryColors の並び順（index）から導出する。
type CategoryRow = {
  id: string;
  name: string;
};

function toCategory(row: CategoryRow, index: number): Category {
  return {
    id: row.id,
    name: row.name,
    color: categoryColors[index % categoryColors.length],
  };
}

export function useCategories(groupId: string | undefined) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputError, setInputError] = useState("");
  const [limitError, setLimitError] = useState("");

  // カテゴリー一覧を取得（RLS により同じグループのものだけ返る）
  const fetchCategories = useCallback(async () => {
    if (!groupId) {
      setCategories([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("categories")
      .select("id, name")
      .eq("group_id", groupId)
      .order("createdAt", { ascending: true });
    setLoading(false);

    if (fetchError) {
      setError(fetchError.message);
      return;
    }
    setCategories((data as CategoryRow[]).map(toCategory));
  }, [groupId]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const openModal = () => {
    if (categories.length >= categoryColors.length) {
      setLimitError(`追加できるカテゴリーは${categoryColors.length}個までです`);
      return;
    }
    setLimitError("");
    setInputName("");
    setInputError("");
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // カテゴリーを追加する
  const addCategory = useCallback(async () => {
    if (!groupId) return;
    if (!inputName.trim()) {
      setInputError("カテゴリー名を入力してください");
      return;
    }

    const { data, error: insertError } = await supabase
      .from("categories")
      .insert({ group_id: groupId, name: inputName.trim() })
      .select("id, name")
      .single();

    if (insertError) {
      setInputError(insertError.message);
      return;
    }

    setCategories((prev) => [
      ...prev,
      toCategory(data as CategoryRow, prev.length),
    ]);
    setIsModalOpen(false);
  }, [groupId, inputName, categories.length]);

  // カテゴリーを削除する
  const deleteCategory = useCallback(
    async (categoryId: string): Promise<boolean> => {
      setError("");
      const { error: deleteError } = await supabase
        .from("categories")
        .delete()
        .eq("id", categoryId);

      if (deleteError) {
        setError(deleteError.message);
        return false;
      }

      setCategories((prev) => prev.filter((c) => c.id !== categoryId));
      return true;
    },
    [],
  );

  return {
    categories,
    loading,
    error,
    isModalOpen,
    inputName,
    inputError,
    limitError,
    setInputName,
    openModal,
    closeModal,
    addCategory,
    deleteCategory,
  };
}

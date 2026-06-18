import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { MAX_CATEGORIES } from "@/constants/category";
import type { Category } from "@/types/category";

// DB から取得した行を Category 型に変換する。
type CategoryRow = {
  id: string;
  name: string;
};

function toCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name,
  };
}

export function useCategories(groupId: string | undefined) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputError, setInputError] = useState("");
  const [limitError, setLimitError] = useState("");

  // カテゴリー一覧を取得（RLS により同じグループのものだけ返る）
  useEffect(() => {
    if (!groupId) return;
    let active = true;

    (async () => {
      const { data, error: fetchError } = await supabase
        .from("categories")
        .select("id, name")
        .eq("group_id", groupId)
        .order("createdAt", { ascending: true });

      if (!active) return;
      if (fetchError) {
        setError(fetchError.message);
        return;
      }
      setCategories((data as CategoryRow[]).map(toCategory));
    })();

    return () => {
      active = false;
    };
  }, [groupId]);

  const openModal = () => {
    if (categories.length >= MAX_CATEGORIES) {
      setLimitError(`追加できるカテゴリーは${MAX_CATEGORIES}個までです`);
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

    setCategories((prev) => [...prev, toCategory(data as CategoryRow)]);
    setIsModalOpen(false);
  }, [groupId, inputName]);

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

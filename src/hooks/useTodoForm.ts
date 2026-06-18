import { useState } from "react";
import { MAX_TODOS_PER_GROUP } from "@/constants/todo";

type UseTodoFormParams = {
  // 上限チェック用の現在の ToDo 件数
  todosCount: number;
  // 実際の DB 追加処理（useTodos が持つ addTodo を渡す）
  onAdd: (
    title: string,
    categoryId: string | null,
  ) => Promise<{ ok: boolean; error?: string }>;
};

/**
 * ToDo 追加モーダルのフォーム状態だけを担当するフック。
 * DB 追加処理そのものは持たず、onAdd（useTodos.addTodo）に委譲する。
 */
export function useTodoForm({ todosCount, onAdd }: UseTodoFormParams) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputCategoryId, setInputCategoryId] = useState<string | null>(null);
  const [titleError, setTitleError] = useState("");
  const [limitError, setLimitError] = useState("");

  const openAddModal = (defaultCategoryId: string | null = null) => {
    if (todosCount >= MAX_TODOS_PER_GROUP) {
      setLimitError(`追加できるToDoは${MAX_TODOS_PER_GROUP}件までです`);
      return;
    }
    setLimitError("");
    setInputTitle("");
    setInputCategoryId(defaultCategoryId);
    setTitleError("");
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => setIsAddModalOpen(false);

  // 入力を検証し、問題なければ onAdd（DB追加）を呼ぶ
  const submit = async (): Promise<boolean> => {
    if (!inputTitle.trim()) {
      setTitleError("タイトルを入力してください");
      return false;
    }

    const result = await onAdd(inputTitle.trim(), inputCategoryId);
    if (!result.ok) {
      setTitleError(result.error ?? "");
      return false;
    }

    setIsAddModalOpen(false);
    return true;
  };

  return {
    isAddModalOpen,
    inputTitle,
    inputCategoryId,
    titleError,
    limitError,
    setInputTitle,
    setInputCategoryId,
    openAddModal,
    closeAddModal,
    submit,
  };
}

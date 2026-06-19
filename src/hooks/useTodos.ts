import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import type { Todo } from "@/types/todo";

// DB から取得した行を Todo 型に変換する
type TodoRow = {
  id: string;
  group_id: string;
  category_id: string | null;
  title: string;
  completed: boolean;
  completed_by: string | null;
  completed_at: string | null;
  createdAt: string;
};

function toTodo(row: TodoRow, completedByUsername: string | null): Todo {
  return {
    id: row.id,
    groupId: row.group_id,
    categoryId: row.category_id,
    title: row.title,
    completed: row.completed,
    completedBy: row.completed_by,
    completedByUsername,
    completedAt: row.completed_at,
    createdAt: row.createdAt,
  };
}

export function useTodos(groupId: string | undefined) {
  const { user: currentUser } = useCurrentUser();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");

  // ToDo 一覧を取得（RLS により同じグループのものだけ返る）
  useEffect(() => {
    if (!groupId) return;
    let active = true;

    (async () => {
      const { data, error: fetchError } = await supabase
        .from("todos")
        .select(
          "id, group_id, category_id, title, completed, completed_by, completed_at, createdAt",
        )
        .eq("group_id", groupId)
        .order("createdAt", { ascending: false });

      if (!active) return;
      if (fetchError) {
        setError(fetchError.message);
        return;
      }

      const rows = (data as TodoRow[]) ?? [];

      // 完了者のユーザー名をまとめて取得する
      const completedByIds = Array.from(
        new Set(
          rows
            .map((r) => r.completed_by)
            .filter((id): id is string => id !== null),
        ),
      );

      let usernameMap: Record<string, string> = {};
      if (completedByIds.length > 0) {
        const { data: profileRows } = await supabase
          .from("profiles")
          .select("user_id, username")
          .in("user_id", completedByIds);
        usernameMap = (profileRows ?? []).reduce<Record<string, string>>(
          (acc, p) => {
            acc[p.user_id] = p.username;
            return acc;
          },
          {},
        );
      }

      if (!active) return;
      setTodos(
        rows.map((row) =>
          toTodo(
            row,
            row.completed_by ? (usernameMap[row.completed_by] ?? null) : null,
          ),
        ),
      );
    })();

    return () => {
      active = false;
    };
  }, [groupId]);

  // ToDo を追加する（DB への insert のみを担当。入力検証やモーダル制御は useTodoForm 側）
  const addTodo = useCallback(
    async (
      title: string,
      categoryId: string | null,
    ): Promise<{ ok: boolean; error?: string }> => {
      if (!groupId) return { ok: false };

      const { data, error: insertError } = await supabase
        .from("todos")
        .insert({
          group_id: groupId,
          category_id: categoryId ?? null,
          title,
        })
        .select(
          "id, group_id, category_id, title, completed, completed_by, completed_at, createdAt",
        )
        .single();

      if (insertError) {
        return { ok: false, error: insertError.message };
      }

      setTodos((prev) => [toTodo(data as TodoRow, null), ...prev]);
      return { ok: true };
    },
    [groupId],
  );

  // 完了状態を切り替える
  const toggleTodo = useCallback(
    async (todoId: string): Promise<void> => {
      const todo = todos.find((t) => t.id === todoId);
      if (!todo) return;

      const newCompleted = !todo.completed;
      const now = new Date().toISOString();

      // 完了者はキャッシュ済みのログインユーザーから取得
      const currentUserId = currentUser?.userId ?? null;
      const currentUsername = newCompleted
        ? (currentUser?.username ?? null)
        : null;

      // 楽観的更新
      setTodos((prev) =>
        prev.map((t) =>
          t.id === todoId
            ? {
                ...t,
                completed: newCompleted,
                completedBy: newCompleted ? currentUserId : null,
                completedByUsername: newCompleted ? currentUsername : null,
                completedAt: newCompleted ? now : null,
              }
            : t,
        ),
      );

      const { error: updateError } = await supabase
        .from("todos")
        .update({
          completed: newCompleted,
          completed_by: newCompleted ? currentUserId : null,
          completed_at: newCompleted ? now : null,
        })
        .eq("id", todoId);

      if (updateError) {
        // 失敗時は元に戻す
        setTodos((prev) =>
          prev.map((t) =>
            t.id === todoId
              ? {
                  ...t,
                  completed: todo.completed,
                  completedBy: todo.completedBy,
                  completedByUsername: todo.completedByUsername,
                  completedAt: todo.completedAt,
                }
              : t,
          ),
        );
        setError(updateError.message);
      }
    },
    [todos, currentUser],
  );

  // ToDo を削除する
  const deleteTodo = useCallback(async (todoId: string): Promise<boolean> => {
    setError("");
    const { error: deleteError } = await supabase
      .from("todos")
      .delete()
      .eq("id", todoId);

    if (deleteError) {
      setError(deleteError.message);
      return false;
    }

    setTodos((prev) => prev.filter((t) => t.id !== todoId));
    return true;
  }, []);

  // 編集用state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);
  const [editError, setEditError] = useState("");

  // 編集モーダルを開く
  const openEditModal = (
    todoId: string,
    title: string,
    categoryId: string | null,
  ) => {
    setEditingTodoId(todoId);
    setEditTitle(title);
    setEditCategoryId(categoryId);
    setEditError("");
    setIsEditModalOpen(true);
  };

  // 編集モーダルを閉じる
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // TODOを更新する
  const updateTodo = useCallback(
    async (
      todoId: string,
      newTitle: string,
      newCategoryId: string | null,
    ): Promise<boolean> => {
      if (!newTitle.trim()) {
        setEditError("タイトルを入力してください");
        return false;
      }

      const { error: updateError } = await supabase
        .from("todos")
        .update({ title: newTitle.trim(), category_id: newCategoryId })
        .eq("id", todoId);

      if (updateError) {
        setEditError(updateError.message);
        return false;
      }

      setTodos((prev) =>
        prev.map((t) =>
          t.id === todoId
            ? { ...t, title: newTitle.trim(), categoryId: newCategoryId }
            : t,
        ),
      );
      setIsEditModalOpen(false);
      return true;
    },
    [],
  );

  // 統合submit
  const handleTodoSubmit = async () => {
    if (editingTodoId) {
      await updateTodo(editingTodoId, editTitle, editCategoryId);
    }
  };

  return {
    todos,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    isEditModalOpen,
    editingTodoId,
    editTitle,
    editCategoryId,
    editError,
    setEditTitle,
    setEditCategoryId,
    openEditModal,
    closeEditModal,
    handleTodoSubmit,
  };
}

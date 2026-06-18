"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useGroup } from "@/hooks/useGroup";
import { useCategories } from "@/hooks/useCategories";
import { useTodos } from "@/hooks/useTodos";
import { useTodoForm } from "@/hooks/useTodoForm";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import PageHeader from "@/components/PageHeader";
import Modal from "@/components/Modal";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import ValidationMessage from "@/components/ValidationMessage";
import AchievementCard from "@/components/AchievementCard";
import CategoryAccordion from "@/components/CategoryAccordion";
import CategoryChip from "@/components/CategoryChip";

export default function GroupTodosPage() {
  const { id } = useParams<{ id: string }>();
  const { group } = useGroup(id);

  const { categories } = useCategories(id);
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos(id);
  const {
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
  } = useTodoForm({ todosCount: todos.length, onAdd: addTodo });

  const { user: currentUser } = useCurrentUser();

  const isLeader =
    currentUser !== null && group?.ownerId === currentUser.userId;

  const done = todos.filter((t) => t.completed).length;
  const total = todos.length;

  // アコーディオン開閉状態
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  // 削除確認モーダル
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      await deleteTodo(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="pb-24">
      <PageHeader
        title={group?.name ?? "ToDo"}
        rightAction={
          <button
            onClick={() => openAddModal(categories[0]?.id ?? null)}
            disabled={categories.length === 0}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <PlusIcon className="w-6 h-6 text-white" />
          </button>
        }
      />

      {/* 達成率カード */}
      <AchievementCard
        groupName={group?.name ?? ""}
        done={done}
        total={total}
      />

      {/* 上限エラー */}
      {limitError && (
        <div className="mt-3">
          <ValidationMessage message={limitError} />
        </div>
      )}

      {/* カテゴリーアコーディオン */}
      <div className="mt-4">
        {categories.map((category) => (
          <CategoryAccordion
            key={category.id}
            category={{
              id: category.id,
              name: category.name,
            }}
            todos={todos.filter((t) => t.categoryId === category.id)}
            isOpen={openCategoryId === category.id}
            onToggleOpen={() =>
              setOpenCategoryId(
                openCategoryId === category.id ? null : category.id,
              )
            }
            isLeader={isLeader}
            onToggleTodo={(todoId) => toggleTodo(todoId)}
            onDeleteTodo={(todoId) => setDeleteTargetId(todoId)}
          />
        ))}
      </div>

      {/* 削除確認モーダル */}
      {deleteTargetId && (
        <DeleteConfirmModal
          title="ToDo削除"
          message={{
            title: "このToDoを削除しますか？",
            description: "この操作は取り消せません。",
          }}
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeleteTargetId(null)}
        />
      )}

      {/* ToDo追加モーダル */}
      {isAddModalOpen && (
        <Modal title="ToDoを追加" onClose={closeAddModal}>
          <div className="flex flex-col gap-4 p-4">
            <Input
              label="タイトル"
              placeholder="例：掃除機をかける"
              value={inputTitle}
              onChange={setInputTitle}
              error={titleError}
            />
            {/* カテゴリー選択 */}
            <div className="flex flex-col gap-1">
              <span className="text-sm text-foreground">カテゴリー</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <CategoryChip
                    key={cat.id}
                    name={cat.name}
                    selected={inputCategoryId === cat.id}
                    onClick={() => setInputCategoryId(cat.id)}
                  />
                ))}
              </div>
            </div>
            <Button variant="primary" fullWidth onClick={submit}>
              追加
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

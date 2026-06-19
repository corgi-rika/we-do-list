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
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import ValidationMessage from "@/components/ValidationMessage";
import AchievementCard from "@/components/AchievementCard";
import CategoryAccordion from "@/components/CategoryAccordion";
import TodoFormModal from "@/components/TodoFormModal";

export default function GroupTodosPage() {
  const { id } = useParams<{ id: string }>();
  const { group } = useGroup(id);

  const { categories } = useCategories(id);
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    isEditModalOpen,
    editTitle,
    editCategoryId,
    editError,
    setEditTitle,
    setEditCategoryId,
    openEditModal,
    closeEditModal,
    handleTodoSubmit,
  } = useTodos(id);
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
            onEditTodo={(todoId) => {
              const todo = todos.find((t) => t.id === todoId);
              if (todo) {
                openEditModal(todo.id, todo.title, todo.categoryId);
              }
            }}
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
        <TodoFormModal
          title="ToDoを追加"
          inputTitle={inputTitle}
          onChangeTitle={setInputTitle}
          titleError={titleError}
          categories={categories}
          selectedCategoryId={inputCategoryId}
          onSelectCategory={setInputCategoryId}
          onSubmit={submit}
          onClose={closeAddModal}
          submitLabel="追加"
        />
      )}

      {/* ToDo編集モーダル */}
      {isEditModalOpen && (
        <TodoFormModal
          title="ToDoを編集"
          inputTitle={editTitle}
          onChangeTitle={setEditTitle}
          titleError={editError}
          categories={categories}
          selectedCategoryId={editCategoryId}
          onSelectCategory={setEditCategoryId}
          onSubmit={handleTodoSubmit}
          onClose={closeEditModal}
          submitLabel="更新"
        />
      )}
    </div>
  );
}

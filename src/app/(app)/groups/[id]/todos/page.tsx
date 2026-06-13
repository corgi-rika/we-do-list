"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ExclamationTriangleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useGroups } from "@/hooks/useGroups";
import { dummyCategories } from "@/dummy/categories";
import { useTodoStore } from "@/store/todoStore";
import { MAX_TODOS_PER_GROUP } from "@/constants/todo";
import PageHeader from "@/components/PageHeader";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import ValidationMessage from "@/components/ValidationMessage";
import AchievementCard from "@/components/AchievementCard";
import CategoryAccordion from "@/components/CategoryAccordion";

const IS_LEADER = true;

export default function GroupTodosPage() {
  const { id } = useParams<{ id: string }>();
  const { groups } = useGroups();
  const group = groups.find((g) => g.id === id);

  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore();
  const groupTodos = todos.filter((t) => t.groupId === id);
  const done = groupTodos.filter((t) => t.completed).length;
  const total = groupTodos.length;

  // アコーディオン開閉状態
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  // 削除確認モーダル
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // TODO追加モーダル
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputCategoryId, setInputCategoryId] = useState(dummyCategories[0].id);
  const [titleError, setTitleError] = useState("");
  const [limitError, setLimitError] = useState("");

  const handleToggle = (todoId: string) => {
    setDeleteTargetId(null);
    toggleTodo(todoId);
  };

  const handleDeleteConfirm = () => {
    if (deleteTargetId) {
      deleteTodo(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  const handleAdd = () => {
    setTitleError("");
    setLimitError("");
    if (inputTitle.trim() === "") {
      setTitleError("タイトルを入力してください");
      return;
    }
    const success = addTodo(inputTitle.trim(), inputCategoryId, id);
    if (!success) {
      setLimitError(
        `グループのTODOが上限（${MAX_TODOS_PER_GROUP}件）に達しています`,
      );
      return;
    }
    setInputTitle("");
    setInputCategoryId(dummyCategories[0].id);
    setIsAddModalOpen(false);
  };

  return (
    <div className="pb-24">
      <PageHeader
        title={group?.name ?? "ToDo"}
        rightAction={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-md"
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

      {/* カテゴリーアコーディオン */}
      <div className="mt-4">
        {dummyCategories.map((category) => (
          <CategoryAccordion
            key={category.id}
            category={category}
            todos={groupTodos.filter((t) => t.categoryId === category.id)}
            isOpen={openCategoryId === category.id}
            onToggleOpen={() =>
              setOpenCategoryId(
                openCategoryId === category.id ? null : category.id,
              )
            }
            isLeader={IS_LEADER}
            onToggleTodo={handleToggle}
            onDeleteTodo={(todoId) => setDeleteTargetId(todoId)}
          />
        ))}
      </div>

      {/* 削除確認モーダル */}
      {deleteTargetId && (
        <Modal title="ToDo削除" onClose={() => setDeleteTargetId(null)}>
          <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col items-center gap-2 bg-red-50 rounded p-4">
              <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
              <p className="text-sm font-medium text-red-600">
                このToDoを削除しますか？
              </p>
              <p className="text-xs text-red-400">この操作は取り消せません。</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setDeleteTargetId(null)}
              >
                キャンセル
              </Button>
              <Button
                variant="destructive"
                fullWidth
                onClick={handleDeleteConfirm}
              >
                削除する
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* TODO追加モーダル */}
      {isAddModalOpen && (
        <Modal title="ToDoを追加" onClose={() => setIsAddModalOpen(false)}>
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
                {dummyCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setInputCategoryId(cat.id)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm border ${
                      inputCategoryId === cat.id
                        ? "border-primary bg-primary-light"
                        : "border-gray-300"
                    }`}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: cat.dotColor,
                        flexShrink: 0,
                      }}
                    />
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
            {limitError && <ValidationMessage message={limitError} />}
            <Button variant="primary" fullWidth onClick={handleAdd}>
              追加
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

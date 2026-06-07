"use client";

import {
  EllipsisHorizontalCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";
import type { TodoItemProps } from "./type";

export default function TodoItem({
  todo,
  isLeader,
  onToggle,
  onDelete,
}: TodoItemProps) {
  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100">
      {/* チェックボタン */}
      <button
        onClick={() => onToggle(todo.id)}
        className="shrink-0 flex items-center justify-center text-primary hover:opacity-80"
      >
        {todo.completed ? (
          <CheckCircleIconSolid className="w-6 h-6" />
        ) : (
          <EllipsisHorizontalCircleIcon className="w-6 h-6" />
        )}
      </button>

      {/* タイトル */}
      <span
        className={`flex-1 text-sm ${
          todo.completed ? "text-muted line-through" : "text-foreground"
        }`}
      >
        {todo.title}
      </span>

      {/* 削除ボタン（完了 && リーダーのみ） */}
      {todo.completed && isLeader && (
        <button
          onClick={() => onDelete(todo.id)}
          className="shrink-0 text-red-400 hover:text-red-600"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

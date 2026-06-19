"use client";

import {
  EllipsisHorizontalCircleIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";
import MutedText from "@/components/MutedText";
import type { TodoItemProps } from "./type";

export default function TodoItem({
  todo,
  isLeader,
  onToggle,
  onEdit,
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

      {/* タイトル・完了メッセージ */}
      <div className="flex-1 min-w-0">
        <span
          className={`block text-sm ${
            todo.completed ? "text-muted line-through" : "text-foreground"
          }`}
        >
          {todo.title}
        </span>
        {todo.completed && todo.completedByUsername && (
          <MutedText size="xs">
            {todo.completedByUsername}が完了しました
          </MutedText>
        )}
      </div>

      <div className="flex gap-1 shrink-0">
        {onEdit && !todo.completed && (
          <button
            onClick={() => onEdit(todo.id)}
            className="shrink-0 text-primary hover:text-primary-dark transition-colors"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
        )}
        {todo.completed && isLeader && (
          <button
            onClick={() => onDelete(todo.id)}
            className="shrink-0 text-red-400 hover:text-red-600"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

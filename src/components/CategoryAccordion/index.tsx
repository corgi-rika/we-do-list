"use client";

import { ChevronDownIcon, TagIcon } from "@heroicons/react/24/outline";
import Card from "@/components/Card";
import TodoItem from "@/components/TodoItem";
import type { CategoryAccordionProps } from "./type";

export default function CategoryAccordion({
  category,
  todos,
  isOpen,
  onToggleOpen,
  isLeader,
  onToggleTodo,
  onDeleteTodo,
}: CategoryAccordionProps) {
  const incompletes = todos.filter((t) => !t.completed);
  const completes = todos.filter((t) => t.completed);

  return (
    <div className="mb-2 mx-4">
      {/* ヘッダー */}
      <Card onClick={onToggleOpen} padding="md">
        <div className="flex items-center gap-3">
          <ChevronDownIcon
            className={`w-5 h-5 text-foreground transition-transform ${
              isOpen ? "rotate-0" : "-rotate-90"
            }`}
          />
          <TagIcon className="w-4 h-4 shrink-0 text-primary" />
          <span className="flex-1 text-left text-sm font-medium text-foreground">
            {category.name}
          </span>
          <span className="text-xs text-muted">{incompletes.length}</span>
        </div>
      </Card>

      {/* ボディ */}
      {isOpen && (
        <div className="bg-gray-50 px-4 py-2">
          {/* 未完リスト */}
          {incompletes.length > 0 ? (
            <div>
              {incompletes.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isLeader={isLeader}
                  onToggle={onToggleTodo}
                  onDelete={onDeleteTodo}
                />
              ))}
            </div>
          ) : (
            <div className="text-xs text-muted py-2">
              未完のTODOはありません
            </div>
          )}

          {/* 完了済みセクション */}
          {completes.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-300">
              <div className="text-xs font-medium text-muted mb-2">
                完了済み ({completes.length})
              </div>
              {completes.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isLeader={isLeader}
                  onToggle={onToggleTodo}
                  onDelete={onDeleteTodo}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

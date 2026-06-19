import type { Todo } from "@/types/todo";

export type CategoryAccordionProps = {
  category: { id: string; name: string };
  todos: Todo[]; // 該当カテゴリのTODO（フィルタ済み）
  isOpen: boolean;
  onToggleOpen: () => void;
  isLeader: boolean;
  onToggleTodo: (id: string) => void;
  onEditTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
};

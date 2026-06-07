import type { Category } from "@/dummy/categories";
import type { Todo } from "@/dummy/todos";

export type CategoryAccordionProps = {
  category: Category;
  todos: Todo[]; // 該当カテゴリのTODO（フィルタ済み）
  isOpen: boolean;
  onToggleOpen: () => void;
  isLeader: boolean;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
};

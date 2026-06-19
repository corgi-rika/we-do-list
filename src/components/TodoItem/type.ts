import type { Todo } from "@/types/todo";

export type TodoItemProps = {
  todo: Todo;
  isLeader: boolean;
  onToggle: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete: (id: string) => void;
};

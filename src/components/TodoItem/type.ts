import type { Todo } from "@/dummy/todos";

export type TodoItemProps = {
  todo: Todo;
  isLeader: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

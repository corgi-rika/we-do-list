import { create } from "zustand";
import { dummyTodos } from "@/dummy/todos";
import { MAX_TODOS_PER_GROUP } from "@/constants/todo";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  categoryId: string;
  groupId: string;
};

type TodoStore = {
  todos: Todo[];
  addTodo: (title: string, categoryId: string, groupId: string) => boolean;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: dummyTodos,
  addTodo: (title, categoryId, groupId) => {
    const count = get().todos.filter((t) => t.groupId === groupId).length;
    if (count >= MAX_TODOS_PER_GROUP) return false;
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: Date.now().toString(),
          title,
          completed: false,
          categoryId,
          groupId,
        },
      ],
    }));
    return true;
  },
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));

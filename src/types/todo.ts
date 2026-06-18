export type Todo = {
  id: string;
  groupId: string;
  categoryId: string | null;
  title: string;
  completed: boolean;
  completedBy: string | null;
  completedByUsername: string | null;
  completedAt: string | null;
  createdAt: string;
};

import type { RecentTodo } from "@/dummy/members";

export type MemberModalProps = {
  member: {
    name: string;
    isLeader: boolean;
    avatarColor: string;
    textColor: string;
    email: string;
    recentTodos: RecentTodo[];
  };
  onClose: () => void;
};

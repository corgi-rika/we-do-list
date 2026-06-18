export type GroupMember = {
  id: string;
  userId: string;
  username: string;
  email: string | null;
  role: string;
  isLeader: boolean;
};

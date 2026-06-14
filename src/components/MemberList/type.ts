import type { GroupMember } from "@/types/member";

export type MemberListProps = {
  members: GroupMember[];
  onSelect: (member: GroupMember) => void;
};

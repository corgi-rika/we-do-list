import type { GroupMember } from "@/types/member";

export type MemberModalProps = {
  member: GroupMember;
  onClose: () => void;
};

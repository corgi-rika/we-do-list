import type { Member } from "@/dummy/members";

export type MemberModalProps = {
  member: Member;
  onClose: () => void;
};

import type { Member } from "@/dummy/members";

export type MemberListProps = {
  members: Member[];
  onSelect: (member: Member) => void;
};

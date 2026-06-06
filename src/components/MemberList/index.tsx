import Card from "@/components/Card";
import MutedText from "@/components/MutedText";
import MemberAvatar from "@/components/MemberAvatar";
import type { MemberListProps } from "./type";

const MAX_VISIBLE = 8;

export default function MemberList({ members, onSelect }: MemberListProps) {
  const visibleMembers = [...members]
    .sort((a, b) => (b.isLeader ? 1 : 0) - (a.isLeader ? 1 : 0))
    .slice(0, MAX_VISIBLE);

  return (
    <Card padding="md">
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold">メンバー</p>
          <MutedText>{members.length}人</MutedText>
        </div>
        <div className="grid grid-cols-4 gap-y-3">
          {visibleMembers.map((member) => (
            <MemberAvatar
              key={member.id}
              name={member.name}
              isLeader={member.isLeader}
              onClick={() => onSelect(member)}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}

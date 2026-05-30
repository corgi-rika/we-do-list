import { UserGroupIcon } from "@heroicons/react/24/outline";
import Card from "@/components/Card";
import type { GroupCardProps } from "./type";

export default function GroupCard({
  name,
  memberCount,
  onClick,
}: GroupCardProps) {
  return (
    <Card padding="md" onClick={onClick}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center shrink-0">
          <UserGroupIcon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{name}</span>
          <span className="text-sm text-muted">{memberCount}人のメンバー</span>
        </div>
      </div>
    </Card>
  );
}

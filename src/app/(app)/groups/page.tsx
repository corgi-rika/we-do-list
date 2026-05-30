"use client";

import { useRouter } from "next/navigation";
import {
  PlusIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import GroupCard from "@/components/GroupCard";
import GroupEmptyState from "@/components/GroupEmptyState";
import { dummyGroups } from "@/dummy/groups";

export default function GroupsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="grid grid-cols-2 gap-3">
        <Button variant="primary" fullWidth href="/groups/create">
          <span className="flex flex-col items-center gap-1">
            <PlusIcon className="w-6 h-6" />
            <span>グループを作成</span>
          </span>
        </Button>
        <Button variant="secondary" fullWidth href="/groups/join">
          <span className="flex flex-col items-center gap-1">
            <ArrowRightEndOnRectangleIcon className="w-6 h-6" />
            <span>コードで参加</span>
          </span>
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {dummyGroups.length === 0 ? (
          <GroupEmptyState />
        ) : (
          <div className="flex flex-col gap-2">
            {dummyGroups.map((group) => (
              <GroupCard
                key={group.id}
                name={group.name}
                memberCount={group.memberCount}
                onClick={() => router.push(`/groups/${group.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import GroupCard from "@/components/GroupCard";
import { useGroups } from "@/hooks/useGroups";
import MutedText from "@/components/MutedText";

export default function TodosPage() {
  const router = useRouter();
  const { groups } = useGroups();

  return (
    <div className="flex flex-col gap-6 py-6">
      <div>
        <h1 className="text-2xl font-bold">ToDo</h1>
        <MutedText className="mt-1">どのグループのToDoを見ますか？</MutedText>
      </div>

      <div className="flex flex-col gap-2">
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            name={group.name}
            memberCount={group.memberCount}
            onClick={() => router.push(`/groups/${group.id}/todos`)}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Cog6ToothIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import Card from "@/components/Card";
import Button from "@/components/Button";
import MutedText from "@/components/MutedText";
import MemberAvatar from "@/components/MemberAvatar";
import PageHeader from "@/components/PageHeader";
import IconButton from "@/components/IconButton";
import CategoryCard from "@/components/CategoryCard";
import MemberModal from "@/components/MemberModal";
import { dummyGroups } from "@/dummy/groups";
import { dummyMembers, type Member } from "@/dummy/members";
import { dummyCategories } from "@/dummy/categories";

export default function GroupDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const group = dummyGroups.find((g) => g.id === id);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  return (
    <div className="flex flex-col gap-6 py-2">
      <PageHeader
        title={group?.name ?? "グループ"}
        onBack={() => router.back()}
        rightAction={
          <IconButton onClick={() => router.push(`/groups/${id}/settings`)}>
            <Cog6ToothIcon className="w-6 h-6 text-foreground" />
          </IconButton>
        }
      />

      {/* メンバーカード */}
      <Card padding="md">
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-semibold">メンバー</p>
            <MutedText>{dummyMembers.length}人</MutedText>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              rowGap: "12px",
            }}
          >
            {[...dummyMembers]
              .sort((a, b) => (b.isLeader ? 1 : 0) - (a.isLeader ? 1 : 0))
              .slice(0, 8)
              .map((member) => (
                <MemberAvatar
                  key={member.id}
                  name={member.name}
                  isLeader={member.isLeader}
                  avatarColor={member.avatarColor}
                  textColor={member.textColor}
                  onClick={() => setSelectedMember(member)}
                />
              ))}
          </div>
        </div>
      </Card>

      {/* カテゴリー */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">カテゴリー</h2>
          <button
            className="text-primary cursor-pointer"
            onClick={() => router.push("/categories/create")}
          >
            <PlusCircleIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {dummyCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              name={cat.name}
              dotColor={cat.dotColor}
            />
          ))}
        </div>
      </div>

      {/* ToDoを見るボタン */}
      <Button variant="primary" fullWidth href={`/todos/group/${id}`}>
        ToDoを見る
      </Button>

      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}

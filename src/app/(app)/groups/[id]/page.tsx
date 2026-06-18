"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Cog6ToothIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import IconButton from "@/components/IconButton";
import CategoryCard from "@/components/CategoryCard";
import MemberList from "@/components/MemberList";
import MemberModal from "@/components/MemberModal";
import CategoryModal from "@/components/CategoryModal";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import ValidationMessage from "@/components/ValidationMessage";
import { useCategories } from "@/hooks/useCategories";
import { useGroup } from "@/hooks/useGroup";
import { useGroupMembers } from "@/hooks/useGroupMembers";
import type { GroupMember } from "@/types/member";

export default function GroupDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { group } = useGroup(id);
  const { members } = useGroupMembers(id);
  const [selectedMember, setSelectedMember] = useState<GroupMember | null>(
    null,
  );
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(
    null,
  );
  const {
    categories,
    isModalOpen,
    inputName,
    inputError,
    limitError,
    setInputName,
    openModal,
    closeModal,
    addCategory,
    deleteCategory,
  } = useCategories(id);

  const handleDeleteCategory = async () => {
    if (!deletingCategoryId) return;
    const success = await deleteCategory(deletingCategoryId);
    if (success) {
      setDeletingCategoryId(null);
    }
  };

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
      <MemberList members={members} onSelect={setSelectedMember} />

      {/* カテゴリー */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">カテゴリー</h2>
          <button className="text-primary cursor-pointer" onClick={openModal}>
            <PlusCircleIcon className="w-6 h-6" />
          </button>
        </div>
        {limitError && <ValidationMessage message={limitError} />}
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              name={cat.name}
              onDelete={() => setDeletingCategoryId(cat.id)}
            />
          ))}
        </div>
      </div>

      {/* ToDoを見るボタン */}
      <Button variant="primary" fullWidth href={`/groups/${id}/todos`}>
        ToDoを見る
      </Button>

      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}

      {/* カテゴリー追加モーダル */}
      {isModalOpen && (
        <CategoryModal
          inputName={inputName}
          onChange={setInputName}
          error={inputError}
          onSubmit={addCategory}
          onClose={closeModal}
        />
      )}

      {/* カテゴリー削除確認モーダル */}
      {deletingCategoryId && (
        <DeleteConfirmModal
          title="カテゴリーを削除"
          message={{
            title: "このカテゴリーを削除しますか？",
            description: (
              <>
                削除すると、このカテゴリー内の全てのToDoも削除されます。
                <br />
                この操作は取り消せません。
              </>
            ),
          }}
          onConfirm={handleDeleteCategory}
          onClose={() => setDeletingCategoryId(null)}
        />
      )}
    </div>
  );
}

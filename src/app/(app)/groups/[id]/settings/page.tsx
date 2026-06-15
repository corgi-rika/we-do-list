"use client";

import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { TrashIcon } from "@heroicons/react/24/outline";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import Button from "@/components/Button";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import MutedText from "@/components/MutedText";
import TeamCodeCard from "@/components/TeamCodeCard";
import { useGroups } from "@/hooks/useGroups";

export default function GroupSettingsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { groups } = useGroups();
  const group = groups.find((g) => g.id === id);

  const [copied, setCopied] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(group?.teamCode ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [group?.teamCode]);

  const handleDelete = useCallback(() => {
    // TODO: 削除処理
    setIsDeleteOpen(false);
    router.push("/groups");
  }, [router]);

  return (
    <div className="flex flex-col gap-6 py-2">
      <PageHeader
        title="グループ設定"
        onBack={() => router.push(`/groups/${id}`)}
      />

      {/* グループ名 + コード */}
      <Card padding="md">
        <div className="flex flex-col gap-4">
          {/* グループ名 */}
          <div className="flex flex-col gap-1">
            <MutedText size="xs">グループ名</MutedText>
            <p className="font-semibold text-foreground">
              {group?.name ?? "グループ"}
            </p>
          </div>

          <hr className="border-gray-100" />

          {/* グループコード */}
          <div className="flex flex-col gap-3">
            <MutedText size="xs">グループコード</MutedText>
            <TeamCodeCard
              code={group?.teamCode ?? "------"}
              copied={copied}
              onCopy={handleCopy}
            />
          </div>
        </div>
      </Card>

      {/* 削除ボタン */}
      <Button
        variant="destructive"
        fullWidth
        onClick={() => setIsDeleteOpen(true)}
      >
        <span className="flex items-center justify-center gap-2">
          <TrashIcon className="w-5 h-5" />
          グループを削除
        </span>
      </Button>

      {/* 削除確認モーダル */}
      {isDeleteOpen && (
        <DeleteConfirmModal
          title="グループ削除"
          message={{
            title: "このグループを削除しますか？",
            description: (
              <>
                削除すると、グループ内の全てのToDoも削除されます。
                <br />
                この操作は取り消せません。
              </>
            ),
          }}
          onConfirm={handleDelete}
          onClose={() => setIsDeleteOpen(false)}
        />
      )}
    </div>
  );
}

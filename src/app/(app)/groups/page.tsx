"use client";

import { useState, useCallback } from "react";
import {
  PlusIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import GroupCard from "@/components/GroupCard";
import GroupEmptyState from "@/components/GroupEmptyState";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import MutedText from "@/components/MutedText";
import Card from "@/components/Card";
import { dummyGroups } from "@/dummy/groups";
import { useRouter } from "next/navigation";

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function GroupsPage() {
  const router = useRouter();

  // グループ作成
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [nameError, setNameError] = useState("");
  const [groupCode, setGroupCode] = useState(generateCode);
  const [copied, setCopied] = useState(false);

  // グループ参加
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [joinCode, setJoinCode] = useState("");

  const handleCloseCreate = useCallback(() => {
    setIsCreateOpen(false);
    setGroupName("");
    setNameError("");
    setGroupCode(generateCode());
    setCopied(false);
  }, []);

  const handleCloseJoin = useCallback(() => {
    setIsJoinOpen(false);
    setJoinCode("");
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(groupCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [groupCode]);

  const handleCreate = useCallback(() => {
    if (!groupName.trim()) {
      setNameError("グループ名を入力してください");
      return;
    }
    // TODO: 作成処理
    handleCloseCreate();
  }, [groupName, handleCloseCreate]);

  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="primary"
          fullWidth
          onClick={() => setIsCreateOpen(true)}
        >
          <span className="flex flex-col items-center gap-1">
            <PlusIcon className="w-6 h-6" />
            <span>グループを作成</span>
          </span>
        </Button>
        <Button
          variant="secondary"
          fullWidth
          onClick={() => setIsJoinOpen(true)}
        >
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

      {/* グループ作成モーダル */}
      {isCreateOpen && (
        <Modal title="グループ作成" onClose={handleCloseCreate}>
          <div className="flex flex-col gap-4 p-4">
            <Input
              label="グループ名"
              placeholder="例：家族"
              value={groupName}
              onChange={setGroupName}
              error={nameError}
            />
            <div className="rounded-2xl bg-primary-light p-4 flex flex-col gap-3">
              <Card padding="sm">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold tracking-widest text-foreground">
                    {groupCode}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGroupCode(generateCode())}
                    className="p-1 rounded-lg text-muted hover:bg-gray-100 transition-colors"
                  >
                    <ArrowPathIcon className="w-5 h-5" />
                  </button>
                </div>
              </Card>
              <Button variant="secondary" fullWidth onClick={handleCopy}>
                <span className="flex items-center justify-center gap-2">
                  {copied ? (
                    <CheckIcon className="w-4 h-4" />
                  ) : (
                    <DocumentDuplicateIcon className="w-4 h-4" />
                  )}
                  {copied ? "コピーしました" : "コードをコピー"}
                </span>
              </Button>
              <MutedText size="xs">
                このコードをメンバーに共有してください
              </MutedText>
            </div>
            <Button variant="primary" fullWidth onClick={handleCreate}>
              グループを作成
            </Button>
          </div>
        </Modal>
      )}

      {/* グループ参加モーダル */}
      {isJoinOpen && (
        <Modal title="グループに参加" onClose={handleCloseJoin}>
          <div className="flex flex-col gap-4 p-4">
            <Input
              label="グループコード"
              placeholder="6桁のコードを入力"
              value={joinCode}
              onChange={setJoinCode}
            />
            <MutedText size="xs">
              グループリーダーから共有されたコードを入力してください
            </MutedText>
            <Button
              variant="primary"
              fullWidth
              disabled={joinCode.trim().length !== 6}
              onClick={() => {}}
            >
              グループを検索
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

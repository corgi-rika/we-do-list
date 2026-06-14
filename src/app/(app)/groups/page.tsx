"use client";

import { useState, useCallback } from "react";
import {
  PlusIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import GroupCard from "@/components/GroupCard";
import GroupEmptyState from "@/components/GroupEmptyState";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import MutedText from "@/components/MutedText";
import TeamCodeCard from "@/components/TeamCodeCard";
import { useGroups } from "@/hooks/useGroups";
import { useRouter } from "next/navigation";

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function GroupsPage() {
  const router = useRouter();
  const { groups, createGroup, joinGroup, error } = useGroups();

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

  const handleCreate = useCallback(async () => {
    if (!groupName.trim()) {
      setNameError("グループ名を入力してください");
      return;
    }
    const ok = await createGroup(groupName.trim(), groupCode);
    if (ok) {
      handleCloseCreate();
    }
  }, [groupName, groupCode, createGroup, handleCloseCreate]);

  const handleJoin = useCallback(async () => {
    const ok = await joinGroup(joinCode.trim().toUpperCase());
    if (ok) {
      handleCloseJoin();
    }
  }, [joinCode, joinGroup, handleCloseJoin]);

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
        {groups.length === 0 ? (
          <GroupEmptyState />
        ) : (
          <div className="flex flex-col gap-2">
            {groups.map((group) => (
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
            <TeamCodeCard
              code={groupCode}
              copied={copied}
              onCopy={handleCopy}
              onRegenerate={() => setGroupCode(generateCode())}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
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
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              variant="primary"
              fullWidth
              disabled={joinCode.trim().length !== 6}
              onClick={handleJoin}
            >
              グループに参加
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

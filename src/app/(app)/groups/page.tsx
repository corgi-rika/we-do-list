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
import ValidationMessage from "@/components/ValidationMessage";
import { useGroups } from "@/hooks/useGroups";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { MAX_GROUP_MEMBERS } from "@/constants/group";
import { useRouter } from "next/navigation";

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function GroupsPage() {
  const router = useRouter();
  const { groups, createGroup, joinGroup, checkGroupCapacity, error } =
    useGroups();

  // グループ作成
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [nameError, setNameError] = useState("");
  const [groupCode, setGroupCode] = useState(generateCode);
  const { copied, copy, reset: resetCopied } = useCopyToClipboard();

  // グループ参加
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [isFull, setIsFull] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  const handleCloseCreate = useCallback(() => {
    setIsCreateOpen(false);
    setGroupName("");
    setNameError("");
    setGroupCode(generateCode());
    resetCopied();
  }, [resetCopied]);

  const handleCloseJoin = useCallback(() => {
    setIsJoinOpen(false);
    setJoinCode("");
    setIsFull(false);
    setAlreadyJoined(false);
  }, []);

  // コード入力時に満員チェック（6桁揃ったら確認）
  const handleJoinCodeChange = useCallback(
    async (code: string) => {
      setJoinCode(code);
      if (code.trim().length !== 6) {
        setIsFull(false);
        setAlreadyJoined(false);
        return;
      }

      const normalized = code.trim().toUpperCase();

      // すでに参加しているグループは「満員」ではなく「参加済み」として扱う
      const joined = groups.some((g) => g.teamCode === normalized);
      if (joined) {
        setAlreadyJoined(true);
        setIsFull(false);
        return;
      }

      setAlreadyJoined(false);
      const { isFull: full } = await checkGroupCapacity(normalized);
      setIsFull(full);
    },
    [checkGroupCapacity, groups],
  );

  const handleCopy = useCallback(async () => {
    await copy(groupCode);
  }, [copy, groupCode]);

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
    if (isFull || alreadyJoined) return;
    const ok = await joinGroup(joinCode.trim().toUpperCase());
    if (ok) {
      handleCloseJoin();
    }
  }, [joinCode, isFull, alreadyJoined, joinGroup, handleCloseJoin]);

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
            {error && <ValidationMessage message={error} />}
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
              onChange={handleJoinCodeChange}
            />
            <MutedText size="xs">
              グループリーダーから共有されたコードを入力してください
            </MutedText>
            {alreadyJoined && (
              <ValidationMessage message="すでにこのグループに参加しています" />
            )}
            {isFull && (
              <ValidationMessage
                message={`このグループは現在参加することはできません（満員：${MAX_GROUP_MEMBERS}名）`}
              />
            )}
            {error && <ValidationMessage message={error} />}
            <Button
              variant="primary"
              fullWidth
              disabled={joinCode.trim().length !== 6 || isFull || alreadyJoined}
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

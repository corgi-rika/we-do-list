"use client";

import {
  EnvelopeIcon,
  StarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import Modal from "@/components/Modal";
import Card from "@/components/Card";
import Avatar from "@/components/Avatar";
import type { MemberModalProps } from "./type";

export default function MemberModal({ member, onClose }: MemberModalProps) {
  return (
    <Modal title="メンバー情報" onClose={onClose} maxHeight="80vh">
      <div className="flex flex-col items-center gap-4 p-6">
        {/* アバター */}
        <div className="mt-6">
          <Avatar name={member.name} size="lg" />
        </div>
        <span className="text-xl font-bold">{member.name}</span>

        <div className="w-full flex flex-col gap-4 px-4">
          {/* メール */}
          <Card padding="md" className="flex items-center gap-3">
            <EnvelopeIcon className="w-5 h-5 text-muted shrink-0" />
            <span className="text-sm min-w-0 break-all">{member.email}</span>
          </Card>

          {/* リーダーバッジ */}
          {member.isLeader && (
            <div className="flex items-center justify-center gap-2 rounded-2xl p-4 bg-primary-light">
              <StarIcon className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">リーダー</span>
            </div>
          )}

          {/* 最近完了したToDo */}
          {member.recentTodos.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">最近完了したToDo</p>
              {member.recentTodos.map((todo) => (
                <Card
                  key={todo.id}
                  padding="md"
                  className="flex items-center gap-3"
                >
                  <CheckCircleIcon className="w-5 h-5 text-primary shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{todo.title}</span>
                    <span className="text-xs text-muted">
                      {todo.completedAgo}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

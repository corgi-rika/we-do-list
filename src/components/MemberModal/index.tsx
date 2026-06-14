"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import Modal from "@/components/Modal";
import Avatar from "@/components/Avatar";
import type { MemberModalProps } from "./type";

export default function MemberModal({ member, onClose }: MemberModalProps) {
  return (
    <Modal title="メンバー情報" onClose={onClose} maxHeight="80vh">
      <div className="flex flex-col items-center gap-4 p-6">
        {/* アバター */}
        <div className="mt-6">
          <Avatar name={member.username} size="lg" />
        </div>
        <span className="text-xl font-bold">{member.username}</span>

        <div className="w-full flex flex-col gap-4 px-4">
          {/* リーダーバッジ */}
          {member.isLeader && (
            <div className="flex items-center justify-center gap-2 rounded-2xl p-4 bg-primary-light">
              <StarIcon className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">リーダー</span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

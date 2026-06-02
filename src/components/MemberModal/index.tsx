"use client";

import {
  XMarkIcon,
  EnvelopeIcon,
  StarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import type { MemberModalProps } from "./type";

export default function MemberModal({ member, onClose }: MemberModalProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "400px",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-4">
          <span className="text-lg font-semibold">メンバー情報</span>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-beige flex items-center justify-center cursor-pointer"
          >
            <XMarkIcon className="w-5 h-5 text-foreground" />
          </button>
        </div>
        <div style={{ height: 1, backgroundColor: "#e5e7eb" }} />

        {/* ボディ */}
        <div className="flex flex-col items-center gap-4 p-6">
          {/* アバター */}
          <div
            className={`w-20 h-20 rounded-full ${member.avatarColor} flex items-center justify-center`}
          >
            <span className={`font-bold text-4xl ${member.textColor}`}>
              {member.name[0]}
            </span>
          </div>
          <span className="text-xl font-bold">{member.name}</span>

          {/* メール */}
          <div className="w-full flex items-center gap-3 rounded-2xl p-4 bg-beige">
            <EnvelopeIcon className="w-5 h-5 text-muted shrink-0" />
            <span className="text-sm">{member.email}</span>
          </div>

          {/* リーダーバッジ */}
          {member.isLeader && (
            <div className="w-full flex items-center justify-center gap-2 rounded-2xl p-4 bg-primary-light">
              <StarIcon className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">リーダー</span>
            </div>
          )}

          {/* 最近完了したToDo */}
          {member.recentTodos.length > 0 && (
            <div className="w-full flex flex-col gap-2">
              <p className="text-sm font-semibold">最近完了したToDo</p>
              {member.recentTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 rounded-2xl p-4 bg-beige"
                >
                  <CheckCircleIcon className="w-5 h-5 text-primary shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{todo.title}</span>
                    <span className="text-xs text-muted">
                      {todo.completedAgo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
